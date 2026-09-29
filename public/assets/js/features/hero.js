import { i18nText } from '../core/i18n.js';

const HERO_VALUES = [
  {
    name: "RELIABILITY",
    image: "Noda.png",
    eyebrow: "A partner you can rely on",
    title: "Reliable film.<br>Reliable results.",
    text: "Dependable BOPP film solutions supported by consistent quality, technical expertise and customer-focused service."
  },
  {
    name: "INNOVATION",
    image: "products.png",
    eyebrow: "Innovation in every application",
    title: "Engineered film.<br>Ready for what comes next.",
    text: "Film solutions developed for modern packaging, printing, lamination and demanding converting applications."
  },
  {
    name: "SUSTAINABILITY",
    image: "recycling hero.jpg",
    eyebrow: "Performance with purpose",
    title: "Better film.<br>More responsible choices.",
    text: "We focus on recyclable film solutions, efficient processes and responsible approaches to packaging performance."
  },
  {
    name: "TECHNOLOGY",
    image: "bopp-production-line-wide.jpg",
    eyebrow: "Advanced film technology",
    title: "Technology<br>behind every roll.",
    text: "Modern production technologies and precision processes designed to deliver consistent BOPP film performance."
  },
  {
    name: "QUALITY",
    image: "quality-lab.jpg",
    eyebrow: "Quality you can measure",
    title: "Quality<br>without compromise.",
    text: "Consistent BOPP film performance built around controlled production, laboratory testing and reliable specifications."
  },
];

let heroValueIndex = 0;
let heroInterval;

export function changeHeroValue(index) {
  const value = HERO_VALUES[index];

  const heroBg = document.getElementById("heroBg");
  const heroBadge = document.getElementById("heroBadge");
  const heroEyebrow = document.getElementById("heroEyebrow");
  const heroTitle = document.getElementById("heroTitle");
  const heroText = document.getElementById("heroText");

  if (!heroBg) return;

  heroBg.style.opacity = "0";

  setTimeout(() => {
    heroBg.style.backgroundImage =
      `url("assets/images/${value.image}")`;

    /* Store the original English value in data-i18n so translation.js
       can translate it now and whenever the language is toggled. */
        if (heroBadge) {
      heroBadge.dataset.i18n = value.name;
      heroBadge.dataset.i18nOriginalHtml = value.name;
      heroBadge.textContent = i18nText(value.name);
    }

    if (heroEyebrow) {
      heroEyebrow.dataset.i18n = value.eyebrow;
      heroEyebrow.dataset.i18nOriginalHtml = value.eyebrow;
      heroEyebrow.textContent = i18nText(value.eyebrow);
    }

    if (heroTitle) {
      heroTitle.dataset.i18n = value.title;
      heroTitle.dataset.i18nOriginalHtml = value.title;
      heroTitle.innerHTML = i18nText(value.title);
    }

    if (heroText) {
      heroText.dataset.i18n = value.text;
      heroText.dataset.i18nOriginalHtml = value.text;
      heroText.textContent = i18nText(value.text);
    }

    heroBg.style.opacity = "1";
  }, 400);
}

window.refreshHeroTranslations = function () {
  if (typeof heroValueIndex === 'number' && typeof changeHeroValue === 'function') {
    changeHeroValue(heroValueIndex);
  }
};

export function startHeroAutoChange() {
  heroInterval = setInterval(() => {
    heroValueIndex =
      (heroValueIndex + 1) % HERO_VALUES.length;

    changeHeroValue(heroValueIndex);
  }, 5000);
}

export function goToHero(index) {
  clearInterval(heroInterval);
  heroValueIndex = (index + HERO_VALUES.length) % HERO_VALUES.length;
  changeHeroValue(heroValueIndex);
  startHeroAutoChange();
}
export function initHero() {
  changeHeroValue(0);
  startHeroAutoChange();

  const heroPrev = document.getElementById("heroPrev");
  const heroNext = document.getElementById("heroNext");

  if (heroPrev) heroPrev.addEventListener("click", () => goToHero(heroValueIndex - 1));
  if (heroNext) heroNext.addEventListener("click", () => goToHero(heroValueIndex + 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goToHero(heroValueIndex - 1);
    if (e.key === "ArrowRight") goToHero(heroValueIndex + 1);
  });
}