var loaded = false;

var image = document.getElementById("loading");
var subtitle = document.getElementById("subtitle")

image.innerHTML = '<img src = "../../assets/loading.gif" />';
setInterval(text, 750);
setInterval(switchload,1300);
setInterval(loadfinish,3000);


function loadfinish(){
  //image.innerHTML = '';
  //image.innerHTML = '<img src = "../../assets/loading.gif" />';
  ipcRenderer.send('livestats', 'livestats');

}

function switchload(){
  //image.innerHTML = '';
  image.innerHTML = '<img src = "../../assets/animation_ladda.gif" />';

}
function text(){
  subtitle.innerHTML = "Counter-Strike: Global Offensive";
}
