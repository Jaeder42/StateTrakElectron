


var round = function Round(jsonstr) {
this.hs = 0;
this.kills = 0;
this.deaths = 0;
this.assists = 0;
this.mvps = 0;
this.roundkills = 0;
this.score = 0;
this.activeWeapon = '';
this.roundtype = '';
this.money = 0;
this.kevlar = 0;
this.roundphase = '';
this.roundnr = 0;
this.providerid = 0;
this.mapphase = '';

var jobject = JSON.parse(jsonstr);
//TODO add the jsondata to the variables above
this.providerid = jobject.provider.steamid;
if(jobject.player != null){
  var matchstats = jobject.player.match_stats;
  var playerstate = jobject.player.state;
  if(matchstats != null){
    this.kills = matchstats.kills;
    this.assists = matchstats.assists;
    this.deaths = matchstats.deaths;
    this.mvps = matchstats.mvps;

    this.score = matchstats.score;

  }

  if(playerstate != null){
    this.money = playerstate.money;
    this.hs = playerstate.round_killhs;
    this.roundkills = playerstate.round_kills;

  }
}

  if(jobject.map != null ){
    this.mapphase = jobject.map.phase;
    this.roundnr = jobject.map.round;
  }

  Round.prototype.getRoundshs = function () {
    return this.hs;
  };
  Round.prototype.win = function () {
    return false;
  }
  /*round.prototype.getRoundshs = function () {
    return hs;
  };*/
  Round.prototype.getProviderID = function () {
    return this.providerid;
  };
  Round.prototype.setRoundType = function(type){
    this.roundtype = type;
  }
  Round.prototype.getRoundphase = function(){
    return this.roundphase;
  }
  Round.prototype.getMapPhase = function () {
    return this.mapphase;
  }
  Round.prototype.getRoundNr = function(){
      return this.roundnr;
  };
  Round.prototype.getKills = function () {
    return this.kills;
  };
  Round.prototype.getMoney = function () {
    return this.money;
  };
  Round.prototype.getCurrentWeapon = function () {
    return this.currentWeapon;
  };
  Round.prototype.getAssists = function () {
    return this.assists;
  };
  Round.prototype.getDeaths = function () {
    return this.deaths;
  };
  Round.prototype.getMvps = function () {
    return this.mvps;
  };
  Round.prototype.getScore = function () {
    return this.score;
  };


  Round.prototype.saveRound = function () {
    data = {
      kills: this.kills,
      deaths: this.deaths,
      assists: this.assists,
      mvps: this.mvps,
      score: this.score,
      hs: this.hs,
      roundkills: this.roundkills,
      roundnr: this.roundnr
    }
    return data;
  };

};








module.exports = round;
