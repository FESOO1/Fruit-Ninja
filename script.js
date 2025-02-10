const ballContainer = document.querySelector('.container');
const levelText = document.getElementById('levelText');
const scoreText = document.getElementById('scoreText');
const healthText = document.getElementById('healthText');
const aimCursor = document.querySelector('.aim');

// GAME
let game = {
    level: {
        levelCounter: 0,
        levelNumber: [1,2,3,4,5,6,7,8,9],
        levelDifficulty: [5,10,15,20,25,30,35,40,45],
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

        // BALL
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.top = `-${randomDropPosition(150)}px`;
        ball.style.left = `${randomDropPosition((window.innerWidth - 40))}px`;
        /* ball.style.backgroundColor = `rgb(${randomColor(255)}, ${randomColor(255)}, ${randomColor(255)})`; */

        const animationRandomTime = randomDropPosition(20);
        const animationTime = animationRandomTime < 9 ? 10 : animationRandomTime;
        ball.style.animation = `${animationTime}s ease forwards ball-animation`;
        
        ballContainer.appendChild(ball);

        // AUDIO
        const audio = document.createElement('audio');
        audio.src = './assets/sound-effect-2.mp3';

        // CATCHING THE BALL
        ball.addEventListener('click', () => {
            // ADDING POINTS
            game.score += 10;
            scoreText.textContent = game.score;

            // ADDING THE CAUGHT CLASS AND REMOVING THE BALLL ELEMENT AFTER 100 MS
            ballContainer.removeChild(ball);

            // MAKING A SOUND
            audio.play();
        });


        // CATCHING THE BALL
        ballContainer.addEventListener('mousedown', () => {
            window.addEventListener('mousemove', catchTheBall);
            window.addEventListener('mouseup', () => window.removeEventListener('mousemove', catchTheBall));
        });
    
        function catchTheBall(e) {
            if (e.target === ball) {
                // ADDING POINTS
                game.score += 10;
                scoreText.textContent = game.score;

                // ADDING THE CAUGHT CLASS AND REMOVING THE BALLL ELEMENT AFTER 100 MS
                ballContainer.removeChild(ball);

                // MAKING A SOUND
                audio.play();
            };
        };
    
        // CHECKING FOR THE BALLS THAT ARE NOT CAUGHT
        intervalBall = setInterval(() => {
            if (ball.offsetTop === window.innerHeight) {
                game.health--;
                healthText.textContent = game.health;
    
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

// CURSOR AIM

document.addEventListener('mousemove', e => {
    aimCursor.style.top = (e.clientY - (aimCursor.offsetHeight / 2)) + 'px';
    aimCursor.style.left = (e.clientX - (aimCursor.offsetWidth / 2)) + 'px';
});