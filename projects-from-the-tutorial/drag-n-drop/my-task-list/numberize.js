Array.from(document.querySelectorAll('[data-value]')).forEach(v => v.querySelector('div').textContent = v.dataset.value);
const notepad = document.querySelector('#notepad');
notepad.style.marginTop = `${-1 * notepad.offsetHeight / 2}px`;