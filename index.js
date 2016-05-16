const electron = require('electron')

const {app} = electron;
const {BrowserWindow} = electron;

app.on('ready', function(){
  win = new BrowserWindow({
    width: 680,
    height: 880,
    resizable: false,
    maximizable: false,
    icon: "statetrakwinicon.ico"


  })
  win.loadURL(`file://${__dirname}/StateTrak.html`);

})
