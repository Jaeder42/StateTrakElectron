exports.PlayerNode = PlayerNode;

function PlayerNode(PlayerData) {
  var self      = this;
  var steamid   = undefined;
  var name      = undefined;
  var team      = undefined;
  var activity  = undefined;

  // Previous states and added
  var previousPlayerState = undefined;
  var addedPlayerState    = undefined;

  if(typeof PlayerData !== 'undefined') {
      this.steamid  = PlayerData.steamid;
      this.name     = PlayerData.name;
      this.team     = PlayerData.team;
      this.activity = PlayerData.activity;
  }

  if(typeof PlayerData.previously !== 'undefined') {
      this.previousPlayerState = new PlayerNode(PlayerData.previously);
  }

  if(typeof PlayerData.added !== 'undefined') {
      this.addedPlayerState = new PlayerNode(PlayerData.added);
  }

  this.getPreviousPlayerState = function() { return this.previousPlayerState; };
  this.getAddedPlayerState    = function() { return this.addedPlayerState; };
  this.getPlayerSteamid       = function() { return this.steamid; };
  this.getPlayerName          = function() { return this.name; };
  this.getPlayerTeam          = function() { return this.team; };
  this.getPlayerActivity      = function() { return this.activity; };
}
