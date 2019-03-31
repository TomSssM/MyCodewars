function Menu(options) {
  let elem;

  function getElem() {
    if (!elem) render();
    return elem;
  }

  function render() {
    const html = options.template({
      title: options.title
    });

    elem = document.createElement('div');
    elem.innerHTML = html;
    elem = elem.firstElementChild;

    elem.onmousedown = function() {
      return false;
    }

    elem.onclick = function(event) {
      if (event.target.closest('.title')) {
        toggle();
      }

      // here we make sure that clicks happens on A
      if (event.target.closest('a')) {
        event.preventDefault();
        // and we delegate the trouble of handling a selection
        // to the special function
        select(event.target.closest('a'));
      }

    }
  }

  function renderItems() {
    if (elem.querySelector('ul')) return;

    const listHtml = options.listTemplate({
      items: options.items
    });

    elem.insertAdjacentHTML("beforeEnd", listHtml);
  }

  function select(link) {
    // however our select function doesn't know on its own how to
    // handle selection but callback does!
    // so for this reason the select function calls the callback
    options.onselect(link.getAttribute('href').slice(1));
  }

  // the rest is usual stuff
  
  function open() {
    renderItems();
    elem.classList.add('open');
  }

  function close() {
    elem.classList.remove('open');
  }

  function toggle() {
    if (elem.classList.contains('open')) close();
    else open();
  }

  this.getElem = getElem;
  this.toggle = toggle;
  this.close = close;
  this.open = open;
}