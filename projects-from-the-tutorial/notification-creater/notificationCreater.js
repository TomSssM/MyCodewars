const createNot = (function() {
  let invCou = 0;
  return function(options) {
    invCou += 1;
    const nots = document.createElement('div');
    nots.style.cssText = 'display: block; position: absolute; padding: 10px 20px;';
    if(options.cssText) nots.style.cssText += options.cssText;

    if(options.className) nots.classList.add(options.className);
    nots.innerHTML = `${invCou} `;
    if(options.html) nots.insertAdjacentHTML('beforeEnd', options.html);

    nots.style.top = options.top || '10px';
    nots.style.right = options.right || '10px';
    document.body.appendChild(nots);

    setTimeout(function() {
      nots.parentElement.removeChild(nots);
    }, 2000);
  }
})();

const options = {
  top: '20px',
  right: '20px',
  html: 'I am a <i>notification</i>',
  cssText: 'background: yellow; color: orange; border: 1px solid brown; border-radius: 70px;',
  className: 'myClass',
};

setInterval(createNot, 3000, options);