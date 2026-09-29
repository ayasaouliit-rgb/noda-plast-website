import { NEWS } from '../data/news.js';
import { JOBS } from '../data/careers.js';

import { i18nText } from '../core/i18n.js';
import { ph } from '../components/image.js';
import { showPage } from './navigation.js';

export function renderHomeNewsCarousel() {

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

    ...JOBS.map(job => ({
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

          const catRaw =
        item.contentType === 'event' ? 'Event' : item.category;

      return `
        <div
          class="card news-card home-news-card"
          data-content-type="${item.contentType}"
        >

          ${ph(item.phCap, item.img)}

          <div class="news-card-body">

            <div class="news-meta">

              <span class="news-cat" data-i18n="${catRaw}">
                ${i18nText(catRaw)}
              </span>

              <span class="news-date" data-i18n="${item.date}">
                ${i18nText(item.date)}
              </span>

            </div>

            <h3 data-i18n="${item.title}">${i18nText(item.title)}</h3>

            <p data-i18n="${item.desc}">${i18nText(item.desc)}</p>

            <button
              type="button"
              class="btn-ghost home-content-btn"
              data-content-type="${item.contentType}"
              data-content-id="${item.id || ""}"
            >

              ${item.contentType === 'event'
          ? `<span data-i18n="View event">${i18nText('View event')}</span>`
          : `<span data-i18n="Read more">${i18nText('Read more')}</span>`}

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
              ${i18nText('Job Opportunity')}
            </span>

            <span class="news-date" data-i18n="${item.location}">
              ${i18nText(item.location)}
            </span>

          </div>

          <h3 data-i18n="${item.title}">${i18nText(item.title)}</h3>

          <p data-i18n="${item.description}">${i18nText(item.description)}</p>

          <button
            type="button"
            class="btn-ghost home-content-btn"
            data-content-type="job"
            data-content-id="${item.id}"
          >
            <span data-i18n="View position">${i18nText('View position')}</span>

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


}

export function renderNewsGrid(filter = 'all') {
  const firstGrid = document.getElementById('newsGridFirst');
  const restGrid = document.getElementById('newsGridRest');

  if (!firstGrid || !restGrid) return;

  // Clear previous content
  firstGrid.innerHTML = '';
  restGrid.innerHTML = '';

  // Filter NEWS
  const filteredNews = NEWS.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  if (!filteredNews.length) {
    firstGrid.innerHTML = `
      <div class="news-empty">
        ${i18nText('No news or events available.')}
      </div>
    `;
    return;
  }

  filteredNews.forEach((item, index) => {
  if (!filteredNews.length) {
    firstGrid.innerHTML = `
      <div class="news-empty" data-i18n="No news or events available.">
        ${i18nText('No news or events available.')}
      </div>
    `;
    return;
  }
    /*
     * FIRST NEWS / EVENT
     * Goes inside .news-hub-section
     */
    if (index === 0) {
      const section = createNewsSection(item, index);

      firstGrid.appendChild(section);
      return;
    }

    /*
     * REST OF NEWS / EVENTS
     * Goes outside .news-hub-section
     */
    const section = createNewsSection(item, index);

    restGrid.appendChild(section);
  });
}

export function createNewsSection(item, index) {

  const section = document.createElement('section');

  const sectionClass =
    index % 2 === 0
      ? 'section news-item-section'
      : 'section section-tint news-item-section';

  section.className = sectionClass;
  section.id = item.id;
  section.dataset.newsId = item.id;
  section.dataset.newsType = item.type;

  const reversedClass =
    index % 2 === 1 ? 'is-reversed' : '';

  const categoryRaw =
    item.type === 'event' ? 'Event' : item.category;

  section.innerHTML = `
    <div class="container">

      <article
        class="news-paper-item ${reversedClass}"
        data-news-id="${item.id}"
      >

        <div class="news-paper-image">
          <div class="ph">

            <img
              src="assets/images/${item.img}"
              alt="${item.phCap || item.title}"
              loading="lazy"
              onerror="
                this.style.display='none';
                this.parentElement.classList.add('image-missing');
              "
            >

          </div>
        </div>

        <div class="news-paper-content">

          <div class="news-paper-meta">

            <span class="news-paper-category" data-i18n="${categoryRaw}">
              ${i18nText(categoryRaw)}
            </span>

            <span class="news-date" data-i18n="${item.date || ''}">
              ${i18nText(item.date || '')}
            </span>

          </div>

          <h3 data-i18n="${item.title}">
            ${i18nText(item.title)}
          </h3>

          <p data-i18n="${item.desc || ''}">
            ${i18nText(item.desc || '')}
          </p>

        </div>

      </article>

    </div>
  `;

  return section;
}

export function openNewsSection(type = 'all', itemId = null) {

  showPage('news');

  const filter =
    type === 'news' || type === 'event'
      ? type
      : 'all';

  const filterBtn =
    document.querySelector(
      `[data-news-filter="${filter}"]`
    );

  document
    .querySelectorAll('[data-news-filter]')
    .forEach(btn => {
      btn.classList.toggle(
        'active',
        btn === filterBtn
      );
    });

  renderNewsGrid(filter);

  setTimeout(() => {

    const target = itemId
      ? document.getElementById(itemId)
      : document.getElementById('newsGridFirst');

    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: itemId ? 'center' : 'start'
    });

    if (itemId) {

      target.classList.remove(
        'news-item-highlight'
      );

      void target.offsetWidth;

      target.classList.add(
        'news-item-highlight'
      );
    }

  }, 80);
}

export function setupNewsInteractions() {

  /*
   * CATEGORY FILTERS
   */
  document
    .querySelectorAll('[data-news-filter]')
    .forEach(button => {

      button.addEventListener('click', () => {

        const filter =
          button.getAttribute(
            'data-news-filter'
          ) || 'all';

        document
          .querySelectorAll('[data-news-filter]')
          .forEach(btn => {
            btn.classList.toggle(
              'active',
              btn === button
            );
          });

        renderNewsGrid(filter);

        /*
         * After changing the filter,
         * return to the beginning of the news content.
         */
        const firstGrid =
          document.getElementById(
            'newsGridFirst'
          );

        if (firstGrid) {
          firstGrid.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }

      });

    });


  /*
   * NEWS / EVENT BUTTONS
   *
   * Event delegation works for both
   * newsGridFirst and newsGridRest.
   */
  const newsPage =
    document.getElementById('page-news');

  if (!newsPage) return;

  newsPage.addEventListener('click', event => {

    const button =
      event.target.closest(
        '[data-news-id]'
      );

    if (!button) return;

    const itemId =
      button.getAttribute(
        'data-news-id'
      );

    if (!itemId) return;

    /*
     * If clicking Read More on a news item,
     * go to that exact item.
     */
    if (
      button.classList.contains(
        'news-paper-readmore'
      )
    ) {
      event.preventDefault();

      openNewsSection(
        'all',
        itemId
      );
    }

  });

}