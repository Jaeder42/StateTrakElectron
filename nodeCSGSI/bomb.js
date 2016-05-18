exports.Bomb = Bomb;

function Bomb(roundPhase, provider) {
  this.IsBombPlanted;
  this.c4Interval;
  this.bombTimer = 40;

  this.getTimeLeft = function() {
    return this.bombTimer - (new Date().getTime() / 1000 - provider.getProviderTimestamp());
  };

  this.setBombPlanted = function(bombstate, eventEmitter) {
    if(bombstate == 'planted' && !this.IsBombPlanted) {
      this.IsBombPlanted = true;
      var timeleft = this.getTimeLeft();
      eventEmitter.emit('bombTimeStart', timeleft);
      this.countdown(timeleft);
    }
  };

  this.bombReset = function() {
    this.IsBombPlanted = false;
    clearInterval(this.c4Interval);
  };

  this.roundOverState = function(bombstate) {
    if(this.IsBombPlanted) {
      this.IsBombPlanted = false;
      clearInterval(this.c4Interval);
    }
  };

  this.countdown = function(time, eventEmitter) {
    var self = this
    this.c4Interval = setInterval(function() {
      time = time - 1;
      if(time <= 0) {
        clearInterval(self.c4Interval);
        // counter ended
        self.IsBombPlanted = false;
        return;
      }
      eventEmitter.emit('bombTimeLeft', time);
    }, 1000);
  };
}
