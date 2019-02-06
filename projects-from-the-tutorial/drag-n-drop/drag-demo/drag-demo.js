const colors = ['yellow', 'orange', 'brown', 'aqua'];
let dragData = {};

const getRndInteger = function(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
};

const makeDivs = function(e) {
  e.currentTarget.remove();
  for(let i = 0; i < 10; i++) {
    const div = document.createElement('div');
    div.style.height = '300px';
    div.style.backgroundColor = colors[getRndInteger(0, colors.length)];
    document.body.append(div);
  }

  dude.style.display = 'block';
  dude.style.top = `${document.documentElement.clientHeight / 2  - dude.offsetHeight / 2}px`;
  dude.style.left = `${document.documentElement.clientWidth / 2  - dude.offsetWidth / 2}px`;
  dude.addEventListener('mousedown', mouseDown);
};

const mouseDown = function(e) {
  document.addEventListener('dragstart', (e) => e.preventDefault());

  dragData.elem = e.currentTarget;
  const coords = dragData.elem.getBoundingClientRect();
  dragData.shiftX = e.clientX - coords.left;
  dragData.shiftY = e.clientY - coords.top;

  const mouseMove = function(e) {
    let left = e.clientX - dragData.shiftX;
    let top = e.clientY - dragData.shiftY;

    dragData.elem.style.left = `${left}px`;
    dragData.elem.style.top = `${top}px`;

    if(top < 0) {
      dragData.elem.style.top = `0px`;

      const scrollerFun = function() {
        window.scrollBy(0, -4);
      };
      scrollerFun();
      const intOne = setInterval(scrollerFun, 30);
      const intTwo = setInterval(() => {
        if(!dragData.elem || !window.pageYOffset || dragData.elem.getBoundingClientRect().top > 0) {
          clearInterval(intOne);
          clearInterval(intTwo);
        }
      }, 30);

      dragData.intOne = intOne;
      dragData.intTwo = intTwo;
    }

    const bottom = dragData.elem.getBoundingClientRect().bottom;

    if(bottom > document.documentElement.clientHeight) {
      const maxTop = document.documentElement.clientHeight - dragData.elem.offsetHeight;
      dragData.elem.style.top = `${maxTop}px`;

      const scrollerFun = function() {
        window.scrollBy(0, 4);
      };
      scrollerFun();
      const intOne = setInterval(scrollerFun, 30);
      const intTwo = setInterval(() => {
        if(!dragData.elem || !window.pageYOffset || dragData.elem.getBoundingClientRect().top < maxTop) {
          clearInterval(intOne); 
          clearInterval(intTwo);
        }
      }, 30);

      dragData.intOne = intOne;
      dragData.intTwo = intTwo;
    }
  };

  const mouseUp = function() {
    clearInterval(dragData.intOne);
    clearInterval(dragData.intTwo);

    dragData = {};
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };

  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
};

create.addEventListener('click', makeDivs);