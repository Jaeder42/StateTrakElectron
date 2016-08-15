
var game = function Game(){
  var Round = require('./round.js');
  var rounds = [];
  var providerid = 'jaeder42';
  var over = false;
  var win = false;
  var roundnr = 0;
  var currentKills = 0;
  var currentMoney;
  var spentMoney = 0;
  var lossbonus = 1400;
  var kills = 0;
  var deaths = 0;
  var assists = 0;
  var mvps = 0;
  var hs = 0;
  var score = 0;
  var over = false;
  var kd = 0;
  var killswithweapon = [];

  const ipcMain = require('electron').ipcMain;

  var firebase = require("firebase");
  firebase.initializeApp({
    serviceAccount: "StateTrak-d54c9c641032.json",
    databaseURL: "https://project-4827775819308929475.firebaseio.com/"
  });



  firebase.database().ref('/users/jaeder42').once('value').then(function(snapshot) {
    kills = snapshot.val().kills;
  });

  //TODO RMV DEBUGSTUFF
  //saveGame();
/*
  function writeUserData(userId, kills, deaths) {
    firebase.database().ref('users/' + userId).update({
      kills: kills,
      deaths: deaths,
      test: "hej"
    });
  }*/
  function saveGame(){
  /*roundstosave = [];
    for (i = 0; i < roundnr; i++){
      if(rounds[i] != null){
      roundstosave[i] = rounds[i].saveRound();
    }
  }*/

    win = true;
    matchdata = {
      kills :kills,
      deaths : deaths,
      assists : assists,
      mvps : mvps,
      score: score,
      rounds: rounds
    };
  var newMatchKey = firebase.database().ref().child('users').push().key;
     var updates = {};
     updates['/users/'+providerid+'/matches/' + newMatchKey] = matchdata;
     firebase.database().ref().update(updates);

  }

  function checkGameOver(){
    if(rounds[roundnr] != null){
    phase = rounds[roundnr].getMapPhase();
  //  console.log(phase);
    if(phase === 'gameover'){
      if(!over){
        saveGame();
        over = true;
      }
    }
    else if (over){
      rounds = [];
      over = false;
    }
  }
}
  function calclossbonus(){
    var losses = 0;
    var lossbonus = 1400;
    for ( i = roundnr-1; i > 0; i--){
      if(rounds[i] != null){
      if(!rounds[i].getWin()){
        losses++;
      }
      else{

        break;
      }
    }
    else {
      break;
    }
  }
    if(losses > 4){ losses = 4}
    lossbonus = lossbonus + (500*losses);

  }
  function detectKillWeapon(){
    newkills = rounds.getKills();
    if(kills < newkills){
      killswithweapon[newkills] = rounds[roundnr].getCurrentWeapon();
    }
  }

  function calcRoundType(spentMoney){
    if(rounds[roundnr]!=null){
    if(spentMoney <= 1000){
      //TODO check if player has armor/rifle
      if(roundnr === 1 || roundnr === 16){
        rounds[roundnr].setRoundType("pistol");
      }
      rounds[roundnr].setRoundType("eco");
    }
    else if (spentMoney <= 2000) {
      //TODO check if player has armor/rifle
      rounds[roundnr].setRoundType("force");
    }
    else{
      rounds[roundnr].setRoundType("buy");
    }
  }
}

  function calchs(){
    hs = 0;
    for (i = 0; i < roundnr; i++){
      if(rounds[i] != null){
        hs += rounds[i].getRoundshs();
        console.log(rounds[i].getRoundshs());
      }
    }
  }

  ipcMain.on('updatelive', (event, arg) => {
  //  console.log("Tjo " + roundnr);
  //  console.log(rounds);
    if(rounds[roundnr] != null){

    var moneyonwin = rounds[roundnr].getMoney() + 3250;
    var moneyonloss = rounds[roundnr].getMoney() + lossbonus;

    data = {
      lossbonus: lossbonus,
      lossmoney: moneyonloss,
      winmoney: moneyonwin,
      kd: kd,
      hs: hs
    };
    roundstodisplay = [];
    for (i = 0; i <= roundnr; i++){
      if(rounds[i] != null){
      roundstodisplay.push(rounds[i].getRoundKills());
    }
    else roundstodisplay.push(0);
    }


    datatosend = {
      rounds: roundstodisplay,
      wins: rounds[roundnr].getWins(),
      losses: rounds[roundnr].getLosses(),
      roundid: roundnr
    };
    console.log(JSON.stringify(datatosend));
    event.sender.send('scorechart', JSON.stringify(datatosend));

    event.sender.send('updatelive-reply', JSON.stringify(data));

}
  });

  game.prototype.updateRound = function(body){

    round = new Round(body);
    roundnr = round.getRoundNr();
    if(!round.skip){
    rounds[roundnr] = round;

    providerid = round.getProviderID();
  if(!over && round != null){

    if(roundnr > 0){
      if(rounds[roundnr-1] != null){
      var spentmoney = rounds[roundnr-1].getMoney() - rounds[roundnr].getMoney();
      rounds[roundnr].setSpentMoney(spentmoney);
    }
    }
    else{
      var spentmoney = 800-rounds[roundnr].getMoney();
      rounds[roundnr].setSpentMoney(spentmoney);
    }
      //rounds[roundnr] = round;

  /*if(rounds[roundnr] === null){
        rounds[roundnr] = round;
        currentMoney = rounds[roundnr].getMoney();
        var spentMoney = 0;
     }else if(round.getRoundphase() != over){
        rounds[roundnr] = round;
        var spentMoney = currentMoney - rounds[roundnr].getMoney();
      }*/
      calchs();
      calclossbonus();



      kills = round.getKills();
      assists = round.getAssists();
      deaths = round.getDeaths();
      mvps = round.getMvps();
      score = round.getScore();
      kd = Math.round((kills/deaths)*100)/100;

  }
}
      checkGameOver();


  };



};



module.exports = game;
