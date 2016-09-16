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
var secondaryImg = document.getElementById('secondaryImg');


ipcRenderer.on('json', (event, message) => {
      //console.log(message);
      jobject = JSON.parse(message);
      if(jobject.provider.steamid == jobject.player.steamid)
        populatelive();


    });

  ipcRenderer.on('updatelive-reply', (event, message) => {
    jobject = JSON.parse(message);
    statsHSs.innerHTML = jobject.hs;
    statsKDs.innerHTML = jobject.kd;
  //  winmoney.innerHTML = jobject.winmoney;
  //  lossmoney.innerHTML = jobject.lossmoney;
  //  lossbonus.innerHTML = jobject.lossbonus;
  });
  /*ipcRenderer.on('scorechart', (event, message) => {
      jobject = JSON.parse(message);

      //updatescorechart();
  });*/

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
      //ipcRenderer.send('scorechart', str);

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

      //TODO populate weapon "view"
      //Using jobject.player.weapons.weaponX

       var weapons = jobject.player.weapons;

       if(weapons != null){
         var knife = weapons.weapon_0;
         //TODO Needs controls to check if weapon is present
         //Enkelt exempel på pistol
         var pistol = weapons.weapon_1;

         var pistolname = pistol.name;

         if(pistolname == "weapon_usp_silencer"){
           secondaryImg.src ="./../../img/weapons/2/usp.png";
         }else if(pistolname == "weapon_fiveseven"){
           secondaryImg.src ="./../../img/weapons/2/fiveseven.png";
         }else if(pistolname == "weapon_cz75a"){
           secondaryImg.src ="./../../img/weapons/2/cz.png";
         }else if(pistolname == "weapon_deagle"){
           secondaryImg.src ="./../../img/weapons/2/juan.png";
         }else if(pistolname == "weapon_glock"){
           secondaryImg.src ="./../../img/weapons/2/glock.png";
         }else if(pistolname == "weapon_hkp2000"){
           secondaryImg.src ="./../../img/weapons/2/p2000.png";
         }else if(pistolname == "weapon_p250"){
           secondaryImg.src ="./../../img/weapons/2/p250.png";
         }else if(pistolname == "weapon_tec9"){
           secondaryImg.src ="./../../img/weapons/2/tec9.png";
         }else if(pistolname == "weapon_usp_silencer "){
           secondaryImg.src ="./../../img/weapons/2/usp.png";
         }else if(pistolname == "weapon_revolver"){
           secondaryImg.src ="./../../img/weapons/2/revolver.png";
         }
       } 

      ipcRenderer.send('updatelive', null);
    }

