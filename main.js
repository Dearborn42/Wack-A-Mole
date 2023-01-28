// class with game functions 
// placeYoda(puts a green square in one of 6 spots on the canvas)
// removeYoda(removes a green square from the canvas)
// endGame(clears all intervals and resets all game variables)


var mode = null; var timer = 0; var check = 0; var highScore = 0; var score = 0;
const holeElements = document.querySelectorAll('.hole');

class Yoda {
    constructor(){
        this.hole;
        this.index;
    }
    yodaAppear(){
        this.index = Math.floor(Math.random() * holeElements.length);
        this.hole = holeElements[this.index];
        this.hole.classList.add('up');
        return this;
    }
    yodaHit(){
        this.hole.classList.remove('up');
        score++;
        document.getElementById('score').innerHTML = "Score: " + score;
    }
}

let yodaGame = new Yoda();

function hit(mound){
    if(parseInt(mound, 10) == yodaGame.index){
        yodaGame.yodaHit();
    }
}

function test(){
    yodaGame.yodaAppear();
}

// Make sure the image is loaded first otherwise nothing will draw.
// gets x and y coordinates of mouse and uses them to dectect if you have hit or missed the square
// if hit you get more score
// if miss twice then game ends
// var time = 2000/hits;

function getPos(pos){}

// mode 1 is basic wack-a-mole
function mode1(){}
// creates random starting position
function create(){}

function mode2(){}
