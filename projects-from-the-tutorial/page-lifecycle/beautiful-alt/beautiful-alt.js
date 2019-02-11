const divs = Array.from(document.querySelectorAll('.img-replace'));

// prevent caching
divs.forEach(div => div.dataset.src += `?${Math.random()}`);

const preload = function() {
  let loadedCount = 0;
  const handler = function(e) {
    loadedCount += 1;
    if(e.type === 'load') {
      divs[e.currentTarget.dataset.order].dataset.show = 'OK';
    }
    if(loadedCount === divs.length) createImgs();
  };

  divs.forEach((div, i) => {
    const img = document.createElement('img');
    img.src = div.dataset.src;
    img.dataset.order = i;
    img.onload = img.onerror = handler;
  });
};

const createImgs = function() {
  divs.forEach(div => {
    if(div.dataset.show === 'OK') {
      div.innerHTML = '';
      const img = document.createElement('img');
      img.src = div.dataset.src;
      div.append(img);
    } 
  });
};
preload();

// in order to use the local images (not on the web)
// do use the code below and comment line 4 and 34
setTimeout(preload, 1000);