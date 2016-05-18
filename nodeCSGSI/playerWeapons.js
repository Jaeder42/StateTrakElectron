var Player = require('./player.js');
exports.PlayerWeaponsNode = PlayerWeaponsNode;

function PlayerWeaponsNode(PlayerWeaponsData) {
  var self    = this;
  var player  = undefined;
  var weapons = undefined;

  if(typeof PlayerWeaponsData !== 'undefined') {
    this.player = new Player.PlayerNode(PlayerWeaponsData);
    this.weapons = PlayerWeaponsData.weapons;

  }

  this.getPlayer        = function() { return this.player; };
  this.getWeapons       = function() { return this.weapons; };
  this.getWeaponKnife   = function() { if(typeof this.weapons.weapon_0 !== 'undefined') { return this.weapons.weapon_0;} else { return "No knife equipped";}};
  this.getWeaponPistol  = function() { if(typeof this.weapons.weapon_1 !== 'undefined') { return this.weapons.weapon_1;} else { return "No pistol equipped";}};
  this.getWeaponRifle   = function() { if(typeof this.weapons.weapon_2 !== 'undefined') { return this.weapons.weapon_2;} else { return "No rifle equipped";}};

  this.getWeaponName    = function(weapon) { if(typeof weapon.name !== 'undefined') { return weapon.name;} else { return "None";}};
  this.getWeaponPaint   = function(weapon) { if(typeof weapon.paintkit !== 'undefined') { return weapon.paintkit;} else { return "None";}};
  this.getWeaponType    = function(weapon) { if(typeof weapon.type !== 'undefined') { return weapon.type;} else { return "None";} };
  this.getWeaponState   = function(weapon) { if(typeof weapon.state !== 'undefined') { return weapon.state;} else { return "None";} };
  this.getWeaponCurrentAmmo = function(weapon) { if(typeof weapon !== 'undefined' && typeof weapon.ammo_clip !== 'undefined') { return weapon.ammo_clip;} };
  this.getWeaponMaxAmmo     = function(weapon) { if(typeof weapon !== 'undefined' && typeof weapon.ammo_clip_max !== 'undefined') { return weapon.ammo_clip_max;} };
  this.getWeaponReserveAmmo = function(weapon) { if(typeof weapon !== 'undefined' && typeof weapon.ammo_reserve !== 'undefined') { return weapon.ammo_reserve;} };
}
