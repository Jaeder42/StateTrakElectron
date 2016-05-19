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
  ipcMain.on('scorechart',  function(event, arg) {

    event.sender.send('scorechart', arg);

  });



});

http = require('http');
fs = require('fs');

port = 3000;
host = '127.0.0.1';

server = http.createServer( function(req, res) {

    if (req.method == 'POST') {
        //console.log("Handling POST request...");
        res.writeHead(200, {'Content-Type': 'text/html'});

        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            //console.log("POST payload: " + body);
            win.webContents.send("json", body);
        	res.end( '' );
        });
    }
    else
    {
        console.log("Not expecting other request types...");
        res.writeHead(200, {'Content-Type': 'text/html'});
		var html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
        res.end(html);
    }

});

server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
