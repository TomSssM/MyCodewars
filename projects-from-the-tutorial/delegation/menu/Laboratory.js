const menu = document.querySelector('#menu');

class Menu {
  constructor(elem) {
    this.save = function() {
      alert('saving');
    };
    this.load = function() {
      alert('loading');
    };
    this.search = function() {
      alert('searching');
    };
    elem.onclick = e => {
      const action = e.target.dataset.action;
      if(action) {
        this[action]();
      } else {
        alert('no action found');
      }
    };
  }
}

new Menu(menu);