var jobject;
var statskills = document.getElementById("statskills");
var statsdeaths = document.getElementById("statsdeaths");
var statsassists = document.getElementById("statsassists");
var statsmvp = document.getElementById("statsmvps");
var statskd = document.getElementById("statsKDs");
var statshs = document.getElementById("statsHSs");
var statsscore =document.getElementById("statsscore");
//var Game = require('../../GameJS/game.js');
//var Round = require('../../GamesJS/round.js');
//statskd.innerHTML = 0;
//statshs.innerHTML = 0;


ipcRenderer.on('json', (event, message) => {
      console.log(message);
      jobject = JSON.parse(message);
      if(jobject.provider.steamid == jobject.player.steamid)
        populatelive();

      if(jobject.map != null)
        updatescorechart();
    });

    function updatescorechart(){
      playerteam = jobject.player.team;
      var win = 0;
      var loss = 0;
      if(playerteam == "CT"){
        win = jobject.map.team_ct.score;
        loss = jobject.map.team_t.score;
      }
      else {
        win =  jobject.map.team_t.score;
        loss = jobject.map.team_ct.score;
      }

      var str = '{"win":"'+win+'", "loss":"'+loss+'" }';
      ipcRenderer.send('scorechart', str);

    }


    function populatelive(){

      var matchstats = jobject.player.match_stats;
      if(matchstats != null){

        statskills.innerHTML = matchstats.kills;
        statsassists.innerHTML = matchstats.assists;
        statsdeaths.innerHTML = matchstats.deaths;
        statsmvp.innerHTML = matchstats.mvps;
        statsscore.innerHTML = matchstats.score;
      }
    }
