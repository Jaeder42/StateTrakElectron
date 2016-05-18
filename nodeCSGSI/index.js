module.exports = CSGSI;

var http             = require('http');
var express          = require('express');
var bodyParser       = require('body-parser');
var provider         = require('./provider.js');
var map              = require('./map.js');
var round            = require('./round.js');
var player           = require('./player.js');
var playerState      = require('./playerState.js');
var playerWeapons    = require('./playerWeapons.js');
var playerMatchStats = require('./playerMatchStats.js');
var bomb             = require('./bomb.js');

require("util").inherits(CSGSI, require("events").EventEmitter);
var app    = express();
var server = http.createServer(app);

app.use(bodyParser.json()); // Support for JSON bodies
app.use(bodyParser.urlencoded({
  extended: true
}));


function CSGSI() {
  var self = this;
  var eventEmitter = require('events').EventEmitter.call(this);
  this.SetupCSGSIServer();
  this.ProcessCSGSIRequests(self);
}

CSGSI.prototype.process = function(data) {
  var self = this;
  var providerData;
  var mapData;
  var roundData;
  var playerData;
  var playerStateData;
  var playerWeaponsData;
  var playerMatchStatsData;
  var BombData;

  // We have provider data
  if (typeof data.provider !== 'undefined') {
    this.providerData = new provider.ProviderNode(data.provider);
  }

  // We have map data
  if (typeof data.map !== 'undefined') {
    this.mapData = new map.MapNode(data.map);
    this.emit('gameMapData', this.mapData);
  }

  // We have round data
  if(typeof data.round !== 'undefined') {
    this.roundData = new round.RoundNode(data.round);
    this.Bomb = new bomb.Bomb(this.roundData, data.provider);

    // Round state
    var maxTime = 0;
    var roundPhase = this.roundData.getRoundPhase();
    this.emit('roundPhase', roundPhase);
    switch(roundPhase) {
      case 'live':
        maxTime = 115;
        break;
      case 'freezetime':
        maxTime = 15;
        break;
      case 'over':
        this.Bomb.bombReset();
        this.emit('roundWinTeam', this.roundData.getRoundWinTeam());
        break;
    }

    // Bomb state
    var bombState = this.roundData.getRoundBombState();
    if(typeof bombState !== 'undefined') {
      // Exploded, planted, defused
      this.emit('bombState', bombState);
      switch(bombState) {
        case 'planted':
          this.Bomb.setBombPlanted(bombState, this.eventEmitter);
          break;
          case 'defused':
          case 'exploded':
            this.Bomb.bombReset();
        }
      }
  }

  // We have player data (steamid, name, etc)
  if (typeof data.player !== 'undefined') {
    this.playerData = new player.PlayerNode(data.player);
    this.emit('player', this.playerData);
  }

  // We have player state data (hp, armor, etc)
  if (typeof data.player.state !== 'undefined') {
    this.playerStateData = new playerState.PlayerStateNode(data.player);
    this.emit('playerState', this.playerStateData);
  }

  // We have player weapons data
  if(typeof data.player !== 'undefined' && typeof data.player.weapons !== 'undefined') {
    this.playerWeaponsData = new playerWeapons.PlayerWeaponsNode(data.player);
    this.emit('playerWeapons', this.playerWeaponsData);
  }

  // We have player match stats (kills, assists, mvps, etc)
  if(typeof data.player !== 'undefined' && typeof data.player.match_stats !== 'undefined') {
    this.playerMatchStatsData = new playerMatchStats.PlayerMatchStatsNode(data.player);
    this.emit('playerMatchStats', this.playerMatchStatsData);
  }

};

CSGSI.prototype.SetupCSGSIServer = function() {
  // Setup server listening
  server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("CSGSI server listening on", addr.address + ":" + addr.port);
  });
};

CSGSI.prototype.ProcessCSGSIRequests = function(self) {
  // Handle requests from the CSGO client
  app.post("/", function(req, res) {
    if (typeof req.body !== 'undefined') {
      self.emit('all', req.body);
      self.process(req.body);
    }
  });
};
