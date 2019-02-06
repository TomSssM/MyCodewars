const elem = document.getElementById('container');

if (elem.addEventListener) {
  if ('onwheel' in document) {
    // IE9+, FF17+
    elem.addEventListener("wheel", onWheel);
  } else if ('onmousewheel' in document) {
    // outdated alternative
    elem.addEventListener("mousewheel", onWheel);
  } else {
    // Firefox < 17
    elem.addEventListener("MozMousePixelScroll", onWheel);
  }
} else { // IE8-
  elem.attachEvent("onmousewheel", onWheel);
}

function onWheel(e) {
  e = e || window.event;

  // deltaY, detail is the scroll in pixels
  // wheelDelta isn't in px
  // onwheel || MozMousePixelScroll || onmousewheel
  const delta = e.deltaY || e.detail || e.wheelDelta;

  const info = document.getElementById('delta');

  info.innerHTML = +info.innerHTML + delta;

  e.preventDefault ? e.preventDefault() : (e.returnValue = false); // $$
}