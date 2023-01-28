// select all elements with class 'hole'
const holeElements = document.querySelectorAll('.hole');

// select the element with class 'score'
const scoreDisplay = document.querySelector('.score');

// select all elements with class 'mole'
const moleElements = document.querySelectorAll('.mole');

// store the previous hole that the mole was in
let previousHole;

// flag for game over
let gameOver = false;

// current score
let currentScore = 0;

// returns a random number between min and max
function getRandomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// returns a random hole from the given holes array
function getRandomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    // check if the same hole as previous
    if (hole === previousHole) {
        console.log('Same hole, trying again...');
        // if yes, try again
        return getRandomHole(holes);
    }
    previousHole = hole;
    return hole;
}

// make the mole randomly appear and disappear
function makeMolePeep() {
    const time = getRandomTime(200, 1000);
    const hole = getRandomHole(holeElements);
    // add the class 'up' to make the mole appear
    hole.classList.add('up');
    setTimeout(() => {
        // remove the class 'up' to make the mole disappear
        hole.classList.remove('up');
        // make the mole appear again if the game is not over
        if (!gameOver) makeMolePeep();
    }, time);
}

// start a new game
function startNewGame() {
    // reset score display to 0
    scoreDisplay.textContent = 0;
    gameOver = false;
    currentScore = 0;
    // start making the mole appear
    makeMolePeep();
    // set game over after 10 seconds
    setTimeout(() => gameOver = true, 10000);
}

// handle the event of clicking the mole
function handleMoleClick(event) {
    // prevent cheating
    if (!event.isTrusted) return;
    // increase current score by 1
    currentScore++;
    // remove the class 'up' from the parent of the clicked mole
    this.parentNode.classList.remove('up');
    // update score display
    scoreDisplay.textContent = currentScore;
}

// add click event listener to each mole
moleElements.forEach(mole => mole.addEventListener('click', handleMoleClick));