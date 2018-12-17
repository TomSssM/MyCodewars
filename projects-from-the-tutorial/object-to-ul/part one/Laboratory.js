const data = {
  "Fish": {
    "JackFish": {},
    "JohnFish": {},
  },

  "Tree": {
    "PineTree": {
      "PineTree1": {},
      "PineTree2": {},
    },
    "FlowerTree": {
      "FlowerTree1": {},
      "FlowerTree2": {},
    }
  }
};

const ul = document.createElement('ul');

const makeList = function(dataObj, cont) {
  for(let key in dataObj) {
    const li = document.createElement('li');
    li.textContent = key;
    if(Object.keys(dataObj[key]).length) {
      const newUls = document.createElement('ul');
      li.appendChild(newUls);
      makeList(dataObj[key], newUls);
    }
    cont.appendChild(li);
  }
};

document.body.appendChild(ul);

// makeList(data, ul);