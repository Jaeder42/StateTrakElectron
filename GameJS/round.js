
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

var round = function Round(jsonstr) {


jobject = JSON.parse(jsonstr);
//TODO add the jsondata to the variables above
if(jobject.player != null){
  var matchstats = jobject.player.match_stats;
  if(matchstats != null){
    kills = matchstats.kills;
    assists = matchstats.assists;
    deaths = matchstats.deaths;
    mvps = matchstats.mvps;
    hs = matchstats.headshots;
    roundkills = matchstats.roundkills;
    score = matchstats.score;
  }
}


function saveRound(){

}


};
round.prototype.setRoundType = function(type){
  roundtype = type;
}
round.prototype.getRoundphase = function(){
  return roundphase;
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


round.prototype.saveRound = function () {

};
module.exports = round;
