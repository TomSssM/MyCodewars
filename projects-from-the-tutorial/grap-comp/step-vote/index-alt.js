function StepVoter(options) {
  Voter.apply(this, arguments);
  this._step = options.step || 1;
}
StepVoter.prototype = Object.create(Voter.prototype);

StepVoter.prototype._increaseVote = function() {
  this._vote.innerHTML = +this._vote.innerHTML + this._step;
};

StepVoter.prototype._decreaseVote = function() {
  this._vote.innerHTML = +this._vote.innerHTML - this._step;
};