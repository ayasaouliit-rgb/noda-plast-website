const PAGE_SEO = {
  home:                { title: 'NODA PLAST FILM — BOPP Film Manufacturer | Setif, Algeria', desc: 'High-performance BOPP film solutions for packaging, labels, printing and lamination.' },
  about:               { title: 'About NODA PLAST FILM — BOPP Film Manufacturer', desc: 'Learn about NODA PLAST FILM, a BOPP film manufacturer in Setif, Algeria with an advanced 8.7-meter five-layer production line.' },
  products:            { title: 'BOPP Film Products — Clear, White, Metallized, Matt | NODA PLAST FILM', desc: 'Explore our full range of BOPP films: clear, white, metallized, matt and pearlised films for packaging and labels.' },
  'product-detail':    { title: 'BOPP Film Product Details | NODA PLAST FILM', desc: 'Technical details and specifications for NODA PLAST BOPP film products.' },
  applications:        { title: 'BOPP Film Applications — Packaging, Labels, Printing | NODA PLAST FILM', desc: 'BOPP film solutions for food packaging, labels, printing, lamination and industrial use.' },
  quality:             { title: 'Quality — BOPP Film Testing & Control | NODA PLAST FILM', desc: 'Quality control at every stage of BOPP film production, from raw materials to finished rolls.' },
  sustainability:      { title: 'Sustainability — Responsible BOPP Film Production | NODA PLAST FILM', desc: 'Recyclable products, responsible production and environmental care at NODA PLAST FILM.' },
  careers:             { title: 'Careers — Join NODA PLAST FILM', desc: 'Build your career at NODA PLAST FILM in Setif, Algeria. View open positions and submit your CV.' },
  'global-presence':   { title: 'Global Presence — BOPP Film Export | NODA PLAST FILM', desc: 'NODA PLAST FILM exports BOPP film from Algeria to Africa, the Middle East and Europe.' },
  news:                { title: 'News & Events | NODA PLAST FILM', desc: 'Latest news, events and industry insights from NODA PLAST FILM.' },
  contact:             { title: 'Contact NODA PLAST FILM — BOPP Film Supplier', desc: 'Contact NODA PLAST FILM for quotes, technical questions or partnership inquiries.' }
};

export function updateSeoForPage(id) {
  const seo = PAGE_SEO[id];
  if (!seo) return;
  document.title = seo.title;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', seo.desc);
}