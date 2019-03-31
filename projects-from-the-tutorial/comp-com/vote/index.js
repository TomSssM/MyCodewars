// the change of vote should be represented by the
// "change" event with the new vote count in .detail

class Vote {
  constructor(data) {
    this.elem = data.elem;

    const vote = this.elem.querySelector('.vote');
    const down = this.elem.querySelector('.down');
    const up = this.elem.querySelector('.up');

    const voteUp = () => {
      this.setVote(+vote.textContent + 1);
    }

    const voteDown = () => {
      this.setVote(+vote.textContent - 1);
    }

    this.elem.addEventListener('click', (e) => {
      const target = e.target;
      if(target === up) {
        voteUp();
      } else if(target === down) {
        voteDown();
      }
    });
  }

  // here comes the new stuff over here dude:
  setVote(num) {
    this.elem.querySelector('.vote').textContent = num;
    const changeEvnt = new CustomEvent('change', {
      bubbles: true,
      detail: num,
    });
    this.elem.dispatchEvent(changeEvnt);
  }
}

const voter = new Vote({
  elem: document.getElementById('voter')
});

voter.setVote(5);

document.getElementById('voter').addEventListener('change', function(e) {
  alert( e.detail ); // new vote count
});