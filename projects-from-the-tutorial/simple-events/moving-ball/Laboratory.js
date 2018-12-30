const field = document.querySelector('#field');
const ball = document.querySelector('#ball');

field.addEventListener('click', function(event) {

      // кgetting the field coords
      const fieldCoords = this.getBoundingClientRect();

      // getting the field's left top corner
      const fieldInnerCoords = {
        top: fieldCoords.top + field.clientTop,
        left: fieldCoords.left + field.clientLeft
      };

      const ballCoords = {
        top: event.clientY - fieldInnerCoords.top - ball.clientHeight / 2,
        left: event.clientX - fieldInnerCoords.left - ball.clientWidth / 2
      };

      if (ballCoords.top < 0) ballCoords.top = 0;
      if (ballCoords.left < 0) ballCoords.left = 0;

      // if the ball is outside the right border
      if (ballCoords.left + ball.clientWidth > field.clientWidth) {
        ballCoords.left = field.clientWidth - ball.clientWidth;
      }
      // if the bar is outside the bottom border
      if (ballCoords.top + ball.clientHeight > field.clientHeight) {
        ballCoords.top = field.clientHeight - ball.clientHeight;
      }

      ball.style.left = ballCoords.left + 'px';
      ball.style.top = ballCoords.top + 'px';
});

// My Solution:

// !!!! You should enable lines 28 - 31 in HTML for my solution to work

// field.addEventListener('click', function(e) {
//   const rect = e.currentTarget.getBoundingClientRect();
//   let moveX = Math.max(e.clientX - rect.left - e.currentTarget.clientLeft, ball.offsetHeight / 2);
//   let moveY = Math.min(e.clientY - rect.top - e.currentTarget.clientTop, e.currentTarget.clientHeight - ball.offsetHeight / 2);
//   moveX = Math.min(e.currentTarget.clientWidth - ball.offsetHeight / 2, moveX);
//   moveY = Math.max(ball.offsetHeight / 2, moveY);
//   ball.style.top = `${moveY}px`;  
//   ball.style.left = `${moveX}px`;  
// });