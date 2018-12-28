const paneses = Array.from(document.querySelectorAll('.pane'));

const task = function() {
  paneses.forEach(pane => {
    const button = document.createElement('button');
    button.classList.add('remove-button');
    button.textContent = '[x]';
    button.addEventListener('click', function() {
      this.parentElement.classList.add('shrink');
      setTimeout(() => {
        this.parentElement.parentElement.removeChild(this.parentElement);
      }, 300);
    });
    pane.appendChild(button);
  });
};

// task();