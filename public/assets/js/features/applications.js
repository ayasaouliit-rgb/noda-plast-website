import { APPLICATIONS } from '../data/applications.js';
import { PRODUCTS } from '../data/products.js';
import { i18nText } from '../core/i18n.js';
import { ph } from '../components/image.js';

export function renderApplicationsGrid() {

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

          <h3 data-i18n="${a.name}">${i18nText(a.name)}</h3>

          <p data-i18n="${a.desc}">${i18nText(a.desc)}</p>

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


}

export function renderHomeApplicationsCarousel() {
  const track = document.getElementById('homeApplicationsTrack');

  if (!track) return;

  const cards = APPLICATIONS.map((a, i) => `
    <div class="card app-card home-app-card">
      ${ph(a.phCap, a.img)}

      <div class="app-card-body">
        <div class="app-card-num">0${i + 1}</div>

        <h3 data-i18n="${a.name}">${i18nText(a.name)}</h3>

        <p data-i18n="${a.desc}">${i18nText(a.desc)}</p>

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

      const event = new CustomEvent('noda:navigate', {
        detail: { id: 'applications', opts: { app: appId } }
      });
      document.dispatchEvent(event);
    });
  });
}

export function openApplicationDetail(id) {

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
        ${i18nText(a.name)}
      </div>

      <h3
        style="
          font-size:24px;
          margin-bottom:12px;
        "
      >
        <span data-i18n="${a.desc}">${i18nText(a.desc)}</span>
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