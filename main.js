// var c = document.getElementById("game");
// var ctx = c.getctx("2d");

let layout = Array(2);
for(let i=0; i < layout.length; i++) {
    layout[i] = Array(3)
}

class Yoda{
    setRandNum(){
        this.x = Math.floor(Math.random()*3);
        this.y = Math.floor(Math.random()*2);
        return this;
    }
}

let test = new Yoda();
console.log(test.setRandNum());