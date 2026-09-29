import { i18nText } from './i18n.js';

let toastTimer;

export function showToast(msg) {

  let t =
    document.getElementById(
      'nodaToast'
    );


  if (!t) {

    t =
      document.createElement(
        'div'
      );


    t.id =
      'nodaToast';


    t.style.cssText = `
      position:fixed;
      left:50%;
      bottom:34px;
      transform:translateX(-50%);
      background:var(--dark);
      color:#fff;
      padding:14px 22px;
      border-radius:10px;
      font-size:13.5px;
      z-index:1200;
      box-shadow:0 14px 30px -10px rgba(0,0,0,.4);
      max-width:360px;
      text-align:center;
    `;


    document.body.appendChild(t);

  }


  t.textContent =
    msg;


  t.style.opacity =
    '1';


  clearTimeout(toastTimer);


  toastTimer =
    setTimeout(
      () => {
        t.style.transition =
          'opacity .4s';

        t.style.opacity =
          '0';
      },
      2600
    );

}

export function setFormLoading(form, isLoading) {
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  if (!button) return;

  if (isLoading) {
    if (!button.dataset.defaultText) {
      button.dataset.defaultText = button.textContent.trim();
    }
    button.disabled = true;
    button.classList.add('form-loading');
    button.textContent = i18nText('Sending...');
  } else {
    button.disabled = false;
    button.classList.remove('form-loading');
    button.textContent = button.dataset.defaultText || button.textContent;
  }
}

export function showFormError(form, message) {
  if (!form) return;
  const error =
    form.querySelector('.form-error') ||
    form.parentElement?.querySelector('.form-error');
  if (!error) return;
  error.textContent = message || '';
  error.classList.toggle('show', Boolean(message));
}

export function clearFormError(form) {
  showFormError(form, '');
}