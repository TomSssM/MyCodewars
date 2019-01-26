let tooltip;
// here is the algorithm in a nutshell:
// - mouseout doesn't remove a tooltip if it doesn't exist
// - mouseover creates a tooltip for the closest if the closest exists

document.onmouseover = function(event) {
  // important: a fast-moving mouse may "jump" right to a child on an annotated node, skipping the parent
  // so mouseover may happen on a child.

  let anchorElem = event.target.closest('[data-tooltip]'); // $$

  if (!anchorElem) return; // $$

  // show tooltip and remember it
  // createTooltip function is in a separate file
  tooltip = createTooltip(anchorElem, anchorElem.dataset.tooltip, window.pageXOffset, window.pageYOffset);
}

document.onmouseout = function() {
  // it is possible that mouseout triggered, but we're still inside the element (cause of bubbling)
  // but in this case we'll have an immediate mouseover,
  // so the tooltip will be destroyed and shown again

  // that's an overhead, but here it's not visible
  // can be fixed with additional checks
  // hi, Tom here, I fixed it :)
  if (tooltip) {
    tooltip.remove();
    tooltip = false;
  }
}