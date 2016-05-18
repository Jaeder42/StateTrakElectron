// Description
//------
// `ProviderNode` is a JSON object that contains information about the provider of the data.
// Members
//--------
// `name` of the provider
//
// `appid` application id (e.g CS:GO)
//
// `version` game version of the application
//
// `steamid` of the player (in steamID64 format)
//
// `timestamp` of the `ProviderNode` object
//
// `previousProviderState` is defined if the provider node contains a previous ProviderNode object
//
// `addedProviderState` is defined if the provider node contains an added ProviderNode object
// Functions
//----------
// `getPreviousProviderState()`
//
// returns the provider object for state that was previously there, but has altered.
function ProviderNode(ProviderData) {
  var self      = this;
  var name      = undefined;
  var appid     = undefined;
  var version   = undefined;
  var steamid   = undefined;
  var timestamp = undefined;
  var previousProviderState = undefined;
  var addedProviderState    = undefined;

  if(typeof ProviderData !== 'undefined') {
    this.name      = ProviderData.name;
    this.appid     = ProviderData.appid;
    this.version   = ProviderData.version;
    this.steamid   = ProviderData.steamid;
    this.timestamp = ProviderData.timestamp;
  }

  if(typeof ProviderData.previously !== 'undefined') {
    this.previousProviderState = new ProviderNode(ProviderData.previously);
  }

  if(typeof ProviderData.added !== 'undefined') {
    this.addedProviderState = new ProviderNode(ProviderData.added);
  }

  this.getPreviousProviderState = function() { return this.previousProviderState; };
  this.getAddedProviderState    = function() { return this.addedProviderState; };
  this.getProviderName          = function() { return this.name; };
  this.getProviderAppid         = function() { return this.appid; };
  this.getProviderVersion       = function() { return this.version; };
  this.getProviderSteamid       = function() { return this.steamid; };
  this.getProviderTimestamp     = function() { return this.timestamp; }
}
exports.ProviderNode = ProviderNode;
