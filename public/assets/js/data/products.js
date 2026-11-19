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
  Treatment: {
    label: 'Treatment',
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
  cof_metal: {
    label: 'COF Dynamic F-Metal',
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
  {
    id: 'mattn',
    code: 'MATT-N',
    img: 'matt-bopp-film-roll.png',
    gallery: [
      'matt-bopp-film-roll.png',
      'layers/mattn.png',
      'mattn/mattn (1).png',
      'mattn/mattn (2).png',
      'mattn/mattn (3).png'
    ],
    category: 'Matt Films',
    name: 'MATT-N — Matt Film Non Sealable',
    shortName: 'Matt Film (Matt Non Sealable)',
    desc: 'Matt film with a non-sealable matte side, designed for applications requiring a distinctive low-gloss surface.',
    overview:
      'Matt-N, is coextruded BOPP Matt film, one side Matt Non-Sealable layer and other side treated glossy layer for Printing and Lamination.',
    tags: [
      'Matt finish',
      'Non-sealable side'
    ],
    feature: [
      "excellent Matt dispersion.",
      "Very Good Haze across the web.",
      "High mechanical properties & stiffness.",
      "Excellent web flatness without curling."
    ],
    applications: [
      'Paper & Card Board lamination.',
      'Rotogravure & flexo printing on Treated side.',
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
  },

  {
    id: 'mattr',
    code: 'MATT-R',
    img: 'matt-bopp-film-roll.png',
    gallery: [
      'matt-bopp-film-roll.png',
      'layers/mattr.png',
      'mattn/mattr (1).png',
      'mattn/mattr (2).png',
      'mattn/mattr (3).png'
    ],
    category: 'Matt Films',
    name: 'MATT-N — Matt Release Film ',
    shortName: 'Matt Film (Matt Release)',
    desc: 'Matt film with a release matte side, designed for applications requiring a distinctive low-gloss surface.',
    overview:
      'Matt-R, is coextruded BOPP Matt Release film, one side Matt Release layer and other side treated glossy layer for Printing and Lamination.',
    tags: [
      'Matt finish',
      'Release side'
    ],
    feature: [
      "excellent Matt dispersion.",
      "Very Good Haze across the web.",
      "High mechanical properties & stiffness. ",
      "Excellent web flatness without curling."
    ],
    applications: [
      'Lamination',
      'Rotogravure & Flexo printing ',
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
  },

  {
    id: 'matts',
    code: 'MATT-S',
    img: 'matt-bopp-film-roll.png',
    gallery: [
      'matt-bopp-film-roll.png',
      'layers/matt.png',
      'matts/matts (1).png',
      'matts/matts (2).png',
      'matts/matts (3).png'
    ],
    category: 'Matt Films',
    name: 'MATT-S — Matt Film Sealable',
    shortName: 'Matt Film (Sealable)',
    desc: 'Matt film with sealable for packaging structures requiring a matte appearance and sealing capability.',
    overview:
      'Matt-S, is coextruded matt BOPP film with one side regular matt sealable layer and other side treated glossy heat sealable layer for good printability.',
    tags: [
      'Matt finish',
      'Sealable'
    ],
    feature: [
      'excellent matte dispersion.',
      'Wide sealing range.',
      'Good seal strength.',
      'High mechanical properties & stiffness.',
      'Excellent web flatness without curling.'
    ],
    applications: [
      'Flexible packaging',
      'Heat-sealable structures',
      'Lamination',
      'Rotogravure & Flexo printing.'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC'],
    technicalSpecifications: {
      "20 MIC": {
        unitweight: "17.6",
        yield: "56.8",
        Treatment: "≥ 38",
        gloss: "10",
        haze: "72",
        cof: "≤ 0.30",
        tensileStrength: "130 / 260",
        elongation: "150 / 50",
        modulus: "2000 / 3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
        sealStrength: "> 2",
        heatSealRange: "115-140",
      },
      "25 MIC": {
        unitweight: "22.2",
        yield: "45.5",
        Treatment: "≥ 38",
        gloss: "10",
        haze: "72",
        cof: "≤ 0.30",
        tensileStrength: "130 / 260",
        elongation: "150 / 50",
        modulus: "2000 / 3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
        sealStrength: "> 2",
        heatSealRange: "115-140",
      },
      "30 MIC": {
        unitweight: "26.7",
        yield: "37.5",
        Treatment: "≥ 38",
        gloss: "10",
        haze: "72",
        cof: "≤ 0.30",
        tensileStrength: "130 / 260",
        elongation: "150 / 50",
        modulus: "2000 / 3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
        sealStrength: "> 2",
        heatSealRange: "115-140",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "Treatment", "gloss", "haze", "cof", "tensileStrength", "elongation", "modulus", "thermalShrinkage", "sealStrength", "heatSealRange"],
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
      'layers/nlc.png',
      'nlc/nlc (1).jpg',
      'nlc/nlc (2).jpg',
      'nlc/nlc (3).jpg'
    ],
    category: 'Label Films',
    name: 'NLC — Label Clear Film',
    shortName: 'Label Clear Film',
    desc: 'Clear BOPP film developed for transparent label applications.',
    overview:
      'NLC is coextruded Transparent BOPP film, one side Corona Treated and both sides non-sealable. Film is used for Over wrap and wrap around Labeling.',
    tags: [
      'Clear',
      'Label film',
      'Transparent appearance'
    ],
    feature: [
      'Excellent glossy film.',
      'Very good machinability.',
      'High mechanical properties & stiffness.',
      'Excellent web flatness without curling.'
    ],
    applications: [
      'Clear labels',
      'No-label-look applications',
      'Lamination',
      'rotogravure & flexographic printing'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC'],
    technicalSpecifications: {
      "20 MIC": {
        unitweight: "18.2",
        yield: "54.9",
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
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
    specificationSchema: ["thickness", "unitweight", "yield", "Treatment", "opacity", "haze", "gloss", "cof", "tensileStrength", "elongation", "modulus", "thermalShrinkage"],
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
      'layers/white.png',
      'nlv/nlv (1).jpg',
      'nlv/nlv (2).jpg',
      'nlv/nlv (3).jpg'
    ],
    category: 'Label Films',
    name: 'NLV — Label White Voided Film',
    shortName: 'Label White Voided Film',
    desc: 'White voided BOPP film designed for label applications requiring an opaque white appearance.',
    overview:
      'NLV, is a coextruded BOPP film with a micro-voided core structure, developed as a lightweight substrate for label and packaging applications. The film combines a multilayer construction with a controlled surface structure to provide consistent performance during converting.',
    tags: [
      'White',
      'Voided',
      'Label film'
    ],
    feature: [
      'Very good opacity and whiteness.',
      'Excellent web flatness.',
      'Excellent glossy surface.',
      'High mechanical properties & stiffness.'
    ],
    applications: [
      'Pressure-sensitive labels',
      'Wrap-around labels',
      'Rotogravure & Flexo printing.'
    ],
    thicknesses: ['38 MIC', '47 MIC'],
    technicalSpecifications: {
      "38 MIC": {
        unitweight: "23.6",
        yield: "42.4",
        density: "0.68",
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
        whiteness: "92",
        opacity: "83",
        gloss: "90",
        cof: "≤ 0.30",
        tensileStrength: "103 / 141",
        elongation: "140 / 32",
        modulus: "1080 / 2000",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "density", "Treatment", "whiteness", "opacity", "gloss", "cof", "tensileStrength", "elongation", "modulus"],
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
      'layers/clear.png',
      'nsc/nsc (1).png',
      'nsc/nsc (2).png',
      'nsc/nsc (3).png'
    ],
    category: 'Clear Films',
    name: 'NSC — Clear Sealable Film',
    shortName: 'Clear Sealable Film',
    desc: 'Transparent BOPP film without heat-sealing functionality.',
    overview:
      'NSC, is Coextruded BOPP film, heat sealable, suitable for food packaging and general use goods.NSC, film formulated to be compatible with most complicated printing technologies (Rotogravure & Flexo), and is accepting all types of inks, also suitable for lamination with many other substances.',
    tags: [
      'Clear',
      'Transparent',
      'Sealable'
    ],
    feature: [
      'Excellent transparency and gloss',
      'Wide seal range and good seal strength',
      'Excellent hot tack ',
      'Excellent web flatness',
      'High mechanical & optical properties and stiffness'
    ],
    applications: [
      'Rotogravure & Flexo Printing',
      'Lamination',
      'Flexible packaging',
      'food & non- food packaging.'
    ],
    thicknesses: ['15 MIC', '18 MIC', '20 MIC', '25 MIC', '30 MIC', '40 MIC'],
    technicalSpecifications: {
      "15 MIC": {
        unitweight: "13.65",
        yield: "73.26",
        Treatment: "≥ 38",
        haze: "≤2.5",
        gloss: "82",
        cof: "≤ 0.30",
        tensileStrength: "150 / 290",
        elongation: "200 / 50",
        modulus: "2000/3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
        sealStrength: ">2",
        heatSealRange: "105-140",
      },
      "18 MIC": {
        unitweight: "16.38",
        yield: "61.05",
        Treatment: "≥ 38",
        haze: "≤2.5",
        gloss: "82",
        cof: "≤ 0.30",
        tensileStrength: "150 / 250",
        elongation: "200 / 50",
        modulus: "2000/3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
        sealStrength: ">2",
        heatSealRange: "105-140",
      },
      "20 MIC": {
        unitweight: "18.2",
        yield: "55",
        Treatment: "≥ 38",
        haze: "≤2.5",
        gloss: "82",
        cof: "≤ 0.30",
        tensileStrength: "150 / 290",
        elongation: "200 / 50",
        modulus: "2000/3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
        sealStrength: ">2",
        heatSealRange: "105-140",
      },
      "25 MIC": {
        unitweight: "22.7",
        yield: "44",
        Treatment: "≥ 38",
        haze: "≤3.5",
        gloss: "82",
        cof: "≤ 0.30",
        tensileStrength: "140 / 290",
        elongation: "200 / 50",
        modulus: "2000/3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
        sealStrength: ">2",
        heatSealRange: "105-140",
      },
      "30 MIC": {
        unitweight: "27.3",
        yield: "36.6",
        Treatment: "≥ 38",
        haze: "≤3.5",
        gloss: "82",
        cof: "≤ 0.30",
        tensileStrength: "140 / 290",
        elongation: "200 / 50",
        modulus: "2000/3800",
        thermalShrinkage: "≤ 5 / ≤ 3",
        sealStrength: ">2",
        heatSealRange: "105-140",
      },
      "40 MIC": {
        unitweight: "36.5",
        yield: "27.4",
        Treatment: "≥ 38",
        haze: "≤3.5",
        gloss: "82",
        cof: "≤ 0.30",
        tensileStrength: "140 / 290",
        elongation: "180 / 40",
        thermalShrinkage: "≤ 5 / ≤ 3",
        sealStrength: ">2",
        heatSealRange: "105-140",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "Treatment", "haze", "gloss", "cof", "tensileStrength", "elongation", "modulus", "thermalShrinkage", "sealStrength", "heatSealRange"],
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
      'layers/clear.png',
      'nnc/nnc (1).png',
      'nnc/nnc (2).png',
      'nnc/nnc (3).png'
    ],
    category: 'Clear Films',
    name: 'NNC — Clear Non-Sealable Film',
    shortName: 'Clear Non-Sealable Film',
    desc: 'Transparent BOPP film without heat-sealing functionality.',
    overview:
      'NNC is coextruded Transparent BOPP film, one side Corona Treated and both sides non-sealable. Film is commonly used for Textile packing and other non-food stuff.',
    tags: [
      'Clear',
      'Transparent',
      'Non-sealable'
    ],
    feature: [
      'Excellent glossy film.',
      'Very good machinability.',
      'High mechanical properties & stiffness.',
      'Excellent web flatness without curling.'
    ],
    applications: [
      'Rotogravure & Flexo Printing',
      'Lamination',
      'Flexible packaging'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC'],
    technicalSpecifications: {
      "20 MIC": {
        unitweight: "18.2",
        yield: "54.9",
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
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
    specificationSchema: ["thickness", "unitweight", "yield", "Treatment", "opacity", "haze", "gloss", "cof", "tensileStrength", "elongation", "modulus", "thermalShrinkage"],
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
      'layers/nsh.png',
      'nsh/nsh (1).png',
      'nsh/nsh (2).png',
      'nsh/nsh (3).png'
    ],
    category: 'Heat Sealable Films',
    name: 'NSH — Clear Heat Sealable',
    shortName: 'Clear Heat Sealable, High C.O.F',
    desc: 'Clear heat-sealable film with high coefficient of friction characteristics.',
    overview:
      'NSH is coextruded BOPP film, heat sealable & high COF suitable for food packaging and intended specially for pouches stacking.',
    tags: [
      'Clear',
      'Heat sealable',
      'High C.O.F'
    ],
    feature: [
      'Excellent transparency & gloss',
      'Wide sealing range & good seal strength',
      'Excellent hot tack',
      'Excellent web flatness',
      'High mechanical & optical properties',
      'High stiffness'
    ],
    applications: [
      'Rotogravure & Flexo printing',
      'Lamination',
      'High-speed converting'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC', '40 MIC'],
    technicalSpecifications: {
      "20 MIC": {
        unitweight: "18.2",
        yield: "55",
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
        haze: "≤3.5",
        gloss: "82",
        cof: "≤ 0.50",
        tensileStrength: "140 / 290",
        elongation: "200 / 50",
        thermalShrinkage: "≤ 5 / ≤ 3",
        heatSealRange: "105-140",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "Treatment", "haze", "gloss", "cof", "tensileStrength", "elongation", "thermalShrinkage", "heatSealRange"],
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NSH high C.O.F heat sealable film'
  },

  {
    id: 'nsmm',
    code: 'NSM-M',
    img: 'mtz-bopp-film-roll.png',
    gallery: [
      'mtz-bopp-film-roll.png',
      'layers/nsm.png',
      'nsmm/nsmm (1).jpg',
      'nsmm/nsmm (2).jpg',
      'nsmm/nsmm (3).jpg'
    ],
    category: 'Metallized Films',
    name: 'NSM-M — Metallized Sealable One Side Film',
    shortName: 'Metallized Sealable One Side Film',
    desc: 'Metallized BOPP film with sealing capability for packaging structures.',
    overview:
      'NSM-M is coextruded BOPP film, one side heat sealable, other side metallized, moderate barrier suitable for food packaging and general use goods.',
    tags: [
      'Metallized',
      'Sealable',
      'Barrier packaging'
    ],
    feature: [
      'Excellent metal band & homogeneous metal deposition.',
      'Wide sealing range & good seal strength',
      'Excellent hot tack ',
      'Excellent web flatness',
      'High mechanical properties & stiffness'
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
        Treatment: "≥ 38",
        opticalDensity: "> 2",
        otr: "< 80",
        wvtr: "<0.8",
        cof_metal: "≤ 0.30",
        tensileStrength: "150 / 290",
        elongation: "180 / 60",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
      "20 MIC": {
        unitweight: "18.2",
        yield: "54.9",
        Treatment: "≥ 38",
        opticalDensity: "> 2",
        otr: "< 80",
        wvtr: "<0.8",
        cof_metal: "≤ 0.31",
        tensileStrength: "150 / 290",
        elongation: "180 / 60",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
      "25 MIC": {
        unitweight: "22.75",
        yield: "43.96",
        Treatment: "≥ 38",
        opticalDensity: "> 2",
        otr: "< 80",
        wvtr: "<0.8",
        cof_metal: "≤ 0.32",
        tensileStrength: "150 / 290",
        elongation: "180 / 60",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
      "30 MIC": {
        unitweight: "27.3",
        yield: "36.6",
        Treatment: "≥ 38",
        opticalDensity: "> 2",
        otr: "< 80",
        wvtr: "<0.8",
        cof_metal: "≤ 0.30",
        tensileStrength: "150 / 290",
        elongation: "180 / 60",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "Treatment", "opticalDensity", "otr", "wvtr", "cof_metal", "tensileStrength", "elongation", "thermalShrinkage"],
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NSMM metallized sealable film'
  },

  {
    id: 'nsmmb',
    code: 'NSM-MB',
    img: 'mtz-bopp-film-roll.png',
    gallery: [
      'mtz-bopp-film-roll.png',
      'layers/nsm.png',
      'nsmmb/nsmmb (1).jpg',
      'nsmmb/nsmmb (2).jpg',
      'nsmmb/nsmmb (3).jpg'
    ],
    category: 'Metallized Films',
    name: 'NSM-MB — Metallized Sealable Both Sides Film',
    shortName: 'Metallized Sealable Both Sides Film',
    desc: 'Metallized BOPP film with sealing capability for packaging structures.',
    overview:
      'NSM-B, is Co-extruded BOPP film, both side Corona Treated and one side metallized, Film is dedicated for Trible Lamination and has moderate barriers suitable for food packaging as well goods with general use.',
    tags: [
      'Metallized',
      'Sealable',
      'Barrier packaging'
    ],
    feature: [
      'Excellent metal band & homogeneous metal deposition.',
      'Excellent web flatness.',
      'High mechanical properties & stiffness.'
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
        Treatment: "≥ 38",
        opticalDensity: "> 2",
        otr: "< 80",
        wvtr: "<0.8",
        cof_metal: "≤ 0.30",
        tensileStrength: "150 / 290",
        elongation: "180 / 60",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
      "20 MIC": {
        unitweight: "18.2",
        yield: "54.9",
        Treatment: "≥ 38",
        opticalDensity: "> 2",
        otr: "< 80",
        wvtr: "<0.8",
        cof_metal: "≤ 0.31",
        tensileStrength: "150 / 290",
        elongation: "180 / 60",
        thermalShrinkage: "≤ 5 / ≤ 3",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "Treatment", "opticalDensity", "otr", "wvtr", "cof_metal", "tensileStrength", "elongation", "thermalShrinkage"],
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
      'layers/white.png',
      'nsp/nsp (1).png',
      'nsp/nsp (2).png',
      'nsp/nsp (3).png'
    ],
    category: 'White Films',
    name: 'NSP — White Pearlized Sealable Film',
    shortName: 'White Pearlized Sealable Film',
    desc: 'White pearlized BOPP film with heat-sealing capability and a distinctive pearlescent appearance.',
    overview:
      'NSP, is a coextruded BOPP film specially designed for food packaging and lamination applications. It combines excellent opacity and whiteness with good dead-fold properties, high stiffness, and mechanical strength. The film also provides a wide sealing range and a glossy, high-quality surface, making it suitable for high-quality rotogravure and flexographic printing.',
    tags: [
      'White',
      'Pearlized',
      'Sealable'
    ],
    feature: [
      'Very good opacity and whiteness.',
      'Excellent web flatness and glossy surface.',
      'Very good dead-fold properties.',
      'Wide sealing range'
    ],
    applications: [
      'In box packaging style.',
      'Premium packaging',
      'Rotogravure & Flexographic printing',
      'Flexible packaging'
    ],
    thicknesses: ['25 MIC', '30 MIC', '35 MIC', '40 MIC'],
    technicalSpecifications: {
      "25 MIC": {
        unitweight: "17",
        yield: "58.8",
        density: "0.68",
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
        whiteness: "92",
        opacity: "76",
        gloss: "97",
        cof: "≤ 0.30",
        tensileStrength: "103 / 141",
        elongation: "140 / 32",
        modulus: "1050 / 1980",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "density", "Treatment", "whiteness", "opacity", "gloss", "cof", "tensileStrength", "elongation", "thermalShrinkage"],
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
      'layers/nsw.png',
      'nsw/nsw (1).jpg',
      'nsw/nsw (2).jpg',
      'nsw/nsw (3).jpg'
    ],
    category: 'White Films',
    name: 'NSW — Solid White Sealable',
    shortName: 'Solid White Sealable (Milky)',
    desc: 'Solid white milky BOPP film with heat-sealing capability.',
    overview:
      'NSW, is a solid white OPP film specially designed and formulated for food packaging applications (Biscuits & Cookies). White films protect products from UV light.',
    tags: [
      'Solid white',
      'Milky',
      'Sealable'
    ],
    feature: [
      'Excellent whiteness and high gloss.',
      'Good antistatic behavior.',
      'Very good seal ability'
    ],
    applications: [
      'Food packaging',
      'Flexible packaging',
      'Light- and UV-sensitive food packaging',
      'White packaging structures'
    ],
    thicknesses: ['18 MIC', '20 MIC', '25 MIC', '30 MIC', '40 MIC'],
    technicalSpecifications: {
      "18 MIC": {
        unitweight: "17.1",
        yield: "58.5",
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
        transmittance: "34",
        gloss: "50",
        cof: "≤ 0.30",
        tensileStrength: "107 / 205",
        elongation: "220 / 60",
        thermalShrinkage: "≤ 5.0 / ≤ 3.0",
        sealStrength: "> 2.0",
      },
    },
    specificationSchema: ["thickness", "unitweight", "yield", "Treatment", "transmittance", "gloss", "cof", "tensileStrength", "elongation", "thermalShrinkage", "sealStrength"],
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

  {
    id: 'nrc',
    code: 'NRC',
    img: 'clear-bopp-film-roll.png',
    gallery: [
      'clear-bopp-film-roll.png',
      'layers/nrc.png',
      'nrc/nrc (1).png',
      'nrc/nrc (2).png',
      'nrc/nrc (3).png'
    ],
    category: 'Clear Films',
    name: 'NRC — Release Clear Film',
    shortName: 'Release Clear Film',
    desc: 'Transparent BOPP film release layerality.',
    overview:
      'NRS, is Bopp CLEAR FILM one side corona treated & other side release layer designed for release purpose mainly with cold-seal application. NRC can also be used for other release applications.',
    tags: [
      'Clear',
      'Transparent',
      'Release'
    ],
    feature: [
      'BOPP clear film for food and non-food packaging',
      'Good printability (Rotogravure & Flexo) on treated side.',
      'Good for lamination.'
    ],
    applications: [
      'Printing',
      'Lamination',
      'Cold-seal application'
    ],
    thicknesses: ['20 MIC', '25 MIC', '30 MIC'],
    technicalSpecifications: {
      "20 MIC": {
        unitweight: "18.2",
        yield: "55",
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
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
        Treatment: "≥ 38",
        haze: "≤3.5",
        gloss: "82",
        cof: "≤ 0.30",
        tensileStrength: "140 / 290",
        elongation: "200 / 50",
        thermalShrinkage: "≤ 5 / ≤ 3",
        heatSealRange: "105-140",
      }
    },
    specificationSchema: ["thickness", "unitweight", "yield", "Treatment", "haze", "gloss", "cof", "tensileStrength", "elongation", "thermalShrinkage", "heatSealRange"],
    widthMin: 400,
    widthMax: 2000,
    treatments: [...TREATMENT_OPTIONS],
    phCap: 'NRC clear release film'
  },

];