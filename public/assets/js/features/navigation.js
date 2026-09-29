import { PRODUCTS } from '../data/products.js';
import { on } from '../core/dom.js';
import { showToast } from '../core/ui.js';
import { renderProductGrid } from './products.js';
import { renderProductDetail } from './product-detail.js';
import { openApplicationDetail } from './applications.js';
export function showPage(id, opts) {

  opts = opts || {};

  if (
    id !== 'product-detail' &&
    typeof window.__nodaProductGalleryCleanup === 'function'
  ) {
    window.__nodaProductGalleryCleanup();
  }


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

  if (
    id === 'product-detail' &&
    opts.product
  ) {

    renderProductDetail(
      opts.product
    );

  }


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

export function openProductFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('product');

  if (!productId) return;

  const product = PRODUCTS.find(
    p => String(p.id).toLowerCase() === productId.toLowerCase()
  );

  if (!product) {
    console.warn('Product not found:', productId);
    return;
  }

  // Open the product detail page
  showPage('product-detail', {
    product: product.id
  });
}

export function openDatasheetNotice(productId) {
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    showToast('Technical Data Sheet not found.');
    return;
  }

  const pdfPath = `assets/tds/${product.code}.pdf`;

  window.open(pdfPath, '_blank');
}

export function initNavigation() {
  on('hamburgerBtn', 'click', () => {
    const panel = document.getElementById('mobilePanel');
    if (panel) panel.classList.add('open');
  });

  on('closeMobileBtn', 'click', () => {
    const panel = document.getElementById('mobilePanel');
    if (panel) panel.classList.remove('open');
  });

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

  document.addEventListener('noda:navigate', function (e) {
    const detail = e.detail || {};
    if (detail.id) showPage(detail.id, detail.opts || {});
  });

  openProductFromUrl();
}
