const createPlcHolder = function(input) {
  input.classList.add('placeholder');
  input.value = input.dataset.placeholder;
};

const createTooltip = function(input) {
  input.classList.remove('placeholder');
  input.value = '';

  currentTooltip = document.createElement('span');
  currentTooltip.textContent = input.dataset.placeholder;
  currentTooltip.classList.add('placeholder');
  currentTooltip.style.position = 'absolute';
  document.body.append(currentTooltip);

  const coords = input.getBoundingClientRect();
  currentTooltip.style.top = `${coords.top + window.pageYOffset - currentTooltip.offsetHeight}px`;
  currentTooltip.style.left = `${coords.left + window.pageXOffset}px`;
};

const removeTooltip = function() {
  if(currentTooltip) {
    currentTooltip.remove();
    currentTooltip = null;
  }
};

const inputs = Array.from(document.querySelectorAll('[data-placeholder]'));
inputs.forEach(put => createPlcHolder(put));
let currentTooltip = null;

document.addEventListener('focus', function(e) {
  const target = e.target;
  // the following line is where I errer yesterday
  // we should only create a tooltip and remove the value of input if it
  // is showing the blue placeholder, my initial attempt was to check that the
  // value be same as the value in dataset.placehodler but it is stupid, in reality
  // it is so simple, if we indeed are showing a placeholder for an input and
  // the input is going to have a class placeholder and if someone simply typed
  // the same value as the placeholder well we won't show a tooltip again cause
  // the input isn't going to have a class placehodlder on it 
  if(target.dataset.placeholder && target.classList.contains('placeholder')) {
    createTooltip(target);
  }
}, true);

document.addEventListener('blur', function(e) {
  const target = e.target;
  if(target.dataset.placeholder) {
    if(!target.value) createPlcHolder(target);
    removeTooltip();
  }
}, true);

// or we could handle Event Delegation with focusin / focusout instead:

// document.addEventListener('focusin', function(e) {
//   const target = e.target;
//   if(target.dataset.placeholder && target.classList.contains('placeholder')) {
//     createTooltip(target);
//   }
// });

// document.addEventListener('focusout', function(e) {
//   const target = e.target;
//   if(target.dataset.placeholder) {
//     if(!target.value) createPlcHolder(target);
//     removeTooltip();
//   }
// });