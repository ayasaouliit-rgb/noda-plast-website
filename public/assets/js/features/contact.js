import { on } from '../core/dom.js';
import { setFormLoading, showFormError, clearFormError } from '../core/ui.js';

const EMAIL_API_ENDPOINT = '/api/send-email';

export async function sendEmailRequest(payload) {
  let response;
  try {
    response = await fetch(EMAIL_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (networkErr) {
    throw new Error('Network error — please check your connection and try again.');
  }

  let result = {};
  const raw = await response.text();
  try {
    result = raw ? JSON.parse(raw) : {};
  } catch (_) {
    throw new Error(`Server returned an unexpected response (HTTP ${response.status}).`);
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || `Unable to send request (HTTP ${response.status}).`);
  }

  return result;
}

export function getFormValues(form) {
  return Object.fromEntries(new FormData(form).entries());
}


export async function handleHomeContactFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  clearFormError(form);

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const values = getFormValues(form);

  const payload = {
    type: 'contact',
    name: values.name || '',
    company: values.company || '',
    email: values.email || '',
    phone: values.phone || '',
    country: values.country || '',
    service: values.homeservice || '',
    message: values.message || '',
    website: values.website || ''
  };

  setFormLoading(form, true);

  try {
    await sendEmailRequest(payload);

    const wrap = document.getElementById('homeContactFormWrap');
    const success = document.getElementById('homeSuccess');

    if (wrap) {
      wrap.style.display = 'none';
    }

    if (success) {
      success.classList.add('show');
    }

    form.reset();
    clearFormError(form);

  } catch (error) {
    showFormError(
      form,
      error.message ||
      'We could not send your message. Please try again or contact us directly at contact@nodaplast-film.com.'
    );
  } finally {
    setFormLoading(form, false);
  }
}

function handleHomeContactAgain() {

  const form = document.getElementById('homeContactForm');
  const wrap = document.getElementById('homeContactFormWrap');
  const success = document.getElementById('homeSuccess');

  if (form) {
    form.reset();
    clearFormError(form);
  }

  if (success) {
    success.classList.remove('show');
  }

  if (wrap) {
    wrap.style.display = 'block';
  }
}


export async function handleContactFormSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  clearFormError(form);

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const values = getFormValues(form);

  const payload = {
    type: 'contact',
    name: values.name || '',
    company: values.company || '',
    email: values.email || '',
    phone: values.phone || '',
    country: values.country || '',
    service: values.contactservice || '',
    message: values.message || '',
    website: values.website || ''
  };

  setFormLoading(form, true);

  try {
    await sendEmailRequest(payload);

    const wrap = document.getElementById('contactFormWrap');
    const success = document.getElementById('contactSuccess');

    if (wrap) {
      wrap.style.display = 'none';
    }

    if (success) {
      success.classList.add('show');
    }

    form.reset();
    clearFormError(form);

  } catch (error) {
    showFormError(
      form,
      error.message ||
      'We could not send your message. Please try again or contact us directly at contact@nodaplast-film.com.'
    );
  } finally {
    setFormLoading(form, false);
  }
}

function handleContactAgain() {

  const form = document.getElementById('contactForm');
  const wrap = document.getElementById('contactFormWrap');
  const success = document.getElementById('contactSuccess');

  if (form) {
    form.reset();
    clearFormError(form);
  }

  if (success) {
    success.classList.remove('show');
  }

  if (wrap) {
    wrap.style.display = 'block';
  }
}

export function initContactForms() {
  on('homeContactForm', 'submit', handleHomeContactFormSubmit);
  on('homeContactAgainBtn', 'click', handleHomeContactAgain);
  on('contactForm', 'submit', handleContactFormSubmit);
  on('contactAgainBtn', 'click', handleContactAgain);
}
