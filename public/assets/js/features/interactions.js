import { showPage } from './navigation.js';

import {
  openApplicationDetail
} from './applications.js';

import {
  openNewsSection
} from './news.js';

import {
  openCareerPosition
} from './careers.js';


export function initGlobalInteractions() {

  document.addEventListener('click', function (e) {

  // ---- PRODUCT GRID CARDS (pgrid-card) ----
  const productCard = e.target.closest('.pgrid-card');
  if (productCard && !e.target.closest('a, button')) {
    const viewBtn = productCard.querySelector('[data-product]');
    if (viewBtn) {
      showPage('product-detail', {
        product: viewBtn.getAttribute('data-product')
      });
    }
    return;
  }

  // ---- APPLICATION CARDS (appx-card) ----
  const appxCard = e.target.closest('.appx-card');
  if (appxCard && !e.target.closest('a, button')) {
    openApplicationDetail(appxCard.getAttribute('data-app-id'));
    return;
  }

  // ---- HOME APPLICATION CARDS (home-app-card) ----
  const homeAppCard = e.target.closest('.home-app-card');
  if (homeAppCard && !e.target.closest('a, button')) {
    const btn = homeAppCard.querySelector('.app-explore-btn');
    if (btn) {
      showPage('applications', {
        app: btn.getAttribute('data-app-id')
      });
    }
    return;
  }

  // ---- HOME NEWS / EVENT / JOB BUTTONS ----
  const homeContentBtn = e.target.closest('.home-content-btn');
  if (homeContentBtn) {
    const type = homeContentBtn.getAttribute('data-content-type');
    const itemId = homeContentBtn.getAttribute('data-content-id');
    if (type === 'news' || type === 'event') {
      e.preventDefault();
      openNewsSection('all', itemId);
    } else if (type === 'job') {
      openCareerPosition(itemId);
    }
    return;
  }

  // ---- HOME NEWS / EVENT / JOB CARDS ----
  const homeNewsCard = e.target.closest('.home-news-card');
  if (homeNewsCard && !e.target.closest('a, button')) {
    const btn = homeNewsCard.querySelector('.home-content-btn');
    if (btn) btn.click();
    return;
  }

  // ---- NEWS PAPER ITEMS ----
  const newsItem = e.target.closest('.news-paper-item');
  if (newsItem && !e.target.closest('a, button')) {
    openNewsSection('all', newsItem.getAttribute('data-news-id'));
    return;
  }

  // ---- CAREERS JOB CARDS (careers-job) ----
  const careerCard = e.target.closest('.careers-job');
  if (careerCard && !e.target.closest('a, button')) {
    const applyLink = careerCard.querySelector('[data-position]');
    if (applyLink) {
      const position = applyLink.getAttribute('data-position');
      const positionSelect = document.getElementById('career-position');
      if (positionSelect) positionSelect.value = position;
      const section = document.getElementById('careers-apply');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return;
  }

});


}