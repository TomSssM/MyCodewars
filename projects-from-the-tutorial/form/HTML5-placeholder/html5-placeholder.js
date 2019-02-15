Array.from(document.querySelectorAll('.placeholder')).forEach(plc => {
  const elem = document.querySelector(`[data-name="${plc.dataset.elem}"]`);
  const coords = elem.getBoundingClientRect();

  plc.style.top = `${coords.top + 3 + window.pageYOffset}px`;
  plc.style.left = `${3 + coords.left + window.pageXOffset}px`;

  elem.addEventListener('focus', function(e) {
    const plc = document.querySelector(`[data-name="${e.target.dataset.placeholder}"]`);
    plc.hidden = true;
  });

  elem.addEventListener('blur', function(e) {
    const plc = document.querySelector(`[data-name="${e.target.dataset.placeholder}"]`);
    plc.hidden = false;
  });
});

document.addEventListener('click', function(e) {
  if(e.target.classList.contains('placeholder')) {
    const elem = document.querySelector(`[data-name="${e.target.dataset.elem}"]`);
    elem.focus();
  }
});