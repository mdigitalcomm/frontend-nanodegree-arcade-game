// Enemies our player must avoid
//let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
//    this.sprite = 'images/enemy-bug.png';
//};


//Enemy.prototype.update = function(dt) {
    
//};

//Enemy.prototype.render = function() {
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//};

//Ememy class
class Enemy {
    constructor(x = -100, y = Math.floor(Math.random()*3+1)*73, speed = Math.floor((Math.random() * 4)+1)*100) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.speed = speed;
        this.y = y;
    }
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

    update(dt) {
        this.dt = dt;
        if (this.x < 500 ) {
            this.x += this.speed * this.dt;
        } else {
            this.speed = Math.floor((Math.random() * 4)+1)*100;
            this.x = -1 * Math.floor((Math.random() * 6)+1)*100;
            this.y = Math.floor(Math.random()*3+1)*73;
        }
    }

    pause() {
        this.speed = 0;
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}


const enemy0 = new Enemy();
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();
const enemy5 = new Enemy();

const allEnemies = [];
// Place all enemy objects in an array called allEnemies
allEnemies.push(enemy0);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);

// Player class
class Player {
    constructor(x=200, y=400) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    }

    update(dx=0, dy=0) { 
        let conflict = this.checkColitions();
        if (!conflict) {
            this.x += dx;
            this.y += dy;
        } else {
            setTimeout(this.reset(), 10000);
        } 
    }
    
    checkColitions () {
        for (const enemy of allEnemies) {
            const enemyX = enemy.x, 
                enemyY = Math.floor(enemy.y / 72),
                playerX = this.x,
                playerY = Math.floor(this.y / 80);
                    
            if (Math.abs(playerX - enemyX) <= 80 && playerY === enemyY) {
                return true;
            }
        }
    }
    
    reset () {
        this.x = 200;
        this.y = 400;
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    handleInput(evt) {       
        
            switch (evt.keyCode) {
                case 37: //left key pressed
                    if (this.x !== 0) {
                        this.update(-100, 0);
                        } else {
                        this.update(0,0);
                        }  
                break;            
                case 38: //up key pressed
                    if (this.y !== 0) {
                        this.update(0, -80); 
                    } else {
                        this.update(0,0);
                    }               
                break;            
                case 39: //right key pressed
                    if (this.x < 400) {
                        this.update(100, 0); 
                    } else {
                        this.update(0,0);
                    }
                break;            
                case 40: //down key pressed
                    if (this.y < 400) {
                        this.update(0, 80); 
                    } else {
                        this.update(0,0);
                    }
                break;
            }
        }
               
}

const player = new Player();




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
