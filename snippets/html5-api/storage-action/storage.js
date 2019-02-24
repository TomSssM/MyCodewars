const but = document.querySelector('#set');
const key = document.querySelector('#key');
const val = document.querySelector('#val');

but.addEventListener('click', function() {
  if(!key.value || !val.value) {
    console.warn(`No value Provided for ${key.value ? val.id : key.id }`);
    return;
  }

  localStorage.setItem(key.value, val.value);
});