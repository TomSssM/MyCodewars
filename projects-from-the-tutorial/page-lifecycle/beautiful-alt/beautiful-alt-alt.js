/*
Usually before the image loads the user sees the default
alt text from the <img> alt attribute, however this
kind of text can't be formatted; so why not create a
preconfigured alt text with CSS and with use of JavaScript replace
it with an image as soon as the image loads; however some images will
produce an error while loading so in this case the <div>'s alt CSS text
shouldn't be replaced
*/

function replaceImg() {
  var divs = document.querySelectorAll('div.img-replace');
  for (var i = 0; i < divs.length; i++)(function(i) {
    var img = document.createElement('img');
    img.src = divs[i].getAttribute('data-src');
    img.className = 'img-replace';

    img.onload = function() {
      divs[i].parentNode.replaceChild(img, divs[i]);
    }
  }(i))
}

setTimeout(replaceImg, 1000); // imitating 1 sec delay as though to load an image