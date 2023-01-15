var c = document.getElementById("game");
var ctx = c.getContext("2d");
var rect = c.getBoundingClientRect();

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

let x;
let y;
function getPos(e){
    x = Math.ceil((e.clientX - rect.left) / 200)-1;
    y = Math.ceil((e.clientY - rect.top) / 200)-1;
    console.log(x, y);
    if(test.layout[y][x] == "yoda"){
        console.log("hit");
        test.removeYoda();
    }
}


let test = new Yoda();
test.createGame();


setInterval(draw, 2000);
function draw(){
    test.setRandNum().removeYoda().placeYoda();
}
