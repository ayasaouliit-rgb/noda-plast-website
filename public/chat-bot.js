const CHAT_QA = [
  {
    q: 'What BOPP films do you produce?',
    a: 'We manufacture MATTN, MATTS, NLC, NLV, NNC, NRC, NSC, NSH, NSMM, NSP, NSW and NVMM BOPP films.'
  },

  {
    q: 'What applications do you support?',
    a: 'Our films support food packaging, labels, printing, lamination, industrial and specialty applications.'
  },

  {
    q: 'How is quality controlled?',
    a: 'We take quality seriously and verify product quality throughout the production process before release.'
  },

  {
    q: 'What specifications can I choose?',
    a: 'Customers can select the available film thickness, width and treatment according to the selected film type.'
  },

  {
    q: 'What thicknesses are available?',
    a: 'Available thickness options are 15, 18, 20, 22, 23, 25, 30, 35, 38, 40, 45, 50 and 70 MIC.'
  },

  {
    q: 'What widths are available?',
    a: 'Film widths can be selected from 400 mm up to 2000 mm.'
  },

  {
    q: 'What treatments are available?',
    a: 'Available treatments are ONE SIDE TREATED IN, ONE SIDE TREATED OUT and BOTH SIDE TREATED.'
  },

  {
    q: 'How can I contact sales?',
    a: 'You can reach our sales team at commercial@nodaplast-film.com. For general enquiries, contact us at contact@nodaplast-film.com.'
  },

  {
    q: 'Where is NODA PLAST located?',
    a: 'NODA PLAST FILM is located in the Industrial Zone, Guidjel, Sétif, Algeria (demo address shown in this prototype).'
  }
];
/* ============================================================
   CHATBOT
   ============================================================ */

const chatFab =
  document.getElementById(
    'chatFab'
  );


const chatPanel =
  document.getElementById(
    'chatPanel'
  );


const chatBody =
  document.getElementById(
    'chatBody'
  );


const chatInputRow =
  document.getElementById(
    'chatInputRow'
  );


function chatInit() {

  if (!chatBody) return;

  /* Preserve any existing conversation messages when re-rendering */
  const existingMessages = Array.from(chatBody.children)
    .filter(el => !el.classList.contains('quick-qs'))
    .map(el => el.cloneNode(true));

  chatBody.innerHTML = `
    <div class="msg msg-bot" data-i18n="Hello! I'm the NODA PLAST assistant. Ask me about our BOPP films, applications, quality or specifications.">
      Hello! I'm the NODA PLAST assistant.
      Ask me about our BOPP films,
      applications, quality or specifications.
    </div>
  `;

  const qWrap = document.createElement('div');
  qWrap.className = 'quick-qs';

  CHAT_QA.forEach(item => {

    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'quick-q';

    /* Store the ORIGINAL English strings */
    b.dataset.i18n = item.q;
    b.textContent = i18nText(item.q);

    b.addEventListener('click', () => {
      chatAsk(item.q, item.a);
    });

    qWrap.appendChild(b);
  });

  chatBody.appendChild(qWrap);

  /* Restore the previous conversation (translated if needed) */
  existingMessages.forEach(node => {
    const text = node.textContent;
    node.textContent = i18nText(text);
    chatBody.appendChild(node);
  });
}

/* Re-render the chat when the language changes */
window.refreshChatTranslations = function () {
  if (chatBody && chatBody.children.length) {
    chatInit();
  }
};


function chatAsk(question, answerOverride) {

  if (!chatBody) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'msg msg-user';
  userMsg.textContent = i18nText(question);
  chatBody.appendChild(userMsg);

  const typing = document.createElement('div');
  typing.className = 'typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  chatBody.appendChild(typing);

  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {

    typing.remove();

    const match = CHAT_QA.find(
      x => x.q.toLowerCase() === question.toLowerCase()
    );

    /* Prefer the English answer so it can always be re-translated */
    let answer = match ? match.a : answerOverride;
    let answerEnglish = answer;

    if (!answer) {
      const product = PRODUCTS.find(p =>
        question.toLowerCase().includes(p.code.toLowerCase())
      );

      if (product) {
        answerEnglish =
          `${product.code} — ${product.shortName}. Available thicknesses: ${product.thicknesses.join(', ')}. Width range: ${product.widthMin}–${product.widthMax} mm. Available treatments: ${product.treatments.join(', ')}.`;
        answer = answerEnglish;
      }
    }

    if (!answer) {
      answerEnglish =
        "Thanks for your question. This prototype uses a fixed set of answers. Try asking about our film types, thicknesses, widths, treatments, applications or contact information.";
      answer = answerEnglish;
    }

    const botMsg = document.createElement('div');
    botMsg.className = 'msg msg-bot';

    /* Store the English original so it can be re-translated later */
    botMsg.dataset.i18n = answerEnglish;
    botMsg.textContent = i18nText(answerEnglish);

    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

  }, 700 + Math.random() * 400);
}


if (chatFab) {

  chatFab.addEventListener(
    'click',
    () => {

      if (chatPanel)
        chatPanel.classList.add('open');


      if (
        chatBody &&
        !chatBody.innerHTML
      ) {

        chatInit();

      }

    }
  );

}


on(
  'chatCloseBtn',
  'click',
  () => {

    if (chatPanel)
      chatPanel.classList.remove(
        'open'
      );

  }
);


if (chatInputRow) {

  chatInputRow.addEventListener(
    'submit',
    function (e) {

      e.preventDefault();


      const input =
        document.getElementById(
          'chatInput'
        );


      if (!input) return;


      const val =
        input.value.trim();


      if (!val) return;


      chatAsk(val);


      input.value = '';

    }
  );

}