const info = {
  tooltip: null,
  currentElement: null,
};

// const offset = 7;
// const createTooltip = function(element, pageX, pageY) {
//   const box = element.getBoundingClientRect();
//   const tooltip = document.createElement('div');
//   tooltip.classList.add('tooltip');
//   tooltip.innerHTML = element.dataset.tooltip;
//   document.body.append(tooltip);
//   tooltip.style.top = `${pageY + box.top - tooltip.offsetHeight - offset}px`;
//   tooltip.style.left = `${pageX + box.left + element.offsetWidth / 2 - tooltip.offsetWidth / 2}px`;
//   return tooltip;
// };

document.addEventListener('mouseover', function(e) {
  // console.log(e.target);
  // console.log(e.relatedTarget);

  if(info.tooltip) return;

  let target = e.target;

  while(target) {
    if(target === info.currentElement) return;
    if(target.dataset.tooltip) {
      info.currentElement = target;
      info.tooltip = true;
      console.log('... create a new tooltip');
      return;
    }
    target = target.parentElement;
  }
});

document.addEventListener('mouseout', function(e) {
  // console.log(e.target);
  // console.log(e.relatedTarget);

  if(!info.tooltip) return;

  let relatedTarget = e.relatedTarget;

  while(relatedTarget) {
    if(relatedTarget === info.currentElement) return;
    if(relatedTarget.dataset.tooltip) {
      info.currentElement = null;
      info.tooltip = false;
      console.log('... delete previous tooltip');
      return;
    }
    relatedTarget = relatedTarget.parentElement;
  }

  info.currentElement = null;
  info.tooltip = false;
  console.log('... delete previous tooltip');
});