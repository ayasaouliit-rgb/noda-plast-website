export function initGlobalPresence() {
  const toggle = document.querySelector(".export-markets-toggle");
  const wrapper = document.querySelector(".export-markets-wrapper");

  if (!toggle || !wrapper) return;

  toggle.addEventListener("click", () => {
    const isOpen = wrapper.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}