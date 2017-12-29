// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
    // collision function
    collision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
let Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt) {   
    //this.x = this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 408;
};

let score = 1;
// display player key moves and make sure not go beyond the boundries
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed + 18;
        if(player.x < 0) {
            player.x = 0;
        }
    } else if(keyPress == 'right') {
        player.x += player.speed + 18;
        if(player.x > 408) {
            player.x = 408;
        }
    } else if(keyPress == 'up') {
        player.y -= player.speed;
        if(player.y <= -7) {
            player.y = -7;         
            setTimeout(() => {
                player.reset();
                levelOfDifficulty();
            }, 700);
                
        }
    } else if(keyPress == 'down') {
        player.y += player.speed;
        if(player.y > 408) {
            player.y = 408;
        }
    }
};



let scoreLabel = document.getElementById('score'),
    livesLabel = document.getElementById('lives'),
    lives = 4;
// check collision between player and enemy
function collision(enemy) {
    if (player.y + 131 >= enemy.y + 90
        && player.x + 25 <= enemy.x + 88
        && player.y + 73 <= enemy.y + 100
        && player.x + 76 >= enemy.x + 11) {
        player.x = 200;
        player.y = 408;
        // decrease player lives
        lives--;
    }
    // player loses if lives = 0
    if(lives === 0) {
        alert('you Lose!');
        // Reset the game
        lives = 4;
        score = 0;
    }
    
    livesLabel.innerHTML = `Lives: ${lives}`;
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

    // player end the game
    } else if (score === 8) {
        alert('You won');
        // reset the game to start
        score = 0;
        lives = 4;
    }

    scoreLabel.innerHTML = `Score: ${score}`;
}

// new played intance
let player = new Player(200, 408, 83);
// array to collect enemies
let allEnemies = [];
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


