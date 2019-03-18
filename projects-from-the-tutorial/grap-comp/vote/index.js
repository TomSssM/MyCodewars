class Vote {
  constructor(data) {
    this.elem = data.elem;

    // private properties
    const vote = this.elem.querySelector('.vote');
    const down = this.elem.querySelector('.down');
    const up = this.elem.querySelector('.up');

    // private methods
    function voteUp() {
      vote.textContent++;
    };
    function voteDown() {
      vote.textContent--;
    };

    this.elem.addEventListener('click', (e) => {
      const target = e.target;
      if(target === up) {
        voteUp();
      } else if(target === down) {
        voteDown();
      }
    });
  }

  setVote(num) {
    this.elem.querySelector('.vote').textContent = num;
  }
}