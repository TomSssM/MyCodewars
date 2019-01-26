const elem = document.querySelector('#elem');

setTimeout(function() {
  new HoverIntent({
    elem,
    over() {
      tooltip.hidden = false;
    },
    out() {
      tooltip.hidden = true;
    }
  });
}, 2000);