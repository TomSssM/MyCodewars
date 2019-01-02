const table = document.querySelector('#bagua-table');
let selectedTd;

// table.addEventListener('click', function(e) {
//   let target = e.target;
//   while(target !== this) {
//     if(target.tagName === 'TD') {
//       highlight(target);
//       return;
//     }
//     target = target.parentNode;
//   };
// });

const highlight = function(node) {
  if (selectedTd) {
    selectedTd.classList.remove('highlight');
  }
  selectedTd = node;
  selectedTd.classList.add('highlight');
};

// also here is a more succinct alternative using closest
// thus denoting the first ever usage of closest

table.onclick = function(e) {
  const td = e.target.closest('td');
  if (!td || !table.contains(td)) return;
  highlight(td);
}