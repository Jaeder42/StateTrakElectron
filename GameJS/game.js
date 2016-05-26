var rounds = [];
var over = false;
var win = false;
var roundnr = 0;
var currentKills = 0;
var currentMoney;
var spentMoney = 0;
var lossbonus = 1400;
var kills;
var deaths;
var assists;
var mvps;
var hs;
var score;

var firebase = require("firebase");

var game = function Game(){



  function saveGame(roundnr){
    for (i = 0; i < roundnr; i++){
      rounds[i].saveGame();
    }
  }
};

module.exports = game;

function checkGameOver(){
  phase = rounds[roundnr].roundphase;
}
function calclossbonus(){
  var losses = 0;
  for ( i = roundnr; i > 0; i--){
    if(rounds[i].win()){
      losses++;
    }
    else{

      break;
    }
  }
  if(losses > 4){ losses = 4}
  lossbonus = lossbonus + (500*losses);

}

function calcRoundType(spentMoney){
  if(spentMoney <= 1000){
    //TODO check if player has armor/rifle
    if(roundnr == 1 || roundnr == 16){
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

game.prototype.updateRound = function(round){


    roundnr = round.getRoundNr();
    if(rounds[roundnr] == null){
      rounds[roundnr] = round;
      //currentMoney = rounds[roundnr].getMoney();
      var spentMoney = 0;
    }else{
      rounds[roundnr] = round;
      //spentMoney = currentMoney - rounds[roundsnr].getMoney();
    }
    calclossbonus();

    //calcRoundType(spentMoney);

    //checkGameOver();

};
