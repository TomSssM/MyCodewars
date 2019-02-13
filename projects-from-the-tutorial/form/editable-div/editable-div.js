const div = document.querySelector('#view');

class Editor {
  constructor(div) {
    this.div = div;
    this.keyS = this.keyS.bind(this);
    this.esc = this.esc.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    document.addEventListener('keydown', this.onKeyDown);
    this.textarea = null;
    this.div.addEventListener('click', () => this.startEdit());
  }

  startEdit() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.addEventListener('keydown', this.keyS);
    document.addEventListener('keydown', this.esc);
    if(!this.textarea) this.initTxt();
    this.prevHTML = this.div.innerHTML;
    this.div.parentNode.replaceChild(this.textarea, this.div);
    this.textarea.focus();
  }

  initTxt() {
    this.textarea = document.createElement('textarea');
    const txt = this.textarea;
    txt.value = this.div.innerHTML;
    txt.classList.add('edit');
    txt.addEventListener('blur', () => this.onblur());
  }

  onblur() {
    document.addEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keydown', this.keyS);
    document.removeEventListener('keydown', this.esc);
    this.div.innerHTML = this.textarea.value;
    this.textarea.parentNode.replaceChild(this.div, this.textarea);
  }

  onKeyDown(e) {
    if(e.code === 'KeyE' && (e.ctrlKey || e.metaKey)) {
      console.log('ctrl e triggered');
      e.preventDefault();
      this.startEdit();
    }
  }

  keyS(e) {
    if(e.code === 'KeyS' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      this.textarea.blur();
    }
  }

  esc(e) {
    if(e.code === 'Escape') {
      e.preventDefault();
      this.textarea.value = this.prevHTML;
      this.textarea.blur();
    }
  }
}

new Editor(div);