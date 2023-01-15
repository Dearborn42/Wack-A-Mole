var c = document.getElementById("game");
var ctx = c.getContext("2d");
var rect = c.getBoundingClientRect();
var highScore = 0;
var score = 0;
let game = setInterval(draw, 2000);


let layout = Array(2);
for(let i=0; i < layout.length; i++) {
    layout[i] = Array(3)
}

class Yoda{
    createGame(){
        this.layout = 
        [
            [null, null, null],
            [null, null, null]
        ]
        return this;
    }
    setRandNum(){
        this.x = Math.floor(Math.random()*3);
        this.y = Math.floor(Math.random()*2)
        return this;
    }
    placeYoda(){
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(this.x*200, this.y*200, 200, 200);
        ctx.stroke();
        this.layout[this.y][this.x] = "yoda";
        return this;
    }
    removeYoda(){
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 600, 400);
        ctx.stroke();
        this.createGame();
        return this;
    }
}


let check = 0;
function getPos(e){
    let x = Math.ceil((e.clientX - rect.left) / 200)-1;
    let y = Math.ceil((e.clientY - rect.top) / 200)-1;
    console.log(x, y);
    if(test.layout[y][x] == "yoda"){
        score++;
        document.getElementById("hits").innerHTML = score + " Hits";
        test.removeYoda();
    }else{
        check++;
        if(check == 2){
            clearInterval(game);
            if(score > highScore)
                highScore = score;
            document.getElementById("high").innerHTML = "High Score: " + highScore;
            score = 0;
            check = 0;
        }
    }
}

let test = new Yoda();
test.createGame();

function draw(){
    test.setRandNum().removeYoda().placeYoda();
}
