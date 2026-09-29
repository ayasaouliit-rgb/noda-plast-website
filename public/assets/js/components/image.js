export function ph(cap, img) {

  return `
    <div class="ph">
      <img
        src="assets/images/${img}"
        alt="${cap}"
        loading="lazy"
        onerror="this.style.display='none'; this.parentElement.classList.add('image-missing');"
      >
    </div>
  `;
}