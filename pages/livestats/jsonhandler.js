var jobject;
var playerNameID = document.getElementById('playerName');
var mapNameID = document.getElementById('mapName');
var mapscoreID = document.getElementById('teamScore');

var statskills = document.getElementById("statskills");
var statsdeaths = document.getElementById("statsdeaths");
var statsassists = document.getElementById("statsassists");
var statsmvp = document.getElementById("statsmvps");
var statskd = document.getElementById("statsKDs");
var statshs = document.getElementById("statsHSs");
var statsscore = document.getElementById("statsscore");

var modelImage = document.getElementById("modelImage");

var secondaryImg = document.getElementById('secondaryImg');
var primaryImg = document.getElementById('primaryImg');
var knifeImg = document.getElementById('knifeImg');
//var Game = require('../../GameJS/game.js');
//var Round = require('../../GamesJS/round.js');
//statskd.innerHTML = 0;
//statshs.innerHTML = 0;



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

  var player = jobject.player;
  var map = jobject.map;

  if(player != null){
  var playerName = player.name;
  playerNameID.innerHTML = playerName;
  }


  if(map != null){
  var playerMap = map.name;
  mapNameID.innerHTML = playerMap;

  var playerteam = player.team;
  var ctscore = map.team_ct.score;
  var tscore = map.team_t.score;

  if(playerteam = "ct"){
    modelImage.src="./../../img/ct_model.png";
    mapscoreID.innerHTML= ctscore + ":" + tscore;
  }else if(playerteam ="t"){
    modelImage.src="./../../img/t_model.png";
    mapscoreID.innerHTML= tscore+ ":" + ctscore;
  }



  }


      var weapon0 = jobject.player.weapons.weapon_0;
      var weapon1 = jobject.player.weapons.weapon_1;
      var weapon2 = jobject.player.weapons.weapon_2;
      

        
         if(weapon0 != null){

          var knife = jobject.player.weapons.weapon_0.paintkit;

           if(knife == "default"){
             knifeImg.src ="./../../img/weapons/knife/knife_ct.png";
           }else if(knife == "default" && playerteam == "t"){
             knifeImg.src ="./../../img/weapons/knife/knife_t.png";
           }}
      
     if(weapon1 != null){      
              var pistolname = jobject.player.weapons.weapon_1.name;

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
           }else if(pistolname == "weapon_elites"){
             secondaryImg.src ="./../../img/weapons/2/duals.png";
           }}

   if(weapon2 != null){

                   var riflename = jobject.player.weapons.weapon_2.name;

        if(riflename == "weapon_ak47"){
             primaryImg.src ="./../../img/weapons/1/ak47.png";
           }else if(riflename == "weapon_aug"){
             primaryImg.src ="./../../img/weapons/1/aug.png";
           }else if(riflename == "weapon_awp"){
             primaryImg.src ="./../../img/weapons/1/awp.png";
           }else if(riflename == "weapon_bizon"){
             primaryImg.src ="./../../img/weapons/1/bizon.png";
           }else if(riflename == "weapon_famas"){
             primaryImg.src ="./../../img/weapons/1/famas.png";
           }else if(riflename == "weapon_g3sg1"){
             primaryImg.src ="./../../img/weapons/1/weapon_g3sg1.png";
           }else if(riflename == "weapon_galilar"){
             primaryImg.src ="./../../img/weapons/1/galil.png.png";
           }else if(riflename == "weapon_m249"){
             primaryImg.src ="./../../img/weapons/1/m249.png";
           }else if(riflename == "weapon_m4a1"){
             primaryImg.src ="./../../img/weapons/1/m4a4.png";
           }else if(riflename == "weapon_m4a1_silencer"){
             primaryImg.src ="./../../img/weapons/1/m4a1.png";
           }else if(riflename == "weapon_mac10"){
             primaryImg.src ="./../../img/weapons/1/mac10.png";
           }else if(riflename == "weapon_mag7"){
             primaryImg.src ="./../../img/weapons/1/mag7.png";
           }else if(riflename == "weapon_mp7"){
             primaryImg.src ="./../../img/weapons/1/mp7.png";
           }else if(riflename == "weapon_mp9"){
             primaryImg.src ="./../../img/weapons/1/mp9.png";
           }else if(riflename == "weapon_negev"){
             primaryImg.src ="./../../img/weapons/1/negev.png";
           }else if(riflename == "weapon_nova"){
             primaryImg.src ="./../../img/weapons/1/nova.png";
           }else if(riflename == "weapon_p90"){
             primaryImg.src ="./../../img/weapons/1/p90.png";
           }else if(riflename == "weapon_sawedoff"){
             primaryImg.src ="./../../img/weapons/1/sawedoff.png";
           }else if(riflename == "weapon_scar20"){
             primaryImg.src ="./../../img/weapons/1/scar20.png";
           }else if(riflename == "weapon_sg556"){
             primaryImg.src ="./../../img/weapons/1/sg556.png";
           }else if(riflename == "weapon_ssg08"){
             primaryImg.src ="./../../img/weapons/1/scout.png.png";
           }else if(riflename == "weapon_ump45"){
             primaryImg.src ="./../../img/weapons/1/_ump45.png";
           }else if(riflename == "weapon_xm1014"){
             primaryImg.src ="./../../img/weapons/1/autoshotgun.png";
           }

         } 


      ipcRenderer.send('updatelive', null);
    }

