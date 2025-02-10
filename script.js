const ballContainer = document.querySelector('.container');

// RANDOM BACKGROUND COLOR

function randomColor(random) {
    return Math.floor(Math.random() * random);
};

// RANDOM DROP POSITION

function randomDropPosition(dropPosition) {
    return Math.floor(Math.random() * dropPosition);
};

// CREATING ELEMENTS

for (let i = 0; i < 10; i++) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.left = `${randomDropPosition((window.innerWidth - 40))}px`;
    ball.style.backgroundColor = `rgb(${randomColor(255)}, ${randomColor(255)}, ${randomColor(255)})`;

    ballContainer.appendChild(ball);

    // CATCHING THE BALL
    ball.addEventListener('click', () => {
        ballContainer.removeChild(ball);
    });
};