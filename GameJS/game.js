
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
  //TODO if over && mapphase == live new game


  const ipcMain = require('electron').ipcMain;

  var firebase = require("firebase");
  firebase.initializeApp({
    serviceAccount: {
      projectId: "project-4827775819308929475",
      clientEmail: "statetrakclient@project-4827775819308929475.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCR7UFw1048nzfa\nEDZblgrTc48m+oi+Mqx38Bn0ONXwnko4Cn3ck+5SMo3HjyfcakLxFadsWcxCX6an\n2ICBbTIFLXmWLv9d4U7DLm4lgktIy9QcWa/o3Y700NtYFYCPB3WuKC849VyIszyt\nWpbHzS6yYRGuCLlhe75E+LDJz09bcPUXZLNhUrXUAC8GUg5gjF7NUKmRnRzmG3gj\ndGx8AFbPzrtP/SgAlK5omSqO0YMN7kLZMhoRsNcYv2G5NDsFHqUDZ+MKnN3xqXmS\nbUceiTfft83TVwvmswElTTXfd7oYv4JRswHe998lZqNc3+bTCF1L0SvH2/iRA8lT\n9NCNIfe/AgMBAAECggEAT3GqIeOlfU11G6ud3EiYRjvwYFke3uU5jeZSSuoyVtfm\nMhJMKS0EHw3UsCMYoV/cZ+HRDyToFe57DX/JniyzgawbOI8HibWiqpH5d0Qy9kO5\ni2GsagtMy6107MRwA+4cvB62brztjqJ90yaxVb83v/cmp+ep/Q9gK650mLnbSz0i\n8hN0I2ZUd+92HxBZn3ZW6HPSQuR7PrJ9scTiLw8e65IOhz2m2YqNY/01ueLszQkp\nuALmGjStk15exWJgk88z5NRsXjdswdZv7F/KYmu4VAAz80G8xSsmYFKL22c/d1Sw\nRRP+ok4/OqmSEXYDjZXjV7wQclyyoGSdMj/7X8SzwQKBgQDnCjAdf6cLD6VpWVSo\neB1VNPNiAv4ak8KpHXlV840urJPSHSm41YY7cUlgy4zpce0fI8aoujN+Y75KRHKC\nopszeRU3PM53JQf/Fk/p++GkNhQQHvDWDvYCF3WdFKcDnEFSE2OV4JItp3SFR9GO\nHpzaYWPq2cgVWlYiX0RwW9jz4QKBgQChsR4Rib5hcWALouJJIUhA402NxHUpuAM8\nWwI2laSDrftupVihx6ZeI9uEkpvopK3ssFesr6ig0tMGzBrtrEDgCyvAg4nUVRXR\nKx3/OBfPtK94//oJ2lm/HuIxcyY4JKeFE36dTlQeIXIqhDZBFlXSVRMKOVuRGBMp\nPfeE+yJfnwKBgCFw+hHq/jS9qQWcpoJUEHra1Tekkz8pkA2GdJ+aRx8wX50UF4vn\nbCyCc0qNa/IGSXouZXzapsVujoaVbbW275v9tLJwHLpmI8gqZJrLmJd6NGE4+Uci\nlz0qRB3edWYyYcoNgGabQM1W5ai9Ann9uFprqli9+RYOI1WKUI+q27ZBAoGAcv7W\n1b5TSlYp6tyzdzNWgd+nPpZkhYE7u+c2EcAnuwc39R9fg9/McNOrwgPLIpBMqjNY\nh5Z+pbKLJyBuXm7NzQnk2gwzMHI7DAJQWT15od1tlu7m068ZeRXr5SNyISfghIKy\n4AnfRXagDaDuPSg3bVnYKsNUXkLzDbfmnAtIDR0CgYEAii6C6k2rZKyVfcoUrgGt\njQrGrbL28T5sPL1mbvt4xK1egfxcT/5gUY9ToXpVqVmPktNFnXwgBARdWrwiIiVN\n2BFYtheud0xZ0rI4h9KRszG8UZVQxbPi2bi/oK+l1Qlj35fw2W5eoYPptvodujCw\nPXzn6t5KPo9rbOXVKPoFK6I=\n-----END PRIVATE KEY-----\n"
    },
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
  roundstosave = [];
    for (i = 0; i < roundnr; i++){
      if(rounds[i] != null){
      roundstosave[i] = rounds[i].saveRound();
    }
    }

    win = true;
    matchdata = {
      kills :kills,
      deaths : deaths,
      assists : assists,
      mvps : mvps,
      score: score,
      rounds: roundstosave
    };
  var newMatchKey = firebase.database().ref().child('users').push().key;
     var updates = {};
     updates['/users/'+providerid+'/matches/' + newMatchKey] = matchdata;
     firebase.database().ref().update(updates);

  }

  function checkGameOver(){
    phase = rounds[roundnr].getMapPhase();
    console.log(phase);
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
  function calclossbonus(){
    var losses = 0;
    var lossbonus = 1400;
    for ( i = roundnr-1; i > 0; i--){
      if(rounds[i] != null){
      if(!rounds[i].win()){
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

  function calcRoundType(spentMoney){
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
    if(rounds[roundnr] != null){
    var moneyonwin = rounds[roundnr].getMoney() + 3250;
    var moneyonloss = rounds[roundnr].getMoney() + lossbonus;

    data = {
      lossbonus: lossbonus,
      lossmoney: moneyonloss,
      winmoney: moneyonwin,
      kd: kd,
      hs: hs
    }
    event.sender.send('updatelive-reply', JSON.stringify(data));

}
  });

  game.prototype.updateRound = function(body){

    round = new Round(body);

  if(!over){
      roundnr = round.getRoundNr();

      providerid = round.getProviderID();
      rounds[roundnr] = new Round(body);
      for(i = 0; i < rounds.length;i++)
        console.log (i + " " +rounds[i].getRoundNr());
    /*  if(rounds[roundnr] === null){
        currentMoney = rounds[roundnr].getMoney();
        var spentMoney = 0;
      }else if(round.getRoundphase() != over){
        var spentMoney = currentMoney - rounds[roundnr].getMoney();
      }*/
      calchs();
      calclossbonus();
      //calcRoundType(spentMoney);



      kills = round.getKills();
      assists = round.getAssists();
      deaths = round.getDeaths();
      mvps = round.getMvps();
      score = round.getScore();
      kd = Math.round(kills/deaths);






  }
      checkGameOver();


  };



};



module.exports = game;
