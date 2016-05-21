var rounds = function Rounds() {
var kills;
var deaths;
var assists;
var mvps;
var hs;
var roundkills;
var score;

function saveRound(){

}

function updateRound(jsonstr){
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


}
};
module.exports = rounds;
