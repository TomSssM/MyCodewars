/**
  On click – the cell should became “editable” (textarea appears inside),
  we can change HTML. There should be no resize, all geometry should remain the same.
  Buttons OK and CANCEL appear below the cell to finish/cancel the editing.
  Only one cell may be editable at a moment. While a <td> is in “edit mode”,
  clicks on other cells are ignored.
  The table may have many cells. Use event delegation.
*/

const table = document.getElementById('bagua-table');
const buttons = document.querySelector('.button-holder');

class EditTd {
  constructor() {
    this.isEditing = false;

    this.initializeListeners();

    table.addEventListener('click', this.onClick);
    buttons.addEventListener('click', this.clickButton);
  }

  initializeListeners() {
    this.onClick = this.onClick.bind(this);
    this.clickButton = this.clickButton.bind(this);
  }

  onClick(e) {
    if(this.isEditing) return;
    this.td = e.target.closest('td');
    if(this.td) this.startEdit(this.td);
  }

  startEdit(elem) {
    this.isEditing = true;
    elem.classList.add('editing');
    
    // append textarea
    const txt = document.createElement('textarea');
    this.txt = txt;
    txt.value = this.td.innerHTML;
    elem.append(txt);

    // show buttons
    buttons.hidden = false;
    const coords = elem.getBoundingClientRect();
    buttons.style.top = `${coords.bottom + window.pageYOffset}px`;
    buttons.style.left = `${coords.left + window.pageXOffset}px`;
  }

  clickButton(e) {
    if(e.target.tagName === 'INPUT') {
      this.stopEdit();
      if(e.target.classList.contains('ok')) {
        this.td.innerHTML = this.txtHTML;
      }
    }
  }

  stopEdit() {
    this.isEditing = false;
    buttons.hidden = true;
    this.txtHTML = this.txt.value;
    this.td.classList.remove('editing');
    this.txt.remove();
  }
}

new EditTd();