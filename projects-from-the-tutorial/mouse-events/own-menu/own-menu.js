const menuFun = function(e) {
  e.preventDefault();
  document.removeEventListener('contextmenu', menuFun);
};

document.addEventListener('mousedown', function(e) {
  if(e.which === 3 && e.target.dataset.menu === 'noop') {
    document.addEventListener('contextmenu', menuFun);
    console.log('Implement our own context menu in here dude indeeds');
  }
});