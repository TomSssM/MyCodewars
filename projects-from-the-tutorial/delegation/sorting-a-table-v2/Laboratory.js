const table = document.querySelector('#grid');

table.addEventListener('click', function(e) {
  if(e.target.tagName === 'TH') {
    const tableRowCount = document.querySelectorAll('#grid tr').length;
    const th = e.target;
    const sortArr = [];
    let isNumber;
    let cellIndex;

    if(th.dataset.type === 'number') {
      isNumber = true;
      cellIndex = 0;
    }

    if(th.dataset.type === 'string') {
      isNumber = false;
      cellIndex = 1;
    }

    for(let i = 1; i < tableRowCount; i++) {
      const val = table.rows[i].cells[cellIndex].textContent;
      sortArr.push({
        val,
        ref: table.rows[i],
      });
    }

    if(isNumber) {
      sortArr.sort((x,y) => x.val - y.val);
    } else {
      sortArr.sort((x,y) => x.val > y.val ? 1 : -1);
    }

    sortArr.forEach(obj => {
      table.tBodies[0].appendChild(obj.ref);
    });
  }
});