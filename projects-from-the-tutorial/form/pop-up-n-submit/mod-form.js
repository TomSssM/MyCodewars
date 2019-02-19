const clickman = document.querySelector('#show');
const container = document.querySelector('#prompt-form-container');
const form = document.querySelector('#prompt-form');

clickman.addEventListener('click', function() {
  showPrompt("Enter something<br>...smart :)", function(value) {
    alert(value);
  });
});

const coverPage = function() {
  // what an ingenious way to cover the page actually
  const div = document.createElement('div');
  div.classList.add('hideman');

  // hide scrollbars
  document.body.style.overflow = 'hidden';

  // cover the viewport (after hiding the scrollbars)
  document.body.append(div);
};

const uncoverPage = function() {
  const div = document.querySelector('.hideman');
  div.classList.remove('visible');
  setTimeout(() => {
    div.remove();
    document.body.style.overflow = '';
  }, 200);
};

const showPrompt = function(html, callback) {
  coverPage();

  form.querySelector('#prompt-message').innerHTML = html;
  form.elements.text.value = '';
  container.style.display = 'block';
  container.classList.remove('hide');
  // form.elements.text.focus();

  const firstElem = form.elements[0];
  const lastElem = form.elements[form.elements.length - 1];

  firstElem.addEventListener('keydown', function(e) {
    if(e.code === 'Tab' && e.shiftKey) {
      e.preventDefault();
      lastElem.focus();
    }
  });

  lastElem.addEventListener('keydown', function(e) {
    if(e.code === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      firstElem.focus();
    }
  });
  
  const onsuccess = function(e) {
    e.preventDefault();
    const text = e.currentTarget.elements.text.value;
    if(!text) return;
    callback(text);
    remList();
  };

  const oncancel = function() {
    callback(null);
    remList();
  };

  const escapeCheck = function(e) {
    if(e.code === 'Escape') {
      oncancel();
    }
  };
  
  const remList = function() {
    uncoverPage();
    setTimeout(() => container.style.display = 'none', 200);
    form.classList.remove('visible');
    document.removeEventListener('keydown', escapeCheck);
    form.elements.cancel.removeEventListener('click', oncancel);
    form.removeEventListener('submit', onsuccess);
  };
  
  document.addEventListener('keydown', escapeCheck);
  form.addEventListener('submit', onsuccess);
  form.elements.cancel.addEventListener('click', oncancel);


  setTimeout(() => document.body.querySelector('.hideman').classList.add('visible'),0);
  setTimeout(() => form.classList.add('visible'),0);
};