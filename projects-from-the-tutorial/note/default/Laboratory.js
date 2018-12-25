const positionAt = function(anchor, position = 'top', html = '') {
  const rect = anchor.getBoundingClientRect();

  const element = document.createElement('span');
  element.classList.add('note');
  element.textContent = html;
  document.body.appendChild(element);

  switch(position) {
    case 'bottom':
    element.style.top = `${rect.bottom}px`;
    element.style.left = `${rect.left}px`;
    break;
    case 'right':
    element.style.left = `${rect.right}px`;
    element.style.top = `${rect.top}px`;
    break;
    case 'top':
    element.style.left = `${rect.left}px`;
    element.style.top = `${rect.top - element.offsetHeight}px`;
  }
}

// positionAt(document.getElementById('smth'), 'bottom', 'I am a note!!!');