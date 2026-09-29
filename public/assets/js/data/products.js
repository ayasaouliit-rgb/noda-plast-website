import { TREATMENT_OPTIONS } from './options.js';

export const SPECIFICATION_DEFINITIONS = {
  thickness: {
    label: 'Thickness',
    unit: 'µm',
    format: value => String(value).replace(' MIC', '')
  },
  unitweight: {
    label: 'Unit Weight',
    unit: 'g/m²'
  },
  yield: {
    label: 'Yield',
    unit: 'm²/kg'
  },
  density: {
    label: 'Density',
    unit: 'g/cm³'
  },
  wettingTension: {
    label: 'Wetting Tension',
    unit: 'mN/m'
  },
  whiteness: {
    label: 'Whiteness Index',
    unit: '-'
  },
  opacity: {
    label: 'Opacity',
    unit: '%'
  },
  transmittance: {
    label: 'Transmittance',
    unit: '%'
  },
  haze: {
    label: 'Haze',
    unit: '%'
  },
  gloss: {
    label: 'Gloss 45°',
    unit: '%'
  },
  cof: {
    label: 'COF Dynamic F-F (U-U)',
    unit: '-'
  },
  opticalDensity: {
    label: 'Optical Density',
    unit: '-'
  },
  otr: {
    label: 'OTR',
    unit: 'cc/(m²·day·atm)'
  },
  wvtr: {
    label: 'WVTR',
    unit: 'g/(m²·day·atm)'
  },
  tensileStrength: {
    label: 'Tensile Strength (MD / TD)',
    unit: 'MPa'
  },
  elongation: {
    label: 'Elongation at Break (MD / TD)',
    unit: '%'
  },
  modulus: {
    label: 'Modulus of Elasticity (MD / TD)',
    unit: 'MPa'
  },
  thermalShrinkage: {
    label: 'Thermal Shrinkage (MD / TD)',
    unit: '%'
  },
  heatSealRange: {
    label: 'Heat Seal Range',
    unit: '°C'
  },
  sealStrength: {
    label: 'Seal Strength',
    unit: 'N/15mm'
  }
};

export const PRODUCTS = [
  /*{
    id: 'mattn',
    code: 'MATTN',
    img: 'matt-bopp-film-roll.png',
    gallery: [
      'matt-bopp-film-roll.png',
      'mattn/mattn (1).png',
      'mattn/mattn (2).png',
      'mattn/mattn (3).png'
    ],
    category: 'Matt Films',
    name: 'MATTN — Matt Film side Non Sealable',
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
      "20 MIC": {
        unitweight: "TBD",
        yield: "TBD",
        haze: "TBD",
        gloss: "TBD",
        cof: "TBD",
        tensileStrength: "TBD",
        elongation: "TBD",
        thermalShrinkage: "TBD",
        heatSealRange: "TBD",
      },
      "25 MIC": {
        unitweight: "TBD",
        yield: "TBD",
        haze: "TBD",
        gloss: "TBD",
        cof: "TBD",
        tensileStrength: "TBD",
        elongation: "TBD",
        thermalShrinkage: "TBD",
        heatSealRange: "TBD",
      },
      "30 MIC": {
        unitweight: "TBD",
        yield: "TBD",
        haze: "TBD",
        gloss: "TBD",
        cof: "TBD",
        tensileStrength: "TBD",
        elongation: "TBD",
        thermalShrinkage: "TBD",
        heatSealRange: "TBD",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "haze", "gloss", "cof", "tensileStrength", "elongation", "thermalShrinkage", "heatSealRange"],
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'MATTN matt BOPP film'
  },*/

  {
    id: 'matts',
    code: 'MATTS',
    img: 'matt-bopp-film-roll.png',
    gallery: [
      'matt-bopp-film-roll.png',
      'matts/matts (1).png',
      'matts/matts (2).png',
      'matts/matts (3).png'
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
      "20 MIC": {
        unitweight: "17.6",
        yield: "56.8",
        wettingTension: "≥ 38",
        gloss: "10",
        haze: "72",
        cof: "≤ 0.30",
        tensileStrength: "130 / 260",
        elongation: "150 / 50",
        modulus: "2000 / 3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
        sealStrength: "> 2",
        heatSealRange: "125-140",
      },
      "25 MIC": {
        unitweight: "22.2",
        yield: "45.5",
        wettingTension: "≥ 38",
        gloss: "10",
        haze: "72",
        cof: "≤ 0.30",
        tensileStrength: "130 / 260",
        elongation: "150 / 50",
        modulus: "2000 / 3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
        sealStrength: "> 2",
        heatSealRange: "125-140",
      },
      "30 MIC": {
        unitweight: "26.7",
        yield: "37.5",
        wettingTension: "≥ 38",
        gloss: "10",
        haze: "72",
        cof: "≤ 0.30",
        tensileStrength: "130 / 260",
        elongation: "150 / 50",
        modulus: "2000 / 3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
        sealStrength: "> 2",
        heatSealRange: "125-140",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "wettingTension", "gloss", "haze", "cof", "tensileStrength", "elongation", "modulus", "thermalShrinkage", "sealStrength", "heatSealRange"],
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
      'nlc/nlc (1).jpg',
      'nlc/nlc (2).jpg',
      'nlc/nlc (3).jpg'
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
      "20 MIC": {
        unitweight: "18.2",
        yield: "54.9",
        wettingTension: "≥ 38",
        opacity: "1.8",
        haze: "1.6",
        gloss: "95",
        cof: "≤ 0.30",
        tensileStrength: "160 / 290",
        elongation: "180 / 60",
        modulus: "2000 / 3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
      "25 MIC": {
        unitweight: "22.7",
        yield: "44",
        wettingTension: "≥ 38",
        opacity: "2.2",
        haze: "1.7",
        gloss: "94",
        cof: "≤ 0.30",
        tensileStrength: "160 / 290",
        elongation: "180 / 60",
        modulus: "2000 / 3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
      "30 MIC": {
        unitweight: "27.3",
        yield: "36.6",
        wettingTension: "≥ 38",
        opacity: "2.5",
        haze: "1.8",
        gloss: "93",
        cof: "≤ 0.30",
        tensileStrength: "160 / 290",
        elongation: "180 / 60",
        modulus: "2000 / 3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "wettingTension", "opacity", "haze", "gloss", "cof", "tensileStrength", "elongation", "modulus", "thermalShrinkage"],
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
      'nlv/nlv (1).jpg',
      'nlv/nlv (2).jpg',
      'nlv/nlv (3).jpg'
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
      "38 MIC": {
        unitweight: "23.6",
        yield: "42.4",
        density: "0.68",
        wettingTension: "≥ 38",
        whiteness: "90",
        opacity: "81",
        gloss: "90",
        cof: "≤ 0.30",
        tensileStrength: "103 / 141",
        elongation: "140 / 32",
        modulus: "1080 / 2000",
      },
      "47 MIC": {
        unitweight: "32",
        yield: "31.25",
        density: "0.68",
        wettingTension: "≥ 38",
        whiteness: "92",
        opacity: "83",
        gloss: "90",
        cof: "≤ 0.30",
        tensileStrength: "103 / 141",
        elongation: "140 / 32",
        modulus: "1080 / 2000",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "density", "wettingTension", "whiteness", "opacity", "gloss", "cof", "tensileStrength", "elongation", "modulus"],
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NLV white voided label film'
  },

  {
    id: 'nsc',
    code: 'NSC',
    img: 'clear-bopp-film-roll.png',
    gallery: [
      'clear-bopp-film-roll.png',
      'nsc/nsc (1).png',
      'nsc/nsc (2).png',
      'nsc/nsc (3).png'
    ],
    category: 'Clear Films',
    name: 'NSC — Clear Sealable Film',
    shortName: 'Clear Sealable Film',
    desc: 'Transparent BOPP film without heat-sealing functionality.',
    overview:
      'NSC is a clear sealable BOPP film intended for applications requiring transparency without a heat-sealable structure.',
    tags: [
      'Clear',
      'Transparent',
      'Sealable'
    ],
    applications: [
      'Printing',
      'Lamination',
      'Flexible packaging'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC', '40 MIC'],
    technicalSpecifications: {
      "20 MIC": {
        unitweight: "18.2",
        yield: "55",
        wettingTension: "≥ 38",
        haze: "≤3.5",
        gloss: "82",
        cof: "≤ 0.30",
        tensileStrength: "150 / 290",
        elongation: "200 / 50",
        thermalShrinkage: "≤ 5 / ≤ 3",
        heatSealRange: "105-140",
      },
      "25 MIC": {
        unitweight: "22.7",
        yield: "44",
        wettingTension: "≥ 38",
        haze: "≤3.5",
        gloss: "82",
        cof: "≤ 0.30",
        tensileStrength: "140 / 290",
        elongation: "200 / 50",
        thermalShrinkage: "≤ 5 / ≤ 3",
        heatSealRange: "105-140",
      },
      "30 MIC": {
        unitweight: "27.3",
        yield: "36.6",
        wettingTension: "≥ 38",
        haze: "≤3.5",
        gloss: "82",
        cof: "≤ 0.30",
        tensileStrength: "140 / 290",
        elongation: "200 / 50",
        thermalShrinkage: "≤ 5 / ≤ 3",
        heatSealRange: "105-140",
      },
      "40 MIC": {
        unitweight: "36.5",
        yield: "27.4",
        wettingTension: "≥ 38",
        haze: "≤3.5",
        gloss: "82",
        cof: "≤ 0.30",
        tensileStrength: "140 / 290",
        elongation: "180 / 40",
        thermalShrinkage: "≤ 5 / ≤ 3",
        heatSealRange: "105-140",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "wettingTension", "haze", "gloss", "cof", "tensileStrength", "elongation", "thermalShrinkage", "heatSealRange"],
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NRC clear release film'
  },

  {
    id: 'nnc',
    code: 'NNC',
    img: 'clear-bopp-film-roll.png',
    gallery: [
      'clear-bopp-film-roll.png',
      'nnc/nnc (1).png',
      'nnc/nnc (2).png',
      'nnc/nnc (3).png'
    ],
    category: 'Clear Films',
    name: 'NNC — Clear Non-Sealable Film',
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
      "20 MIC": {
        unitweight: "18.2",
        yield: "54.9",
        wettingTension: "≥ 38",
        opacity: "1.8",
        haze: "1.6",
        gloss: "95",
        cof: "≤ 0.30",
        tensileStrength: "160 / 290",
        elongation: "180 / 60",
        modulus: "2000 / 3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
      "25 MIC": {
        unitweight: "22.7",
        yield: "44",
        wettingTension: "≥ 38",
        opacity: "2.2",
        haze: "1.7",
        gloss: "94",
        cof: "≤ 0.30",
        tensileStrength: "160 / 290",
        elongation: "180 / 60",
        modulus: "2000 / 3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "wettingTension", "opacity", "haze", "gloss", "cof", "tensileStrength", "elongation", "modulus", "thermalShrinkage"],
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NRC clear release film'
  },

  {
    id: 'nsh',
    code: 'NSH',
    img: 'clear-bopp-film-roll.png',
    gallery: [
      'clear-bopp-film-roll.png',
      'nsh/nsh (1).png',
      'nsh/nsh (2).png',
      'nsh/nsh (3).png'
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
      "20 MIC": {
        unitweight: "18.2",
        yield: "55",
        wettingTension: "≥ 38",
        haze: "≤3.5",
        gloss: "86",
        cof: "≤ 0.50",
        tensileStrength: "150 / 290",
        elongation: "200 / 50",
        thermalShrinkage: "≤ 5 / ≤ 3",
        heatSealRange: "105-140",
      },
      "25 MIC": {
        unitweight: "22.7",
        yield: "44",
        wettingTension: "≥ 38",
        haze: "≤3.5",
        gloss: "85",
        cof: "≤ 0.50",
        tensileStrength: "140 / 290",
        elongation: "200 / 50",
        thermalShrinkage: "≤ 5 / ≤ 3",
        heatSealRange: "105-140",
      },
      "30 MIC": {
        unitweight: "27.3",
        yield: "36.6",
        wettingTension: "≥ 38",
        haze: "≤3.5",
        gloss: "82",
        cof: "≤ 0.50",
        tensileStrength: "140 / 290",
        elongation: "200 / 50",
        thermalShrinkage: "≤ 5 / ≤ 3",
        heatSealRange: "105-140",
      },
      "40 MIC": {
        unitweight: "36.5",
        yield: "27.4",
        wettingTension: "≥ 38",
        haze: "≤3.5",
        gloss: "82",
        cof: "≤ 0.50",
        tensileStrength: "140 / 290",
        elongation: "200 / 50",
        thermalShrinkage: "≤ 5 / ≤ 3",
        heatSealRange: "105-140",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "wettingTension", "haze", "gloss", "cof", "tensileStrength", "elongation", "thermalShrinkage", "heatSealRange"],
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
      'nsmm/nsmm (1).jpg',
      'nsmm/nsmm (2).jpg',
      'nsmm/nsmm (3).jpg'
    ],
    category: 'Metallized Films',
    name: 'NSMM — Metallized Sealable One Side Film',
    shortName: 'Metallized Sealable One Side Film',
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
      "18 MIC": {
        unitweight: "16.4",
        yield: "60.97",
        wettingTension: "≥ 38",
        opticalDensity: "> 2",
        otr: "< 80",
        wvtr: "<0.8",
        cof: "≤ 0.30",
        tensileStrength: "150 / 290",
        elongation: "180 / 60",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
      "20 MIC": {
        unitweight: "18.2",
        yield: "54.9",
        wettingTension: "≥ 38",
        opticalDensity: "> 2",
        otr: "< 80",
        wvtr: "<0.8",
        cof: "≤ 0.31",
        tensileStrength: "150 / 290",
        elongation: "180 / 60",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
      "25 MIC": {
        unitweight: "22.75",
        yield: "43.96",
        wettingTension: "≥ 38",
        opticalDensity: "> 2",
        otr: "< 80",
        wvtr: "<0.8",
        cof: "≤ 0.32",
        tensileStrength: "150 / 290",
        elongation: "180 / 60",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
      "30 MIC": {
        unitweight: "27.3",
        yield: "36.6",
        wettingTension: "≥ 38",
        opticalDensity: "> 2",
        otr: "< 80",
        wvtr: "<0.8",
        cof: "≤ 0.30",
        tensileStrength: "150 / 290",
        elongation: "180 / 60",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "wettingTension", "opticalDensity", "otr", "wvtr", "cof", "tensileStrength", "elongation", "thermalShrinkage"],
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NSMM metallized sealable film'
  },

  {
    id: 'nsmmb',
    code: 'NSMB',
    img: 'mtz-bopp-film-roll.png',
    gallery: [
      'mtz-bopp-film-roll.png',
      'nsmmb/nsmmb (1).jpg',
      'nsmmb/nsmmb (2).jpg',
      'nsmmb/nsmmb (3).jpg'
    ],
    category: 'Metallized Films',
    name: 'NSMM-B — Metallized Sealable Both Sides Film',
    shortName: 'Metallized Sealable Both Sides Film',
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
    thicknesses: ['18 MIC', '20 MIC'],
    technicalSpecifications: {
      "18 MIC": {
        unitweight: "16.4",
        yield: "60.97",
        wettingTension: "≥ 38",
        opticalDensity: "> 2",
        otr: "< 80",
        wvtr: "<0.8",
        cof: "≤ 0.30",
        tensileStrength: "150 / 290",
        elongation: "180 / 60",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
      "20 MIC": {
        unitweight: "18.2",
        yield: "54.9",
        wettingTension: "≥ 38",
        opticalDensity: "> 2",
        otr: "< 80",
        wvtr: "<0.8",
        cof: "≤ 0.31",
        tensileStrength: "150 / 290",
        elongation: "180 / 60",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "wettingTension", "opticalDensity", "otr", "wvtr", "cof", "tensileStrength", "elongation", "thermalShrinkage"],
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
      'nsp/nsp (1).png',
      'nsp/nsp (2).png',
      'nsp/nsp (3).png'
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
      "25 MIC": {
        unitweight: "17",
        yield: "58.8",
        density: "0.68",
        wettingTension: "≥ 38",
        whiteness: "89",
        opacity: "70",
        gloss: "90",
        cof: "≤ 0.30",
        tensileStrength: "103 / 141",
        elongation: "140 / 32",
        modulus: "1050 / 1980",
      },
      "30 MIC": {
        unitweight: "20.4",
        yield: "49",
        density: "0.68",
        wettingTension: "≥ 38",
        whiteness: "90",
        opacity: "72",
        gloss: "90",
        cof: "≤ 0.30",
        tensileStrength: "103 / 141",
        elongation: "140 / 32",
        modulus: "1050 / 1980",
      },
      "35 MIC": {
        unitweight: "23.8",
        yield: "42",
        density: "0.68",
        wettingTension: "≥ 38",
        whiteness: "90",
        opacity: "73",
        gloss: "93",
        cof: "≤ 0.30",
        tensileStrength: "103 / 141",
        elongation: "140 / 32",
        modulus: "1050 / 1980",
      },
      "40 MIC": {
        unitweight: "27.2",
        yield: "36.8",
        density: "0.68",
        wettingTension: "≥ 38",
        whiteness: "92",
        opacity: "76",
        gloss: "97",
        cof: "≤ 0.30",
        tensileStrength: "103 / 141",
        elongation: "140 / 32",
        modulus: "1050 / 1980",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "density", "wettingTension", "whiteness", "opacity", "gloss", "cof", "tensileStrength", "elongation", "thermalShrinkage"],
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
      'nsw/nsw (1).jpg',
      'nsw/nsw (2).jpg',
      'nsw/nsw (3).jpg'
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
    thicknesses: ['18 MIC', '20 MIC', '25 MIC', '30 MIC', '40 MIC'],
    technicalSpecifications: {
      "18 MIC": {
        unitweight: "17.1",
        yield: "58.5",
        wettingTension: "≥ 38",
        transmittance: "44",
        gloss: "55",
        cof: "≤ 0.30",
        tensileStrength: "107 / 205",
        elongation: "220 / 60",
        thermalShrinkage: "≤ 5.0 / ≤ 3.0",
        sealStrength: "> 2.0",
      },
      "20 MIC": {
        unitweight: "19.0",
        yield: "52.6",
        wettingTension: "≥ 38",
        transmittance: "43",
        gloss: "55",
        cof: "≤ 0.30",
        tensileStrength: "107 / 205",
        elongation: "220 / 60",
        thermalShrinkage: "≤ 5.0 / ≤ 3.0",
        sealStrength: "> 2.0",
      },
      "25 MIC": {
        unitweight: "23.8",
        yield: "42",
        wettingTension: "≥ 38",
        transmittance: "40",
        gloss: "50",
        cof: "≤ 0.30",
        tensileStrength: "107 / 205",
        elongation: "220 / 60",
        thermalShrinkage: "≤ 5.0 / ≤ 3.0",
        sealStrength: "> 2.0",
      },
      "30 MIC": {
        unitweight: "28.6",
        yield: "35.1",
        wettingTension: "≥ 38",
        transmittance: "38",
        gloss: "50",
        cof: "≤ 0.30",
        tensileStrength: "107 / 205",
        elongation: "220 / 60",
        thermalShrinkage: "≤ 5.0 / ≤ 3.0",
        sealStrength: "> 2.0",
      },
      "40 MIC": {
        unitweight: "38.0",
        yield: "26.3",
        wettingTension: "≥ 38",
        transmittance: "34",
        gloss: "50",
        cof: "≤ 0.30",
        tensileStrength: "107 / 205",
        elongation: "220 / 60",
        thermalShrinkage: "≤ 5.0 / ≤ 3.0",
        sealStrength: "> 2.0",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "wettingTension", "transmittance", "gloss", "cof", "tensileStrength", "elongation", "thermalShrinkage", "sealStrength"],
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NSW solid white sealable film'
  },

  /*  {
      id: 'nvmm',
      code: 'NVMM',
      img: 'mtz-bopp-film-roll.png',
      gallery: [
        'mtz-bopp-film-roll.png',
        'nvmm/nvmm (1).png',
        'nvmm/nvmm (2).png',
        'nvmm/nvmm (3).png'
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
      widthMin: 400,
      widthMax: 2000,
      treatments: [...TREATMENT_OPTIONS],
      phCap: 'NVMM metalized white voided film'
    }*/

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
    technicalSpecifications: {
      "38 MIC": {
        unitweight: "23.6",
        yield: "42.4",
        density: "0.68",
        wettingTension: "≥ 38",
        whiteness: "90",
        opacity: "81",
        gloss: "90",
        cof: "≤ 0.30",
        tensileStrength: "103 / 141",
        elongation: "140 / 32",
        modulus: "1150 / 2100",
      },
      "47 MIC": {
        unitweight: "32",
        yield: "31.25",
        density: "0.68",
        wettingTension: "≥ 38",
        whiteness: "92",
        opacity: "83",
        gloss: "90",
        cof: "≤ 0.30",
        tensileStrength: "103 / 141",
        elongation: "140 / 32",
        modulus: "1150 / 2100",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "density", "wettingTension", "whiteness", "opacity", "gloss", "cof", "tensileStrength", "elongation", "modulus"],
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NRC clear release film'
  },*/

];