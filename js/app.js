// Enemies our player must avoid
//let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
//    this.sprite = 'images/enemy-bug.png';
//};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
//};

// Draw the enemy on the screen, required method for game
//Enemy.prototype.render = function() {
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//};

//Ememy class
class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {
        return this.x = 60*dt;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x = 0, this.y = 60);

    }
}

const enemy = new Enemy();
const allEnemies = [];
allEnemies.push(enemy);

// Player class
// This class requires an update(), render() and
// a handleInput() method.


class Player {
    constructor(x=200, y=400) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    }

    update(dx=0, dy=0) {
       this.x += dx;
       this.y += dy;  
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    handleInput(evt) {       
        switch (evt.keyCode) {
            case 37:
                if (this.x !== 0) {
                    this.update(-100, 0);
                    } else {
                    this.update(0,0);
                    } //left key pressed    
            break;            
            case 38:
                if (this.y !== 0) {
                    this.update(0, -80); //up key pressed
                } else {
                    this.update(0,0);
                }               
            break;            
            case 39:
                if (this.x < 400) {
                    this.update(100, 0); //right key pressed
                } else {
                    this.update(0,0);
                }
            break;            
            case 40:
                if (this.y < 400) {
                    this.update(0, 80); //down key pressed
                } else {
                    this.update(0,0);
                }
            break;
        }
    }            
}

const player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// document.addEventListener('keyup', function(e) {
    // var allowedKeys = {
    //     37: 'left',
    //     38: 'up',
    //     39: 'right',
    //     40: 'down'
    // };
    // player.handleInput(allowedKeys[e.keyCode]);
// });

document.addEventListener('keydown', function(e) {
    player.handleInput(e);
});
