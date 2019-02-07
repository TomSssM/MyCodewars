let i = 0;

function populate() {
  while(true) {
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
    document.body.insertAdjacentHTML("beforeend", `<p>Endless JS ${i++}</p>`);
  }
}

window.addEventListener('scroll', populate);
populate(); // init document

// windowRelativeBottom is the space in px from the
// upper edge of the viewport till the document end
// the populate function is going to keep making paragraphs
// untill this measure (windowRelativeBottom) exceed the viewport
// becoming a value of over (viewport height + 100)
// when we call the populate the first time the windowRelativeBottom is
// actually even less than viewport so we create the paragraphs