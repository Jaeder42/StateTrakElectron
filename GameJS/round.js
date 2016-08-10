


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
this.helmet = false;
this.roundphase = '';
this.roundnr = 0;
this.providerid = 0;
this.mapphase = '';
this.playerteam;
this.win = false;
this.wins = 0;
this.losses = 0;
this.timestamp = '';
this.spentmoney = 0;
this.ace = false;
this.skip = false;


var jobject = JSON.parse(jsonstr);
console.log(jsonstr);
this.providerid = jobject.provider.steamid;
this.timestamp = jobject.provider.timestamp;
var roundobject = jobject.round;
if(jobject.player != null){
  if(roundobject != null){
    this.roundphase = roundobject.phase;
  }
  var matchstats = jobject.player.match_stats;
  var playerstate = jobject.player.state;
  var playerweapons = jobject.player.weapons;
  if(jobject.player.steamid == this.providerid){
    this.skip = true;
  }
  if(matchstats != null ){
    this.kills = matchstats.kills;
    this.assists = matchstats.assists;
    this.deaths = matchstats.deaths;
    this.mvps = matchstats.mvps;
    this.score = matchstats.score;

  }

  if(playerstate != null){
    if(this.roundphase != 'over'){
    this.money = playerstate.money;
  }
    this.hs = playerstate.round_killhs;
    this.roundkills = playerstate.round_kills;
    this.kevlar = playerstate.armor;
    this.helmet = playerstate.helmet;
    if(this.roundkills == 5){
      this.ace = true;
    }
  }
}


  if(jobject.map != null ){
    this.mapphase = jobject.map.phase;
    this.roundnr = jobject.map.round;
    this.playerteam = jobject.player.team;
    if(this.playerteam == "CT"){
      this.wins = jobject.map.team_ct.score;
      this.losses = jobject.map.team_t.score;
    }
    else {
      this.win =  jobject.map.team_t.score;
      this.loss = jobject.map.team_ct.score;
    }
  }
  if(roundobject != null){
    this.roundphase = roundobject.phase;
    if(this.roundphase == 'over'){
      this.roundnr = this.roundnr-1;
      if(roundobject.win_team == this.playerteam){
        this.win = true;
      }
    }

  }





  round.prototype.getRoundshs = function () {
    return this.hs;
  };
  round.prototype.getTimestamp = function () {
    return this.timestamp;
  };
  round.prototype.getRoundKills = function () {
    return this.roundkills;
  };
  round.prototype.setSpentMoney = function(spentmoney) {
    this.spentmoney = spentmoney;
  };

  round.prototype.getWin = function () {
    return this.win;
  }
  round.prototype.getWins = function () {
    return this.wins;
  };
  round.prototype.getLosses = function() {
    return this.losses;
  }

  /*round.prototype.getRoundshs = function () {
    return hs;
  };*/
  round.prototype.getProviderID = function () {
    return this.providerid;
  };
  round.prototype.setRoundType = function(type){
    this.roundtype = type;
  }
  round.prototype.getRoundphase = function(){
    return this.roundphase;
  }
  round.prototype.getMapPhase = function () {
    return this.mapphase;
  }
  round.prototype.getRoundNr = function(){
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
      roundnr: this.roundnr,
      roundtype: this.roundtype
    }
    return data;
  };

};








module.exports = round;
