const offset = 7;

const createTooltip = function(elm, tooltipText, pageX, pageY) {
  const rect = elm.getBoundingClientRect();
  const tooltip = document.createElement('div');

  tooltip.classList.add('tooltip');
  document.body.appendChild(tooltip);
  tooltip.innerHTML = tooltipText;

  const left = rect.left + (elm.offsetWidth - tooltip.offsetWidth) / 2;
  const top = rect.top - offset - tooltip.offsetHeight;

  tooltip.style.top = top < 0 ? `${rect.bottom + offset + pageY}px` : `${top + pageY}px`;
  tooltip.style.left = left < 0 ? `0px` : `${left + pageX}px`;

  return tooltip;
};