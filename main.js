// class with game functions 
// placeYoda(puts a green square in one of 6 spots on the canvas)
// removeYoda(removes a green square from the canvas)
// endGame(clears all intervals and resets all game variables)


var mode = null; var timer = 0; var check = 0; var highScore = 0; var score = 0;
const holeElements = document.querySelectorAll('.hole');

class Yoda{
    constructor(){
        this.hole; this.index; this.active;
    }
    yodaAppear() {
        this.index = Math.floor(Math.random() * holeElements.length);
        this.hole = holeElements[this.index];
        this.hole.classList.toggle('down', false);
        this.hole.classList.toggle('up', true);
        return this;
    }

    yodaDisappear() {
        holeElements.forEach(hole => {hole.classList.toggle('up', false);hole.classList.toggle('down', true);});
        return this;
    }

    yodaHit(){
        this.yodaDisappear();
        this.index = 111;
        timer = 0; check = 0; score++;
        document.getElementById('score').innerHTML = `Score: ${score}`;
    }
    yodaMissed(){
        check++;
        if(check == 2)
            this.endGame();
    }
    removeButton(set){
        document.getElementById('m1').hidden = set;
        document.getElementById('m2').hidden = set;
    }
    endGame() {
        for (let i = 0; i < 99999; i++) window.clearTimeout(i);
        this.active = false;
        mode = null; timer = 0; check = 0;
        highScore = Math.max(score, highScore);
        score = 0;
        this.yodaDisappear();
        document.getElementById('score').innerHTML = "Score: 0";
        document.getElementById('highScore').innerHTML = `Highscore: ${highScore}`;
        this.removeButton(false);
        holeElements.forEach(hole => {hole.classList.toggle('explode', false);});
    }
}


let yodaGame = new Yoda();

function test(){
    if(mode){
        yodaGame.removeButton(true);
        yodaGame.active = true;
        yodaGame.yodaDisappear().yodaAppear();
        timer++;
        if(timer == 3)yodaGame.endGame();
        if(yodaGame.active)setTimeout(test, 2000);
    }
}

let pos;
let index;
function hit(mound){
    if(mode==true)parseInt(mound, 10) === yodaGame.index ? yodaGame.yodaHit() : yodaGame.yodaMissed();
    if(mode==false){
        pos = parseInt(mound, 10);
        holeElements[pos].classList.toggle('down', false);
        holeElements[pos].classList.toggle('up', true);
        index = Math.floor(Math.random() * holeElements.length);
        holeElements[index].classList.toggle('explode', true);
        setTimeout(round, 3000);
    }
}

function round() {
    if (index !== pos) {
        score++;
        document.getElementById('score').innerHTML = `Score: ${score}`;
        holeElements[pos].classList.toggle('up', false);
        holeElements[index].classList.toggle('explode', false);
    } else yodaGame.endGame();
}