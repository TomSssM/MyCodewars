const contents = document.querySelector('#contents');

document.addEventListener('click', function(e) {
  let link;
  let target;
  while(target = target ? target.parentElement : e.target, target !== contents) {
    if(target.tagName === 'A') link = target;
  }
  
  // an alternative is the usual tutorial scenario:
  // do the closest function for link and 
  // check for the necessary container to contain it
  // let target = event.target.closest('a');
  // if (target && contents.contains(target)) {
  //   return handleLink(target.getAttribute('href'));
  // }

  if(!link) return;
  if(!confirm(`Go to ${link.href}?`)) e.preventDefault();
});