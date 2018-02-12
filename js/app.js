// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 0;
    this.speedX = 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speedX * dt;
    if(this.x >= 510) {
      this.x = -10;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 2 * 101;
  this.y = 5 * 83;
  this.updateLocation;
};

// focus purely on updating the data/properties related to the object.
// Do your drawing in your render methods.
Player.prototype.update = function() {
  for (loc in this.updateLocation) {
    if (this.canMove(loc)) {
      switch (loc) {
        case 'x':
          this.x += this.updateLocation['x'];
          break;
        case 'y':
          this.y += this.updateLocation['y'];
          break;
        default:
          console.log("Fatal Update Error: loc key not found")
          break;
      }
    }
  }
  this.updateLocation = {};
};

Player.prototype.canMove = function(direction) {
  switch (direction) {
    case 'x':
      const deltaX = this.updateLocation[direction];
      return this.x + deltaX >= 0 && this.x + deltaX <= 404;

    case 'y':
      const deltaY = this.updateLocation[direction];
      return this.y + deltaY >= 0 && this.y + deltaY <= 415;
    default:
  }
};

// TODO: Refactor: Exactly as Enemy.prototype.update
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keycode) {
  switch (keycode) {
    case 'left':
      this.updateLocation['x'] = -101;
      break;
    case 'right':
      this.updateLocation['x'] = 101;
      break;
    case 'up':
      this.updateLocation['y'] = -83;
      break;
    case 'down':
      this.updateLocation['y'] = 83;
      break;
    default:
      // Ignore undefined input
      break;
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [new Enemy()];
const player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
