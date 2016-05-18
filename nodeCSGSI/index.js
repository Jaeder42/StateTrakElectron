module.exports = CSGSI;

var http          = require('http');
var express       = require('express');
var bodyParser    = require('body-parser');
var provider      = require('./provider.js');
var map           = require('./map.js');
var round         = require('./round.js');
var player        = require('./player.js');
var playerState   = require('./playerState.js');
var playerWeapons = require('./playerWeapons.js');
var playerMatchStats = require('./playerMatchStats.js');

require("util").inherits(CSGSI, require("events").EventEmitter);

var app    = express();
var server = http.createServer(app);

app.use(bodyParser.json()); // Support for JSON bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

function CSGSI() {
  var self = this;
  require('events').EventEmitter.call(this);

  // Setup server listening
  server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("CSGSI server listening on", addr.address + ":" + addr.port);
  });

  // Handle requests from the CSGO client
  app.post("/", function(req, res) {
    if (typeof req.body !== 'undefined') {
      self.emit('all', req.body);
      self.process(req.body);
    }
  });

  this._IsBombPlanted = false;
  this._c4Internal;
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

  // The types of events we are interested

  // We have provider data
  if (typeof data.provider !== 'undefined') {
    this.providerData = new provider.ProviderNode(data.provider);
  }

  // We have map data
  if (typeof data.map !== 'undefined') {
    this.mapData = new map.MapNode(data.map);
    this.emit('gameMap', this.mapData.getMapName());
    this.emit('gamePhase', this.mapData.getMapPhase());
    this.emit('gameRounds', this.mapData.getMapRound());
    this.emit('gameCTscore', this.mapData.getMapCTScore());
    this.emit('gameTscore', this.mapData.getMapTScore());
  }

  // We have round data
  if(typeof data.round !== 'undefined') {
    this.roundData = new round.RoundNode(data.round);

    var maxTime = 0;
    this.emit('roundPhase', this.roundData.getRoundPhase());
    switch(this.roundData.getRoundPhase()) {
      case 'live':
        maxTime = 115;
        break;
      case 'freezetime':
        maxTime = 15;
        break;
      case 'over':
        if (this._IsBombPlanted) {
          this._IsBombPlanted = false;
          clearInterval(this._c4Internal);
        }
        this.emit('roundWinTeam', this.roundData.getRoundWinTeam());
        break;
    }
    if(typeof this.roundData.getRoundBombState() !== 'undefined') {
      // Exploded, planted, defused
      this.emit('bombState', this.roundData.getRoundBombState());
      switch(this.roundData.getRoundBombState()) {
        case 'planted':
          if (!this._IsBombPlanted) {
            this._IsBombPlanted = true;
            var timeLeft = 40 - (new Date().getTime() / 1000 - this.providerData.getProviderTimestamp());
            this.emit('bombTimeStart', timeLeft);
            this.c4CountDown(timeLeft);
          }
          break;
          case 'defused':
          case 'exploded':
            this._IsBombPlanted = false;
            clearInterval(this._c4Internal);
            break;
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

CSGSI.prototype.c4CountDown = function(time) {
  var self = this;
  this._c4Internal = setInterval(function() {
    time = time - 1;
    if (time <= 0) {
      clearInterval(self._c4Internal);
      // Counter ended
      self._IsBombPlanted = false;
      return;
    }
    self.emit('bombTimeLeft', time);
  }, 1000);
};
