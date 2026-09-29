import { JOBS } from '../data/careers.js';
import { i18nText } from '../core/i18n.js';
import { on } from '../core/dom.js';
import { setFormLoading, showFormError, clearFormError } from '../core/ui.js';
import { showPage } from './navigation.js';

import { getFormValues, sendEmailRequest } from './contact.js';

export function renderJobsGrid() {
  const containers = document.querySelectorAll(".careers-jobs");

  containers.forEach(container => {
    container.innerHTML = "";
    JOBS.forEach(job => {

      const article = document.createElement("article");

      article.className = "card careers-job";
      article.id = `job-${job.id}`;
      article.dataset.jobId = job.id;

      article.innerHTML = `
        <div class="careers-job-main">
          <div class="careers-job-category" data-i18n="${job.category}">
            ${i18nText(job.category)}
          </div>
          <h3 data-i18n="${job.title}">
            ${i18nText(job.title)}
          </h3>
          <p data-i18n="${job.description}">
            ${i18nText(job.description)}
          </p>
          <div class="tag-row">
            ${job.tags.map(tag => `
              <span class="tag" data-i18n="${tag}">${i18nText(tag)}</span>
            `).join("")}
          </div>
        </div>

        <div class="careers-job-side">
          <div class="careers-job-detail">
            <span data-i18n="Location">${i18nText('Location')}</span>
            <strong data-i18n="${job.location}">${i18nText(job.location)}</strong>
          </div>
          <div class="careers-job-detail">
            <span data-i18n="Employment">${i18nText('Employment')}</span>
            <strong data-i18n="${job.employment}">${i18nText(job.employment)}</strong>
          </div>
          <a
            href="#careers-apply"
            class="btn btn-primary btn-sm"
            data-position="${job.title}"
          >
            <span data-i18n="Apply now">Apply now</span>
          </a>
        </div>
      `;

      container.appendChild(article);
    });

    if (container.id === "career-grid") {
      // Keep the "no vacancies" section exactly as it was
      const noVacancies = document.createElement("div");
      noVacancies.className = "careers-no-vacancies";

      noVacancies.innerHTML = `
      <div class="careers-no-icon">+</div>
      <div>
        <h3 data-i18n="Don't see the right position?">Don't see the right position?</h3>
        <p data-i18n="We are always interested in meeting motivated people. Send us your CV and we will keep your profile in mind for future opportunities.">
          We are always interested in meeting motivated people.
          Send us your CV and we will keep your profile in mind
          for future opportunities.
        </p>
      </div>
      <a href="#careers-apply" class="btn btn-secondary btn-sm">
        <span data-i18n="Send your CV">Send your CV</span>
      </a>
    `;

      container.appendChild(noVacancies);
    }

  });
}

export async function handleCareerFormSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  clearFormError(form);

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const cvInput = document.getElementById('career-cv');
  const cvFile = cvInput ? cvInput.files[0] : null;

  if (!cvFile) {
    showFormError(form, 'Please upload your CV before submitting.');
    return;
  }

  // Allowed file types
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  const allowedExtensions = ['pdf', 'doc', 'docx'];
  const fileExtension = cvFile.name.split('.').pop().toLowerCase();

  if (
    !allowedTypes.includes(cvFile.type) &&
    !allowedExtensions.includes(fileExtension)
  ) {
    showFormError(form, 'Please upload your CV as a PDF, DOC, or DOCX file.');
    return;
  }

  // File size limit: 5 MB
  const maxFileSize = 5 * 1024 * 1024;
  if (cvFile.size > maxFileSize) {
    showFormError(form, 'Your CV is too large. Please upload a file smaller than 5 MB.');
    return;
  }

  setFormLoading(form, true);

  try {
    await sendCareerApplication(form);

    form.style.display = 'none';

    const success = document.getElementById('career-success');
    if (success) success.classList.add('show');

    form.reset();
    clearFormError(form);

  } catch (error) {
    showFormError(
      form,
      error.message ||
      'We could not send your application. Please try again or contact HR directly.'
    );
  } finally {
    setFormLoading(form, false);
  }
}

export function resetCareerForm() {

  const form =
    document.getElementById('career-form');

  const success =
    document.getElementById('career-success');

  const cvInput =
    document.getElementById('career-cv');

  if (form) {
    form.reset();
    form.style.display = '';
    clearFormError(form);
  }

  if (cvInput) {
    cvInput.value = '';
  }

  if (success) {
    success.classList.remove('show');
  }

}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // result looks like: "data:application/pdf;base64,JVBERi0x..."
      const base64 = String(reader.result).split(',')[1];
      resolve(base64);
    };

    reader.onerror = () => reject(
      new Error('Could not read the CV file. Please try again.')
    );

    reader.readAsDataURL(file);
  });
}

export async function sendCareerApplication(form) {
  const cvInput = document.getElementById('career-cv');
  const cvFile = cvInput ? cvInput.files[0] : null;

  if (!cvFile) {
    throw new Error('Please upload your CV before submitting.');
  }

  // Convert CV to base64 so it can travel inside the JSON payload
  const cvBase64 = await fileToBase64(cvFile);

  const values = getFormValues(form);

  const payload = {
    type: 'career',
    name: values.name || '',
    email: values.email || '',
    phone: values.phone || '',
    position: values.position || 'General application',
    message: values.message || '',
    consent: values.consent ? 'Yes' : 'No',

    // Attachment info for the backend
    attachment: {
      filename: cvFile.name,
      mimeType: cvFile.type || 'application/octet-stream',
      content: cvBase64
    }
  };

  return sendEmailRequest(payload);
}

export function openCareerPosition(jobId = null) {

  // Open the Careers page
  showPage('careers');

  // Wait until the page is visible and job cards exist
  setTimeout(() => {

    // If no specific job was supplied,
    // simply go to the vacancies section.
    if (!jobId) {

      const vacancies =
        document.getElementById('careers-vacancies');

      if (vacancies) {
        vacancies.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

      return;
    }

    // Find the exact job card
    const target =
      document.getElementById(`job-${jobId}`);

    if (!target) {
      console.warn(
        `Career position not found: ${jobId}`
      );
      return;
    }

    // Scroll directly to that job
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    // Highlight the selected job
    target.classList.remove(
      'career-job-highlight'
    );

    void target.offsetWidth;

    target.classList.add(
      'career-job-highlight'
    );

  }, 80);
}

export function initCareers() {

const careerCvInput = document.getElementById('career-cv');

if (careerCvInput) {

  careerCvInput.addEventListener('change', function () {


    const file = this.files[0];

    const fileText =
      document.querySelector(
        '.careers-file-text strong'
      );

    const fileSubtext =
      document.querySelector(
        '.careers-file-text small'
      );

    if (!file) {

      if (fileText) {
        fileText.textContent = i18nText('Upload your CV');
      }

      if (fileSubtext) {
        fileSubtext.textContent =
          i18nText('PDF, DOC or DOCX');
      }

      return;
    }

    if (fileText) {
      fileText.textContent = file.name;
    }

    if (fileSubtext) {

      const sizeMB =
        (file.size / (1024 * 1024)).toFixed(2);

      fileSubtext.textContent =
        `${sizeMB} ${i18nText('MB • Ready to upload')}`;

    }


  });

}

on(
  'career-again-btn',
  'click',
  resetCareerForm
);

on(
  'career-form',
  'submit',
  handleCareerFormSubmit
);

document.addEventListener('click', function (e) {

  const applyButton =
    e.target.closest('[data-position]');

  if (!applyButton) return;

  const position =
    applyButton.getAttribute('data-position');

  const positionSelect =
    document.getElementById('career-position');

  if (positionSelect && position) {
    positionSelect.value = position;
  }

  /*
  
  * Scroll to application form
    */
  const applicationSection =
    document.getElementById('careers-apply');

  if (applicationSection) {


    applicationSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });


  }

});
}
