function showError(container, errorMessage) {
  container.classList.add('error');
  const msgElem = document.createElement('span'); // $$
  msgElem.className = "error-message";
  msgElem.innerHTML = errorMessage;
  container.appendChild(msgElem);
}

function resetError(container) {
  if(container.classList.contains('error')) {
    container.classList.remove('error');
    container.querySelector('.error-message').remove();
  }
}

function validate(form) {
  const elems = form.elements;

  resetError(elems.from.parentElement);
  if (!elems.from.value) {
    showError(elems.from.parentElement, 'Who from?');
  }

  resetError(elems.password.parentElement);
  if (!elems.password.value) {
    showError(elems.password.parentElement, 'Please fill in the password filed');
  } else if (elems.password.value != elems.password2.value) {
    showError(elems.password.parentElement, 'Passwords don\'t match');
  }

  resetError(elems.to.parentElement);
  if (!elems.to.value) {
    showError(elems.to.parentElement, 'Fill where you are writing from');
  }

  resetError(elems.message.parentElement);
  if (!elems.message.value) {
    showError(elems.message.parentElement, 'No message text');
  }

  if(document.querySelector('.error')) return false;
}