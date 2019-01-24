const info = {
  tooltip: null,
  currentElement: null,
};

document.addEventListener('mouseover', function(e) {
  if(info.tooltip) return;

  let target = e.target;

  while(target && !(target.dataset.tooltip)) {
    target = target.parentElement;
  }

  if(target === info.currentElement) return;

  if(target) {
    info.currentElement = target;
    
    // createTooltip function is in a separate file
    info.tooltip = createTooltip(info.currentElement, info.currentElement.dataset.tooltip, window.pageXOffset, window.pageYOffset);
  }
  
});

document.addEventListener('mouseout', function(e) {
  if(!info.tooltip) return;
  
  let relatedTarget = e.relatedTarget;
  
  while(relatedTarget && !(relatedTarget.dataset.tooltip)) {
    relatedTarget = relatedTarget.parentElement;
  }
  
  if(relatedTarget === info.currentElement) return;
  
  info.currentElement = null;
  info.tooltip.remove();
  info.tooltip = null;
});