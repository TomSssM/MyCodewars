const table = document.getElementById('data');

const sortData = function(data){
  const dataHash = Array.from(data.rows).reduce((t,v) => {
    t.push({
      val: +v.cells[1].textContent,
      ref: v,
    });
    return t;
  }, []);

  dataHash.sort((a,b) => a.val - b.val);

  dataHash.forEach(obj => {
    data.appendChild(obj.ref); // we should have appended to tBodies[0]
                               // instead of directly to the table yeap
  });
};

// sortData(table)

// here is the alternative without the issues in
// the comments and with some new methods

// let sortedRows = Array.from(table.rows)
//   .slice(1)
//   .sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1);

// table.tBodies[0].append(...sortedRows);