(() => {
  const form = document.querySelector('form[name="contatti"]');
  if (!form) return;
  const panel = form.parentElement;
  const chat = document.createElement('section');
  chat.className = 'contact-chat';
  chat.setAttribute('aria-label', 'Chat per contattare Giada');
  chat.innerHTML = `<header><span class="chat-status">LET'S TALK</span><h2>Il tuo prossimo progetto<br>inizia qui.</h2><p>Quattro domande, poi il messaggio arriva a Giada.</p></header><div class="chat-log" role="log" aria-live="polite" aria-relevant="additions"></div><form class="chat-composer"><label for="chat-answer">La tua risposta</label><input id="chat-answer" required maxlength="150" autocomplete="name" placeholder="Il tuo nome"><p class="chat-error" role="alert"></p><button type="submit">Continua →</button></form><div class="chat-actions" hidden><button type="button" class="chat-send">Invia a Giada →</button><button type="button" class="chat-restart">Ricomincia</button></div>`;
  panel.prepend(chat);
  form.hidden = true;
  const log = chat.querySelector('.chat-log');
  const composer = chat.querySelector('.chat-composer');
  const actions = chat.querySelector('.chat-actions');
  const questions = ['Ciao! Come ti chiami?', 'Piacere! A quale email può risponderti Giada?', 'Di cosa vorresti parlare?', 'Raccontami la tua idea: obiettivi, tempistiche e quello che hai in mente.'];
  const keys = ['name', 'email', 'subject', 'message'];
  let step = 0;
  function bubble(text, user = false) {
    const item = document.createElement('p');
    item.className = user ? 'chat-bubble chat-user' : 'chat-bubble';
    item.textContent = text;
    log.append(item);
  }
  function ask(focus = true) {
    bubble(questions[step]);
    composer.hidden = step === 2;
    if (step === 2) {
      const choices = document.createElement('div');
      choices.className = 'chat-choices';
      form.querySelectorAll('[name="subject"]').forEach(radio => {
        const button = document.createElement('button');
        button.type = 'button'; button.textContent = radio.value;
        button.addEventListener('click', () => { radio.checked = true; choices.remove(); answer(radio.value); });
        choices.append(button);
      });
      log.append(choices);
      if (focus) choices.querySelector('button').focus();
      return;
    }
    const old = composer.querySelector('input,textarea');
    const input = document.createElement(step === 3 ? 'textarea' : 'input');
    input.id = 'chat-answer'; input.required = true;
    input.maxLength = step === 3 ? 5000 : 150;
    if (step !== 3) {input.type = step === 1 ? 'email' : 'text'; input.autocomplete = step === 1 ? 'email' : 'name';}
    else input.rows = 4;
    input.placeholder = ['Il tuo nome', 'La tua email', '', 'Raccontami il tuo progetto…'][step];
    old.replaceWith(input);
    composer.querySelector('button').textContent = step === 3 ? 'Rivedi il messaggio →' : 'Continua →';
    if (focus) input.focus();
  }
  function answer(value) {
    if (step !== 2) form.elements[keys[step]].value = value;
    bubble(value, true);
    step++;
    if (step < 4) ask();
    else {
      composer.hidden = true;
      bubble('Tutto pronto! Controlla le risposte qui sopra. Quando invii, Giada riceverà il tuo messaggio e potrà risponderti via email.');
      actions.hidden = false;
      actions.querySelector('button').focus();
    }
  }
  composer.addEventListener('submit', event => {
    event.preventDefault();
    const input = composer.querySelector('input,textarea');
    const value = input.value.trim();
    input.setCustomValidity(value ? '' : 'Scrivi una risposta per continuare.');
    if (input.reportValidity()) answer(value);
  });
  composer.addEventListener('input', () => composer.querySelector('input,textarea').setCustomValidity(''));
  actions.querySelector('.chat-send').addEventListener('click', () => {
    if (form.checkValidity()) form.requestSubmit();
  });
  actions.querySelector('.chat-restart').addEventListener('click', () => {
    form.reset(); step = 0; log.replaceChildren(); actions.hidden = true; ask();
  });
  ask(false);
})();
