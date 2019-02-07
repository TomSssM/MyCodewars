const createPar = function() {
  const p = document.createElement('p');
  p.appendChild(document.createTextNode(`Endless JS ${i++}`));
  document.body.append(p);
};

let i = 0;
while(i < 20) {
  createPar();
}

document.addEventListener('scroll', function() {
  const html = document.documentElement;
  const scrollBottom = html.scrollHeight - (window.pageYOffset + html.clientHeight);
  if(scrollBottom - 10 <= 0) createPar();
});