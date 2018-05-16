// JavaScript source code

var block = [];
var goal = [];
var player;

var goalBlocks = 0;

var ctx;
var currentMap = 0;

function startGame() {
    Soko.start();
    console.log("bla");
}

var Soko = {
    canvas: document.createElement("canvas"),
    start: function () {
        currentMap = Math.floor(Math.random() * mapsArray.length);
        this.canvas.height = mapsArray[currentMap].mapGrid.length * 30;
        this.canvas.width = mapsArray[currentMap].mapGrid[0].length * 30;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateSoko, 20);


        for (index = 0; index < mapsArray[currentMap].mapGrid.length; index++) {
            for (index2 = 0; index2 < mapsArray[currentMap].mapGrid[index].length; index2++) {
                switch (mapsArray[currentMap].mapGrid[index][index2].toString()) {
                    case "W":
                        block.push(new Blocks(30, 30, "green", index2 * 30, index * 30, index2, index, "wall"));
                        console.log("1");
                        break;
                    case "G":
                        goal.push(new Blocks(30, 30, "orange", index2 * 30, index * 30, index2, index, "goal"));
                        goalBlocks += 1;
                        console.log("2");
                        break;
                    case "B":
                        block.push(new Blocks(30, 30, "blue", index2 * 30, index * 30, index2, index, "block"));
                        console.log("3");
                        break;
                    case "P":
                        player = new PlayerBlock(30, 30, "red", index2 * 30, index * 30, "player");
                        console.log("4");
                        break;
                    default:
                        break;
                }
               
            }
        }
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};
class Blocks {
    constructor(width, height, color, x, y, indexX, indexY, type) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.positionX = indexX;
    this.positionY = indexY;
    this.type = type;
    this.update = function () {
        ctx = Soko.context;
        ctx.fillStyle = color;
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    }
}
class PlayerBlock {
    constructor(width, height, color, x, y, type) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.type = type;
        this.update = function () {
            ctx = Soko.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
}
}
//function component(width, height, color, x, y) {
//    this.width = 30;
//    this.height = 30;
//    this.color = color;
//    this.x = x;
//    this.update = function () {
//        ctx = Soko.context;
//        ctx.fillSyle = color;
//        ctx.fillRect(this.x, this.y, this.color, this.width, this.height);
//    };
//}
function updateSoko() {
    Soko.clear();
    for (i = 0; i < block.length; i++) {
        block[i].update();
    }
    for (i = 0; i < goal.length; i++) {
        goal[i].update();
    }
    player.update();
    //gameWall.update();
}
