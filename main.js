// class with game functions 
// placeYoda(puts a green square in one of 6 spots on the canvas)
// removeYoda(removes a green square from the canvas)
// endGame(clears all intervals and resets all game variables)
var mode = null; var timer = 0; var check = 0; var highScore = 0; var score = 0; var hits = 1;
class Yoda{
    removeButtons(){
        document.getElementById("m1").hidden = true;
        document.getElementById("m2").hidden = true;
    }
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
        console.log("yodaMissed");
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
        hits += .1; 
    }
    endGame(){
        for(let i=0; i<99999; i++)
            window.clearTimeout(i);
        document.getElementById("m1").hidden = false;
        document.getElementById("m2").hidden = false;
        check = 0; 
        timer = 0; 
        hits = 1; 
        mode = null; 
        this.active = false;
        if(score > highScore)
            highScore = score;
        document.getElementById("high").innerHTML = "High Score: " + highScore;
        document.getElementById("hits").innerHTML = "0 Hits";
        score = 0;
        this.removeYoda();
    }
}


let test = new Yoda();
var c = document.getElementById("game");
var ctx = c.getContext("2d");
var rect = c.getBoundingClientRect();
// gets x and y coordinates of mouse and uses them to dectect if you have hit or missed the square
// if hit you get more score
// if miss twice then game ends
// var time = 2000/hits;
function getPos(e){
    if(mode == true){
        let x = Math.ceil((e.clientX - rect.left)/200)-1;
        let y = Math.ceil((e.clientY - rect.top)/200)-1;
        if(x == test.x && y == test.y)
            test.yodaHit();
        else
            test.yodaMissed();
    }
    if(mode == false){
        let x = Math.floor((e.clientX - rect.left)/hor);
        let y = Math.floor((e.clientY - rect.top)/ver);
        let sy = ver/ver;
        let sx = hor/hor;
        if(x == sx && y == sy)
            test.yodaHit();
        else
            test.yodaMissed();
    }
}
// mode 1 is basic wack-a-mole
function mode1(){
    test.removeButtons();
    test.active = true;
    test.removeYoda().placeYoda();
    timer++;
    if(timer == 3)
        test.endGame();
    if(test.active == true)
        setTimeout(mode1, 2000/hits);
}
// creates random starting position
let hor; let ver;
function create(){
    hor = Math.floor(Math.random()*500);
    ver = Math.floor(Math.random()*300);
}
create();
// moves square and bounces it off the border if it runs into it
let movementX = 1; let movementY = 1;
function mode2(){
    test.removeButtons();
    test.active = true; 
    timer++;
    test.removeYoda();
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(hor, ver, 50, 50);
    ctx.stroke();
    hor += movementX; ver += movementY;
    if (hor >= 579 || hor <= 1) movementX = (hor <= 1 ? 1 : -1) * hits;
    if (ver >= 379 || ver <= 1) movementY = (ver <= 1 ? 1 : -1) * hits;
    if(timer == 600)
        test.endGame(); 
    if(test.active == true)
        setTimeout(mode2, 1); 
}
