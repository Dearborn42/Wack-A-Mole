var c = document.getElementById("game");
var ctx = c.getContext("2d");
var rect = c.getBoundingClientRect();

var mode;
var highScore = 0;
var score = 0;
var timer = 0;
var check = 0;

// class with game functions 
// placeYoda(puts a green square in one of 6 spots on the canvas)
// removeYoda(removes a green square from the canvas)
// endGame(clears all intervals and resets all game variables)

class Yoda{
    placeYoda(){
        this.x = Math.floor(Math.random()*3);
        this.y = Math.floor(Math.random()*2);
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(this.x*200, this.y*200, 200, 200);
        ctx.stroke();
        return this;
    }
    removeYoda(){
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 600, 400);
        ctx.stroke();
        return this;
    }
    endGame(){
        check = 0;
        timer = 0;

        for(let i = 1; i < 99999; i++)
            window.clearInterval(i);

        if(score > highScore)
            highScore = score;

        document.getElementById("high").innerHTML = "High Score: " + highScore;
        document.getElementById("hits").innerHTML = "0 Hits";
        score = 0;
        this.removeYoda();
    }

}

// gets x and y coordinates of mouse and uses them to dectect if you have hit or missed the square
// if hit you get more score
// if miss twice then game ends
var hits = 1;
var time = 2000/hits;
function getPos(e){
    if(mode == true){
        let x = Math.ceil((e.clientX - rect.left)/200)-1;
        let y = Math.ceil((e.clientY - rect.top)/200)-1;
        if(x == test.x && y == test.y){
            check = 0;
            score++;
            document.getElementById("hits").innerHTML = score + " Hits";
            test.removeYoda();
            timer = 0;
            hits += .25; 
        }else{
            check++;
            if(check == 2){
                test.endGame();
            }
        }
    }

    if(mode == false){
        let x = Math.floor((e.clientX - rect.left)/hor);
        let y = Math.floor((e.clientY - rect.top)/ver);
        let sy = ver/ver;
        let sx = hor/hor;
        if(x == sx && y == sy){
            check = 0;
            timer = 0;
            score++;
            document.getElementById("hits").innerHTML = score + " Hits";
            test.removeYoda();
            hits += .25; 
            create();
        }else{
            check++;
            if(check == 2){
                test.endGame();
            }
        }
    }
}

let test = new Yoda();

// mode 1 is basic wack-a-mole
function mode1(){
    test.removeYoda().placeYoda();
    timer++;
    if(timer == 3){
        test.endGame();
    }
}

// creates random starting position
let hor;
let ver;
function create(){
    hor = Math.floor(Math.random()*500);
    ver = Math.floor(Math.random()*300);
}
create();

// moves square and bounces it off the border if it runs into it
let movementX = 1*hits;
let movementY = 1*hits;

function mode2(){
    timer++;
    console.log(timer);
    test.removeYoda();
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(hor, ver, 50, 50);
    ctx.stroke();
    hor += movementX;
    ver += movementY;
    if(hor == 600){
        movementX = -1;
    }else if(hor == 0){
        movementX = 1;
    }
    if(ver == 400){
        movementY = -1;
    }else if(ver == 0){
        movementY = 1;
    }
    if(timer == 600){
        test.endGame();
    }
}