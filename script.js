/* ============================================================
   EMAIL API
   ============================================================ */

const EMAIL_API_ENDPOINT = '/api/send-email';

async function sendEmailRequest(payload) {
  const response = await fetch(EMAIL_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  let result = {};
  try {
    result = await response.json();
  } catch (_) {
    throw new Error('The server returned an invalid response.');
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Unable to send request.');
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
    img: 'matt-film.png',
    category: 'Matt Films',
    name: 'MATTN — Matt Film',
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
    img: 'matt-sealable-film.png',
    category: 'Matt Films',
    name: 'MATTS — Matt Film',
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
    img: 'label-clear-film.png',
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
    img: 'label-white-voided-film.png',
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
    img: 'clear-non-sealable-film.png',
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

  {
    id: 'nrc',
    code: 'NRC',
    img: 'clear-release-film.png',
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
  },

  {
    id: 'nsc',
    code: 'NSC',
    img: 'transparent-clear-heat-sealable-film.png',
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
    img: 'high-cof-heat-sealable-film.png',
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
    img: 'metallized-sealable-film.png',
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
    img: 'white-pearlized-sealable-film.png',
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
    img: 'solid-white-sealable-film.png',
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
    img: 'metalized-white-voided-film.png',
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


/* ============================================================
   NEWS
   ============================================================ */

const NEWS = [
  {
    category: 'Company',
    date: 'PLACEHOLDER DATE',
    title: 'NODA PLAST expands production capacity',
    desc: 'Placeholder summary — replace with real company announcement content.',
    phCap: 'Factory news photograph',
    img: 'factory-news.png'
  },

  {
    category: 'Technology',
    date: 'PLACEHOLDER DATE',
    title: 'Inside our extrusion and orientation process',
    desc: 'Placeholder summary — replace with real technical article content.',
    phCap: 'Laboratory or technical photograph',
    img: 'extrusion-process-technical.png'
  },

  {
    category: 'Sustainability',
    date: 'PLACEHOLDER DATE',
    title: 'Progress on material efficiency initiatives',
    desc: 'Placeholder summary — replace with verified sustainability content.',
    phCap: 'Certification or sustainability photograph',
    img: 'sustainability-certification.png'
  },

  {
    category: 'Company',
    date: 'PLACEHOLDER DATE',
    title: 'NODA PLAST at industry trade exhibition',
    desc: 'Placeholder summary — replace with real company announcement content.',
    phCap: 'Trade exhibition photograph',
    img: 'trade-exhibition.png'
  },

  {
    category: 'Technology',
    date: 'PLACEHOLDER DATE',
    title: 'Quality lab instrumentation upgrade',
    desc: 'Placeholder summary — replace with real technical article content.',
    phCap: 'Quality lab instrument photograph',
    img: 'quality-lab-instrument-upgrade.png'
  },

  {
    category: 'Sustainability',
    date: 'PLACEHOLDER DATE',
    title: 'Edge-trim recovery process overview',
    desc: 'Placeholder summary — replace with verified sustainability content.',
    phCap: 'Material recovery photograph',
    img: 'material-recovery-process.png'
  }
];


/* ============================================================
   CHATBOT
   ============================================================ */

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


/* ============================================================
   HELPERS
   ============================================================ */

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
   NEWS GRID
   ============================================================ */

function renderNewsGrid(containerId, count) {

  const el = document.getElementById(containerId);

  if (!el) return;

  el.innerHTML = NEWS.slice(0, count).map(n => `

    <div class="card news-card">

      ${ph(n.phCap, n.img)}

      <div class="news-card-body">

        <div class="news-meta">
          <span class="news-cat">${n.category}</span>
          <span class="news-date">${n.date}</span>
        </div>

        <h3>${n.title}</h3>

        <p>${n.desc}</p>

        <span class="btn-ghost">
          Read more

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
          ${p.code} · ${p.category}
        </div>

        <h3>
          ${p.name}
        </h3>

        <p>
          ${p.desc}
        </p>

        <div class="tag-row">

          ${p.tags.map(t => `
            <span class="tag">${t}</span>
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
            <strong>Thickness:</strong>
            ${p.defaultThickness}
          </div>

        </div>


        <div class="pgrid-actions">

          <button
            class="btn btn-primary btn-sm"
            data-nav="product-detail"
            data-product="${p.id}"
          >
            View Details
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
      `${p.code} · ${p.category}`;


  if (pdName)
    pdName.textContent =
      p.name;


  if (pdDesc)
    pdDesc.textContent =
      p.shortName;


  if (pdOverview)
    pdOverview.textContent =
      p.overview;


  const pdImageImg =
    document.getElementById('pdImageImg');


  if (pdImageImg) {

    pdImageImg.src =
      'assets/images/' + p.img;

    pdImageImg.alt =
      p.phCap;

  }


  const pdTags =
    document.getElementById('pdTags');


  if (pdTags) {

    pdTags.innerHTML =
      p.tags
        .map(t => `
          <span class="tag">${t}</span>
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

      <span class="tag">
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

  initializeProductDetailThicknessListener();
  updateProductDetailSpecifications(p, p.defaultThickness);

}


/* ============================================================
   TECHNICAL SPECIFICATIONS
   ============================================================ */

/*
 * PLACEHOLDER TECHNICAL SPECIFICATIONS
 * ------------------------------------
 * Every product stores its specification values inside the product
 * dictionary, grouped by thickness. Replace the placeholder numbers
 * below with the approved NODA PLAST laboratory values.
 *
 * Structure:
 * product.technicalSpecifications['20 MIC']
 * product.technicalSpecifications['25 MIC']
 * etc.
 */
function getProductThicknesses(product) {
  if (!product || !Array.isArray(product.thicknesses)) return [];
  return product.thicknesses.map(value => String(value).trim()).filter(Boolean);
}

function normalizeThickness(value) {
  if (value === null || value === undefined) return '';
  const raw = String(value).trim().toUpperCase();
  if (!raw) return '';
  if (/MIC$/.test(raw)) return raw;
  const number = raw.match(/\d+(?:\.\d+)?/);
  return number ? `${number[0]} MIC` : raw;
}

function getSelectedThicknessForProduct(product, requestedThickness) {
  const allowed = getProductThicknesses(product);
  if (!allowed.length) return '';

  const requested = normalizeThickness(requestedThickness);
  const matchingAllowed = allowed.find(value => normalizeThickness(value) === requested);
  if (matchingAllowed) return matchingAllowed;

  const defaultThickness = normalizeThickness(product.defaultThickness);
  const matchingDefault = allowed.find(value => normalizeThickness(value) === defaultThickness);
  return matchingDefault || allowed[0];
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

function populateProductDetailThickness(product, selectedThickness) {
  const select = document.getElementById('productThickness');
  if (!select || !product) return '';

  const allowed = getProductThicknesses(product);
  const selected = getSelectedThicknessForProduct(product, selectedThickness);

  select.innerHTML = '<option value="">Select thickness</option>' +
    allowed.map(value => `
      <option value="${escapeHtml(value)}" ${value === selected ? 'selected' : ''}>
        ${escapeHtml(value)}
      </option>
    `).join('');

  select.value = selected;
  return selected;
}

function renderTechnicalSpecifications(product, selectedThickness) {
  const table = document.querySelector('#page-product-detail .spec-table');
  if (!table || !product) return;

  const tbody = table.querySelector('tbody');
  if (!tbody) return;

  const selected = getSelectedThicknessForProduct(product, selectedThickness);
  const specs = getTechnicalSpecification(product, selected);

  // Keep the thickness dropdown in the table. The previous version replaced
  // the entire tbody with plain text, which deleted #productThickness after
  // populateProductDetailThickness() had created it.
  const thicknessOptions = getProductThicknesses(product)
    .map(value => `
      <option value="${escapeHtml(value)}" ${value === selected ? 'selected' : ''}>
        ${escapeHtml(value)}
      </option>
    `).join('');

  tbody.innerHTML = `
    <tr>
      <td>Thickness</td>
      <td>µm</td>
      <td class="tbd">
        <select id="productThickness" name="thickness" aria-label="Select product thickness">
          <option value="">Select thickness</option>
          ${thicknessOptions}
        </select>
      </td>
    </tr>
    <tr>
      <td>unitweight</td>
      <td>g/m²</td>
      <td>${escapeHtml(String(specs.unitweight))}</td>
    </tr>
    <tr>
      <td>yield</td>
      <td>m²/kg</td>
      <td>${escapeHtml(String(specs.yield))}</td>
    </tr>
    <tr>
      <td>Haze</td>
      <td>%</td>
      <td>${escapeHtml(String(specs.haze))}</td>
    </tr>
    <tr>
      <td>Gloss</td>
      <td>%</td>
      <td>${escapeHtml(String(specs.gloss))}</td>
    </tr>
    <tr>
      <td>cof</td>
      <td>-</td>
      <td>${escapeHtml(String(specs.cof))}</td>
    </tr>
    <tr>
      <td>Tensile Strength (MD / TD)</td>
      <td>MPa</td>
      <td>${escapeHtml(String(specs.tensileStrength))}</td>
    </tr>
    <tr>
      <td>Elongation at Break (MD / TD)</td>
      <td>%</td>
      <td>${escapeHtml(String(specs.elongation))}</td>
    </tr>
    <tr>
      <td>Thermal Shrinkage (MD / TD)</td>
      <td>%</td>
      <td>${escapeHtml(String(specs.thermalShrinkage))}</td>
    </tr>
    <tr>
      <td>Heat Seal Range</td>
      <td>°C</td>
      <td>${escapeHtml(String(specs.heatSealRange))}</td>
    </tr>
  `;

  const note = table.parentElement?.querySelector('.form-note');
  if (note) {
    note.textContent =
      'Placeholder values only — replace with approved NODA PLAST laboratory data before publication.';
  }

  // renderTechnicalSpecifications() recreates the select, so bind the change
  // handler to the newly created element.
  initializeProductDetailThicknessListener();

  return specs;
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

function initializeProductDetailThicknessListener() {
  const select = document.getElementById('productThickness');
  if (!select || select.dataset.thicknessListenerBound === 'true') return;

  select.addEventListener('change', () => {
    const product = window.currentSelectedProduct;
    if (!product) return;

    const selected = getSelectedThicknessForProduct(product, select.value);
    select.value = selected;
    renderTechnicalSpecifications(product, selected);
    updateSelectedProductSpecs(product);

    const specs = getTechnicalSpecification(product, selected);
    window.currentProductConfiguration = {
      ...(window.currentProductConfiguration || {}),
      productId: product.id,
      code: product.code,
      name: product.name,
      thickness: selected,
      technicalSpecifications: specs
    };
  });

  select.dataset.thicknessListenerBound = 'true';
}

/* ============================================================
   APPLICATIONS GRID
   ============================================================ */

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

          <h3>${a.name}</h3>

          <p>${a.desc}</p>

          <span class="btn-ghost">
            View details

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

      <div class="eyebrow">
        ${a.name}
      </div>

      <h3
        style="
          font-size:24px;
          margin-bottom:12px;
        "
      >
        ${a.desc}
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
        Recommended film ranges
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
        Benefits
      </p>


      <ul class="bullet-list">

        ${a.benefits
      .map(b => `<li>${b}</li>`)
      .join('')}

      </ul>


      <button
        class="btn btn-primary"
        style="margin-top:24px;"
        data-nav="products"
      >
        View suitable films →
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
    button.textContent = 'Sending...';
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
/* ============================================================
   QUOTE FORM SUBMISSION
   ============================================================ */

async function handleQuoteFormSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  clearFormError(form);

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const values = getFormValues(form);
  const payload = {
    type: 'quote',
    name: values.name || '',
    company: values.company || '',
    email: values.email || '',
    phone: values.phone || '',
    country: values.country || '',
    application: values.application || '',
    message: values.message || '',
    website: values.website || ''
  };

  setFormLoading(form, true);

  try {
    await sendEmailRequest(payload);

    const wrap = document.getElementById('homeQuoteFormWrap');
    const success = document.getElementById('homeQuoteSuccess');

    form.reset();
    if (wrap) wrap.style.display = 'none';
    if (success) success.classList.add('show');
  } catch (error) {
    showFormError(
      form,
      error.message ||
      'We could not send your request. Please try again or contact us directly at contact@nodaplast-film.com.'
    );
  } finally {
    setFormLoading(form, false);
  }
}

on('quoteForm', 'submit', handleQuoteFormSubmit);

/* ============================================================
CAREERS / CV APPLICATION
============================================================ */

async function handleCareerFormSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;

  clearFormError(form);

  // Check required fields
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const cvInput = document.getElementById('career-cv');
  const cvFile = cvInput ? cvInput.files[0] : null;

  // Make sure a CV was selected
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

  const fileExtension =
    cvFile.name.split('.').pop().toLowerCase();

  if (
    !allowedTypes.includes(cvFile.type) &&
    !allowedExtensions.includes(fileExtension)
  ) {
    showFormError(
      form,
      'Please upload your CV as a PDF, DOC, or DOCX file.'
    );
    return;
  }

  // File size limit: 5 MB
  const maxFileSize = 5 * 1024 * 1024;

  if (cvFile.size > maxFileSize) {
    showFormError(
      form,
      'Your CV is too large. Please upload a file smaller than 5 MB.'
    );
    return;
  }

  /*
  
  * FormData automatically includes:
  * name
  * email
  * phone
  * position
  * message
  * consent
  * cv
    */
  const formData = new FormData(form);

  // Add application type for the backend
  formData.append('type', 'career');

  setFormLoading(form, true);

  try {


    const response = await fetch('/api/career-application', {
      method: 'POST',
      body: formData
    });

    let result = {};

    try {
      result = await response.json();
    } catch (_) {
      throw new Error(
        'The server returned an invalid response.'
      );
    }

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
        'Unable to submit your application.'
      );
    }

    /*
     * Hide form
     */
    form.style.display = 'none';

    /*
     * Show success message
     */
    const success =
      document.getElementById('career-success');

    if (success) {
      success.classList.add('show');
    }

    /*
     * Reset form after successful submission
     */
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
        fileText.textContent = 'Upload your CV';
      }

      if (fileSubtext) {
        fileSubtext.textContent =
          'PDF, DOC or DOCX';
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
        `${sizeMB} MB • Ready to upload`;

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

/*

* Optional "Send another application" button
* if you add:
*
* <button id="career-again-btn">
* Send another application
* </button>

*/

on(
  'career-again-btn',
  'click',
  resetCareerForm
);

/* ============================================================
   CONTACT FORM SUBMISSION
   ============================================================ */

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

    if (wrap) wrap.style.display = 'none';
    if (success) success.classList.add('show');
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

on('contactForm', 'submit', handleContactFormSubmit);




on('contactAgainBtn', 'click', () => {
  const form = document.getElementById('contactForm');
  const wrap = document.getElementById('contactFormWrap');
  const success = document.getElementById('contactSuccess');
  if (form) {
    form.reset();
    clearFormError(form);
  }
  if (success) success.classList.remove('show');
  if (wrap) wrap.style.display = 'block';
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

    <div class="msg msg-bot">
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
      item.q;


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
    question;


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
        answer;


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


/* ============================================================
   INITIALIZATION
   ============================================================ */

function initializeNodaWebsite() {
  renderNewsGrid('homeNewsGrid', 3);
  renderProductGrid();
  renderApplicationsGrid();

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
    name: "QUALITY",
    image: "quality-labrotory.png",
    eyebrow: "Quality you can measure",
    title: "Quality<br>without compromise.",
    text: "Consistent BOPP film performance built around controlled production, laboratory testing and reliable specifications."
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
    name: "RELIABILITY",
    image: "nodaplast.jpg",
    eyebrow: "A partner you can rely on",
    title: "Reliable film.<br>Reliable results.",
    text: "Dependable BOPP film solutions supported by consistent quality, technical expertise and customer-focused service."
  },
  {
  name: "TECHNOLOGY",
  image: "bopp-production-line-wide.jpg",
  eyebrow: "Advanced film technology",
  title: "Technology<br>behind every roll.",
  text: "Modern production technologies and precision processes designed to deliver consistent BOPP film performance."
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

    heroBadge.textContent = value.name;
    heroEyebrow.textContent = value.eyebrow;
    heroTitle.innerHTML = value.title;
    heroText.textContent = value.text;

    heroBg.style.opacity = "1";
  }, 400);
}

function startHeroAutoChange() {
  heroInterval = setInterval(() => {
    heroValueIndex =
      (heroValueIndex + 1) % HERO_VALUES.length;

    changeHeroValue(heroValueIndex);
  }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  changeHeroValue(0);
  startHeroAutoChange();
});