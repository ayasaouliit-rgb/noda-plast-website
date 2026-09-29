export const THICKNESS_OPTIONS = [
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
export const TREATMENT_OPTIONS = [
  'ONE SIDE TREATED IN',
  'ONE SIDE TREATED OUT',
  'BOTH SIDE TREATED'
];
export const WIDTH_OPTIONS = [];

for (let width = 400; width <= 2000; width += 50) {
  WIDTH_OPTIONS.push(`${width} mm`);
}