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

    // just like in the example with the callbacks
    elem.onclick = function(event) {
      if (event.target.closest('.title')) {
        toggle();
      }

      if (event.target.closest('a')) {
        event.preventDefault();
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

  // all right so here we have a slightly different Story
  function select(link) {
    // here we are sure that a selection happens
    // however how do we handle it?
    // luckily here we don't have to worry about it
    // let's emanate an event and let the outer code handle
    // this functionality in the addEventListener(...)
    const widgetEvent = new CustomEvent("select", {
      bubbles: true,
      detail: link.getAttribute('href').slice(1)
    });
    elem.dispatchEvent(widgetEvent);
  }

  function open() {
    renderItems();
    elem.classList.add('open');
  };

  function close() {
    elem.classList.remove('open');
  };

  function toggle() {
    if (elem.classList.contains('open')) close();
    else open();
  };

  this.getElem = getElem;
  this.toggle = toggle;
  this.close = close;
  this.open = open;
}