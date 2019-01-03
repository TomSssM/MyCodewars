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
      const val = isNumber ? +table.rows[i].cells[cellIndex].textContent : table.rows[i].cells[cellIndex].textContent;
      sortArr.push({
        val,
        ref: table.rows[i],
      });
    }

    console.log(sortArr);
  }
})