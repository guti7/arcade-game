
/*
* Constants for grid values
*/
const GRID = {
  CELL_WIDTH: 101,
  CELL_HEIGHT: 83,
  MIN_WIDTH: 0,
  MAX_WIDTH: 404,
  MIN_HEIGHT: 0,
  MAX_HEIGHT: 415,
  PLAYER_START_X: 2,
  PLAYER_START_Y: 5
};

/*
* Provides a random int inclusive
*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

/*
* Provides a random value between min and max
*/
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/*
* Instantiates the enemies for the board
*/
function setupEnemies(count) {
  for (var i = 0; i < count; i++) {
    allEnemies.push(createEnemy());
  }
}

/*
* Returns a new enemy
*/
function createEnemy(x) {
  var positionX;
  if (x) {
    positionX = x;
  } else {
    positionX = getRandomArbitrary(GRID.MIN_WIDTH, GRID.MAX_WIDTH);
  }
  var positionY = getRandomIntInclusive(1, 3) * GRID.CELL_HEIGHT;
  var speed = getRandomArbitrary(100, 300);
  return new Enemy(positionX, positionY, speed);
}


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speedX = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speedX * dt;
    if(this.x >= ctx.canvas.width) {
      var indexToRemove = allEnemies.indexOf(this);
      allEnemies.splice(indexToRemove, 1, createEnemy(-10));
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
  this.x = GRID.PLAYER_START_X * GRID.CELL_WIDTH;
  this.y = GRID.PLAYER_START_Y * GRID.CELL_HEIGHT;
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

/*
* Checks the bounds of the grid to allow the player to move
*/
Player.prototype.canMove = function(direction) {
  switch (direction) {
    case 'x':
      const deltaX = this.updateLocation[direction];
      return this.x + deltaX >= GRID.MIN_WIDTH && this.x + deltaX <= GRID.MAX_WIDTH;

    case 'y':
      const deltaY = this.updateLocation[direction];
      return this.y + deltaY >= GRID.MIN_HEIGHT && this.y + deltaY <= GRID.MAX_HEIGHT;
    default:
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keycode) {
  switch (keycode) {
    case 'left':
      this.updateLocation['x'] = -GRID.CELL_WIDTH;
      break;
    case 'right':
      this.updateLocation['x'] = GRID.CELL_WIDTH;
      break;
    case 'up':
      this.updateLocation['y'] = -GRID.CELL_HEIGHT;
      break;
    case 'down':
      this.updateLocation['y'] = GRID.CELL_HEIGHT;
      break;
    default:
      // Ignore undefined input
      break;
  }
}

/*
* Checks for player and enemy collisions
*/
Player.prototype.hasCollided = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    var currEnemy = allEnemies[i];
    if (currEnemy.x < player.x + GRID.CELL_WIDTH &&
        currEnemy.x + GRID.CELL_WIDTH > player.x &&
        currEnemy.y < player.y + GRID.CELL_HEIGHT &&
        GRID.CELL_HEIGHT + currEnemy.y > player.y) {
      return true;
    }
  }
  return false;
};

/*
* Checks for completion of the level
*/
Player.prototype.hasWon = function() {
  return player.y === GRID.MIN_HEIGHT;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
setupEnemies(4);
let player = new Player();

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
