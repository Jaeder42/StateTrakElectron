const remote = require('electron').remote;
const Menu = remote.Menu;
const ipcRenderer = require('electron').ipcRenderer;
var menuitem = [
  {
    label: 'Start',
    submenu: [
      {
      label: 'Close',
      accelerator: 'CmdOrCtrl+Q',
      role: 'close'
    }
  ],
},
{
  label: 'Window',
  submenu: [
    {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
        }
    },
    {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.webContents.toggleDevTools();
        }
      }
  ]
},
{
  label: 'Pages',
  submenu: [
    {
      label: 'LiveStats',
      click: function(item, focusedWindow){
        ipcRenderer.send('livestats', 'livestats');
      }
    },
    {
      label: 'Profile',
      click: function(item, focusedWindow){
        if(focusedWindow)
          ipcRenderer.send('profile', 'profile');
      }
    },
    {
      label: 'Loading',
      accelerator: 'CmdOrCtrl+E',
      click: function(item, focusedWindow){
        if(focusedWindow)
          ipcRenderer.send('loading', 'loading');
      }
    }

  ]

}
];
var menu = Menu.buildFromTemplate(menuitem);
Menu.setApplicationMenu(menu);
