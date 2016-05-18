exports.RoundNode = RoundNode;

function RoundNode(RoundData) {
  var self     = this;
  var phase    = undefined;
  var bomb     = undefined;
  var win_team = undefined;

  // Previous states and added
  var previousRoundState = undefined;
  var addedRoundState    = undefined;


  if(typeof RoundData !== 'undefined') {
    this.phase = RoundData.phase;
    this.bomb = RoundData.bomb;
    this.win_team = RoundData.win_team;
  }

  if(typeof RoundData.previously !== 'undefined') {
    this.previousRoundState = new RoundNode(RoundData.previously);
  }

  if(typeof RoundData.added !== 'undefined') {
    this.addedRoundState = new RoundNode(RoundData.added);
  }

  this.getPreviousRoundState = function() { return this.previousRoundState; };
  this.getAddedRoundState    = function() { return this.addedRoundState; };
  this.getRoundPhase         = function() { return this.phase; };
  this.getRoundBombState     = function() { return this.bomb; };
  this.getRoundWinTeam       = function() { return this.win_team; };
}
