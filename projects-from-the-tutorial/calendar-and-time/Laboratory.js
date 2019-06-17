const createCalendar = function(yy,mm) {
  const table = document.createElement('table');
  table.appendChild(document.createElement('tr'));

  const date = new Date(yy,mm - 1);
  const pastMon = new Date(yy,mm);
  pastMon.setDate(0);
  const dayCou = pastMon.getDate();
  let day = date.getDay();

  for(let i = 0; i < day; i++) {
    table.rows[0].appendChild(document.createElement('td'));
  }

  let rowCou = 0;
  for(let i = 0; i < dayCou; i++, day++) {
    if(day === 7) {
      table.appendChild(document.createElement('tr'));
      rowCou++;
      day = 0;
    }
    table.rows[rowCou].appendChild(document.createElement('td'));
    table.rows[rowCou].lastElementChild.textContent = i + 1;
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

  table.prepend(document.createElement('tr'));
  for(let i = 0; i < 7; i++) {
    table.rows[0].appendChild(document.createElement('th'));
    table.rows[0].lastElementChild.textContent = days[i];
  }
  
  const remainingDays = 7 - day;
  for(let i = 0; i < remainingDays; i++) {
    table.lastElementChild.appendChild(document.createElement('td'));
  }

  document.getElementById('tables').appendChild(table);
};

let n = 1;
while(n <= 12) {
  createCalendar(2018, n);
  n++;
}

const hh = document.getElementById('hh');
const mm = document.getElementById('mm');
const ss = document.getElementById('ss');

function createClock() {
  const time = new Date();
  hh.textContent = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  mm.textContent = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  ss.textContent = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
}

createClock();
setInterval(createClock, 1000);