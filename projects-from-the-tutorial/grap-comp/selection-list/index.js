class ListSelect {
  constructor(data) {
    this.elem = data.elem;
    this.lastClicked = 0;

    // private methods:
    const handleClick = (li, ctrl, shift) => {
      if(ctrl) {
        li.classList.toggle('selected');
      } else if(shift) {
        shiftSel(li);
      } else {
        deselectAll();
        li.classList.add('selected');
        this.lastClicked = getInd(li);
      }
    };

    const deselectAll = () => {
      Array.from(this.elem.querySelectorAll('li.selected')).forEach(li => {
        li.classList.remove('selected');
      });
    };

    const shiftSel = (targetLi) => {
      const currInd = getInd(targetLi);
      deselectAll();

      if(this.lastClicked === currInd) {
        this.lastClicked = 0;
      } else if(this.lastClicked < currInd) {
        selectInRange(this.lastClicked, currInd);
      } else selectInRange(currInd, this.lastClicked);
    };

    const getInd = (li) => {
      for(let i = 0; i < this.elem.children.length; i++) {
        if(this.elem.children[i] === li) return i;
      }
      return 'tar tar sauce';
    };

    const selectInRange = (start, end) => {
      for(let i = start; i <= end; i++) {
        this.elem.children[i].classList.add('selected');
      }
    };

    this.elem.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });

    this.elem.addEventListener('click', (e) => {
      const target = e.target.closest('li');
      if(target.tagName !== 'LI') return;
      handleClick(e.target, (e.ctrlKey || e.metaKey), e.shiftKey);
    });
  }

  // the only public method here:
  getSelected() {
    return Array.from(
      this.elem.querySelectorAll('li.selected')
    ).map(el => el.textContent);
  }
}