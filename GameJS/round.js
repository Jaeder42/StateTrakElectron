
var kills;
var deaths;
var assists;
var mvps;
var hs;
var roundkills;
var score;
var activeWeapon;
var roundtype;
var money;
var kevlar;
var roundphase;
var roundnr;
var providerid;
var mapphase;

var round = function Round(jsonstr) {


jobject = JSON.parse(jsonstr);
//TODO add the jsondata to the variables above
providerid = jobject.provider.steamid;
if(jobject.player != null){
  var matchstats = jobject.player.match_stats;
  var playerstate = jobject.player.state;
  if(matchstats != null){
    kills = matchstats.kills;
    assists = matchstats.assists;
    deaths = matchstats.deaths;
    mvps = matchstats.mvps;

    score = matchstats.score;

  }
  if(playerstate != null){
    money = playerstate.money;
    hs = playerstate.round_killhs;
    roundkills = playerstate.round_kills;

  }

  if(jobject.map != null ){
    mapphase = jobject.map.phase;
    roundnr = jobject.map.round;
  }


}


function saveRound(){

}


};
round.prototype.win = function () {
  return false;
}
round.prototype.getRoundshs = function () {
  return hs;
};
round.prototype.getProviderID = function () {
  return providerid;
};
round.prototype.setRoundType = function(type){
  roundtype = type;
}
round.prototype.getRoundphase = function(){
  return roundphase;
}
round.prototype.getMapPhase = function () {
  return mapphase;
}
round.prototype.getRoundNr = function(){
    return roundnr;
};
round.prototype.getKills = function () {
  return kills;
};
round.prototype.getMoney = function () {
  return money;
};
round.prototype.getCurrentWeapon = function () {
  return currentWeapon;
};
round.prototype.getAssists = function () {
  return assists;
};
round.prototype.getDeaths = function () {
  return deaths;
};
round.prototype.getMvps = function () {
  return mvps;
};
round.prototype.getScore = function () {
  return score;
};


round.prototype.saveRound = function () {
  data = {
    kills: kills,
    deaths: deaths,
    assists: assists,
    mvps: mvps,
    score: score,
    hs: hs,
    roundkills: roundkills,
    roundnr: roundnr
  }
  return data;
};
module.exports = round;
