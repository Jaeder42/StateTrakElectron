const electron = require('electron')

const {app} = electron;
const {BrowserWindow} = electron;
var win;
const ipcMain = require('electron').ipcMain;



app.on('ready', function(){
  win = new BrowserWindow({
    width: 680,
    height: 880,
    resizable: false,
    maximizable: false,
    icon: "assets/icon2_1024px.png",
    backgroundColor: "#2b063d"
  })
  win.loadURL(`file://${__dirname}/pages/loadingscreen/index.html`);


  ipcMain.on('livestats', function(event, arg) {

    win.loadURL(`file://${__dirname}/pages/livestats/index.html`);
    win.show();
  });

  ipcMain.on('profile',  function(event, arg) {
    win.loadURL(`file://${__dirname}/pages/profile/index.html`);
    win.show();

  });
  ipcMain.on('loading',  function(event, arg) {
    
    win.loadURL(`file://${__dirname}/pages/loadingscreen/index.html`);
    win.show();

  });


});
