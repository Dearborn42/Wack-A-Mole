var c = document.getElementById("game");
var ctx = c.getContext("2d");

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
        this.layout[this.y][this.x] = "yoda";
        return this;
    }
    placeYoda(){
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(this.x*200, this.y*200, 200, 200);
        ctx.stroke();
    }
}

let test = new Yoda();
test.createGame().setRandNum();
console.log(test.x, test.y);
console.log(test.createGame().setRandNum().placeYoda());
