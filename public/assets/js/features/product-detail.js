import { PRODUCTS, SPECIFICATION_DEFINITIONS }
  from '../data/products.js';

import {
  THICKNESS_OPTIONS,
  WIDTH_OPTIONS,
  TREATMENT_OPTIONS
} from '../data/options.js';

import { i18nText } from '../core/i18n.js';
import { showToast } from '../core/ui.js';
import { on } from '../core/dom.js';
import { showPage, openDatasheetNotice } from './navigation.js';

window.__nodaProductGalleryCleanup = null;
export function renderProductDetail(id) {

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


  if (pdCategory) {
    const catText = `${p.code} · ${p.category}`;
    pdCategory.dataset.i18n = catText;
    pdCategory.dataset.i18nOriginalHtml = catText;
    pdCategory.textContent = `${p.code} · ${i18nText(p.category)}`;
  }

  if (pdName) {
    pdName.dataset.i18n = p.name;
    pdName.dataset.i18nOriginalHtml = p.name;
    pdName.textContent = i18nText(p.name);
  }

  if (pdDesc) {
    pdDesc.dataset.i18n = p.shortName;
    pdDesc.dataset.i18nOriginalHtml = p.shortName;
    pdDesc.textContent = i18nText(p.shortName);
  }

  if (pdOverview) {
    pdOverview.dataset.i18n = p.overview;
    pdOverview.dataset.i18nOriginalHtml = p.overview;
    pdOverview.textContent = i18nText(p.overview);
  }

  /* ============================================================
   PRODUCT DETAIL IMAGE GALLERY
   Safe, isolated gallery with proper cleanup
   ============================================================ */

  const pdImageImg =
    document.getElementById('pdImageImg');

  const pdGalleryThumbs =
    document.getElementById('pdGalleryThumbs');


  if (pdImageImg) {

    /*
     * CLEAN UP THE PREVIOUS PRODUCT GALLERY
     *
     * This is the key fix.
     * When a new product is opened, the previous product's
     * autoplay timer, transition timer and event listeners
     * are stopped before the new gallery starts.
     */

    if (typeof window.__nodaProductGalleryCleanup === 'function') {
      window.__nodaProductGalleryCleanup();
    }


    /*
     * Get this product's gallery only.
     */

    const galleryImages =
      Array.isArray(p.gallery) && p.gallery.length
        ? p.gallery.slice(0, 4)
        : [p.img];


    /*
     * Unique gallery instance.
     * Any delayed callback from an older instance becomes invalid.
     */

    const galleryInstanceId =
      Symbol('productGallery');


    let currentIndex = 0;
    let autoplayTimer = null;
    let transitionTimer = null;
    let galleryPaused = false;
    let destroyed = false;


    /*
     * Gallery element for hover pause.
     */

    const galleryElement =
      document.querySelector('.pd-gallery');


    /*
     * CLEANUP FUNCTION FOR THIS GALLERY INSTANCE
     */

    const cleanupGallery = () => {

      destroyed = true;

      clearInterval(autoplayTimer);
      clearTimeout(transitionTimer);

      autoplayTimer = null;
      transitionTimer = null;

      /*
       * Remove listeners attached by this gallery instance.
       */

      if (galleryElement) {
        galleryElement.removeEventListener(
          'mouseenter',
          handleMouseEnter
        );

        galleryElement.removeEventListener(
          'mouseleave',
          handleMouseLeave
        );
      }

      /*
       * Only clear the global reference if it still
       * belongs to this exact gallery instance.
       */

      if (
        window.__nodaProductGalleryCleanup === cleanupGallery
      ) {
        window.__nodaProductGalleryCleanup = null;
      }

    };


    /*
     * Register this gallery as the active one.
     */

    window.__nodaProductGalleryCleanup = cleanupGallery;


    /* ==========================================================
       RENDER GALLERY
       ========================================================== */

    function renderGallery() {

      if (
        destroyed ||
        window.__nodaProductGalleryCleanup !== cleanupGallery
      ) {
        return;
      }

      if (!galleryImages.length) return;


      const currentImage =
        galleryImages[currentIndex];


      /*
       * Only this product's image can be displayed.
       */

      pdImageImg.src =
        'assets/images/' + currentImage;

      pdImageImg.alt =
        p.phCap || p.name;


      /*
       * Create thumbnails from the other images.
       */

      const thumbnailIndexes =
        galleryImages
          .map((image, index) => index)
          .filter(index => index !== currentIndex);


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
         * Add click listeners only to the current gallery's
         * newly created thumbnails.
         */

        pdGalleryThumbs
          .querySelectorAll('.pd-gallery-thumb')
          .forEach(thumb => {

            thumb.addEventListener('click', () => {

              if (
                destroyed ||
                window.__nodaProductGalleryCleanup !== cleanupGallery
              ) {
                return;
              }


              const newIndex =
                Number(thumb.dataset.galleryIndex);


              if (
                Number.isNaN(newIndex) ||
                newIndex === currentIndex
              ) {
                return;
              }


              pauseGallery();

              changeGalleryImage(newIndex);

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
        destroyed ||
        window.__nodaProductGalleryCleanup !== cleanupGallery
      ) {
        return;
      }


      if (
        newIndex < 0 ||
        newIndex >= galleryImages.length ||
        newIndex === currentIndex
      ) {
        return;
      }


      /*
       * Cancel any previous pending transition.
       * This prevents delayed transitions from stacking.
       */

      clearTimeout(transitionTimer);


      pdImageImg.classList.add('gallery-changing');


      transitionTimer = setTimeout(() => {

        /*
         * IMPORTANT:
         * Verify that this callback still belongs to
         * the currently active product gallery.
         */

        if (
          destroyed ||
          window.__nodaProductGalleryCleanup !== cleanupGallery
        ) {
          return;
        }


        currentIndex = newIndex;

        renderGallery();


        requestAnimationFrame(() => {

          if (
            destroyed ||
            window.__nodaProductGalleryCleanup !== cleanupGallery
          ) {
            return;
          }

          pdImageImg.classList.remove('gallery-changing');

        });

      }, 180);

    }


    /* ==========================================================
       AUTOPLAY
       ========================================================== */

    function startGalleryAutoplay() {

      clearInterval(autoplayTimer);

      if (galleryImages.length <= 1) {
        return;
      }


      autoplayTimer = setInterval(() => {

        if (
          destroyed ||
          window.__nodaProductGalleryCleanup !== cleanupGallery ||
          galleryPaused
        ) {
          return;
        }


        const nextIndex =
          (currentIndex + 1) % galleryImages.length;


        changeGalleryImage(nextIndex);

      }, 4500);

    }


    /* ==========================================================
       PAUSE / RESUME
       ========================================================== */

    function pauseGallery() {
      galleryPaused = true;
    }


    function resumeGallery() {
      galleryPaused = false;
    }


    /* ==========================================================
       RESTART AUTOPLAY AFTER CLICK
       ========================================================== */

    function restartGalleryAutoplay() {

      clearInterval(autoplayTimer);

      if (galleryImages.length <= 1) {
        return;
      }


      autoplayTimer = setInterval(() => {

        if (
          destroyed ||
          window.__nodaProductGalleryCleanup !== cleanupGallery ||
          galleryPaused
        ) {
          return;
        }


        const nextIndex =
          (currentIndex + 1) % galleryImages.length;


        changeGalleryImage(nextIndex);

      }, 4500);

    }


    /* ==========================================================
       HOVER PAUSE
       ========================================================== */

    function handleMouseEnter() {
      pauseGallery();
    }


    function handleMouseLeave() {
      resumeGallery();
    }


    if (galleryElement) {

      galleryElement.addEventListener(
        'mouseenter',
        handleMouseEnter
      );

      galleryElement.addEventListener(
        'mouseleave',
        handleMouseLeave
      );

    }


    /* ==========================================================
       INITIAL RENDER
       ========================================================== */

    renderGallery();

    startGalleryAutoplay();

  }

    const pdTags =
    document.getElementById('pdTags');

  if (pdTags) {
    pdTags.innerHTML =
      p.tags
        .map(t => `
          <span class="tag" data-i18n="${t}">${i18nText(t)}</span>
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
        ${i18nText(p.shortName)}
      </span>
    `;
  }

  const pdApplications =
    document.getElementById('pdApplications');

  if (pdApplications) {
    pdApplications.innerHTML =
      p.applications
        .map(a => `<li data-i18n="${a}">${i18nText(a)}</li>`)
        .join('');
  }

  /*
   * Store the currently selected product before rendering
   * thickness-dependent controls/specifications.
   */
  window.currentSelectedProduct = p;
  renderTechnicalSpecifications(p);

  /* ============ SEO: Product JSON-LD ============ */
  (function injectProductJsonLd() {
    const ld = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": p.name,
      "description": p.desc,
      "category": p.category,
      "sku": p.code,
      "brand": { "@type": "Brand", "name": "NODA PLAST FILM" },
      "manufacturer": { "@type": "Organization", "name": "NODA PLAST FILM" },
      "image": "https://www.nodaplast-film.com/assets/images/" + p.img
    };
    let tag = document.getElementById('productLdJson');
    if (!tag) {
      tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.id = 'productLdJson';
      document.head.appendChild(tag);
    }
    tag.textContent = JSON.stringify(ld);

    /* Update page title with the product name */
    document.title = p.name + ' | NODA PLAST FILM';
  })();

  /* ==========================================================
   PRODUCT DETAIL — TOP PREV / NEXT PRODUCT BUTTONS
   ========================================================== */

  // Remove any previous top-nav (from a previous product)
  const existingNav = document.getElementById('pdProductTopNav');
  if (existingNav) existingNav.remove();

  const currentIndex = PRODUCTS.findIndex(x => x.id === p.id);

  if (currentIndex !== -1) {

    const topNav = document.createElement('div');
    topNav.id = 'pdProductTopNav';
    topNav.className = 'pd-top-nav';

    topNav.innerHTML = `
      <button type="button" class="back-btn" id="pdPrevProductBtn" aria-label="Previous product">
        <span class="material-symbols-outlined">keyboard_backspace</span>
      </button>

      <button type="button" class="back-btn pd-next-btn" id="pdNextProductBtn" aria-label="Next product">
        <span class="material-symbols-outlined">keyboard_backspace</span>
      </button>
    `;

    // Insert the nav at the top of the product detail container
    const pdContainer = document.querySelector('#page-product-detail .container');
    if (pdContainer) {
      const pdHero = pdContainer.querySelector('.pd-hero');
      if (pdHero) {
        pdContainer.insertBefore(topNav, pdHero);
      } else {
        pdContainer.insertBefore(topNav, pdContainer.firstChild);
      }
    }
    topNav.querySelector('#pdPrevProductBtn').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const prevIndex = (currentIndex - 1 + PRODUCTS.length) % PRODUCTS.length;
      showPage('product-detail', { product: PRODUCTS[prevIndex].id });
    });

    topNav.querySelector('#pdNextProductBtn').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const nextIndex = (currentIndex + 1) % PRODUCTS.length;
      showPage('product-detail', { product: PRODUCTS[nextIndex].id });
    });

  }

}

export function getProductThicknesses(product) {
  if (!product || !Array.isArray(product.thicknesses)) return [];
  return product.thicknesses.map(value => String(value).trim()).filter(Boolean);
}

export function getTechnicalSpecification(product, selectedThickness) {
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

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function populateProductDetailThickness(product, selectedThickness) {
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

export function updateSelectedProductSpecs(product) {

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

export function isTBDSpecificationValue(value) {
  if (value === undefined || value === null || value === '') return true;
  return String(value).trim().toUpperCase() === 'TBD';
}

export function hasSpecificationValue(product, key) {
  if (!product) return false;
  if (key === 'thickness') return true;

  return getProductThicknesses(product).some(thickness => {
    const value = product.technicalSpecifications?.[thickness]?.[key];
    return !isTBDSpecificationValue(value);
  });
}

export function getProductSpecificationSchema(product) {
  const schema = Array.isArray(product?.specificationSchema)
    ? product.specificationSchema
    : [];

  return schema
    .map(key => ({
      key,
      ...(SPECIFICATION_DEFINITIONS[key] || {
        label: key,
        unit: '-'
      })
    }))
    .filter(spec => hasSpecificationValue(product, spec.key));
}

export function getProductTechnicalSpecificationValues(product, selectedThickness) {
  if (!product) return {};

  const thickness =
    selectedThickness ||
    product.defaultThickness ||
    getProductThicknesses(product)[0];

  const values = product.technicalSpecifications?.[thickness] || {};

  return {
    thickness,
    ...values
  };
}

export function renderTechnicalSpecifications(product, selectedThickness) {
  const table =
    document.querySelector('#page-product-detail .spec-table');

  if (!table || !product) {
    return getProductTechnicalSpecificationValues(product, selectedThickness);
  }

  const tbody = table.querySelector('tbody');

  if (!tbody) {
    return getProductTechnicalSpecificationValues(product, selectedThickness);
  }

  const thicknesses = getProductThicknesses(product);
  const specifications = getProductSpecificationSchema(product);

  tbody.innerHTML = specifications.map(spec => {
    const values = thicknesses.map(thickness => {
      if (spec.key === 'thickness') {
        const formatter = spec.format || (value => value);
        return formatter(thickness);
      }

      const thicknessSpecs =
        product.technicalSpecifications?.[thickness] || {};

      return thicknessSpecs[spec.key] ?? 'TBD';
    });

    const labelText = i18nText(String(spec.label));
    return `
      <tr>
        <td data-i18n="${escapeHtml(String(spec.label))}">${escapeHtml(labelText)}</td>
        <td>${escapeHtml(String(spec.unit || '-'))}</td>
        ${values.map(value => `
          <td>${escapeHtml(String(value))}</td>
        `).join('')}
      </tr>
    `;
  }).join('');

  const note =
    table.parentElement?.querySelector('.form-note');

    if (note) {
    const noteText =
      'Typical values from the available NODA PLAST technical data sheets. Please contact NODA PLAST for detailed technical specifications and current approved values.';
    note.dataset.i18n = noteText;
    note.dataset.i18nOriginalHtml = noteText;
    note.textContent = i18nText(noteText);
  }

  return getProductTechnicalSpecificationValues(
    product,
    selectedThickness
  );
}

export function updateProductDetailSpecifications(product, selectedThickness) {
  if (!product) return;

  const selected =
    populateProductDetailThickness(product, selectedThickness);

  const specs =
    renderTechnicalSpecifications(product, selected);

  const thickness =
    document.getElementById('productThickness');

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

export function initProductDetail() {

  on('pdDatasheetBtn', 'click', () => {
    const product = window.currentSelectedProduct;

    if (product) {
      openDatasheetNotice(product.id);
    }
  });

  on('pdDatasheetBtn2', 'click', () => {
    const product = window.currentSelectedProduct;

    if (product) {
      openDatasheetNotice(product.id);
    }
  });

  // other product-detail listeners...

}