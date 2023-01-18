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
    yodaMissed(){
        check++;
        if(check == 2)
            this.endGame();
    }
    yodaHit(){
        timer = 0;
        check = 0;
        score++;
        document.getElementById("hits").innerHTML = score + " Hits";
        this.removeYoda();
        create();
        hits += .25; 
    }
    endGame(){
        check = 0;
        timer = 0;
        hits = 1;
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
// var time = 2000/hits;
function getPos(e){
    if(mode == true){
        let x = Math.ceil((e.clientX - rect.left)/200)-1;
        let y = Math.ceil((e.clientY - rect.top)/200)-1;
        if(x == test.x && y == test.y)
            test.yodaHit();
        if(x != test.x && y != test.y)
            test.yodaMissed();
    }
    if(mode == false){
        let x = Math.floor((e.clientX - rect.left)/hor);
        let y = Math.floor((e.clientY - rect.top)/ver);
        let sy = ver/ver;
        let sx = hor/hor;
        if(x == sx && y == sy)
            test.yodaHit();
        if(x!= sx && y!= sy)
            test.yodaMissed();
    }
}
let test = new Yoda();
// mode 1 is basic wack-a-mole
function mode1(){
    test.removeYoda().placeYoda();
    timer++;
    if(timer == 3)
        test.endGame();
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
    test.removeYoda();
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(hor, ver, 50, 50);
    ctx.stroke();
    hor += movementX;
    ver += movementY;
    if(hor >= 579)
        movementX = -1*hits;
    if(hor <= 1)
        movementX = 1*hits;
    if(ver >= 379)
        movementY = -1*hits;
    if(ver <= 1)
        movementY = 1*hits;
    if(timer == 600)
        test.endGame();  
}