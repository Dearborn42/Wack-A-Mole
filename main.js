// class with game functions 
// placeYoda(puts a green square in one of 6 spots on the canvas)
// removeYoda(removes a green square from the canvas)
// endGame(clears all intervals and resets all game variables)


var mode = null; var timer = 0; var check = 0; var highScore = 0; var score = 0;
const holeElements = document.querySelectorAll('.hole');

class Yoda{
    constructor(){
        this.hole;
        this.index;
        this.active;
    }
    yodaAppear(){
        this.index = Math.floor(Math.random() * holeElements.length);
        this.hole = holeElements[this.index];
        this.hole.classList.remove('down');
        this.hole.classList.add('up');
        return this;
    }
    yodaDisappear(){
        for(let i=0; i<holeElements.length; i++){
            this.hole = holeElements[i];
            this.hole.classList.remove('up');
            this.hole.classList.add('down');
        }
        return this;
    }
    yodaHit(){
        this.yodaDisappear();
        this.index = 111;
        timer = 0;check = 0;score++;
        document.getElementById('score').innerHTML = "Score: " + score;
    }
    yodaMissed(){
        check++;
        if(check == 2)
            this.endGame();
    }
    removeButton(){
        document.getElementById('m1').hidden = true;
        document.getElementById('m2').hidden = true;
    }
    endGame(){
        for(let i=0; i<99999; i++)window.clearTimeout(i);
        this.active = false;
        mode = null;timer = 0;check = 0;
        if(score > highScore)highScore = score;
        score = 0;
        this.yodaDisappear();
        document.getElementById('score').innerHTML = "Score: 0";
        document.getElementById('highScore').innerHTML = "Highscore: " + highScore;
        document.getElementById('m1').hidden = false;
        document.getElementById('m2').hidden = false;
    }
}


let yodaGame = new Yoda();

function hit(mound){
    if(mode==true)parseInt(mound, 10) === yodaGame.index ? yodaGame.yodaHit() : yodaGame.yodaMissed();
}
function test(){
    if(mode == true){
        yodaGame.removeButton();
        yodaGame.active = true;
        yodaGame.yodaDisappear().yodaAppear();
        timer++;
        if(timer == 3)yodaGame.endGame();
        if(yodaGame.active)setTimeout(test, 2000);
    }
}




let yodaGame2 = new Yoda();

var pos;
function getPos(num){
    if(mode == false)pos = parseInt(num, 10);
    let index = Math.floor(Math.random() * holeElements.length);
    if(index != pos){
        score++;
        document.getElementById('score').innerHTML = "Score: " + score;
    }else{
        yodaGame2.endGame();
    }
}
