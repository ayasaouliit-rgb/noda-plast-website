'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const MAIL_TO = process.env.MAIL_TO || 'ayasaouliit@gmail.com';
const MAIL_FROM = process.env.MAIL_FROM || process.env.SMTP_USER || 'ayasaouliit@gmail.com';
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || '';

const PUBLIC_DIR = path.resolve(__dirname, 'public');
const MAX_BODY_BYTES = 32 * 1024; // 32 KB
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 20; // 20 requests per IP per window
const MAX_QUOTE_PRODUCTS = 20; // Max 20 items per quote

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

const allowedTypes = new Set(['sample', 'quote', 'contact']);

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
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded && typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
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
    application: cleanSingleLine(input.application, limits.application),
    quantity: cleanSingleLine(input.quantity, limits.quantity),
    coreSize: cleanSingleLine(input.coreSize, limits.coreSize),
    message: cleanMultiLine(input.message, limits.message),
    turnstileToken: input.cfTurnstileResponse || input.turnstileToken || ''
  };

  if (!data.name || !data.company || !data.email) {
    return { ok: false, message: 'Name, company and email are required.' };
  }

  if (!isValidEmail(data.email)) {
    return { ok: false, message: 'Please provide a valid email address.' };
  }

  if (type === 'contact') {
    if (!data.message) {
      return { ok: false, message: 'A message is required for contact requests.' };
    }
  }

  if (type === 'sample') {
    if (!data.phone) {
      return { ok: false, message: 'Phone number is required for sample requests.' };
    }
    const validatedProd = validateProductItem({
      productId: input.productId || input.filmType,
      thickness: input.thickness,
      width: input.width,
      treatment: input.treatment
    });

    if (!validatedProd) {
      return { ok: false, message: 'Please select a valid product and specification combination.' };
    }

    data.filmType = validatedProd.productName;
    data.productId = validatedProd.productId;
    data.productCode = validatedProd.productCode;
    data.productName = validatedProd.productName;
    data.thickness = validatedProd.thickness;
    data.width = validatedProd.width;
    data.treatment = validatedProd.treatment;
  }

  if (type === 'quote') {
    let verifiedProducts = [];

    if (Array.isArray(input.selectedProducts) && input.selectedProducts.length > 0) {
      if (input.selectedProducts.length > MAX_QUOTE_PRODUCTS) {
        return { ok: false, message: `A quote request can contain a maximum of ${MAX_QUOTE_PRODUCTS} products.` };
      }

      for (const item of input.selectedProducts) {
        const validItem = validateProductItem(item);
        if (!validItem) {
          return { ok: false, message: 'One or more selected products contain invalid specifications.' };
        }
        verifiedProducts.push(validItem);
      }
    } else if (input.productId || input.productCode || input.filmType) {
      const validItem = validateProductItem({
        productId: input.productId || input.filmType,
        thickness: input.thickness,
        width: input.width,
        treatment: input.treatment
      });
      if (validItem) {
        verifiedProducts.push(validItem);
      }
    }

    if (verifiedProducts.length > 0) {
      data.selectedProducts = verifiedProducts;
      data.productId = verifiedProducts.map(p => p.productId).join(', ');
      data.productCode = verifiedProducts.map(p => p.productCode).join(', ');
      data.productName = verifiedProducts.map(p => p.productName).join(' | ');
      data.filmType = verifiedProducts[0].productName;
      data.thickness = verifiedProducts[0].thickness;
      data.width = verifiedProducts[0].width;
      data.treatment = verifiedProducts[0].treatment;
    } else {
      data.filmType = cleanSingleLine(input.filmType || input.application || 'General Quote Request', limits.filmType);
      data.thickness = cleanSingleLine(input.thickness, limits.thickness);
      data.width = cleanSingleLine(input.width, limits.width);
      data.treatment = cleanSingleLine(input.treatment, limits.treatment);
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

  if (data.type === 'sample') {
    subject = `New Sample Request — ${data.productCode}`;
    title = 'NEW SAMPLE REQUEST';
    rows = [
      ['Name', data.name],
      ['Company', data.company],
      ['Email', data.email],
      ['Phone', data.phone],
      ['Product Code', data.productCode],
      ['Product Name', data.productName],
      ['Thickness', data.thickness],
      ['Width', data.width],
      ['Treatment', data.treatment]
    ];
  } else if (data.type === 'contact') {
    subject = 'New Contact Message — NODA PLAST Website';
    title = 'NEW CONTACT MESSAGE';
    rows = [
      ['Name', data.name],
      ['Company', data.company],
      ['Email', data.email],
      ['Phone', data.phone],
      ['Country', data.country]
    ];
  } else {
    subject = `New Quote Request — NODA PLAST Website (${data.selectedProducts ? data.selectedProducts.length : 1} product(s))`;
    title = 'NEW QUOTE REQUEST';
    rows = [
      ['Name', data.name],
      ['Company', data.company],
      ['Email', data.email],
      ['Phone', data.phone],
      ['Country', data.country],
      ['Application', data.application],
      ['Quantity', data.quantity],
      ['Core Size', data.coreSize]
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

  if (data.type === 'quote' && Array.isArray(data.selectedProducts) && data.selectedProducts.length > 0) {
    html += '<h3>Requested Products Specification List</h3>';
    html += '<table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;">';
    html += '<tr><th>#</th><th>Code</th><th>Product Name</th><th>Thickness</th><th>Width</th><th>Treatment</th></tr>';
    data.selectedProducts.forEach((p, idx) => {
      html += `<tr>
        <td>${idx + 1}</td>
        <td><strong>${escapeHtml(p.productCode)}</strong></td>
        <td>${escapeHtml(p.productName)}</td>
        <td>${escapeHtml(p.thickness || 'N/A')}</td>
        <td>${escapeHtml(p.width || 'N/A')}</td>
        <td>${escapeHtml(p.treatment || 'N/A')}</td>
      </tr>`;
    });
    html += '</table>';
  }

  html += `<h3>${data.type === 'contact' ? 'Message' : 'Customer Message'}</h3>`;
  html += `<p>${escapeHtml(data.message || 'No message provided.').replace(/\n/g, '<br>')}</p>`;
  html += `<p><small>Request time (UTC): ${escapeHtml(now)}</small></p>`;

  return { subject, text, html };
}

async function handleSendEmail(req, res) {
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

    // Verify Turnstile CAPTCHA if token provided
    if (validation.data.turnstileToken) {
      const validCaptcha = await verifyTurnstileToken(validation.data.turnstileToken, getClientIp(req));
      if (!validCaptcha) {
        return sendJson(res, 400, { success: false, message: 'CAPTCHA verification failed. Please try again.' });
      }
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !MAIL_FROM) {
      console.error('Email service is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS and MAIL_FROM.');
      return sendJson(res, 503, {
        success: false,
        message: 'Email service is temporarily unavailable. Please try again later.'
      });
    }

    const email = buildEmail(validation.data);

    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: validation.data.email,
      subject: email.subject,
      text: email.text,
      html: email.html
    });

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

server.listen(PORT, HOST, () => {
  console.log(`NODA PLAST website server listening on http://${HOST}:${PORT}`);
});
