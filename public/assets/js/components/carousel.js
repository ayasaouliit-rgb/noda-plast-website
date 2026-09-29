export function setupInfiniteCarousel({
  trackId,
  prevId,
  nextId,
  cardSelector,
  speed = 0.5
}) {
  const track = document.getElementById(trackId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);

  if (!track || !prev || !next) return;

  let position = 0;
  let paused = false;
  let lastTime = performance.now();

  /*
   * Get the width of one card + gap
   */
  function getStep() {
    const card = track.querySelector(cardSelector);

    if (!card) return 0;

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.gap) || 0;

    return card.offsetWidth + gap;
  }

  /*
   * Because the cards are duplicated:
   *
   * [1][2][3][4] [1][2][3][4]
   *
   * half of the track is one complete loop.
   */
  function getLoopWidth() {
    return track.scrollWidth / 2;
  }

  /*
   * Keep position inside the duplicated section.
   */
  function normalizePosition() {
    const loopWidth = getLoopWidth();

    if (!loopWidth) return;

    if (position >= loopWidth) {
      position -= loopWidth;
    }

    if (position < 0) {
      position += loopWidth;
    }
  }

  /*
   * Apply the position.
   */
  function render() {
    normalizePosition();

    track.style.transform =
      `translate3d(${-position}px, 0, 0)`;
  }

  /*
   * NEXT ARROW
   * Move exactly one card.
   */
  next.addEventListener('click', () => {
    const step = getStep();

    if (!step) return;

    paused = true;

    position += step;

    render();

    /*
     * Resume automatic scrolling
     * after the card transition.
     */
    setTimeout(() => {
      paused = false;
      lastTime = performance.now();
    }, 500);
  });

  /*
   * PREVIOUS ARROW
   * Move exactly one card backward.
   */
  prev.addEventListener('click', () => {
    const step = getStep();

    if (!step) return;

    paused = true;

    position -= step;

    render();

    setTimeout(() => {
      paused = false;
      lastTime = performance.now();
    }, 500);
  });

  /*
   * AUTOMATIC SCROLLING
   */
  function animate(time) {
    const delta = time - lastTime;
    lastTime = time;

    if (!paused) {
      position += speed * (delta / 16.67);

      render();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  /*
   * Pause while mouse is over carousel.
   */
  const carousel = track.parentElement;

  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      paused = true;
    });

    carousel.addEventListener('mouseleave', () => {
      paused = false;
      lastTime = performance.now();
    });
  }
}

