// class with game functions 
// placeYoda(puts a green square in one of 6 spots on the canvas)
// removeYoda(removes a green square from the canvas)
// endGame(clears all intervals and resets all game variables)





var mode = null; var timer = 0; var check = 0; var highScore = 0; var score = 0; var hits = 1; var speed = `${2/hits}`
class Yoda{
    removeButtons(){
        document.getElementById("m1").hidden = true;
        document.getElementById("m2").hidden = true;
    }
    placeYoda(){
        this.x = Math.floor(Math.random()*3);
        this.y = Math.floor(Math.random()*2);
        var speed = 2/hits;
        document.getElementById(`yoda${this.y}${this.x}`).style.backgroundImage = "url('yoda1.png')";
        document.getElementById(`yoda${this.y}${this.x}`).style.transition = `all` + speed + "s";
        document.getElementById(`yoda${this.y}${this.x}`).style.top = 0;
        return this;
    }
    removeYoda(){
        for(let i=0; i<2; i++){
            for(let j=0; j<3; j++){
                document.getElementById(`yoda${i}${j}`).style.top = "100%";
            }
        }
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
        document.getElementById(`yoda${this.y}${this.x}`).style.backgroundImage = "url('yoda2.png')";
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


// Make sure the image is loaded first otherwise nothing will draw.
// gets x and y coordinates of mouse and uses them to dectect if you have hit or missed the square
// if hit you get more score
// if miss twice then game ends
// var time = 2000/hits;

            function getPos(pos){
                pos.split("");
                let x = parseInt(pos[1], 10);
                let y = parseInt(pos[0], 10);
                if(mode == true){
                    if(x == test.x && y == test.y)
                        test.yodaHit();
                    else
                        test.yodaMissed();
                }
                if(mode == false){
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
