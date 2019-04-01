class CustomSelect {
  constructor(data) {
    this.elem = data.elem;
    this.title = this.elem.querySelector('.title');

    this.elem.addEventListener('focusin', () => {
      this.elem.classList.add('open');
    });
    
    document.addEventListener('click', (e) => {
      if(e.target.closest('.customselect') !== this.elem) {
        this.elem.classList.remove('open');
      }
    });
    
    // alternative:
    // this.elem.addEventListener('focusin', () => {
    //   this.elem.classList.add('open');
    // });
    
    // this.elem.addEventListener('focusout', () => {
    //   this.elem.classList.remove('open');
    // });
    
    // this.elem.addEventListener('mousedown', (e) => {
    //   const target = e.target;
    //   if(!target.closest('li')) return;
    //   this.elem.classList.remove('open');
    //   this.handleChoose(target);
    // });
    
    this.elem.addEventListener('click', (e) => {
      const target = e.target;
      if(!target.closest('li')) return;
      this.elem.classList.remove('open');
      this.handleChoose(target);
    });
  }

  handleChoose(li) {
    this.title.textContent = li.textContent;
    this.dispatchEvent(li.dataset.value, li.textContent);
  }

  dispatchEvent(val, title) {
    const evt = new CustomEvent('select', {
      bubbles: true,
      detail: {
        value: val,
        title,
      },
    });
    this.elem.dispatchEvent(evt);
  }
}