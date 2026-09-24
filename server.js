'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const MAIL_TO_PURCHASING =
  process.env.MAIL_TO_PURCHASING || process.env.SMTP_USER;

const MAIL_TO_SALES =
  process.env.MAIL_TO_SALES || process.env.SMTP_USER;

const MAIL_TO_CS =
  process.env.MAIL_TO_CS || process.env.SMTP_USER;

const MAIL_TO_HR =
  process.env.MAIL_TO_HR || process.env.SMTP_USER;

const MAIL_FROM =
  process.env.MAIL_FROM ||
  process.env.SMTP_USER ||
  'ayasaouliit@gmail.com';


// ============================================================
// SERVICE → EMAIL RECIPIENT ROUTING
// ============================================================

const SERVICE_RECIPIENTS = {
  sales: MAIL_TO_SALES,
  purchasing: MAIL_TO_PURCHASING,
  cs: MAIL_TO_CS,
  hr: MAIL_TO_HR
};
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || '';

const PUBLIC_DIR = path.resolve(__dirname, 'public');
const MAX_BODY_BYTES = 8 * 1024 * 1024; // 8 MB — enough for a 5 MB CV in base64 + overhead
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 10; // 10 requests per IP per window
const MAX_QUOTE_PRODUCTS = 10; // Max 10 items per quote

// ------------------------------------------------------------
// SECURITY CONFIG (new)
// ------------------------------------------------------------
// Only trust X-Forwarded-For if you are actually deployed behind a proxy/load
// balancer that sets it itself (nginx, Cloudflare, etc). If this is false and
// you're directly internet-facing, an attacker can spoof this header to dodge
// rate limiting — so it's off by default.
const TRUST_PROXY = String(process.env.TRUST_PROXY || '').toLowerCase() === 'true';

// Explicit allowlist of origins permitted to call the state-changing API
// endpoints cross-origin. Empty (default) = no CORS header is sent for
// /api/send-email, which means only same-origin requests work — the safest
// default, since JSON POSTs are CORS-preflighted and a wildcard '*' on a
// state-changing endpoint lets any website silently trigger requests through
// a visitor's browser. Set e.g. ALLOWED_ORIGINS=https://www.example.com if
// your frontend is hosted separately from this API.
const ALLOWED_ORIGINS = String(process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// Legacy .doc (OLE compound file) is the hardest attachment format to inspect
// server-side (no reliable content scan below) and is the classic macro-
// malware vector. Left enabled by default to match original behavior; set
// ALLOW_LEGACY_DOC=false to only accept PDF/DOCX.
const ALLOW_LEGACY_DOC = String(process.env.ALLOW_LEGACY_DOC || 'true').toLowerCase() !== 'false';

const MAX_CV_RAW_BYTES = 5 * 1024 * 1024; // 5 MB decoded

const rateBuckets = new Map();

// Periodic cleanup of rate limiting buckets every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of rateBuckets.entries()) {
    if (now > bucket.resetAt) {
      rateBuckets.delete(key);
    }
  }
}, 10 * 60 * 1000).unref();

const allowedTypes = new Set(['career', 'contact']);

// Field length limits
const limits = {
  name: 120,
  company: 160,
  email: 254,
  phone: 80,
  country: 100,
  filmType: 160,
  productId: 80,
  productCode: 80,
  productName: 180,
  thickness: 40,
  width: 60,
  treatment: 100,
  application: 100,
  quantity: 100,
  coreSize: 40,
  message: 5000
};

// Official Product Specifications Data for Server-Side Validation
const THICKNESS_OPTIONS = new Set([
  '15 MIC', '18 MIC', '20 MIC', '22 MIC', '23 MIC', '25 MIC',
  '30 MIC', '35 MIC', '38 MIC', '40 MIC', '45 MIC', '50 MIC', '70 MIC'
]);

const TREATMENT_OPTIONS = new Set([
  'ONE SIDE TREATED IN', 'ONE SIDE TREATED OUT', 'BOTH SIDE TREATED'
]);

const PRODUCTS_MAP = new Map([
  ['mattn', { id: 'mattn', code: 'MATTN', name: 'MATTN — Matt Film' }],
  ['matts', { id: 'matts', code: 'MATTS', name: 'MATTS — Matt Film' }],
  ['nlc',   { id: 'nlc',   code: 'NLC',   name: 'NLC — Label Clear Film' }],
  ['nlv',   { id: 'nlv',   code: 'NLV',   name: 'NLV — Label White Voided Film' }],
  ['nnc',   { id: 'nnc',   code: 'NNC',   name: 'NNC — Clear Non-Sealable' }],
  ['nrc',   { id: 'nrc',   code: 'NRC',   name: 'NRC — Clear Release Film' }],
  ['nsc',   { id: 'nsc',   code: 'NSC',   name: 'NSC — Transparent Clear Heat Sealable' }],
  ['nsh',   { id: 'nsh',   code: 'NSH',   name: 'NSH — Clear Heat Sealable' }],
  ['nsmm',  { id: 'nsmm',  code: 'NSMM',  name: 'NSMM — Metallized Sealable Film' }],
  ['nsp',   { id: 'nsp',   code: 'NSP',   name: 'NSP — White Pearlized Sealable Film' }],
  ['nsw',   { id: 'nsw',   code: 'NSW',   name: 'NSW — Solid White Sealable' }],
  ['nvmm',  { id: 'nvmm',  code: 'NVMM',  name: 'NVMM — Metalized White Voided Film' }]
]);

// Official TDS Allowlist Map
const ALLOWED_TDS = {
  'MATTN': 'MATTN.pdf',
  'MATTS': 'MATTS.pdf',
  'NLC': 'NLC.pdf',
  'NLV': 'NLV.pdf',
  'NNC': 'NNC.pdf',
  'NRC': 'NRC.pdf',
  'NSC': 'NSC.pdf',
  'NSH': 'NSH.pdf',
  'NSMM': 'NSMM.pdf',
  'NSP': 'NSP.pdf',
  'NSW': 'NSW.pdf',
  'NVMM': 'NVMM.pdf',
  'ALL': 'NODA_PLAST_General_TDS.pdf'
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Input Sanitization Functions
function cleanSingleLine(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\r\n\u0000-\u001F\u007F]/g, '') // Strip CR/LF and control chars
    .trim()
    .slice(0, maxLength);
}

function cleanMultiLine(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // Keep standard newlines
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email) {
  if (!email || typeof email !== 'string' || email.length > limits.email) return false;
  // RFC 5322 compliant regex preventing header injection
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email);
}

function isValidWidth(width) {
  if (!width) return true; // Optional width
  const cleanW = String(width).replace(/mm/gi, '').trim();
  const num = Number(cleanW);
  return !isNaN(num) && num >= 400 && num <= 2000;
}

function validateProductItem(item) {
  if (!item || typeof item !== 'object') return null;

  const rawId = cleanSingleLine(item.productId || item.id || '', limits.productId).toLowerCase();
  const official = PRODUCTS_MAP.get(rawId);
  if (!official) return null; // Unrecognized product ID

  const thickness = cleanSingleLine(item.thickness, limits.thickness);
  if (thickness && !THICKNESS_OPTIONS.has(thickness.toUpperCase())) return null;

  const treatment = cleanSingleLine(item.treatment, limits.treatment);
  if (treatment && !TREATMENT_OPTIONS.has(treatment.toUpperCase())) return null;

  const width = cleanSingleLine(item.width, limits.width);
  if (width && !isValidWidth(width)) return null;

  return {
    productId: official.id,
    productCode: official.code,
    productName: official.name,
    thickness: thickness ? thickness.toUpperCase() : '',
    width: width ? (width.toLowerCase().includes('mm') ? width : `${width} mm`) : '',
    treatment: treatment ? treatment.toUpperCase() : ''
  };
}

function getClientIp(req) {
  if (TRUST_PROXY) {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded && typeof forwarded === 'string') {
      return forwarded.split(',')[0].trim();
    }
  }
  return req.socket.remoteAddress || 'unknown';
}

function isRateLimited(req) {
  const now = Date.now();
  const key = getClientIp(req);
  const bucket = rateBuckets.get(key) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }

  bucket.count += 1;
  rateBuckets.set(key, bucket);

  return bucket.count > RATE_LIMIT_MAX;
}

async function verifyTurnstileToken(token, remoteIp) {
  if (!TURNSTILE_SECRET_KEY) return true; // Not configured
  if (!token || typeof token !== 'string') return false;

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: remoteIp
      })
    });
    const outcome = await response.json();
    return outcome.success === true;
  } catch (err) {
    console.error('Turnstile verification error:', err.message);
    return false;
  }
}

// ============================================================
// ATTACHMENT / CV SECURITY SCANNING (new)
// ============================================================
// Defense in depth against a file being something other than what its
// filename or declared Content-Type claims — e.g. "resume.exe" renamed to
// "resume.pdf", or a real PDF with an executable/script smuggled inside it.
// None of this replaces a real antivirus engine (see note at bottom of file);
// it catches the common, high-confidence cases cheaply and with zero new
// dependencies.

const DANGEROUS_EXTENSIONS = new Set([
  'exe', 'scr', 'bat', 'cmd', 'com', 'pif', 'msi', 'msp', 'msc', 'vbs', 'vbe',
  'vb', 'js', 'jse', 'wsf', 'wsh', 'ps1', 'ps1xml', 'ps2', 'ps2xml', 'psc1',
  'psc2', 'jar', 'jnlp', 'reg', 'dll', 'sys', 'drv', 'ocx', 'cpl', 'gadget',
  'application', 'hta', 'html', 'htm', 'shs', 'sct', 'lnk', 'url', 'scf',
  'inf', 'ins', 'isp', 'iso', 'img', 'vhd', 'vhdx', 'apk', 'ipa', 'dmg',
  'pkg', 'deb', 'rpm', 'sh', 'bash', 'csh', 'ksh', 'run', 'bin', 'out',
  'py', 'pyc', 'pl', 'php', 'docm', 'xlsm', 'pptm'
]);

// Right-to-left override / bidi formatting characters used to visually
// disguise a file's real extension (e.g. making "cv‮fdp.exe" display
// reversed so it looks like it ends in ".pdf").
const BIDI_CONTROL_CHARS = /[\u202A-\u202E\u2066-\u2069\u200E\u200F]/g;

const PDF_SUSPICIOUS_TOKENS = [
  '/JavaScript', '/JS', '/OpenAction', '/AA', '/Launch',
  '/EmbeddedFile', '/RichMedia', '/SubmitForm', '/ImportData', '/GoToE'
];

function sanitizeFilename(name) {
  if (typeof name !== 'string') return '';
  return name
    .normalize('NFKC')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(BIDI_CONTROL_CHARS, '')
    .replace(/[\\/]/g, '_')
    .trim()
    .slice(0, 150);
}

function hasDangerousExtensionAnywhere(filename) {
  const parts = filename.toLowerCase().split('.').slice(1);
  return parts.some(ext => DANGEROUS_EXTENSIONS.has(ext));
}

function detectSignature(buf) {
  if (buf.length >= 5 && buf.slice(0, 5).toString('latin1') === '%PDF-') return 'pdf';
  if (buf.length >= 8 && buf.slice(0, 8).equals(Buffer.from('d0cf11e0a1b11ae1', 'hex'))) return 'ole';
  if (buf.length >= 4 && (
    buf.slice(0, 4).equals(Buffer.from('504b0304', 'hex')) ||
    buf.slice(0, 4).equals(Buffer.from('504b0506', 'hex'))
  )) return 'zip';
  if (buf.length >= 2 && buf.slice(0, 2).toString('latin1') === 'MZ') return 'exe';
  if (buf.length >= 4 && buf.slice(0, 4).equals(Buffer.from('7f454c46', 'hex'))) return 'elf';
  if (buf.length >= 4 && (
    buf.slice(0, 4).equals(Buffer.from('cafebabe', 'hex')) ||
    buf.slice(0, 4).equals(Buffer.from('feedface', 'hex')) ||
    buf.slice(0, 4).equals(Buffer.from('feedfacf', 'hex')) ||
    buf.slice(0, 4).equals(Buffer.from('cffaedfe', 'hex')) ||
    buf.slice(0, 4).equals(Buffer.from('cefaedfe', 'hex'))
  )) return 'macho';
  if (buf.length >= 2 && buf.slice(0, 2).toString('latin1') === '#!') return 'script';
  return 'unknown';
}

// Looks for a Windows PE embedded/appended anywhere in the buffer (not just
// at offset 0) — the technique used to smuggle an executable inside what is
// otherwise a structurally valid PDF/DOCX/DOC container.
function containsEmbeddedExecutableMarker(buf) {
  if (buf.includes(Buffer.from('This program cannot be run in DOS mode'))) return true;
  let idx = 0;
  while (true) {
    idx = buf.indexOf('MZ', idx, 'latin1');
    if (idx === -1) break;
    const window = buf.slice(idx, idx + 512);
    if (window.includes(Buffer.from('PE\0\0'))) return true;
    idx += 2;
  }
  return false;
}

// Heuristic only: catches active-content keywords sitting in plain text in
// the PDF's object dictionaries. It will NOT see JS hidden inside a
// FlateDecode-compressed stream — a real CV never legitimately needs any of
// these features, so any hit is treated as a hard rejection rather than a
// false-positive risk worth tolerating.
function scanPdfHeuristics(buf) {
  const found = [];
  for (const token of PDF_SUSPICIOUS_TOKENS) {
    if (buf.includes(Buffer.from(token, 'latin1'))) found.push(token);
  }
  return found;
}

// Lightweight ZIP local-file-header walker (no dependency) to list entry
// names inside a .docx without fully decompressing it. Rejects (fails
// closed) on anything that doesn't parse cleanly, on macro indicators
// (vbaProject.bin), on any dangerous-extension entry, on implausible
// declared sizes (zip-bomb guard), and on streamed entries whose size can't
// be verified up front.
function scanZipEntries(buf) {
  const LOCAL_SIG = 0x04034b50;
  const result = { entries: [], suspicious: false, reason: '' };
  let offset = 0;
  let iterations = 0;

  try {
    while (offset + 4 <= buf.length && iterations < 2000) {
      iterations++;
      const sig = buf.readUInt32LE(offset);
      if (sig !== LOCAL_SIG) break;
      if (offset + 30 > buf.length) {
        result.suspicious = true;
        result.reason = 'Truncated zip header';
        break;
      }
      const flag = buf.readUInt16LE(offset + 6);
      const compSize = buf.readUInt32LE(offset + 18);
      const uncompSize = buf.readUInt32LE(offset + 22);
      const nameLen = buf.readUInt16LE(offset + 26);
      const extraLen = buf.readUInt16LE(offset + 28);
      const nameStart = offset + 30;
      const nameEnd = nameStart + nameLen;

      if (nameEnd > buf.length) {
        result.suspicious = true;
        result.reason = 'Truncated entry name';
        break;
      }

      const entryName = buf.slice(nameStart, nameEnd).toString('utf8');
      result.entries.push(entryName);

      if (uncompSize > 200 * 1024 * 1024) {
        result.suspicious = true;
        result.reason = 'Implausible uncompressed size (possible zip bomb)';
        break;
      }

      const lowerName = entryName.toLowerCase();
      if (hasDangerousExtensionAnywhere(lowerName) || lowerName.endsWith('vbaproject.bin')) {
        result.suspicious = true;
        result.reason = `Disallowed entry: ${entryName}`;
        break;
      }

      if (flag & 0x0008) {
        result.suspicious = true;
        result.reason = 'Streamed zip entry (size unverifiable)';
        break;
      }

      offset = nameStart + nameLen + extraLen + compSize;
    }
  } catch (e) {
    result.suspicious = true;
    result.reason = 'Zip parsing error';
  }

  const looksLikeOoxml = result.entries.includes('[Content_Types].xml') ||
    result.entries.some(e => e.startsWith('word/'));
  if (!looksLikeOoxml && !result.suspicious) {
    result.suspicious = true;
    result.reason = 'Archive does not look like a valid Word document';
  }

  return result;
}

// Main orchestrator: decodes, verifies content actually matches the claimed
// type, scans for active/embedded threats, and rebuilds a safe output
// filename. The returned filename is ALWAYS <cleaned-name>.<verified-ext> —
// constructed from scratch, never copied from the original — so a double-
// extension trick like "cv.exe.pdf" cannot survive into the outgoing email
// even if some other check were bypassed.
async function verifyAttachment(attachment) {
  const rawFilename = sanitizeFilename(attachment.filename);
  if (!rawFilename) {
    return { ok: false, message: 'The CV file name is invalid.' };
  }
  if (hasDangerousExtensionAnywhere(rawFilename)) {
    return { ok: false, message: 'That file type is not accepted for security reasons.' };
  }

  const normalizedB64 = attachment.content.replace(/\s/g, '');
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(normalizedB64)) {
    return { ok: false, message: 'The CV attachment could not be read.' };
  }

  let buffer;
  try {
    buffer = Buffer.from(normalizedB64, 'base64');
  } catch (e) {
    return { ok: false, message: 'The CV attachment could not be read.' };
  }
  if (!buffer.length) {
    return { ok: false, message: 'The CV attachment is empty.' };
  }
  if (buffer.length > MAX_CV_RAW_BYTES) {
    return { ok: false, message: 'The CV file is too large.' };
  }

  const signature = detectSignature(buffer);

  if (['exe', 'elf', 'macho', 'script'].includes(signature)) {
    return { ok: false, message: 'That file appears to be an executable and was rejected.' };
  }

  const mimeToSignature = {
    'application/pdf': 'pdf',
    'application/msword': 'ole',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'zip'
  };
  const expectedSignature = mimeToSignature[attachment.mimeType];
  if (signature !== expectedSignature) {
    return { ok: false, message: 'The file content does not match its declared type.' };
  }
  if (signature === 'ole' && !ALLOW_LEGACY_DOC) {
    return { ok: false, message: 'Legacy .doc files are not accepted — please upload a PDF or .docx.' };
  }

  if (containsEmbeddedExecutableMarker(buffer)) {
    return { ok: false, message: 'That file appears to contain embedded executable content and was rejected.' };
  }

  if (signature === 'pdf' && scanPdfHeuristics(buffer).length) {
    return { ok: false, message: 'That PDF contains active content that is not accepted for CV submissions.' };
  }

  if (signature === 'zip' && scanZipEntries(buffer).suspicious) {
    return { ok: false, message: 'That document could not be verified as safe and was rejected.' };
  }

  const extensionBySignature = { pdf: 'pdf', ole: 'doc', zip: 'docx' };
  const safeExt = extensionBySignature[signature];
  const displayBase = rawFilename
    .replace(/\.[a-zA-Z0-9]{1,10}$/, '')
    .replace(/[^a-zA-Z0-9 _-]/g, '')
    .trim()
    .slice(0, 80) || 'CV';
  const finalFilename = `${displayBase}.${safeExt}`;

  return { ok: true, filename: finalFilename, mimeType: attachment.mimeType, buffer };
}

function validatePayload(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, message: 'Invalid JSON request.' };
  }

  // Honeypot check for bot detection
  if (input.website || input._honeypot) {
    // Silently handle bot submission
    return { ok: false, isBot: true, message: 'Request processed.' };
  }

  const type = cleanSingleLine(input.type, 20);
  if (!allowedTypes.has(type)) {
    return { ok: false, message: 'Invalid request type.' };
  }

  const data = {
    type,
    name: cleanSingleLine(input.name, limits.name),
    company: cleanSingleLine(input.company, limits.company),
    email: cleanSingleLine(input.email, limits.email),
    phone: cleanSingleLine(input.phone, limits.phone),
    country: cleanSingleLine(input.country, limits.country),
    service: cleanSingleLine(input.service, 50),
    application: cleanSingleLine(input.application, limits.application),
    quantity: cleanSingleLine(input.quantity, limits.quantity),
    coreSize: cleanSingleLine(input.coreSize, limits.coreSize),
    message: cleanMultiLine(input.message, limits.message),
    turnstileToken: input.cfTurnstileResponse || input.turnstileToken || ''
  };
  if (type === 'career') {
      if (!data.name) {
        return { ok: false, message: 'Name is required for career applications.' };
      }

      const attachment = input.attachment;
      if (!attachment || typeof attachment !== 'object') {
        return { ok: false, message: 'A CV attachment is required.' };
      }

      const filename = cleanSingleLine(attachment.filename, 200);
      const mimeType = cleanSingleLine(attachment.mimeType, 100);
      const content = typeof attachment.content === 'string' ? attachment.content : '';

      if (!filename || !content) {
        return { ok: false, message: 'The CV attachment is missing or empty.' };
      }

      // Base64 size guard (roughly 5 MB raw → ~7 MB base64)
      if (content.length > 7 * 1024 * 1024) {
        return { ok: false, message: 'The CV file is too large.' };
      }

      const allowedMimes = new Set([
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]);

      if (!allowedMimes.has(mimeType)) {
        return { ok: false, message: 'Only PDF, DOC or DOCX files are accepted.' };
      }

      data.position = cleanSingleLine(input.position, 120);
      data.consent  = cleanSingleLine(input.consent, 10);
      data.attachment = {
        filename,
        mimeType,
        content
      };
    }
  

  if (!isValidEmail(data.email)) {
    return { ok: false, message: 'Please provide a valid email address.' };
  }

  if (type === 'contact') {
    if (!data.name || !data.company || !data.email) {
    return { ok: false, message: 'Name, company and email are required.' };
  }
    if (!data.message) {
      return { ok: false, message: 'A message is required for contact requests.' };
    }
  }

  return { ok: true, data };
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;

    req.setEncoding('utf8');

    req.on('data', chunk => {
      size += Buffer.byteLength(chunk, 'utf8');
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('Request body is too large.'), { statusCode: 413 }));
        return;
      }
      body += chunk;
    });

    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (_) {
        reject(Object.assign(new Error('Malformed JSON request.'), { statusCode: 400 }));
      }
    });

    req.on('error', reject);
  });
}

function buildEmail(data) {
  const now = new Date().toISOString();
  let subject;
  let title;
  let rows = [];
    if (data.type === 'career') {
    subject = `New CV Application — ${data.position || 'General application'}`;
    title = 'NEW CAREER APPLICATION';
    rows = [
      ['Name', data.name],
      ['Email', data.email],
      ['Phone', data.phone],
      ['Position', data.position],
      ['Consent given', data.consent]
    ];
  }
  if (data.type === 'contact') {
    subject = 'New Contact Message — NODA PLAST Website';
    title = 'NEW CONTACT MESSAGE';
    rows = [
      ['Name', data.name],
      ['Company', data.company],
      ['Email', data.email],
      ['Phone', data.phone],
      ['Country', data.country]
    ];
  }

  const cleanRows = rows.filter(([, value]) => value);

  let text = `${title}\n\n`;
  text += 'Customer / Request Information\n';
  text += '------------------------------\n';
  for (const [label, value] of cleanRows) {
    text += `${label}: ${value}\n`;
  }

  if (data.type === 'quote' && Array.isArray(data.selectedProducts) && data.selectedProducts.length > 0) {
    text += '\nRequested Products Specification List\n';
    text += '------------------------------------\n';
    data.selectedProducts.forEach((p, idx) => {
      text += `${idx + 1}. ${p.productCode} - ${p.productName}\n`;
      if (p.thickness) text += `   Thickness: ${p.thickness}\n`;
      if (p.width) text += `   Width: ${p.width}\n`;
      if (p.treatment) text += `   Treatment: ${p.treatment}\n`;
    });
  }

  text += '\n';
  text += data.type === 'contact' ? 'Message\n-------\n' : 'Customer Message\n----------------\n';
  text += `${data.message || 'No message provided.'}\n\n`;
  text += `Request time (UTC): ${now}\n`;

  let html = `<h2>${escapeHtml(title)}</h2>`;
  html += '<h3>Customer / Request Information</h3><table cellpadding="6" cellspacing="0" border="0">';
  for (const [label, value] of cleanRows) {
    html += `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`;
  }
  html += '</table>';

  html += `<h3>${data.type === 'contact' ? 'Message' : 'Customer Message'}</h3>`;
  html += `<p>${escapeHtml(data.message || 'No message provided.').replace(/\n/g, '<br>')}</p>`;
  html += `<p><small>Request time (UTC): ${escapeHtml(now)}</small></p>`;

  return { subject, text, html };
}

function applyCors(req, res, allowMethods) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.length > 0 && origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  // If ALLOWED_ORIGINS is empty (default), no CORS header is sent, so only
  // same-origin requests succeed — the safest default for a state-changing
  // endpoint. Configure ALLOWED_ORIGINS if your frontend lives elsewhere.
  res.setHeader('Access-Control-Allow-Methods', allowMethods);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function handleSendEmail(req, res) {
  applyCors(req, res, 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.writeHead(204).end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { success: false, message: 'Method not allowed.' });
  }

  if (isRateLimited(req)) {
    return sendJson(res, 429, {
      success: false,
      message: 'Too many requests. Please try again later.'
    });
  }

  if (!String(req.headers['content-type'] || '').toLowerCase().includes('application/json')) {
    return sendJson(res, 415, {
      success: false,
      message: 'Content-Type must be application/json.'
    });
  }

  // Fail fast on an oversized declared body before reading any of it.
  const declaredLength = Number(req.headers['content-length'] || 0);
  if (declaredLength && declaredLength > MAX_BODY_BYTES) {
    return sendJson(res, 413, { success: false, message: 'Request body is too large.' });
  }

  try {
    const input = await readJson(req);
    const validation = validatePayload(input);

    if (!validation.ok) {
      if (validation.isBot) {
        // Return synthetic success to confuse bot scripts without sending email
        return sendJson(res, 200, { success: true, message: 'Request sent successfully.' });
      }
      return sendJson(res, 400, { success: false, message: validation.message });
    }

    // Verify Turnstile CAPTCHA. If a secret key is configured, a token is
    // REQUIRED — previously an attacker could just omit the token and skip
    // verification entirely.
    if (TURNSTILE_SECRET_KEY) {
      if (!validation.data.turnstileToken) {
        return sendJson(res, 400, { success: false, message: 'CAPTCHA verification is required.' });
      }
      const validCaptcha = await verifyTurnstileToken(validation.data.turnstileToken, getClientIp(req));
      if (!validCaptcha) {
        return sendJson(res, 400, { success: false, message: 'CAPTCHA verification failed. Please try again.' });
      }
    }

    // Deep-scan the CV attachment (magic bytes, embedded executables, active
    // PDF content, zip/macro inspection) — never trust the client-declared
    // mimeType alone.
    if (validation.data.type === 'career') {
      const attCheck = await verifyAttachment(validation.data.attachment);
      if (!attCheck.ok) {
        return sendJson(res, 400, { success: false, message: attCheck.message });
      }
      validation.data.attachment = attCheck;
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !MAIL_FROM) {
      console.error('Email service is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS and MAIL_FROM.');
      return sendJson(res, 503, {
        success: false,
        message: 'Email service is temporarily unavailable. Please try again later.'
      });
    }

    const email = buildEmail(validation.data);
    const recipient = SERVICE_RECIPIENTS[validation.data.service];

    if (!recipient) {
      return sendJson(res, 400, {
        success: false,
        message: 'Invalid service selected.'
      });
    }

    const mailOptions = {
      from: MAIL_FROM,
      to: recipient,
      replyTo: validation.data.email,
      subject: email.subject,
      text: email.text,
      html: email.html
    };

    if (validation.data.type === 'career' && validation.data.attachment) {
      mailOptions.attachments = [{
        filename: validation.data.attachment.filename,
        content: validation.data.attachment.buffer,
        contentType: validation.data.attachment.mimeType
      }];
    }

    await transporter.sendMail(mailOptions);

    return sendJson(res, 200, {
      success: true,
      message: 'Request sent successfully.'
    });
  } catch (error) {
    console.error('Email request failed:', error.message);
    return sendJson(res, error.statusCode || 502, {
      success: false,
      message: 'Unable to send your request right now. Please try again later.'
    });
  }
}

function handleDownloadTds(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.writeHead(204).end();
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendJson(res, 405, { success: false, message: 'Method not allowed.' });
  }

  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let code = (urlObj.searchParams.get('code') || '').trim().toUpperCase();

  if (!code && urlObj.pathname.startsWith('/tds/')) {
    const rawFile = urlObj.pathname.slice('/tds/'.length);
    code = rawFile.replace(/\.pdf$/i, '').trim().toUpperCase();
  }

  const targetPdf = ALLOWED_TDS[code];
  if (!targetPdf) {
    return sendJson(res, 404, { success: false, message: 'Requested TDS document was not found.' });
  }

  const pdfPath = path.resolve(PUBLIC_DIR, 'tds', targetPdf);

  // Path traversal prevention check
  if (!pdfPath.startsWith(path.join(PUBLIC_DIR, 'tds') + path.sep)) {
    return sendJson(res, 403, { success: false, message: 'Forbidden.' });
  }

  fs.stat(pdfPath, (err, stat) => {
    if (err || !stat.isFile()) {
      return sendJson(res, 404, { success: false, message: 'TDS document not available.' });
    }

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': stat.size,
      'Content-Disposition': `attachment; filename="NODA_PLAST_${code}_TDS.pdf"`,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=86400'
    });

    if (req.method === 'HEAD') {
      return res.end();
    }

    fs.createReadStream(pdfPath).pipe(res);
  });
}

function sendJson(res, statusCode, body) {
  const output = JSON.stringify(body);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(output);
}
function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // Only honored by browsers over HTTPS, harmless to always send.
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');

  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data:; " +
    "connect-src 'self'; " +
    "frame-src 'self' https://www.google.com https://www.openstreetmap.org; " +
    "frame-ancestors 'none'; " +
    "form-action 'self';"
  );
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

function serveStatic(req, res) {
  let requestPath = decodeURIComponent(req.url.split('?')[0]);
  if (requestPath === '/') requestPath = '/index.html';

  // Strict path traversal prevention: serve ONLY from PUBLIC_DIR
  const filePath = path.resolve(PUBLIC_DIR, `.${requestPath}`);

  if (!filePath.startsWith(PUBLIC_DIR + path.sep) && filePath !== PUBLIC_DIR) {
    return sendJson(res, 403, { success: false, message: 'Forbidden.' });
  }

  // Block hidden files (dotfiles) and server-side files
  const baseName = path.basename(filePath);
  if (baseName.startsWith('.') || baseName === 'server.js' || baseName === 'package.json') {
    return sendJson(res, 403, { success: false, message: 'Forbidden.' });
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      return sendJson(res, 404, { success: false, message: 'Not found.' });
    }

    const ext = path.extname(filePath).toLowerCase();
    const mime = mimeTypes[ext];

    if (!mime) {
      return sendJson(res, 403, { success: false, message: 'Forbidden file type.' });
    }

    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
    });

    if (req.method === 'HEAD') {
      return res.end();
    }

    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  setSecurityHeaders(res);

  const pathname = req.url.split('?')[0];

  if (pathname === '/api/send-email') {
    return handleSendEmail(req, res);
  }

  if (pathname === '/api/download-tds' || pathname.startsWith('/tds/')) {
    return handleDownloadTds(req, res);
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendJson(res, 405, { success: false, message: 'Method not allowed.' });
  }

  return serveStatic(req, res);
});

// Basic protection against slow-loris style connection exhaustion attacks.
server.headersTimeout = 20000;
server.requestTimeout = 30000;
server.keepAliveTimeout = 15000;

server.listen(PORT, HOST, () => {
  console.log(`NODA PLAST website server listening on http://${HOST}:${PORT}`);
});
