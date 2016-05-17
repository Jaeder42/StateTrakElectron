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
    }

  ]

}
];
var menu = Menu.buildFromTemplate(menuitem);
Menu.setApplicationMenu(menu);
