class Menu {
  constructor(options) {
    this.title = options.title || '';
    this.items = options.items || [];
  }

  getElem() {
    if(!this.elem) this.render();
    return this.elem;
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('menu');

    this.titleElem = document.createElement('span');
    this.elem.appendChild(this.titleElem);
    this.titleElem.classList.add('title');
    this.titleElem.textContent = this.title;

    this.elem.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });

    this.elem.addEventListener('click', (e) => {
      if(e.target.closest('.title')) this.toggle();
    });
  }

  toggle() {
    if (this.elem.classList.contains('open')) this.close();
    else this.open();
  }

  open() {
    if(!this.elem.querySelector('ul')) this.renderItems();
    this.elem.classList.add('open');
  }

  close() {
    this.elem.classList.remove('open');
  }

  renderItems() {
    const ul = document.createElement('ul');
    this.items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.append(li);
    });
    this.elem.append(ul);
  }
}