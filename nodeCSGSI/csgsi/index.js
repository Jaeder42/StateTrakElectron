var CSGSI = require('../index');
var gsi = new CSGSI();


// Provider events
gsi.on('provider', function(providerData) {
  console.log("Provider name: " + providerData.getProviderName());
});


// Map events
gsi.on('gameMap', function(map) {
  console.log('Current map:' + map);
});

gsi.on('gamePhase', function(phase) {
  console.log('Game phase:' + phase);
});

gsi.on('gameRounds', function(rounds) {
  console.log('Current round number:' + rounds);
});

gsi.on('gameCTscore', function(ctScore) {
  console.log('CT round score:' + ctScore);
});

gsi.on('gameTscore', function(tScore) {
  console.log('T round score:' + tScore);
});


// Round events
gsi.on('roundPhase', function(phase) {
  console.log('Current round state:' + phase);
});

gsi.on('roundWinTeam', function(winner) {
  console.log('Last rounds winner:' + winner);
});

// Player events

gsi.on('player', function(playerData) {
  console.log("Player name: " + playerData.getPlayerName());
});

// Player state
gsi.on('playerState', function(stateData) {
  console.log('Player health:' + stateData.getPlayerHealth());
  console.log('Player money:' + stateData.getPlayerMoney());
});

// Player weapons data
gsi.on('playerWeapons', function(weaponsData) {
  var knife = weaponsData.getWeaponKnife();
  var pistol = weaponsData.getWeaponPistol();
  var rifle = weaponsData.getWeaponRifle();
  console.log("Knife name: " + weaponsData.getWeaponName(knife));
  console.log("Pistol name: " + weaponsData.getWeaponName(pistol));
  console.log("Rifle name: " + weaponsData.getWeaponName(rifle));
});

// Player match stats
gsi.on('playerMatchStats', function(matchStatsData) {
  var kills = matchStatsData.getPlayerKills();
  var deaths = matchStatsData.getPlayerDeaths();
  var assists = matchStatsData.getPlayerAssists();
  var mvps = matchStatsData.getPlayerMVPS();
  var score = matchStatsData.getPlayerScore();
  console.log("Kills: " + kills);
  console.log("deaths: " + deaths);
  console.log("assists: " + assists);
  console.log("mvps: " + mvps);
  console.log("score: " + score);
});

// C4 events
gsi.on('bombState', function(state) {
  console.log('Bomb state:' + state);
});

gsi.on('bombTimeStart', function() {
  console.log('C4 planted');
});

gsi.on('bombTimeLeft', function(time) {
  console.log('C4:' + time);
});
