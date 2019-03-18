class StepVoter extends Voter {
  constructor(data) {
    super(data);
    this._step = +data.step;
    this._increaseVote = function() {
      this._vote.textContent = +this._vote.textContent + this._step;
    }
    this._decreaseVote = function() {
      this._vote.textContent = +this._vote.textContent - this._step;
    }
  }
}