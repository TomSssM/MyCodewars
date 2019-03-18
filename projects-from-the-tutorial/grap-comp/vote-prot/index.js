function Voter(data) {
  // public property
  this.elem = data.elem;

  // private property
  this._vote = this.elem.querySelector('.vote');

  // this.elem.addEventListener('mousedown', function(e) {
  //   e.preventDefault();
  // });
  
  this.elem.addEventListener('click', (e) => {
    this._onClick(e);
  });
}

// private methods
Voter.prototype._decreaseVote = function() {
  this._vote.textContent--;
};
Voter.prototype._increaseVote = function() {
  this._vote.textContent++;
};
Voter.prototype._onClick = function(e) {
  if(e.target.closest('.up')) {
    this._increaseVote();
  } else if(e.target.closest('.down')) {
    this._decreaseVote();
  }
}

// public methods
Voter.prototype.setVote = function(num) {
  this._vote.textContent = num;
}