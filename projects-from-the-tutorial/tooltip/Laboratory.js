const offset = 3;
let showingTooltip = null;

document.addEventListener('mouseover', function(e) {
  const elm = e.target;
  const tooltipText = elm.dataset.tooltip;

  if(!tooltipText) return;
  const rect = elm.getBoundingClientRect();
  const tooltip = document.createElement('div');

  tooltip.classList.add('tooltip');
  document.body.appendChild(tooltip);
  tooltip.innerHTML = tooltipText;

  const left = rect.left + (elm.offsetWidth - tooltip.offsetWidth) / 2;
  const top = rect.top - offset - tooltip.offsetHeight;

  tooltip.style.top = top < 0 ? `${rect.bottom + offset}px` : `${top}px`;
  tooltip.style.left = left < 0 ? `0px` : `${left}px`;
  showingTooltip = tooltip;
});

document.addEventListener('mouseout', function(e) {
  if(!e.target.dataset.tooltip) return;
  if(showingTooltip) {
    showingTooltip.parentElement.removeChild(showingTooltip);
    showingTooltip = null;
  }
});