var fs = require('fs');
var user = JSON.parse(fs.readFileSync('jsonfiles/exampleuser.json', 'utf8'));
var table = document.getElementById("matchtable")
//ipcRenderer.send('debugjson', user.wins);

if(user != null){
  populate();
}

function populate(){
  var steamid = document.getElementById("steamidnr");
  var wins = document.getElementById("wins");
  var kills = document.getElementById("kills");
  var headshots = document.getElementById("headshots");
  var mvps = document.getElementById("mvps");
  var assists = document.getElementById("assists");
  var kd = document.getElementById("kd");

  steamid.innerHTML = user.steamid;
  wins.innerHTML = user.wins;
  kills.innerHTML = user.kills;
  headshots.innerHTML = user.headshots;
  mvps.innerHTML = user.mvps;
  assists.innerHTML = user.assists;
  kd.innerHTML = user.kd;

  var matches = user.matches;

  matches.forEach(populateRow);
  
}

function populateRow(item, index){


  var row = table.insertRow(index);
  var matchid = row.insertCell(0);
  var matchwin = row.insertCell(1);
  var matchkills = row.insertCell(2);
  var matchhs = row.insertCell(3);
  var matchmvp = row.insertCell(4);
  var matchassists = row.insertCell(5);
  var matchkd = row.insertCell(6);

  matchid.innerHTML = item.matchid;
  matchwin.innerHTML = item.win;
  matchkills.innerHTML = item.kills;
  matchhs.innerHTML = item.headshots;
  matchmvp.innerHTML = item.mvps;
  matchassists.innerHTML = item.assists;
  matchkd.innerHTML = 0;

}
