const arrLeft = document.querySelector('.arrow-left');
const arrRight = document.querySelector('.arrow-right');
const ul = document.querySelector('ul');
const imgInfo = {
  imgCount: document.querySelectorAll('ul img').length,
  imgWidth: document.querySelector('ul img').clientWidth,
};

const lis = document.getElementsByTagName('li');
for (let i = 0; i < lis.length; i++) {
  lis[i].style.position = 'relative';
  var span = document.createElement('span');
  span.style.cssText = 'position:absolute;left:0;top:0;font-size:2rem';
  span.innerHTML = i + 1;
  lis[i].appendChild(span);
}

// Solution:

let currentOffset = 0;

arrRight.addEventListener('click', function() {
  currentOffset = Math.max(currentOffset - (imgInfo.imgWidth * 3), -1 * imgInfo.imgWidth * (imgInfo.imgCount - 3));
  // -1 * imgInfo.imgWidth * (imgInfo.imgCount - 3) is actually the maximum possible offset
  ul.style.marginLeft = `${currentOffset}px`;
});

arrLeft.addEventListener('click', function() {
  currentOffset = Math.min(currentOffset + (imgInfo.imgWidth * 3), 0);
  ul.style.marginLeft = `${currentOffset}px`;
})

// My Solution:

// arrRight.addEventListener('click', function() {
//   let marginLeft = parseFloat(getComputedStyle(ul).marginLeft);
//   const hiddenArea = ul.clientWidth - (-1 * marginLeft + imgInfo.imgWidth * 3);
//   if(-1 * marginLeft === imgInfo.imgWidth * (imgInfo.imgCount - 3)) return;
//   if(hiddenArea < imgInfo.imgWidth * 3) {
//     marginLeft -= hiddenArea;
//     ul.style.marginLeft = `${marginLeft}px`;
//     return;
//   }
//   marginLeft -= imgInfo.imgWidth * 3;
//   ul.style.marginLeft = `${marginLeft}px`;
// });

// arrLeft.addEventListener('click', function() {
//   let marginLeft = parseFloat(getComputedStyle(ul).marginLeft);
//   const hiddenArea = -1 * marginLeft;
//   if(!hiddenArea) return;
//   if(hiddenArea < imgInfo.imgWidth * 3) {
//     marginLeft += hiddenArea;
//     ul.style.marginLeft = `${marginLeft}px`;
//     return;
//   }
//   marginLeft += imgInfo.imgWidth * 3;
//   ul.style.marginLeft = `${marginLeft}px`;
// });