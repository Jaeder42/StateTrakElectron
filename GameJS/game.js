

var game = function Game(){
  var rounds;
  var over = false;
  var win = false;
  function updateRound(round){
    rounds[round.roundnr] = round;
  }
  function saveGame(roundnr){
    for (i = 0; i < roundnr; i++){
      rounds[i].saveGame();
    }
  }
};

module.exports = game;
