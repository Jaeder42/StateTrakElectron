exports.PlayerStateNode = PlayerStateNode;

function PlayerStateNode(PlayerStateData) {
  var self         = this;
  var player       = undefined;
  var health       = undefined;
  var armor        = undefined;
  var helmet       = undefined;
  var flashed      = undefined;
  var smoked       = undefined;
  var burning      = undefined;
  var money        = undefined;
  var round_kills  = undefined;
  var round_killhs = undefined;

  // Previous states and added
  var previousPlayerState = undefined;
  var addedPlayerState    = undefined;

  if(typeof PlayerStateData !== 'undefined') {
    this.player       = PlayerStateData;
    this.health       = this.player.state.health;
    this.armor        = this.player.state.armor;
    this.helmet       = this.player.statehelmet;
    this.flashed      = this.player.state.flashed;
    this.smoked       = this.player.state.smoked;
    this.burning      = this.player.state.burning;
    this.money        = this.player.state.money;
    this.round_kills  = this.player.state.round_kills;
    this.round_killhs = this.player.state.round_killhs;
  }

  if(typeof PlayerStateData.previously !== 'undefined') {
    this.previousPlayerState = new PlayerStateNode(PlayerStateData.previously.player);
  }

  if(typeof PlayerStateData.added !== 'undefined') {
    this.addedPlayerState = new PlayerStateNode(PlayerStateData.added.player);
  }

  this.getPlayer              = function() { return this.player; };
  this.getPreviousPlayerState = function() { return this.previousPlayerState; };
  this.getAddedPlayerState    = function() { return this.addedPlayerState; };
  this.getPlayerHealth        = function() { return this.health; };
  this.getPlayerArmor         = function() { return this.armor; };
  this.getPlayerHeadArmor     = function() { return this.helmet; };
  this.IsPlayerFlashed        = function() { return this.flashed; };
  this.IsPlayerSmoked         = function() { return this.smoked; };
  this.IsPlayerBurning        = function() { return this.burning; };
  this.getPlayerMoney         = function() { return this.money; };
  this.getPlayerRoundKills    = function() { return this.round_kills; };
  this.getPlayerRoundKillhs   = function() { return this.round_killhs; };
}
