

var Game = function(){
  var rounds;
  var over = false;
  var win = false;
  function updateRound(roundnr, round){
    rounds[roundnr] = round;
  }
  function saveGame(roundnr){
    for (int i = 0; i < roundnr;; i++){
      rounds[i].saveGame();
    }
  }
};

module.exports = new Game();
