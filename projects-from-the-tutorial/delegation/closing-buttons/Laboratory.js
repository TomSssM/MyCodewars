const paneses = Array.from(document.querySelectorAll('.pane'));
const container = document.querySelector('#container');

const task = function() {
  paneses.forEach(pane => {
    const button = document.createElement('button');
    button.classList.add('remove-button');
    button.textContent = '[x]';
    pane.appendChild(button);
  });

  container.addEventListener('click', function(e) {
    if(e.target.classList.contains('remove-button')) {
      e.target.parentElement.classList.add('shrink');
      setTimeout(() => {
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
      }, 300);
    };
  });
};

// task();

// here is a canny alternative

container.onclick = function(event) {
  if (!event.target.classList.contains('remove-button')) return;
  event.target.parentNode.hidden = !event.target.parentNode.hidden;
}