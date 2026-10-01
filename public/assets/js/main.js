import { initNavigation }
  from './features/navigation.js';

import {
  renderProductGrid,
  initProductFilters
} from './features/products.js';

import {
  renderApplicationsGrid,
  renderHomeApplicationsCarousel
} from './features/applications.js';

import {
  renderHomeNewsCarousel,
  renderNewsGrid,
  setupNewsInteractions
} from './features/news.js';

import {
  renderJobsGrid,
  initCareers
} from './features/careers.js';

import {
  initContactForms
} from './features/contact.js';

import {
  initHero
} from './features/hero.js';

import {
  initGlobalPresence
} from './features/global-presence.js';

import {
  initGlobalInteractions
} from './features/interactions.js';

import {
  setupInfiniteCarousel
} from './components/carousel.js';

import { initProductDetail } from './features/product-detail.js';

function initializeNodaWebsite() {

  // Navigation
  initNavigation();


  // Products
  renderProductGrid();
  initProductFilters();


  // Applications
  renderApplicationsGrid();
  renderHomeApplicationsCarousel();


  // News
  renderHomeNewsCarousel();
  renderNewsGrid('all');
  setupNewsInteractions();


  // Careers
  renderJobsGrid();
  initCareers();


  // Forms
  initContactForms();


  // Hero
  initHero();


  // Global presence
  initGlobalPresence();


  // Global card interactions
  initGlobalInteractions();


  // Home carousels
  setupInfiniteCarousel({
    trackId: 'homeNewsTrack',
    prevId: 'homeNewsPrev',
    nextId: 'homeNewsNext',
    cardSelector: '.home-news-card',
    speed: 0.5
  });


  setupInfiniteCarousel({
    trackId: 'homeApplicationsTrack',
    prevId: 'homeAppPrev',
    nextId: 'homeAppNext',
    cardSelector: '.home-app-card',
    speed: 0.5
  });
  initProductDetail();
}


if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    initializeNodaWebsite
  );

} else {

  initializeNodaWebsite();

}