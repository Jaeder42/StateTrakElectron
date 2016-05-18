exports.MapNode = MapNode;

function MapNode(MapData) {
  var self          = this;
  var name          = undefined;
  var phase         = undefined;
  var round         = undefined;
  var team_ct       = undefined;
  var team_t        = undefined;
  var team_ct_score = undefined;
  var team_t_score  = undefined;

  // Previous states and added
  var previousMapState = undefined;
  var addedMapState    = undefined;

  if(typeof MapData !== 'undefined') {
    this.name          = MapData.name;
    this.phase         = MapData.phase;
    this.round         = MapData.round;
    this.team_ct       = MapData.team_ct;
    this.team_t        = MapData.team_t;
    this.team_ct_score = MapData.team_ct.score;
    this.team_t_score  = MapData.team_t.score;
  }

  if(typeof MapData.previously !== 'undefined') {
    this.previousMapState = new MapNode(MapData.previously);
  }

  if(typeof MapData.added !== 'undefined') {
    this.addedMapState = new MapNode(MapData.added);
  }

  this.getPreviousMapState = function() { return this.previousMapState; }
  this.getAddedMapState    = function() { return this.addedMapState; }
  this.getMapName          = function() { return this.name; };
  this.getMapPhase         = function() { return this.phase; };
  this.getMapRound         = function() { return this.round; };
  this.getMapCTScore       = function() { return this.team_ct_score; };
  this.getMapTScore        = function() { return this.team_t_score; };
}
