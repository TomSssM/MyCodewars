const ul = document.getElementsByTagName('ul')[0];

const liNumbers = function(ulT) {
  const lis = Array.from(ulT.children);

  lis.forEach(li => {
    const innerLis = li.getElementsByTagName('li').length;
    if(innerLis) {
      li.firstChild.data += ` [${innerLis}]`;
      liNumbers(li.getElementsByTagName('ul')[0]);
    }
  });
};

// liNumbers(ul)

// as an alternative we could do the same
// for every li whatsoever

const liNumbersAlt = function() {
  const lis = Array.from(document.getElementsByTagName('li'));
  lis.forEach(li => {
    const innerLis = li.getElementsByTagName('li').length;
    if(innerLis) li.firstChild.data += ` [${innerLis}]`;
  });
};

// liNumbersAlt()