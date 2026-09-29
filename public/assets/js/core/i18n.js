export function i18nText(str) {
    if (window.NODA_LANGUAGE === 'fr' && typeof window.t === 'function') {
        return window.t(str);
    }
    return str;
}