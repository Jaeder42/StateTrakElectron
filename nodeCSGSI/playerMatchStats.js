var Player = require('./player.js');
exports.PlayerMatchStatsNode = PlayerMatchStatsNode;

function PlayerMatchStatsNode(PlayerMatchStats) {
  var self = this;

  var player                 = undefined;
  var match_stats            = undefined;
  var previousMatchStatState = undefined;
  var addedMatchStatState    = undefined;

  if(typeof PlayerMatchStats !== 'undefined') {
    this.player = new Player.PlayerNode(PlayerMatchStats);
    this.match_stats = PlayerMatchStats.match_stats;
  }

  if(typeof PlayerMatchStats.previously !== 'undefined') {
    this.previousMatchStatState = new PlayerMatchStatsNode(PlayerMatchStats.previously.player);
  }

  if(typeof PlayerMatchStats.added !== 'undefined') {
    this.addedMatchStatState = new PlayerMatchStatsNode(PlayerMatchStats.added.player);
  }

  this.getPlayer                = function() { return this.player; };
  this.getPreviousMatchStat     = function() { return this.previousMatchStatState; };
  this.getAddedMatchStat        = function() { return this.addedMatchStatState; };
  this.getPlayerMatchStats      = function() { return this.match_stats; };
  this.getPlayerKills           = function() { return this.match_stats.kills; };
  this.getPlayerAssists         = function() { return this.match_stats.assists; };
  this.getPlayerDeaths          = function() { return this.match_stats.deaths; };
  this.getPlayerMVPS            = function() { return this.match_stats.mvps; };
  this.getPlayerScore           = function() { return this.match_stats.score; };
}
