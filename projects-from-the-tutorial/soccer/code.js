const ball = document.getElementById('ball');
const marg = document.getElementById('marg');
const siz = document.getElementById('siz');
const spanSize = document.getElementById('size-value');
const spanMarg = document.getElementById('margin-value');
const toggMar = document.getElementById('toggMar');
const marginRow = document.querySelectorAll('.margRow');

const createBall = function() {
  ball.style.margin = `${marg.value}px`;
  ball.style.width = `${siz.value}px`;
  ball.style.height = `${siz.value}px`;
  spanSize.textContent = `${siz.value}px`;
  spanMarg.textContent = `${marg.value}px`;
};

const moveBall = function() {
  const marginTop = parseFloat(getComputedStyle(ball).marginTop, 10);
  const marginLeft = parseFloat(getComputedStyle(ball).marginLeft, 10);
  ball.style.top = (ball.parentElement.clientHeight / 2) - (ball.offsetHeight / 2) - marginTop + 'px';
  ball.style.left = (ball.parentElement.clientWidth / 2) - (ball.offsetWidth / 2) - marginLeft + 'px';
};

const freezeMar = function() {
  Array.from(marginRow).forEach(v => {
    v.classList.toggle('frozen');
  });
  if(Array.from(marginRow).every(v => v.classList.contains('frozen'))) {
    ball.style.margin = '0px';
  } else {
    ball.style.margin = marg.value + 'px';
  }
};
createBall();