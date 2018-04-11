/* Ememy class */

class Enemy {
    constructor(x = -100, y = Math.floor(Math.random()*3+1)*73, speed = Math.floor((Math.random() * 4)+1)*100) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.speed = speed;
        this.y = y;
    }

    /* This updates the enemy's position, each enemy has a randomly set speed */
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

    /* Stop all enemys' movements, when the game finishes*/
    pause() {
        this.speed = 0;
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}


const enemy0 = new Enemy(), 
    enemy1 = new Enemy(),
    enemy2 = new Enemy(),
    enemy3 = new Enemy();


/* allEnemies array */
const allEnemies = [];

allEnemies.push(enemy0);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

/* Player class */

class Player {
    constructor(x=200, y=400, starCollected=0) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.starCollected = starCollected;
    }

    /* Update the player's position based on keyboard input
     * and check if player's position contradicts enemies' positions.
     * If conflict is detected, the player reset to its initial position.  
    */
    update(dx=0, dy=0) { 
        this.x += dx;
        this.y += dy;
        let conflict = this.checkCollisions();
        setTimeout(function() {
            if (conflict) {
                this.reset();
            }
        }, 100); 
    }
    
    /* Check if player's position contradicts enemies' positions.
     * if conflict is detected, return true.
    */
    checkCollisions () {
        for (const enemy of allEnemies) {
            const enemyX = enemy.x, 
                enemyY = Math.floor(enemy.y / 73),
                playerX = this.x,
                playerY = Math.floor(this.y / 80);
                    
            if (playerX - enemyX <= 80 && playerX - enemyX >= - 60 && playerY === enemyY) {
                return true;
            }
        }
    }
        
    /* When the player moves to a star's position, it collects the star*/
    collectStar() {    
        
            for (let star of allStars) {
                if (Math.abs(this.x - star.x) <= 70 && Math.abs(this.y - star.y) <= 70 && this.starCollected < 3 && star.y !== -25) {
                    star.update(this.starCollected);
                    this.starCollected++;            
                } 
            }
                  
    }

    /*When all stars are successfully collected and the player reaches the rive */
    win() {
        if (this.starCollected ===3 && this.y === 0) {
            return true;
            }
    }
    

    reset () {
        location.reload();

    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    /* Use keys to control the move of the player*/
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


/* Star class*/
class Star {
    constructor(x=Math.floor(Math.random()*400), y=Math.floor(Math.random()*3+1)*73) {
    this.sprite = 'images/star.png';
    this.x = x;
    this.y = y;
    }

    update(i) {
        this.y = -200;
        this.x = i*200 + 20;

    }

    /* When the player wins(stars collected, river reached), the stars drop to the ground from the top of the screen */
    celebrate(dt, speed = 300) {        
        if (this.y <= 480) {
            this.dt = dt;
            this.y += speed*dt;
        }
    }

    render() {
        let starIcon = Resources.get(this.sprite);
        ctx.drawImage(starIcon, this.x, this.y, starIcon.width*0.7, starIcon.height*0.7);
    }

}

const star0 = new Star(),
    star1 = new Star(),
    star2 = new Star(),
    allStars = [];

allStars.push(star0);
allStars.push(star1);
allStars.push(star2);



/* This listens for key presses and sends the keys to the Player.handleInput() method.*/

document.addEventListener('keydown', function(e) {
    setTimeout(function() {player.handleInput(e);}, 10);
    setTimeout(function() {player.collectStar();}, 500);
    setTimeout(function() {player.win();}, 1500);


});

