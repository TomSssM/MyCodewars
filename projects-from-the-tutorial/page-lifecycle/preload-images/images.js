/*
Normally, images are loaded when they are created.
So when we add <img> to the page, the user does not see the picture immediately.
The browser needs to load it first.

To show an image immediately, we can create it “in advance”, like this:

let img = document.createElement('img');
img.src = 'my.jpg';

The browser starts loading the image and remembers it in the cache. Later, when
the same image appears in the document (no matter how), it shows up immediately.
Create a function preloadImages(sources, callback) that loads all images from
the array sources and, when ready, runs callback.

For instance, this will show an alert after the images are loaded:

function loaded() {
  alert("Images loaded")
}
preloadImages(["1.jpg", "2.jpg", "3.jpg"], loaded);

In case of an error, the function should still assume the picture “loaded”.
In other words, the callback is executed when all images are either loaded or errored out.
The function is useful, for instance, when we plan to show a gallery with many
scrollable images, and want to be sure that all images are loaded.
*/

function preloadImages(sources, callback) {
  let loadedCount = 0;
  const countIt = () => {
    loadedCount++;
    if(loadedCount === sources.length) callback();
  };
  sources.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.onload = img.onerror = countIt;
  });
}

// ---------- The test ----------

let sources = [
  "https://en.js.cx/images-load/1.jpg",
  "https://en.js.cx/images-load/2.jpg",
  "https://en.js.cx/images-load/3.jpg"
];

// add random characters to prevent browser caching
for (let i = 0; i < sources.length; i++) {
  sources[i] += '?' + Math.random();
}

// for each image,
// let's create another img with the same src and check that we have its width immediately
// if it was loaded in advance the width will have the correct value (=== 100)

function testLoaded() {
  let widthSum = 0;
  for (let i = 0; i < sources.length; i++) {
    let img = document.createElement('img');
    img.src = sources[i];
    widthSum += img.width;
  }
  alert(widthSum);
}
// on its own the function will alert 0 as the
// images haven't been loaded yet thus their width is 0
testLoaded();
// we also have a little delay between the two
// alerts while the images are being loaded
// every image is 100x100, the total width should be 300
preloadImages(sources, testLoaded);