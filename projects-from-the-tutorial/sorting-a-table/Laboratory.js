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
    data.appendChild(obj.ref);
  });
};

// sortData(table)