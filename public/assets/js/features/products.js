import { PRODUCTS } from '../data/products.js';
import { i18nText } from '../core/i18n.js';
import { ph } from '../components/image.js';

export function renderProductGrid() {

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
          ${i18nText(p.name)}
        </h3>

        <p data-i18n="${p.desc}">
          ${i18nText(p.desc)}
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
            ${p.thicknesses.join(', ')}
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

export function initProductFilters() {

  document.addEventListener('change', (e) => {

    if (e.target.classList.contains('pf')) {
      renderProductGrid();
    }

  });


  document.addEventListener('input', (e) => {

    if (e.target.id === 'productSearch') {
      renderProductGrid();
    }

  });

}