// we could also check scrollTop / scrollLeft of body and html elements
// to get the value of scroll but let's enjoy pageYOffset
// rect.right could be replaced as rect.left + anchor.offsetWidth
const anchor = document.getElementById('smth');

const positionAt = function(anchor, position = 'top-out', html = '') {
  const rect = anchor.getBoundingClientRect();

  const element = document.createElement('span');
  element.classList.add('note');
  element.textContent = html;
  document.body.appendChild(element);

  switch(position) {
    case 'bottom-out':
    element.style.top = `${rect.bottom + window.pageYOffset}px`;
    element.style.left = `${rect.left + window.pageXOffset}px`;
    break;
    case 'right-out':
    element.style.left = `${rect.right + window.pageXOffset}px`;
    element.style.top = `${rect.top + window.pageYOffset}px`;
    break;
    case 'top-out':
    element.style.left = `${rect.left + window.pageXOffset}px`;
    element.style.top = `${rect.top - element.offsetHeight + window.pageYOffset}px`;
    break;
    case 'bottom-in':
    element.style.top = `${rect.bottom + window.pageYOffset - element.offsetHeight}px`;
    element.style.left = `${rect.left + window.pageXOffset}px`;
    break;
    case 'top-in':
    element.style.left = `${rect.left + window.pageXOffset}px`;
    element.style.top = `${rect.top + window.pageYOffset}px`;
    break;
    case 'right-in':
    element.style.left = `${rect.right - element.offsetWidth + window.pageXOffset}px`;
    element.style.top = `${rect.top + window.pageYOffset}px`;
  }
}

positionAt(anchor, 'bottom-out', 'bottom-out');
positionAt(anchor, 'bottom-in', 'bottom-in');
positionAt(anchor, 'top-out', 'top-out');
positionAt(anchor, 'top-in', 'top-in');
positionAt(anchor, 'right-out', 'right-out');
positionAt(anchor, 'right-in', 'right-in'); 