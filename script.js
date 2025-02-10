const ballContainer = document.querySelector('.container');
const levelText = document.getElementById('levelText');
const scoreText = document.getElementById('scoreText');
const healthText = document.getElementById('healthText');


// GAME
let game = {
    level: {
        levelCounter: 0,
        levelNumber: [1,2,3],
        levelDifficulty: [10,20,30],
    },
    score: 0,
    health: 3,
};

// RANDOM BACKGROUND COLOR

function randomColor(random) {
    return Math.floor(Math.random() * random);
};

// RANDOM DROP POSITION

function randomDropPosition(dropPosition) {
    return Math.floor(Math.random() * dropPosition);
};

// 

function levelDifficulty() {
    return game.level.levelDifficulty[game.level.levelCounter];
};

// CREATING ELEMENTS

let loopInterval;

function creatingElements() {
    for (let i = 0; i < levelDifficulty(); i++) {
        let intervalBall;
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.top = `-${randomDropPosition(150)}px`;
        ball.style.left = `${randomDropPosition((window.innerWidth - 40))}px`;
        ball.style.backgroundColor = `rgb(${randomColor(255)}, ${randomColor(255)}, ${randomColor(255)})`;
    
        ballContainer.appendChild(ball);
    
        // CATCHING THE BALL
        ball.addEventListener('click', () => {
            // ADDING POINTS
            game.score += 10;
            scoreText.textContent = game.score;

            // ADDING THE CAUGHT CLASS AND REMOVING THE BALLL ELEMENT AFTER 100 MS
            ball.classList.add('ball-caught');
        });
    
    
        // CHECKING FOR THE BALLS THAT ARE NOT CAUGHT
        intervalBall = setInterval(() => {
            if (ball.offsetTop === window.innerHeight) {
                game.health--;
                healthText.textContent = game.health;
                clearInterval(intervalBall);
    
                // REMOVING THE ELEMENTS
                ballContainer.removeChild(ball);

            };
            
            if (ballContainer.childElementCount === 0) {
                // GOING TO THE NEXT LEVEL
                if (game.level.levelCounter < game.level.levelDifficulty.length) {
                    game.level.levelCounter++;
                    creatingElements();
                    levelText.textContent = game.level.levelNumber[game.level.levelCounter];
                } else {
                    levelText.textContent = 3;
                    console.log('No other levels');
                };

                clearInterval(intervalBall);
            };
        }, 1);
    };
};

creatingElements();