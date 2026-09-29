function initializeNodaWebsite() {
  // Home News
  renderHomeNewsCarousel();

  setupInfiniteCarousel({
    trackId: 'homeNewsTrack',
    prevId: 'homeNewsPrev',
    nextId: 'homeNewsNext',
    cardSelector: '.home-news-card',
    speed: 0.5
  });


  // Products
  renderProductGrid();


  // Applications
  renderApplicationsGrid();

  renderHomeApplicationsCarousel();

  setupInfiniteCarousel({
    trackId: 'homeApplicationsTrack',
    prevId: 'homeAppPrev',
    nextId: 'homeAppNext',
    cardSelector: '.home-app-card',
    speed: 0.5
  });

  // Newspaper-style news page
  renderNewsGrid('all');
  setupNewsInteractions();

  // Job opportunities
  renderjobsgrid();

  on('pdDatasheetBtn', 'click', () => {
    const product = window.currentSelectedProduct;
    if (product) openDatasheetNotice(product.id);
  });

  on('pdDatasheetBtn2', 'click', () => {
    const product = window.currentSelectedProduct;
    if (product) openDatasheetNotice(product.id);
  });
}

if (
  document.readyState ===
  'loading'
) {

  document.addEventListener(
    'DOMContentLoaded',
    initializeNodaWebsite
  );

}
else {

  initializeNodaWebsite();

}