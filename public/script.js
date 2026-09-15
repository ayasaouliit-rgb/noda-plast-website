/* ============================================================
   I18N HELPER
   Translates a static English string to French at call time when
   the site is currently in French mode. Used for text that is set
   via .textContent (so translation.js's data-i18n mutation observer
   cannot pick it up automatically). Falls back to the original
   string when not in French mode or before translation.js loads.
   ============================================================ */
function i18nText(str) {
  return (window.NODA_LANGUAGE === 'fr' && window.t) ? window.t(str) : str;
}

/* ============================================================
   EMAIL API
   ============================================================ */

const EMAIL_API_ENDPOINT = '/api/send-email';

async function sendEmailRequest(payload) {
  let response;
  try {
    response = await fetch(EMAIL_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (networkErr) {
    throw new Error('Network error — please check your connection and try again.');
  }

  let result = {};
  const raw = await response.text();
  try {
    result = raw ? JSON.parse(raw) : {};
  } catch (_) {
    throw new Error(`Server returned an unexpected response (HTTP ${response.status}).`);
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || `Unable to send request (HTTP ${response.status}).`);
  }

  return result;
}

const THICKNESS_OPTIONS = [
  '15 MIC',
  '18 MIC',
  '20 MIC',
  '22 MIC',
  '23 MIC',
  '25 MIC',
  '30 MIC',
  '35 MIC',
  '38 MIC',
  '40 MIC',
  '45 MIC',
  '50 MIC',
  '70 MIC'
];
const TREATMENT_OPTIONS = [
  'ONE SIDE TREATED IN',
  'ONE SIDE TREATED OUT',
  'BOTH SIDE TREATED'
];
const WIDTH_OPTIONS = [];

for (let width = 400; width <= 2000; width += 50) {
  WIDTH_OPTIONS.push(`${width} mm`);
}

const PRODUCTS = [
  {
    id: 'mattn',
    code: 'MATTN',
    img: 'matt-bopp-film-roll.png',
    gallery: [
      'matt-bopp-film-roll.png',
      'matt_gallery_1.png',
      'matt_gallery_2.png',
      'matt_gallery_3.png'
    ],
    category: 'Matt Films',
    name: 'MATTN — Matt Film Non Sealable',
    shortName: 'Matt Film (Matt Side Non Sealable)',
    desc: 'Matt film with a non-sealable matte side, designed for applications requiring a distinctive low-gloss surface.',
    overview:
      'MATTN is a matt BOPP film with a non-sealable matt side. It is suitable for applications where a premium matte appearance is required.',
    tags: [
      'Matt finish',
      'Non-sealable matt side'
    ],
    applications: [
      'Premium packaging',
      'Labels',
      'Specialty packaging'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC'],
    technicalSpecifications: {
      '20 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '25 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '30 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
    },
    defaultThickness: '20 MIC',
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'MATTN matt BOPP film'
  },

  {
    id: 'matts',
    code: 'MATTS',
    img: 'matt-bopp-film-roll.png',
    gallery: [
      'matt-bopp-film-roll.png',
      'matt-application-1.jpg',
      'matt-application-2.jpg',
      'matt-application-3.jpg'
    ],
    category: 'Matt Films',
    name: 'MATTS — Matt Film Both Sides Sealable',
    shortName: 'Matt Film (Both Sides Sealable)',
    desc: 'Matt film with both sides sealable for packaging structures requiring a matte appearance and sealing capability.',
    overview:
      'MATTS is a matt BOPP film designed with both sides sealable. It combines a matte visual appearance with sealing functionality.',
    tags: [
      'Matt finish',
      'Both sides sealable'
    ],
    applications: [
      'Flexible packaging',
      'Heat-sealable structures',
      'Premium packaging'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC'],
    technicalSpecifications: {
      '20 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '25 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '30 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
    },
    defaultThickness: '20 MIC',
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'MATTS matt sealable BOPP film'
  },

  {
    id: 'nlc',
    code: 'NLC',
    img: 'clear-bopp-film-roll.png',
    gallery: [
      'clear-bopp-film-roll.png',
      'clear-application-1.jpg',
      'clear-application-2.jpg',
      'clear-application-3.jpg'
    ],
    category: 'Label Films',
    name: 'NLC — Label Clear Film',
    shortName: 'Label Clear Film',
    desc: 'Clear BOPP film developed for transparent label applications.',
    overview:
      'NLC is a clear label film designed for applications where transparency and a no-label-look appearance are important.',
    tags: [
      'Clear',
      'Label film',
      'Transparent appearance'
    ],
    applications: [
      'Clear labels',
      'No-label-look applications',
      'Bottle labels'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC'],
    technicalSpecifications: {
      '20 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '25 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '30 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
    },
    defaultThickness: '30 MIC',
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NLC clear label film'
  },

  {
    id: 'nlv',
    code: 'NLV',
    img: 'white-bopp-film-roll.png',
    gallery: [
      'white-bopp-film-roll.png',
      'white-application-1.jpg',
      'white-application-2.jpg',
      'white-application-3.jpg'
    ],
    category: 'Label Films',
    name: 'NLV — Label White Voided Film',
    shortName: 'Label White Voided Film',
    desc: 'White voided BOPP film designed for label applications requiring an opaque white appearance.',
    overview:
      'NLV is a white voided film developed for label applications where opacity, lightweight construction and a white appearance are required.',
    tags: [
      'White',
      'Voided',
      'Label film'
    ],
    applications: [
      'Pressure-sensitive labels',
      'Wrap-around labels',
      'Product labels'
    ],
    thicknesses: ['38 MIC', '47 MIC'],
    technicalSpecifications: {
      '38 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '47 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
    },
    defaultThickness: '38 MIC',
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NLV white voided label film'
  },

  {
    id: 'nnc',
    code: 'NNC',
    img: 'clear-bopp-film-roll.png',
    gallery: [
      'clear-bopp-film-roll.png',
      'clear-application-1.jpg',
      'clear-application-2.jpg',
      'clear-application-3.jpg'
    ],
    category: 'Clear Films',
    name: 'NNC — Clear Non-Sealable',
    shortName: 'Clear Non-Sealable Film',
    desc: 'Transparent BOPP film without heat-sealing functionality.',
    overview:
      'NNC is a clear non-sealable BOPP film intended for applications requiring transparency without a heat-sealable structure.',
    tags: [
      'Clear',
      'Transparent',
      'Non-sealable'
    ],
    applications: [
      'Printing',
      'Lamination',
      'Flexible packaging'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC'],
    technicalSpecifications: {
      '20 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '25 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '30 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
    },
    defaultThickness: '20 MIC',
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NNC clear non-sealable film'
  },

  /*{
    id: 'nrc',
    code: 'NRC',
    img: 'clear-bopp-film-roll.png',
    gallery: [
      'clear-bopp-film-roll.png',
      'clear-application-1.jpg',
      'clear-application-2.jpg',
      'clear-application-3.jpg'
    ],
    category: 'Clear Films',
    name: 'NRC — Clear Release Film',
    shortName: 'Clear Release Film',
    desc: 'Clear release film designed for applications requiring a transparent release surface.',
    overview:
      'NRC is a clear release film intended for applications where a controlled release surface and transparent appearance are required.',
    tags: [
      'Clear',
      'Release film',
      'Transparent'
    ],
    applications: [
      'Release applications',
      'Technical converting',
      'Specialty applications'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC'],
    technicalSpecifications: {
      '20 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '25 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '30 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
    },
    defaultThickness: '30 MIC',
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NRC clear release film'
  },*/

  {
    id: 'nsc',
    code: 'NSC',
    img: 'clear-bopp-film-roll.png',
    gallery: [
      'clear-bopp-film-roll.png',
      'clear-application-1.jpg',
      'clear-application-2.jpg',
      'clear-application-3.jpg'
    ],
    category: 'Heat Sealable Films',
    name: 'NSC — Transparent Clear Heat Sealable',
    shortName: 'Transparent (Clear) Heat Sealable',
    desc: 'Transparent clear BOPP film with heat-sealing capability.',
    overview:
      'NSC is a transparent heat-sealable BOPP film designed for packaging applications where clarity and reliable sealing are required.',
    tags: [
      'Transparent',
      'Clear',
      'Heat sealable'
    ],
    applications: [
      'Flexible packaging',
      'Food packaging',
      'Bag making'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC', '40 MIC'],
    technicalSpecifications: {
      '20 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '25 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '30 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '40 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
    },
    defaultThickness: '25 MIC',
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NSC transparent heat sealable BOPP film'
  },

  {
    id: 'nsh',
    code: 'NSH',
    img: 'clear-bopp-film-roll.png',
    gallery: [
      'clear-bopp-film-roll.png',
      'clear-application-1.jpg',
      'clear-application-2.jpg',
      'clear-application-3.jpg'
    ],
    category: 'Heat Sealable Films',
    name: 'NSH — Clear Heat Sealable',
    shortName: 'Clear Heat Sealable, High C.O.F',
    desc: 'Clear heat-sealable film with high coefficient of friction characteristics.',
    overview:
      'NSH is coextruded BOPP film designed for applications requiring heat sealing together with high C.O.F characteristics. suitable for food packaging and intended specially for puches stacking.',
    tags: [
      'Clear',
      'Heat sealable',
      'High C.O.F'
    ],
    applications: [
      'Packaging',
      'Bag making',
      'High-speed converting'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC', '40 MIC'],
    technicalSpecifications: {
      '20 MIC': {
        unitweight: '18.2',
        yield: '55',
        haze: '≤3.5',
        gloss: '86',
        cof: '≤0.50',
        tensileStrength: '150 / 290',
        elongation: '200 / 50',
        thermalShrinkage: '≤5 / ≤3',
        heatSealRange: '105 - 140'
      },
      '25 MIC': {
        unitweight: '22.7',
        yield: '44',
        haze: '≤3.5',
        gloss: '85',
        cof: '≤0.50',
        tensileStrength: '140 / 290',
        elongation: '200 / 50',
        thermalShrinkage: '≤5 / ≤3',
        heatSealRange: '105 - 140'
      },
      '30 MIC': {
        unitweight: '27.3',
        yield: '36.6',
        haze: '≤3.5',
        gloss: '85',
        cof: '≤0.50',
        tensileStrength: '140 / 290',
        elongation: '200 / 50',
        thermalShrinkage: '≤5 / ≤3',
        heatSealRange: '105 - 140'
      },
      '40 MIC': {
        unitweight: '36.5',
        yield: '27.4',
        haze: '≤3.5',
        gloss: '85',
        cof: '≤0.50',
        tensileStrength: '140 / 290',
        elongation: '200 / 50',
        thermalShrinkage: '≤5 / ≤3',
        heatSealRange: '105 - 140'
      },
    },
    defaultThickness: '25 MIC',
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NSH high C.O.F heat sealable film'
  },

  {
    id: 'nsmm',
    code: 'NSMM',
    img: 'mtz-bopp-film-roll.png',
    gallery: [
      'mtz-bopp-film-roll.png',
      'mtz-application-1.jpg',
      'mtz-application-2.jpg',
      'mtz-application-3.jpg'
    ],
    category: 'Metallized Films',
    name: 'NSMM — Metallized Sealable Film',
    shortName: 'Metallized Sealable Film',
    desc: 'Metallized BOPP film with sealing capability for packaging structures.',
    overview:
      'NSMM is a metallized sealable film designed for packaging structures where the metallized appearance and sealing functionality are required.',
    tags: [
      'Metallized',
      'Sealable',
      'Barrier packaging'
    ],
    applications: [
      'Metallized packaging',
      'Snack packaging',
      'Barrier laminates'
    ],
    thicknesses: ['18 MIC', '20 MIC', '25 MIC', '30 MIC'],
    technicalSpecifications: {
      '18 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '20 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '25 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '30 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
    },
    defaultThickness: '20 MIC',
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NSMM metallized sealable film'
  },

  {
    id: 'nsp',
    code: 'NSP',
    img: 'pearlised-bopp-film-roll.png',
    gallery: [
      'pearlised-bopp-film-roll.png',
      'pearlised-application-1.jpg',
      'pearlised-application-2.jpg',
      'pearlised-application-3.jpg'
    ],
    category: 'White Films',
    name: 'NSP — White Pearlized Sealable Film',
    shortName: 'White Pearlized Sealable Film',
    desc: 'White pearlized BOPP film with heat-sealing capability and a distinctive pearlescent appearance.',
    overview:
      'NSP is a white pearlized sealable BOPP film designed for applications requiring a distinctive pearlized appearance together with sealing functionality.',
    tags: [
      'White',
      'Pearlized',
      'Sealable'
    ],
    applications: [
      'Food packaging',
      'Premium packaging',
      'Flexible packaging'
    ],
    thicknesses: ['25 MIC', '30 MIC', '35 MIC', '40 MIC'],
    technicalSpecifications: {
      '25 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '30 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '35 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '40 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
    },
    defaultThickness: '30 MIC',
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NSP white pearlized sealable film'
  },

  {
    id: 'nsw',
    code: 'NSW',
    img: 'white-bopp-film-roll.png',
    gallery: [
      'white-bopp-film-roll.png',
      'white-application-1.jpg',
      'white-application-2.jpg',
      'white-application-3.jpg'
    ],
    category: 'White Films',
    name: 'NSW — Solid White Sealable',
    shortName: 'Solid White Sealable (Milky)',
    desc: 'Solid white milky BOPP film with heat-sealing capability.',
    overview:
      'NSW is a solid white milky sealable BOPP film developed for applications requiring a white opaque appearance and sealing performance.',
    tags: [
      'Solid white',
      'Milky',
      'Sealable'
    ],
    applications: [
      'Food packaging',
      'Flexible packaging',
      'White packaging structures'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC'],
    technicalSpecifications: {
      '20 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '25 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '30 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
    },
    defaultThickness: '30 MIC',
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NSW solid white sealable film'
  },
  {
    id: 'nvmm',
    code: 'NVMM',
    img: 'mtz-bopp-film-roll.png',
    gallery: [
      'mtz-bopp-film-roll.png',
      'mtz-application-1.jpg',
      'mtz-application-2.jpg',
      'mtz-application-3.jpg'
    ],
    category: 'White Films, Metalized Films',
    name: 'NVMM — Metalized White Voided Film',
    shortName: 'Metalized White Voided Film',
    desc: 'Metalized white voided BOPP film designed for applications requiring an opaque white appearance and lightweight structure.',
    overview:
      'NVMM is a metalized white voided BOPP film intended for applications requiring a white opaque appearance and voided structure.',
    tags: [
      'White',
      'Voided',
      'Opaque'
    ],
    applications: [
      'Labels',
      'Packaging',
      'Specialty applications'
    ],
    thicknesses: ['35 MIC', '40 MIC', '45 MIC'],
    technicalSpecifications: {
      '35 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '40 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
      '45 MIC': {
        unitweight: 'TBD',
        yield: 'TBD',
        haze: 'TBD',
        gloss: 'TBD',
        cof: 'TBD',
        tensileStrength: 'TBD',
        elongation: 'TBD',
        thermalShrinkage: 'TBD',
        heatSealRange: 'TBD'
      },
    },
    defaultThickness: '35 MIC',
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NVMM metalized white voided film'
  }

];


const APPLICATIONS = [
  {
    id: 'food',
    img: 'food&bevrage.jpg',
    name: 'Food Packaging',
    desc: 'Film solutions for flexible packaging applications requiring consistent converting and sealing performance.',
    products: [
      'NSC',
      'NSH',
      'NSMM',
      'NSP',
      'NSW'
    ],
    benefits: [
      'Reliable packaging performance',
      'Multiple clear and white structures',
      'Customizable film specifications'
    ],
    phCap: 'Packaged food using flexible packaging film'
  },

  {
    id: 'labels',
    img: 'lable.png',
    name: 'Labels',
    desc: 'Film solutions for clear, white and specialty label applications.',
    products: [
      'NLC',
      'NLV',
      'NVMM',
      'MATTN',
      'MATTS'
    ],
    benefits: [
      'Clear and opaque options',
      'Multiple thicknesses',
      'Customizable widths and treatments'
    ],
    phCap: 'Product labels applied to bottles or containers'
  },

  {
    id: 'printing',
    img: 'printing.jpg',
    name: 'Printing',
    desc: 'Film structures suitable for printed packaging and label applications.',
    products: [
      'NLC',
      'NNC',
      'NRC',
      'MATTN',
      'MATTS',
      'NSC',
      'NSW'
    ],
    benefits: [
      'Clear and white film options',
      'Surface treatment options',
      'Customizable specifications'
    ],
    phCap: 'Printed flexible packaging film on a converting line'
  },

  {
    id: 'lamination',
    img: 'printing-laminating.png',
    name: 'Lamination',
    desc: 'BOPP film solutions suitable for flexible packaging and multilayer structures.',
    products: [
      'NNC',
      'NRC',
      'NSC',
      'NSH',
      'NSMM',
      'NSP',
      'NSW'
    ],
    benefits: [
      'Wide product selection',
      'Multiple thickness options',
      'Customizable treatment and width'
    ],
    phCap: 'Laminated film structure on converting equipment'
  },

  {
    id: 'industrial',
    img: 'industrial.jpg',
    name: 'Industrial',
    desc: 'Technical film structures for industrial and specialty converting applications.',
    products: [
      'NRC',
      'NNC',
      'NVMM',
      'MATTN'
    ],
    benefits: [
      'Specialized film structures',
      'Customizable specifications',
      'Wide width range'
    ],
    phCap: 'Industrial film application or specialty packaging'
  },

  {
    id: 'specialty',
    img: 'specialty.jpg',
    name: 'Specialty',
    desc: 'Specialized BOPP structures for applications requiring specific optical, sealing or surface characteristics.',
    products: [
      'MATTN',
      'MATTS',
      'NRC',
      'NSMM',
      'NVMM'
    ],
    benefits: [
      'Specialized structures',
      'Custom thickness',
      'Custom width and treatment'
    ],
    phCap: 'Specialty film sample under inspection'
  }
];

const NEWS = [
  {
    type: "news",
    category: "Company",
    date: "Coming soon",
    title: "NODA PLAST expands production capacity",
    desc: "Placeholder summary — replace with real company announcement content.",
    phCap: "Factory news photograph",
    img: "factory-news.png"
  },

  {
    type: "event",
    category: "Exhibition",
    date: "Coming soon",
    title: "NODA PLAST at industry trade exhibition",
    desc: "Meet our team and discover our latest BOPP film solutions at an upcoming industry exhibition.",
    phCap: "Trade exhibition photograph",
    img: "trade-exhibition.png"
  },

  {
    type: "news",
    category: "Technology",
    date: "Coming soon",
    title: "Inside our extrusion and orientation process",
    desc: "Explore how our production processes contribute to consistent film quality and performance.",
    phCap: "Laboratory or technical photograph",
    img: "extrusion-process-technical.png"
  },

  {
    type: "event",
    category: "Company",
    date: "Coming soon",
    title: "NODA PLAST welcomes industry partners",
    desc: "An opportunity to connect with customers, partners, and professionals from the flexible packaging industry.",
    phCap: "Industry meeting photograph",
    img: "industry-meeting.png"
  },

  {
    type: "news",
    category: "Sustainability",
    date: "Coming soon",
    title: "Progress on material efficiency initiatives",
    desc: "Placeholder summary — replace with verified sustainability content.",
    phCap: "Certification or sustainability photograph",
    img: "sustainability-certification.png"
  },

  {
    type: "event",
    category: "Open Day",
    date: "Coming soon",
    title: "NODA PLAST facility open day",
    desc: "A closer look at our production environment, technology, and commitment to quality.",
    phCap: "Factory open day photograph",
    img: "factory-open-day.png"
  },

  {
    type: "news",
    category: "Technology",
    date: "Coming soon",
    title: "Quality lab instrumentation upgrade",
    desc: "Placeholder summary — replace with real technical article content.",
    phCap: "Quality lab instrument photograph",
    img: "quality-lab-instrument-upgrade.png"
  },

  {
    type: "event",
    category: "Training",
    date: "Coming soon",
    title: "Technical training and knowledge sharing",
    desc: "A technical session focused on production processes, quality, and continuous improvement.",
    phCap: "Technical training photograph",
    img: "technical-training.png"
  },

  {
    type: "news",
    category: "Sustainability",
    date: "Coming soon",
    title: "Edge-trim recovery process overview",
    desc: "Placeholder summary — replace with verified sustainability content.",
    phCap: "Material recovery photograph",
    img: "material-recovery-process.png"
  }
];

const CHAT_QA = [
  {
    q: 'What BOPP films do you produce?',
    a: 'We manufacture MATTN, MATTS, NLC, NLV, NNC, NRC, NSC, NSH, NSMM, NSP, NSW and NVMM BOPP films.'
  },

  {
    q: 'What applications do you support?',
    a: 'Our films support food packaging, labels, printing, lamination, industrial and specialty applications.'
  },

  {
    q: 'How is quality controlled?',
    a: 'We take quality seriously and verify product quality throughout the production process before release.'
  },

  {
    q: 'What specifications can I choose?',
    a: 'Customers can select the available film thickness, width and treatment according to the selected film type.'
  },

  {
    q: 'What thicknesses are available?',
    a: 'Available thickness options are 15, 18, 20, 22, 23, 25, 30, 35, 38, 40, 45, 50 and 70 MIC.'
  },

  {
    q: 'What widths are available?',
    a: 'Film widths can be selected from 400 mm up to 2000 mm.'
  },

  {
    q: 'What treatments are available?',
    a: 'Available treatments are ONE SIDE TREATED IN, ONE SIDE TREATED OUT and BOTH SIDE TREATED.'
  },

  {
    q: 'How can I contact sales?',
    a: 'You can reach our sales team at contact@nodaplast-film.com or +213 00 00 00 00, or use the Request a Quote button anytime.'
  },

  {
    q: 'Where is NODA PLAST located?',
    a: 'NODA PLAST FILM is located in the Industrial Zone, Guidjel, Sétif, Algeria (demo address shown in this prototype).'
  }
];
const jobs = [
  {
    category: "Production",
    title: "Production Operator",
    description:
      "Support daily production operations and ensure that manufacturing processes are carried out safely, efficiently, and according to quality requirements.",
    tags: ["Full-time", "Production", "On-site"],
    location: "Sétif, Algeria",
    employment: "Full-time"
  },
  {
    category: "Engineering",
    title: "Process / Production Engineer",
    description:
      "Help optimize production processes, monitor performance, identify improvement opportunities, and support continuous improvement initiatives.",
    tags: ["Full-time", "Engineering", "On-site"],
    location: "Sétif, Algeria",
    employment: "Full-time"
  },
  {
    category: "Quality",
    title: "Quality Control Technician",
    description:
      "Perform quality checks, record technical measurements, support laboratory activities, and help maintain product quality standards.",
    tags: ["Full-time", "Quality", "Laboratory"],
    location: "Sétif, Algeria",
    employment: "Full-time"
  }
];


function renderjobsgrid() {
  const containers = document.querySelectorAll(".careers-jobs");

  containers.forEach(container => {
    container.innerHTML = "";
    jobs.forEach(job => {

      const article = document.createElement("article");
      article.className = "card careers-job";

      article.innerHTML = `
        <div class="careers-job-main">
          <div class="careers-job-category" data-i18n="${job.category}">
            ${job.category}
          </div>
          <h3 data-i18n="${job.title}">
            ${job.title}
          </h3>
          <p data-i18n="${job.description}">
            ${job.description}
          </p>
          <div class="tag-row">
            ${job.tags.map(tag => `
              <span class="tag" data-i18n="${tag}">${tag}</span>
            `).join("")}
          </div>
        </div>

        <div class="careers-job-side">
          <div class="careers-job-detail">
            <span data-i18n="Location">Location</span>
            <strong data-i18n="${job.location}">${job.location}</strong>
          </div>
          <div class="careers-job-detail">
            <span data-i18n="Employment">Employment</span>
            <strong data-i18n="${job.employment}">${job.employment}</strong>
          </div>
          <a
            href="#careers-apply"
            class="btn btn-primary btn-sm"
            data-position="${job.title}"
          >
            <span data-i18n="Apply now">Apply now</span>
          </a>
        </div>
      `;

      container.appendChild(article);
    });

    if (container.id === "career-grid") {
      // Keep the "no vacancies" section exactly as it was
      const noVacancies = document.createElement("div");
      noVacancies.className = "careers-no-vacancies";

      noVacancies.innerHTML = `
      <div class="careers-no-icon">+</div>
      <div>
        <h3 data-i18n="Don't see the right position?">Don't see the right position?</h3>
        <p data-i18n="We are always interested in meeting motivated people. Send us your CV and we will keep your profile in mind for future opportunities.">
          We are always interested in meeting motivated people.
          Send us your CV and we will keep your profile in mind
          for future opportunities.
        </p>
      </div>
      <a href="#careers-apply" class="btn btn-secondary btn-sm">
        <span data-i18n="Send your CV">Send your CV</span>
      </a>
    `;

      container.appendChild(noVacancies);
    }

  });
}

function ph(cap, img) {

  return `
    <div class="ph">
      <img
        src="assets/images/${img}"
        alt="${cap}"
        loading="lazy"
        onerror="this.style.display='none'; this.parentElement.classList.add('image-missing');"
      >
    </div>
  `;
}


/* ============================================================
   SAFE EVENT LISTENER
   ============================================================ */

function on(id, event, callback) {

  const element = document.getElementById(id);

  if (element) {
    element.addEventListener(event, callback);
  }
}

/* ============================================================
   HOME NEWS / EVENTS / JOBS CAROUSEL
   ============================================================ */

function renderHomeNewsCarousel() {

  const track = document.getElementById('homeNewsTrack');

  if (!track) return;


  /*
   * Mix News + Events + Jobs
   */
  const homeItems = [

    ...NEWS.map(item => ({
      ...item,
      contentType: item.type
    })),

    ...jobs.map(job => ({
      ...job,
      contentType: 'job'
    }))

  ];


  /*
   * Create the cards
   */
  const cards = homeItems.map((item, index) => {

    /* NEWS / EVENT */

    if (
      item.contentType === 'news' ||
      item.contentType === 'event'
    ) {

      return `
        <div
          class="card news-card home-news-card"
          data-content-type="${item.contentType}"
        >

          ${ph(item.phCap, item.img)}

          <div class="news-card-body">

            <div class="news-meta">

              <span class="news-cat">
                ${item.contentType === 'event'
          ? '<span data-i18n="Event">Event</span>'
          : `<span data-i18n="${item.category}">${item.category}</span>`}
              </span>

              <span class="news-date" data-i18n="${item.date}">
                ${item.date}
              </span>

            </div>

            <h3 data-i18n="${item.title}">${item.title}</h3>

            <p data-i18n="${item.desc}">${item.desc}</p>

            <button
              type="button"
              class="btn-ghost home-content-btn"
              data-content-type="${item.contentType}"
            >

              ${item.contentType === 'event'
          ? '<span data-i18n="View event">View event</span>'
          : '<span data-i18n="Read more">Read more</span>'}

              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
              >
                <path
                  d="M9 1l4 4-4 4M1 5h11"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>

            </button>

          </div>

        </div>
      `;
    }


    /* JOB */

    return `
      <div
        class="card news-card home-news-card home-job-card"
        data-content-type="job"
      >

        <div class="ph job-placeholder">
          <div class="job-icon">+</div>
        </div>

        <div class="news-card-body">

          <div class="news-meta">

            <span class="news-cat" data-i18n="Job Opportunity">
              Job Opportunity
            </span>

            <span class="news-date" data-i18n="${item.location}">
              ${item.location}
            </span>

          </div>

          <h3 data-i18n="${item.title}">${item.title}</h3>

          <p data-i18n="${item.description}">${item.description}</p>

          <button
            type="button"
            class="btn-ghost home-content-btn"
            data-content-type="job"
          >
            <span data-i18n="View position">View position</span>

            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
            >
              <path
                d="M9 1l4 4-4 4M1 5h11"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>

          </button>

        </div>

      </div>
    `;

  }).join('');


  /*
   * Duplicate cards for infinite rotation
   * Same technique used by Applications carousel
   */
  track.innerHTML = cards + cards;


  /*
   * Navigation when a card is clicked
   */
  track.querySelectorAll('.home-content-btn').forEach(button => {

    button.addEventListener('click', function (e) {

      e.stopPropagation();

      const type =
        this.getAttribute('data-content-type');


      if (type === 'news') {

        openNewsSection('news');

      }

      else if (type === 'event') {

        openNewsSection('event');

      }

      else if (type === 'job') {

        openNewsSection('job');

      }

    });

  });

}

function renderNewsGrid(containerId, count, type = "news") {

  const el = document.getElementById(containerId);

  if (!el) return;

  const items = NEWS
    .filter(item => item.type === type)
    .slice(0, count);

  el.innerHTML = items.map(n => `

    <div class="card news-card">

      ${ph(n.phCap, n.img)}

      <div class="news-card-body">

        <div class="news-meta">
          <span class="news-cat" data-i18n="${n.category}">${n.category}</span>
          <span class="news-date" data-i18n="${n.date}">${n.date}</span>
        </div>

        <h3 data-i18n="${n.title}">${n.title}</h3>

        <p data-i18n="${n.desc}">${n.desc}</p>

        <span class="btn-ghost">
          <span data-i18n="Read more">Read more</span>

          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
          >
            <path
              d="M9 1l4 4-4 4M1 5h11"
              stroke="currentColor"
              stroke-width="1.5"
            />
          </svg>

        </span>

      </div>

    </div>

  `).join('');
}


/* ============================================================
   PRODUCT GRID
   ============================================================ */

function renderProductGrid() {

  const grid =
    document.getElementById('productGrid');

  if (!grid) return;


  const searchElement =
    document.getElementById('productSearch');


  const term =
    searchElement
      ? (searchElement.value || '').toLowerCase().trim()
      : '';


  const filtered = PRODUCTS.filter(p => {

    const matchesSearch =
      !term ||

      p.name.toLowerCase().includes(term) ||

      p.code.toLowerCase().includes(term) ||

      p.shortName.toLowerCase().includes(term) ||

      p.category.toLowerCase().includes(term) ||

      p.tags.some(
        t => t.toLowerCase().includes(term)
      );


    return matchesSearch;

  });


  const noResults =
    document.getElementById('noResults');


  if (noResults) {

    noResults.style.display =
      filtered.length === 0
        ? 'block'
        : 'none';

  }


  grid.innerHTML = filtered.map(p => `

    <div class="card pgrid-card">

      ${ph(p.phCap, p.img)}

      <div class="pgrid-card-body">

        <div class="pcat">
          ${p.code} · <span data-i18n="${p.category}">${p.category}</span>
        </div>

        <h3 data-i18n="${p.name}">
          ${p.name}
        </h3>

        <p data-i18n="${p.desc}">
          ${p.desc}
        </p>

        <div class="tag-row">

          ${p.tags.map(t => `
            <span class="tag" data-i18n="${t}">${t}</span>
          `).join('')}

        </div>


        <div
          style="
            margin:16px 0;
            padding:12px;
            background:var(--surface-soft,#f6f7f8);
            border-radius:10px;
            font-size:13px;
          "
        >

          <div style="margin-bottom:5px;">
            <strong data-i18n="Thickness:">Thickness:</strong>
            ${p.defaultThickness}
          </div>

        </div>


        <div class="pgrid-actions">

          <button
            class="btn btn-primary btn-sm"
            data-nav="product-detail"
            data-product="${p.id}"
          >
            <span data-i18n="View Details">View Details</span>
          </button>

        </div>

      </div>

    </div>

  `).join('');
}


/* ============================================================
   PRODUCT DETAIL
   ============================================================ */

function renderProductDetail(id) {

  const p =
    PRODUCTS.find(x => x.id === id) ||
    PRODUCTS[0];


  const pdCategory =
    document.getElementById('pdCategory');

  const pdName =
    document.getElementById('pdName');

  const pdDesc =
    document.getElementById('pdDesc');

  const pdOverview =
    document.getElementById('pdOverview');


  if (pdCategory)
    pdCategory.textContent =
      `${p.code} · ${i18nText(p.category)}`;


  if (pdName)
    pdName.textContent =
      i18nText(p.name);


  if (pdDesc)
    pdDesc.textContent =
      i18nText(p.shortName);


  if (pdOverview)
    pdOverview.textContent =
      i18nText(p.overview);


  /* ============================================================
   PRODUCT DETAIL IMAGE GALLERY
   ============================================================ */

  const pdImageImg =
    document.getElementById('pdImageImg');

  const pdGalleryThumbs =
    document.getElementById('pdGalleryThumbs');


  if (pdImageImg) {

    /*
     * Get exactly 4 gallery images.
     * Fall back to the normal product image if
     * no gallery has been defined.
     */
    const galleryImages =
      Array.isArray(p.gallery) && p.gallery.length
        ? p.gallery.slice(0, 4)
        : [p.img];


    /*
     * Current main image index
     */
    let currentIndex = 0;


    /*
     * Autoplay timer
     */
    let autoplayTimer = null;


    /*
     * Whether autoplay is currently paused
     */
    let galleryPaused = false;


    /* ==========================================================
       RENDER GALLERY
       ========================================================== */

    function renderGallery() {

      if (!galleryImages.length) return;


      /*
       * Current main image
       */
      const currentImage =
        galleryImages[currentIndex];


      /*
       * Set main image
       */
      pdImageImg.src =
        'assets/images/' + currentImage;

      pdImageImg.alt =
        p.phCap || p.name;


      /*
       * Create thumbnails from ALL OTHER images.
       *
       * The current main image is NEVER displayed
       * as a thumbnail.
       */
      const thumbnailIndexes =
        galleryImages
          .map((image, index) => index)
          .filter(index => index !== currentIndex);


      /*
       * Always show maximum 3 thumbnails
       */
      if (pdGalleryThumbs) {

        pdGalleryThumbs.innerHTML =
          thumbnailIndexes
            .slice(0, 3)
            .map(index => `

            <button
              type="button"
              class="pd-gallery-thumb"
              data-gallery-index="${index}"
              aria-label="View product image ${index + 1}"
            >

              <img
                src="assets/images/${galleryImages[index]}"
                alt="${p.phCap || p.name} image ${index + 1}"
                loading="lazy"
              >

            </button>

          `)
            .join('');


        /*
         * Add click events
         */
        pdGalleryThumbs
          .querySelectorAll('.pd-gallery-thumb')
          .forEach(thumb => {

            thumb.addEventListener('click', () => {

              const newIndex =
                Number(
                  thumb.dataset.galleryIndex
                );


              if (
                Number.isNaN(newIndex) ||
                newIndex === currentIndex
              ) {
                return;
              }


              /*
               * Pause autoplay when user clicks
               */
              pauseGallery();


              /*
               * Change image
               */
              changeGalleryImage(newIndex);


              /*
               * Restart autoplay after user interaction
               */
              restartGalleryAutoplay();

            });

          });

      }

    }


    /* ==========================================================
       CHANGE MAIN IMAGE
       ========================================================== */

    function changeGalleryImage(newIndex) {

      if (
        newIndex < 0 ||
        newIndex >= galleryImages.length
      ) {
        return;
      }


      if (newIndex === currentIndex) {
        return;
      }


      /*
       * Fade the current image out
       */
      pdImageImg.classList.add(
        'gallery-changing'
      );


      setTimeout(() => {

        /*
         * IMPORTANT:
         *
         * Only change the current index.
         *
         * renderGallery() then automatically removes
         * the new main image from the 3 thumbnails
         * and adds the previous main image to them.
         */
        currentIndex = newIndex;


        renderGallery();


        /*
         * Fade the new image in
         */
        requestAnimationFrame(() => {

          pdImageImg.classList.remove(
            'gallery-changing'
          );

        });

      }, 180);

    }


    /* ==========================================================
       AUTOPLAY
       ========================================================== */

    function startGalleryAutoplay() {

      clearInterval(autoplayTimer);


      /*
       * Change image every 4.5 seconds
       */
      autoplayTimer = setInterval(() => {

        if (galleryPaused) {
          return;
        }


        /*
         * Go to the next image
         */
        const nextIndex =
          (currentIndex + 1) %
          galleryImages.length;


        changeGalleryImage(nextIndex);

      }, 4500);

    }


    /* ==========================================================
       PAUSE
       ========================================================== */

    function pauseGallery() {

      galleryPaused = true;

    }


    /* ==========================================================
       RESUME
       ========================================================== */

    function resumeGallery() {

      galleryPaused = false;

    }


    /* ==========================================================
       RESTART AUTOPLAY AFTER CLICK
       ========================================================== */

    function restartGalleryAutoplay() {

      clearInterval(autoplayTimer);


      /*
       * Wait 4.5 seconds after the user's click
       * before automatically changing again.
       */
      autoplayTimer = setInterval(() => {

        if (galleryPaused) {
          return;
        }


        const nextIndex =
          (currentIndex + 1) %
          galleryImages.length;


        changeGalleryImage(nextIndex);

      }, 4500);

    }


    /* ==========================================================
       HOVER PAUSE
       ========================================================== */

    const galleryElement =
      document.querySelector('.pd-gallery');


    if (galleryElement) {

      /*
       * Pause while mouse is over the gallery
       */
      galleryElement.addEventListener(
        'mouseenter',
        () => {
          pauseGallery();
        }
      );


      /*
       * Resume when mouse leaves
       */
      galleryElement.addEventListener(
        'mouseleave',
        () => {
          resumeGallery();
        }
      );

    }


    /* ==========================================================
       INITIAL RENDER
       ========================================================== */

    renderGallery();


    /*
     * Start automatic rotation
     */
    startGalleryAutoplay();

  }


  const pdTags =
    document.getElementById('pdTags');


  if (pdTags) {

    pdTags.innerHTML =
      p.tags
        .map(t => `
          <span class="tag" data-i18n="${t}">${t}</span>
        `)
        .join('');

  }
  const pdKeyProps =
    document.getElementById('pdKeyProps');


  if (pdKeyProps) {

    pdKeyProps.innerHTML = `

      <span class="tag">
        ${p.code}
      </span>

      <span class="tag" data-i18n="${p.shortName}">
        ${p.shortName}
      </span>

    `;

  }


  const pdApplications =
    document.getElementById('pdApplications');


  if (pdApplications) {

    pdApplications.innerHTML =
      p.applications
        .map(a => `<li>${a}</li>`)
        .join('');

  }

  /*
   * Store the currently selected product before rendering
   * thickness-dependent controls/specifications.
   */
  window.currentSelectedProduct = p;
  renderTechnicalSpecifications(p);

}

function getProductThicknesses(product) {
  if (!product || !Array.isArray(product.thicknesses)) return [];
  return product.thicknesses.map(value => String(value).trim()).filter(Boolean);
}


function getTechnicalSpecification(product, selectedThickness) {
  if (!product) return null;

  const thickness = getSelectedThicknessForProduct(product, selectedThickness);
  const dictionary = product.technicalSpecifications || {};
  const direct = dictionary[thickness];

  if (direct) {
    return {
      thickness,
      unitweight: direct.unitweight ?? 'N/A',
      yield: direct.yield ?? 'N/A',
      haze: direct.haze ?? 'N/A',
      gloss: direct.gloss ?? 'N/A',
      cof: direct.cof ?? 'N/A',
      tensileStrength: direct.tensileStrength ?? 'N/A',
      elongation: direct.elongation ?? 'N/A',
      thermalShrinkage: direct.thermalShrinkage ?? 'N/A',
      heatSealRange: direct.heatSealRange ?? 'N/A'
    };
  }

  return {
    thickness,
    unitweight: 'N/A',
    yield: 'N/A',
    haze: 'N/A',
    gloss: 'N/A',
    cof: 'N/A',
    tensileStrength: 'N/A',
    elongation: 'N/A',
    thermalShrinkage: 'N/A',
    heatSealRange: 'N/A'
  };
}
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


function populateProductDetailThickness(product, selectedThickness) {
  const select = document.getElementById('productThickness');
  if (!select || !product) return '';

  const allowed = getProductThicknesses(product);
  const selected = getSelectedThicknessForProduct(product, selectedThickness);

  select.innerHTML = '<option value="" data-i18n="Select thickness">Select thickness</option>' +
    allowed.map(value => `
      <option value="${escapeHtml(value)}" ${value === selected ? 'selected' : ''}>
        ${escapeHtml(value)}
      </option>
    `).join('');

  select.value = selected;
  return selected;
}
function updateSelectedProductSpecs(product) {

  const output =
    document.getElementById(
      'selectedProductSpecs'
    );


  if (!output) return;


  const specs =
    getSelectedProductSpecifications();


  output.innerHTML = `

    <div
      style="
        display:flex;
        flex-wrap:wrap;
        gap:8px;
        align-items:center;
      "
    >

      <strong
        style="
          margin-right:4px;
        "
      >
        <span data-i18n="Selected:">Selected:</span>
      </strong>

      <span class="tag">
        ${product.code}
      </span>

      <span class="tag">
        ${specs.thickness}
      </span>

      <span class="tag">
        ${specs.width}
      </span>

      <span class="tag">
        ${specs.treatment}
      </span>

    </div>

  `;


  /*
   * Also update the old specification
   * fields on the page.
   */

  const pdThickness =
    document.getElementById('pdThickness');

  const pdWidth =
    document.getElementById('pdWidth');

  const pdTreatment =
    document.getElementById('pdTreatment');


  if (pdThickness)
    pdThickness.textContent =
      specs.thickness;


  if (pdWidth)
    pdWidth.textContent =
      specs.width;


  if (pdTreatment)
    pdTreatment.textContent =
      specs.treatment;


  /*
   * Save selection globally so Request Quote
   * can use it.
   */

  window.currentProductConfiguration = {

    productId: product.id,

    code: product.code,

    name: product.name,

    thickness: specs.thickness,

    width: specs.width,

    treatment: specs.treatment

  };

}
function renderTechnicalSpecifications(product) {
  const table = document.querySelector('#page-product-detail .spec-table');

  if (!table || !product) return;

  const tbody = table.querySelector('tbody');

  if (!tbody) return;

  const thicknesses = getProductThicknesses(product);

  const specifications = [
    {
      label: 'Thickness',
      unit: 'µm',
      key: 'thickness',
      format: thickness => thickness.replace(' MIC', '')
    },
    {
      label: 'Unit weight',
      unit: 'g/m²',
      key: 'unitweight'
    },
    {
      label: 'Yield',
      unit: 'm²/kg',
      key: 'yield'
    },
    {
      label: 'Haze',
      unit: '%',
      key: 'haze'
    },
    {
      label: 'Gloss',
      unit: '%',
      key: 'gloss'
    },
    {
      label: 'COF',
      unit: '-',
      key: 'cof'
    },
    {
      label: 'Tensile Strength (MD / TD)',
      unit: 'MPa',
      key: 'tensileStrength'
    },
    {
      label: 'Elongation at Break (MD / TD)',
      unit: '%',
      key: 'elongation'
    },
    {
      label: 'Thermal Shrinkage (MD / TD)',
      unit: '%',
      key: 'thermalShrinkage'
    },
    {
      label: 'Heat Seal Range',
      unit: '°C',
      key: 'heatSealRange'
    }
  ];

  tbody.innerHTML = specifications.map(spec => {

    const values = thicknesses.map(thickness => {

      if (spec.key === 'thickness') {
        return spec.format(thickness);
      }

      const thicknessSpecs =
        product.technicalSpecifications?.[thickness] || {};

      return thicknessSpecs[spec.key] ?? 'TBD';

    });

    return `
      <tr>
        <td>${spec.label}</td>
        <td>${spec.unit}</td>

        ${values.map(value => `
          <td>${escapeHtml(String(value))}</td>
        `).join('')}

      </tr>
    `;

  }).join('');

  const note = table.parentElement?.querySelector('.form-note');

  if (note) {
    note.textContent =
      'Placeholder values only — replace with approved NODA PLAST laboratory data before publication.';
  }
}

function updateProductDetailSpecifications(product, selectedThickness) {
  if (!product) return;

  const selected = populateProductDetailThickness(product, selectedThickness);
  const specs = renderTechnicalSpecifications(product, selected);

  const thickness = document.getElementById('productThickness');
  if (thickness && thickness.value !== selected) {
    thickness.value = selected;
  }

  updateSelectedProductSpecs(product);

  window.currentProductConfiguration = {
    ...(window.currentProductConfiguration || {}),
    productId: product.id,
    code: product.code,
    name: product.name,
    thickness: selected,
    technicalSpecifications: specs
  };
}

function renderApplicationsGrid() {

  const grid =
    document.getElementById('appxGrid');

  if (!grid) return;


  grid.innerHTML =
    APPLICATIONS.map((a, i) => `

      <div
        class="card appx-card"
        data-app-id="${a.id}"
      >

        ${ph(a.phCap, a.img)}

        <div class="app-card-body">

          <div class="app-card-num">
            0${i + 1}
          </div>

          <h3 data-i18n="${a.name}">${a.name}</h3>

          <p data-i18n="${a.desc}">${a.desc}</p>

          <span class="btn-ghost">
            <span data-i18n="View details">View details</span>

            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
            >
              <path
                d="M9 1l4 4-4 4M1 5h11"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>

          </span>

        </div>

      </div>

    `).join('');


  grid
    .querySelectorAll('.appx-card')
    .forEach(card => {

      card.addEventListener(
        'click',
        () => {
          openApplicationDetail(
            card.getAttribute('data-app-id')
          );
        }
      );

    });

}

function renderHomeApplicationsCarousel() {
  const track = document.getElementById('homeApplicationsTrack');

  if (!track) return;

  const cards = APPLICATIONS.map((a, i) => `
    <div class="card app-card home-app-card">
      ${ph(a.phCap, a.img)}

      <div class="app-card-body">
        <div class="app-card-num">0${i + 1}</div>

        <h3 data-i18n="${a.name}">${a.name}</h3>

        <p data-i18n="${a.desc}">${a.desc}</p>

        <button
          type="button"
          class="btn-ghost app-explore-btn"
          data-nav="applications"
          data-app-id="${a.id}"
        >
          <span data-i18n="Explore application">Explore application</span>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path
              d="M9 1l4 4-4 4M1 5h11"
              stroke="currentColor"
              stroke-width="1.5"
            />
          </svg>
        </button>
      </div>
    </div>
  `).join('');

  // Duplicate the cards for infinite scrolling
  track.innerHTML = cards + cards;

  track.querySelectorAll('.app-explore-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const appId = btn.getAttribute('data-app-id');

      showPage('applications', {
        app: appId
      });
    });
  });
}


/* ============================================================
   APPLICATION DETAIL
   ============================================================ */

function openApplicationDetail(id) {

  const a =
    APPLICATIONS.find(
      x => x.id === id
    );


  if (!a) return;


  const detail =
    document.getElementById('appxDetail');


  if (!detail) return;


  detail.innerHTML = `

    ${ph(a.phCap, a.img)}

    <div>

      <div class="eyebrow" data-i18n="${a.name}">
        ${a.name}
      </div>

      <h3
        style="
          font-size:24px;
          margin-bottom:12px;
        "
      >
        <span data-i18n="${a.desc}">${a.desc}</span>
      </h3>


      <p
        style="
          font-size:13px;
          font-weight:700;
          text-transform:uppercase;
          letter-spacing:.05em;
          color:var(--text-gray);
          margin-bottom:10px;
        "
      >
        <span data-i18n="Recommended film ranges">Recommended film ranges</span>
      </p>


      <div
        class="tag-row"
        style="margin-bottom:20px;"
      >

        ${a.products
      .map(pr => `
            <span class="tag">${pr}</span>
          `)
      .join('')}

      </div>


      <p
        style="
          font-size:13px;
          font-weight:700;
          text-transform:uppercase;
          letter-spacing:.05em;
          color:var(--text-gray);
          margin-bottom:10px;
        "
      >
        <span data-i18n="Benefits">Benefits</span>
      </p>


      <ul class="bullet-list">

        ${a.benefits
      .map(b => `<li data-i18n="${b}">${b}</li>`)
      .join('')}

      </ul>


      <button
        class="btn btn-primary"
        style="margin-top:24px;"
        data-nav="products"
      >
        <span data-i18n="View suitable films →">View suitable films →</span>
      </button>

    </div>

  `;


  detail.classList.add('show');


  detail.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  });

}


/* ============================================================
   ROUTER
   ============================================================ */

function showPage(id, opts) {

  opts = opts || {};

  document
    .querySelectorAll('.page')
    .forEach(p => {
      p.classList.remove('active');
    });

  const target =
    document.getElementById(
      'page-' + id
    );

  if (target)
    target.classList.add('active');

  document
    .querySelectorAll('.nav-link[data-nav]')
    .forEach(l => {

      l.classList.toggle(
        'active',
        l.getAttribute('data-nav') === id
      );

    });

  window.scrollTo({
    top: 0,
    behavior: 'auto'
  });

  const mobilePanel =
    document.getElementById(
      'mobilePanel'
    );

  if (mobilePanel)
    mobilePanel.classList.remove('open');


  /* ==========================================================
     PRODUCT DETAIL
     ========================================================== */

  if (
    id === 'product-detail' &&
    opts.product
  ) {

    renderProductDetail(
      opts.product
    );

  }


  /* ==========================================================
     APPLICATION DETAIL
     ========================================================== */

  if (
    id === 'applications' &&
    opts.app
  ) {

    setTimeout(
      () => {
        openApplicationDetail(
          opts.app
        );
      },
      50
    );

  }


  /* ==========================================================
     PRODUCT FILTER
     ========================================================== */

  if (
    id === 'products' &&
    opts.productFilter
  ) {

    const searchInput =
      document.getElementById(
        'productSearch'
      );

    if (searchInput) {

      searchInput.value =
        opts.productFilter;

      renderProductGrid();

      searchInput.focus();

    }

  }

}

/* ============================================================
   GLOBAL NAVIGATION
   ============================================================ */

document.addEventListener('click', function (e) {
  const navEl = e.target.closest('[data-nav]');
  if (!navEl) return;

  e.preventDefault();

  showPage(navEl.getAttribute('data-nav'), {
    product: navEl.getAttribute('data-product'),
    app: navEl.getAttribute('data-app'),
    productFilter: navEl.getAttribute('data-product-filter')
  });
});


/* ============================================================
   DATASHEET
   ============================================================ */

function openDatasheetNotice(productId) {
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    showToast('Technical Data Sheet not found.');
    return;
  }

  const pdfPath = `assets/tds/${product.code}.pdf`;

  window.open(pdfPath, '_blank');
}


/* ============================================================
   TOAST
   ============================================================ */

let toastTimer;


function showToast(msg) {

  let t =
    document.getElementById(
      'nodaToast'
    );


  if (!t) {

    t =
      document.createElement(
        'div'
      );


    t.id =
      'nodaToast';


    t.style.cssText = `
      position:fixed;
      left:50%;
      bottom:34px;
      transform:translateX(-50%);
      background:var(--dark);
      color:#fff;
      padding:14px 22px;
      border-radius:10px;
      font-size:13.5px;
      z-index:1200;
      box-shadow:0 14px 30px -10px rgba(0,0,0,.4);
      max-width:360px;
      text-align:center;
    `;


    document.body.appendChild(t);

  }


  t.textContent =
    msg;


  t.style.opacity =
    '1';


  clearTimeout(toastTimer);


  toastTimer =
    setTimeout(
      () => {
        t.style.transition =
          'opacity .4s';

        t.style.opacity =
          '0';
      },
      2600
    );

}


/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */

on(
  'hamburgerBtn',
  'click',
  () => {
    const panel =
      document.getElementById(
        'mobilePanel'
      );

    if (panel)
      panel.classList.add('open');
  }
);


on(
  'closeMobileBtn',
  'click',
  () => {
    const panel =
      document.getElementById(
        'mobilePanel'
      );

    if (panel)
      panel.classList.remove('open');
  }
);


/* ============================================================
   FORM HELPERS
   ============================================================ */

function setFormLoading(form, isLoading) {
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  if (!button) return;

  if (isLoading) {
    if (!button.dataset.defaultText) {
      button.dataset.defaultText = button.textContent.trim();
    }
    button.disabled = true;
    button.classList.add('form-loading');
    button.textContent = i18nText('Sending...');
  } else {
    button.disabled = false;
    button.classList.remove('form-loading');
    button.textContent = button.dataset.defaultText || button.textContent;
  }
}


function showFormError(form, message) {
  if (!form) return;
  const error =
    form.querySelector('.form-error') ||
    form.parentElement?.querySelector('.form-error');
  if (!error) return;
  error.textContent = message || '';
  error.classList.toggle('show', Boolean(message));
}


function clearFormError(form) {
  showFormError(form, '');
}


function getFormValues(form) {
  return Object.fromEntries(new FormData(form).entries());
}


/* ============================================================
CAREERS / CV APPLICATION
============================================================ */

async function handleCareerFormSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  clearFormError(form);

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const cvInput = document.getElementById('career-cv');
  const cvFile = cvInput ? cvInput.files[0] : null;

  if (!cvFile) {
    showFormError(form, 'Please upload your CV before submitting.');
    return;
  }

  // Allowed file types
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  const allowedExtensions = ['pdf', 'doc', 'docx'];
  const fileExtension = cvFile.name.split('.').pop().toLowerCase();

  if (
    !allowedTypes.includes(cvFile.type) &&
    !allowedExtensions.includes(fileExtension)
  ) {
    showFormError(form, 'Please upload your CV as a PDF, DOC, or DOCX file.');
    return;
  }

  // File size limit: 5 MB
  const maxFileSize = 5 * 1024 * 1024;
  if (cvFile.size > maxFileSize) {
    showFormError(form, 'Your CV is too large. Please upload a file smaller than 5 MB.');
    return;
  }

  setFormLoading(form, true);

  try {
    await sendCareerApplication(form);

    form.style.display = 'none';

    const success = document.getElementById('career-success');
    if (success) success.classList.add('show');

    form.reset();
    clearFormError(form);

  } catch (error) {
    showFormError(
      form,
      error.message ||
      'We could not send your application. Please try again or contact HR directly.'
    );
  } finally {
    setFormLoading(form, false);
  }
}
/*

* Connect the Careers form
  */
on(
  'career-form',
  'submit',
  handleCareerFormSubmit
);

/* ============================================================
CAREERS — APPLY NOW BUTTONS
============================================================ */

document.addEventListener('click', function (e) {

  const applyButton =
    e.target.closest('[data-position]');

  if (!applyButton) return;

  const position =
    applyButton.getAttribute('data-position');

  const positionSelect =
    document.getElementById('career-position');

  if (positionSelect && position) {
    positionSelect.value = position;
  }

  /*
  
  * Scroll to application form
    */
  const applicationSection =
    document.getElementById('careers-apply');

  if (applicationSection) {


    applicationSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });


  }

});

/* ============================================================
CAREERS — CV FILE NAME
============================================================ */

const careerCvInput =
  document.getElementById('career-cv');

if (careerCvInput) {

  careerCvInput.addEventListener('change', function () {


    const file = this.files[0];

    const fileText =
      document.querySelector(
        '.careers-file-text strong'
      );

    const fileSubtext =
      document.querySelector(
        '.careers-file-text small'
      );

    if (!file) {

      if (fileText) {
        fileText.textContent = i18nText('Upload your CV');
      }

      if (fileSubtext) {
        fileSubtext.textContent =
          i18nText('PDF, DOC or DOCX');
      }

      return;
    }

    if (fileText) {
      fileText.textContent = file.name;
    }

    if (fileSubtext) {

      const sizeMB =
        (file.size / (1024 * 1024)).toFixed(2);

      fileSubtext.textContent =
        `${sizeMB} ${i18nText('MB • Ready to upload')}`;

    }


  });

}

/* ============================================================
CAREERS — RESET APPLICATION
============================================================ */

function resetCareerForm() {

  const form =
    document.getElementById('career-form');

  const success =
    document.getElementById('career-success');

  const cvInput =
    document.getElementById('career-cv');

  if (form) {
    form.reset();
    form.style.display = '';
    clearFormError(form);
  }

  if (cvInput) {
    cvInput.value = '';
  }

  if (success) {
    success.classList.remove('show');
  }

}

on(
  'career-again-btn',
  'click',
  resetCareerForm
);

on('homeContactForm', 'submit', handleHomeContactFormSubmit);

async function handleHomeContactFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  clearFormError(form);

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const values = getFormValues(form);

  const payload = {
    type: 'contact',
    name: values.name || '',
    company: values.company || '',
    email: values.email || '',
    phone: values.phone || '',
    country: values.country || '',
    message: values.message || '',
    website: values.website || ''
  };

  setFormLoading(form, true);

  try {
    await sendEmailRequest(payload);

    const wrap = document.getElementById('homeContactFormWrap');
    const success = document.getElementById('homeSuccess');

    if (wrap) {
      wrap.style.display = 'none';
    }

    if (success) {
      success.classList.add('show');
    }

    form.reset();
    clearFormError(form);

  } catch (error) {
    showFormError(
      form,
      error.message ||
      'We could not send your message. Please try again or contact us directly at contact@nodaplast-film.com.'
    );
  } finally {
    setFormLoading(form, false);
  }
}


/* ============================================================
   HOME CONTACT - SEND ANOTHER
   ============================================================ */

on('homeContactAgainBtn', 'click', () => {

  const form = document.getElementById('homeContactForm');
  const wrap = document.getElementById('homeContactFormWrap');
  const success = document.getElementById('homeSuccess');

  if (form) {
    form.reset();
    clearFormError(form);
  }

  if (success) {
    success.classList.remove('show');
  }

  if (wrap) {
    wrap.style.display = 'block';
  }
});


/* ============================================================
   CONTACT PAGE FORM
   ============================================================ */

on('contactForm', 'submit', handleContactFormSubmit);

async function handleContactFormSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  clearFormError(form);

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const values = getFormValues(form);

  const payload = {
    type: 'contact',
    name: values.name || '',
    company: values.company || '',
    email: values.email || '',
    phone: values.phone || '',
    country: values.country || '',
    message: values.message || '',
    website: values.website || ''
  };

  setFormLoading(form, true);

  try {
    await sendEmailRequest(payload);

    const wrap = document.getElementById('contactFormWrap');
    const success = document.getElementById('contactSuccess');

    if (wrap) {
      wrap.style.display = 'none';
    }

    if (success) {
      success.classList.add('show');
    }

    form.reset();
    clearFormError(form);

  } catch (error) {
    showFormError(
      form,
      error.message ||
      'We could not send your message. Please try again or contact us directly at contact@nodaplast-film.com.'
    );
  } finally {
    setFormLoading(form, false);
  }
}


/* ============================================================
   CONTACT PAGE - SEND ANOTHER
   ============================================================ */

on('contactAgainBtn', 'click', () => {

  const form = document.getElementById('contactForm');
  const wrap = document.getElementById('contactFormWrap');
  const success = document.getElementById('contactSuccess');

  if (form) {
    form.reset();
    clearFormError(form);
  }

  if (success) {
    success.classList.remove('show');
  }

  if (wrap) {
    wrap.style.display = 'block';
  }
});
/* ============================================================
   PRODUCT FILTERS
   ============================================================ */

document.addEventListener(
  'change',
  (e) => {

    if (
      e.target.classList.contains(
        'pf'
      )
    ) {

      renderProductGrid();

    }

  }
);


document.addEventListener(
  'input',
  (e) => {

    if (
      e.target.id ===
      'productSearch'
    ) {

      renderProductGrid();

    }

  }
);


/* ============================================================
   CHATBOT
   ============================================================ */

const chatFab =
  document.getElementById(
    'chatFab'
  );


const chatPanel =
  document.getElementById(
    'chatPanel'
  );


const chatBody =
  document.getElementById(
    'chatBody'
  );


const chatInputRow =
  document.getElementById(
    'chatInputRow'
  );


function chatInit() {

  if (!chatBody) return;


  chatBody.innerHTML = `

    <div class="msg msg-bot" data-i18n="Hello! I'm the NODA PLAST assistant. Ask me about our BOPP films, applications, quality or specifications.">
      Hello! I'm the NODA PLAST assistant.
      Ask me about our BOPP films,
      applications, quality or specifications.
    </div>

  `;


  const qWrap =
    document.createElement(
      'div'
    );


  qWrap.className =
    'quick-qs';


  CHAT_QA.forEach(item => {

    const b =
      document.createElement(
        'button'
      );


    b.type =
      'button';


    b.className =
      'quick-q';


    b.textContent =
      i18nText(item.q);


    b.addEventListener(
      'click',
      () => {
        chatAsk(
          item.q,
          item.a
        );
      }
    );


    qWrap.appendChild(b);

  });


  chatBody.appendChild(
    qWrap
  );

}


function chatAsk(
  question,
  answerOverride
) {

  if (!chatBody) return;


  const userMsg =
    document.createElement(
      'div'
    );


  userMsg.className =
    'msg msg-user';


  userMsg.textContent =
    i18nText(question);


  chatBody.appendChild(
    userMsg
  );


  const typing =
    document.createElement(
      'div'
    );


  typing.className =
    'typing';


  typing.innerHTML =
    '<span></span><span></span><span></span>';


  chatBody.appendChild(
    typing
  );


  chatBody.scrollTop =
    chatBody.scrollHeight;


  setTimeout(
    () => {

      typing.remove();


      const match =
        CHAT_QA.find(
          x =>
            x.q.toLowerCase() ===
            question.toLowerCase()
        );


      /*
       * Also allow simple product searches.
       */

      let answer =
        answerOverride;


      if (!answer && match) {

        answer =
          match.a;

      }


      if (!answer) {

        const product =
          PRODUCTS.find(
            p =>
              question
                .toLowerCase()
                .includes(
                  p.code.toLowerCase()
                )
          );


        if (product) {

          answer =
            `${product.code} — ${product.shortName}. Available thicknesses: ${product.thicknesses.join(', ')}. Width range: ${product.widthMin}–${product.widthMax} mm. Available treatments: ${product.treatments.join(', ')}.`;

        }

      }


      if (!answer) {

        answer =
          "Thanks for your question. This prototype uses a fixed set of answers. Try asking about our film types, thicknesses, widths, treatments, applications or contact information.";

      }


      const botMsg =
        document.createElement(
          'div'
        );


      botMsg.className =
        'msg msg-bot';


      botMsg.textContent =
        i18nText(answer);


      chatBody.appendChild(
        botMsg
      );


      chatBody.scrollTop =
        chatBody.scrollHeight;

    },
    700 + Math.random() * 400
  );

}


if (chatFab) {

  chatFab.addEventListener(
    'click',
    () => {

      if (chatPanel)
        chatPanel.classList.add('open');


      if (
        chatBody &&
        !chatBody.innerHTML
      ) {

        chatInit();

      }

    }
  );

}


on(
  'chatCloseBtn',
  'click',
  () => {

    if (chatPanel)
      chatPanel.classList.remove(
        'open'
      );

  }
);


if (chatInputRow) {

  chatInputRow.addEventListener(
    'submit',
    function (e) {

      e.preventDefault();


      const input =
        document.getElementById(
          'chatInput'
        );


      if (!input) return;


      const val =
        input.value.trim();


      if (!val) return;


      chatAsk(val);


      input.value = '';

    }
  );

}


/* ============================================================
   PRODUCT SPECIFICATION HELPERS
   ============================================================ */

/*
 * These functions are exposed globally in case
 * the HTML needs to use them later.
 */

window.NODA_PRODUCTS =
  PRODUCTS;

window.NODA_THICKNESS_OPTIONS =
  THICKNESS_OPTIONS;

window.NODA_WIDTH_OPTIONS =
  WIDTH_OPTIONS;

window.NODA_TREATMENT_OPTIONS =
  TREATMENT_OPTIONS;

function openNewsSection(type) {

  if (type === 'job') {

    /*
     * JOB → CAREERS
     */
    const careersPage =
      document.getElementById('page-careers');

    if (!careersPage) return;

    document.querySelectorAll('.page')
      .forEach(page => {
        page.classList.remove('active');
      });

    careersPage.classList.add('active');

    document.querySelectorAll('.nav-link')
      .forEach(link => {
        link.classList.remove('active');
      });

    const careersNav =
      document.querySelector(
        '[data-nav="careers"]'
      );

    if (careersNav) {
      careersNav.classList.add('active');
    }

    return;
  }


  /*
   * NEWS / EVENT → NEWS PAGE
   */
  const newsPage =
    document.getElementById('page-news');

  if (!newsPage) return;

  document.querySelectorAll('.page')
    .forEach(page => {
      page.classList.remove('active');
    });

  newsPage.classList.add('active');

  document.querySelectorAll('.nav-link')
    .forEach(link => {
      link.classList.remove('active');
    });

  const newsNav =
    document.querySelector(
      '[data-nav="news"]'
    );

  if (newsNav) {
    newsNav.classList.add('active');
  }


  /*
   * Scroll to the correct subsection
   */
  const target =
    type === 'event'
      ? document.getElementById('eventsGrid')
      : document.getElementById('newsGrid');

  if (target) {

    setTimeout(() => {

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }, 100);

  }

}

/* ============================================================
   INITIALIZATION
   ============================================================ */

function initializeNodaWebsite() {
    // Home News
  renderHomeNewsCarousel();

  setupInfiniteCarousel({
    trackId: 'homeNewsTrack',
    prevId: 'homeNewsPrev',
    nextId: 'homeNewsNext',
    cardSelector: '.home-news-card',
    speed: 0.5
  });


  // Products
  renderProductGrid();


  // Applications
  renderApplicationsGrid();

  renderHomeApplicationsCarousel();

  setupInfiniteCarousel({
    trackId: 'homeApplicationsTrack',
    prevId: 'homeAppPrev',
    nextId: 'homeAppNext',
    cardSelector: '.home-app-card',
    speed: 0.5
  });

  // News page/section
  renderNewsGrid('newsGrid', NEWS.length, 'news');

  // Events page/section
  renderNewsGrid('eventsGrid', NEWS.length, 'event');

  // Job opportunities
  renderjobsgrid();

  on('pdDatasheetBtn', 'click', () => {
    const product = window.currentSelectedProduct;
    if (product) openDatasheetNotice(product.id);
  });

  on('pdDatasheetBtn2', 'click', () => {
    const product = window.currentSelectedProduct;
    if (product) openDatasheetNotice(product.id);
  });
}



if (
  document.readyState ===
  'loading'
) {

  document.addEventListener(
    'DOMContentLoaded',
    initializeNodaWebsite
  );

}
else {

  initializeNodaWebsite();

}

/* ================= DYNAMIC HERO VALUES ================= */

const HERO_VALUES = [
  {
    name: "RELIABILITY",
    image: "Noda.png",
    eyebrow: "A partner you can rely on",
    title: "Reliable film.<br>Reliable results.",
    text: "Dependable BOPP film solutions supported by consistent quality, technical expertise and customer-focused service."
  },
  {
    name: "INNOVATION",
    image: "printing-laminating.png",
    eyebrow: "Innovation in every application",
    title: "Engineered film.<br>Ready for what comes next.",
    text: "Film solutions developed for modern packaging, printing, lamination and demanding converting applications."
  },
  {
    name: "SUSTAINABILITY",
    image: "recycling logo.png",
    eyebrow: "Performance with purpose",
    title: "Better film.<br>More responsible choices.",
    text: "We focus on recyclable film solutions, efficient processes and responsible approaches to packaging performance."
  },
  {
    name: "TECHNOLOGY",
    image: "bopp-production-line-wide.jpg",
    eyebrow: "Advanced film technology",
    title: "Technology<br>behind every roll.",
    text: "Modern production technologies and precision processes designed to deliver consistent BOPP film performance."
  },
  {
    name: "QUALITY",
    image: "quality-labrotory.png",
    eyebrow: "Quality you can measure",
    title: "Quality<br>without compromise.",
    text: "Consistent BOPP film performance built around controlled production, laboratory testing and reliable specifications."
  },
];

let heroValueIndex = 0;
let heroInterval;

function changeHeroValue(index) {
  const value = HERO_VALUES[index];

  const heroBg = document.getElementById("heroBg");
  const heroBadge = document.getElementById("heroBadge");
  const heroEyebrow = document.getElementById("heroEyebrow");
  const heroTitle = document.getElementById("heroTitle");
  const heroText = document.getElementById("heroText");

  if (!heroBg) return;

  heroBg.style.opacity = "0";

  setTimeout(() => {
    heroBg.style.backgroundImage =
      `url("assets/images/${value.image}")`;

    /* Store the original English value in data-i18n so translation.js
       can translate it now and whenever the language is toggled. */
    if (heroBadge) {
      heroBadge.dataset.i18n = value.name;
      heroBadge.textContent = i18nText(value.name);
    }

    if (heroEyebrow) {
      heroEyebrow.dataset.i18n = value.eyebrow;
      heroEyebrow.textContent = i18nText(value.eyebrow);
    }

    if (heroTitle) {
      heroTitle.dataset.i18n = value.title;
      heroTitle.innerHTML = i18nText(value.title);
    }

    if (heroText) {
      heroText.dataset.i18n = value.text;
      heroText.textContent = i18nText(value.text);
    }

    heroBg.style.opacity = "1";
  }, 400);
}

/* Exposed globally so translation.js can re-apply translations
   when the user clicks the FR/EN toggle while on the hero. */
window.refreshHeroTranslations = function () {
  if (typeof heroValueIndex === 'number' && typeof changeHeroValue === 'function') {
    changeHeroValue(heroValueIndex);
  }
};

function startHeroAutoChange() {
  heroInterval = setInterval(() => {
    heroValueIndex =
      (heroValueIndex + 1) % HERO_VALUES.length;

    changeHeroValue(heroValueIndex);
  }, 5000);
}

function goToHero(index) {
  clearInterval(heroInterval);
  heroValueIndex = (index + HERO_VALUES.length) % HERO_VALUES.length;
  changeHeroValue(heroValueIndex);
  startHeroAutoChange();
}

document.addEventListener("DOMContentLoaded", () => {
  changeHeroValue(0);
  startHeroAutoChange();

  const heroPrev = document.getElementById("heroPrev");
  const heroNext = document.getElementById("heroNext");

  if (heroPrev) heroPrev.addEventListener("click", () => goToHero(heroValueIndex - 1));
  if (heroNext) heroNext.addEventListener("click", () => goToHero(heroValueIndex + 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goToHero(heroValueIndex - 1);
    if (e.key === "ArrowRight") goToHero(heroValueIndex + 1);
  });
});

/* ============================================================
   INFINITE CAROUSEL WITH AUTO SCROLL + ARROW NAVIGATION
   ============================================================ */

function setupInfiniteCarousel({
  trackId,
  prevId,
  nextId,
  cardSelector,
  speed = 0.5
}) {
  const track = document.getElementById(trackId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);

  if (!track || !prev || !next) return;

  let position = 0;
  let paused = false;
  let lastTime = performance.now();

  /*
   * Get the width of one card + gap
   */
  function getStep() {
    const card = track.querySelector(cardSelector);

    if (!card) return 0;

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.gap) || 0;

    return card.offsetWidth + gap;
  }

  /*
   * Because the cards are duplicated:
   *
   * [1][2][3][4] [1][2][3][4]
   *
   * half of the track is one complete loop.
   */
  function getLoopWidth() {
    return track.scrollWidth / 2;
  }

  /*
   * Keep position inside the duplicated section.
   */
  function normalizePosition() {
    const loopWidth = getLoopWidth();

    if (!loopWidth) return;

    if (position >= loopWidth) {
      position -= loopWidth;
    }

    if (position < 0) {
      position += loopWidth;
    }
  }

  /*
   * Apply the position.
   */
  function render() {
    normalizePosition();

    track.style.transform =
      `translate3d(${-position}px, 0, 0)`;
  }

  /*
   * NEXT ARROW
   * Move exactly one card.
   */
  next.addEventListener('click', () => {
    const step = getStep();

    if (!step) return;

    paused = true;

    position += step;

    render();

    /*
     * Resume automatic scrolling
     * after the card transition.
     */
    setTimeout(() => {
      paused = false;
      lastTime = performance.now();
    }, 500);
  });

  /*
   * PREVIOUS ARROW
   * Move exactly one card backward.
   */
  prev.addEventListener('click', () => {
    const step = getStep();

    if (!step) return;

    paused = true;

    position -= step;

    render();

    setTimeout(() => {
      paused = false;
      lastTime = performance.now();
    }, 500);
  });

  /*
   * AUTOMATIC SCROLLING
   */
  function animate(time) {
    const delta = time - lastTime;
    lastTime = time;

    if (!paused) {
      position += speed * (delta / 16.67);

      render();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  /*
   * Pause while mouse is over carousel.
   */
  const carousel = track.parentElement;

  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      paused = true;
    });

    carousel.addEventListener('mouseleave', () => {
      paused = false;
      lastTime = performance.now();
    });
  }
}

/* ============================================================
   CAREERS FORM — EMAIL SUBMISSION
   Converts the CV file to base64 and sends the whole
   application through the shared /api/send-email endpoint.
   ============================================================ */

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // result looks like: "data:application/pdf;base64,JVBERi0x..."
      const base64 = String(reader.result).split(',')[1];
      resolve(base64);
    };

    reader.onerror = () => reject(
      new Error('Could not read the CV file. Please try again.')
    );

    reader.readAsDataURL(file);
  });
}


async function sendCareerApplication(form) {
  const cvInput = document.getElementById('career-cv');
  const cvFile = cvInput ? cvInput.files[0] : null;

  if (!cvFile) {
    throw new Error('Please upload your CV before submitting.');
  }

  // Convert CV to base64 so it can travel inside the JSON payload
  const cvBase64 = await fileToBase64(cvFile);

  const values = getFormValues(form);

  const payload = {
    type: 'career',
    name: values.name || '',
    email: values.email || '',
    phone: values.phone || '',
    position: values.position || 'General application',
    message: values.message || '',
    consent: values.consent ? 'Yes' : 'No',

    // Attachment info for the backend
    attachment: {
      filename: cvFile.name,
      mimeType: cvFile.type || 'application/octet-stream',
      content: cvBase64
    }
  };

  return sendEmailRequest(payload);
}