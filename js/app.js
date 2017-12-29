class Subject {
    constructor(x, y, speed, img) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = img
    }

    // Update the subject's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x += this.speed * dt;
    }

    // Draw the subject on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


// Enemies our player must avoid
class Enemy extends Subject {
    constructor(x, y, speed, img = "images/enemy-bug.png") {
        super(x, y, speed, img);
        this.sprite = img;
    }

    update(dt) {
        super.update(dt);
        if (this.x >= 505) {
            this.x = 0;
        }
        // collision method
        player.collision(this);
    }
}

// array to collect enemies
let allEnemies = [],
    scoreLabel = document.getElementById('score'),
    livesLabel = document.getElementById('lives'),
    lives = 4,
    score = 1;

// Our player
class Player extends Subject {
    constructor(x, y, speed, img = "images/char-boy.png") {
        super(x, y, speed, img);
        this.sprite = img;
    }

    update(dt) {}

    // reset game to original state
    reset() {
        lives = 4;
        score = 1;
        allEnemies = [];        
        enemy = new Enemy(0, Math.random() * 180 + 50, Math.random() * 200);
        allEnemies.push(enemy);        
    }


    // display player key moves and make sure not go beyond the boundries
    handleInput(keyPress) {
        if (keyPress == 'left') {
            this.x -= 101;
            if(this.x < 0) {
                this.x = 0;
            }
        } else if(keyPress == 'right') {
            this.x += 101;
            if(this.x > 408) {
                this.x = 408;
            }
        } else if(keyPress == 'up') {
            this.y -= 83;
            if(this.y <= -7) {
                this.y = -7;         
                setTimeout(() => {
                    this.y = 408;
                    levelOfDifficulty();
                }, 700);
                    
            }
        } else if(keyPress == 'down') {
            this.y += 83;
            if(this.y > 408) {
                this.y = 408;
            }
        }
    }

    // check collision between player and enemy
    collision(enemy) {
        if (this.y + 131 >= enemy.y + 90
            && this.x + 25 <= enemy.x + 88
            && this.y + 73 <= enemy.y + 100
            && this.x + 76 >= enemy.x + 11) {
            this.x = 200;
            this.y = 408;
            // decrease player lives
            lives--;
        }
        // player loses if lives = 0
        if(lives === 0) {
            alert('you Lose!');
            // Reset the game
            this.reset();
        }
        
        livesLabel.innerHTML = `Lives: ${lives}`;
        scoreLabel.innerHTML = `Score: ${score}`;
    }
}


// increase score and difficulty each time player reach water
function levelOfDifficulty() {
    if(score < 8) {
        score++;
        // reset all enemies to 0 to create new ones
        allEnemies = [];
        // create enemies according to score
        for (let i = 0; i < score; i++) {
            enemy = new Enemy(0, Math.random() * 180 + 50, Math.random() * 200);
            allEnemies.push(enemy);
        }
    }
    // Player wins
    if (score === 8) {
        alert('You won');
        // reset the game to start
        player.reset();
    }

    scoreLabel.innerHTML = `Score: ${score}`;
}

// new played intance
let player = new Player(200, 408, 83);

// new enemy instance
let enemy = new Enemy(0, Math.random() * 180 + 50, Math.random() * 200);
allEnemies.push(enemy);


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