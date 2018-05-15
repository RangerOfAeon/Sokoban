// JavaScript source code

var block = [];

function startGame() {
    Soko.start();
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
            for (index2 = 0; index2 > mapsArray[currentMap].mapGrid[index].length; index2++) {
                switch (mapsArray[currentMap].mapGrid[index][index2].ToString) {
                    case "W":
                        block.push(new Blocks(30, 30, "green", index2 * 30, index * 30, index2, indeex, "wall"));
                        break;
                    case "G":
                        break;
                    case "B":
                        break;
                    case "P":
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
}
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
    ctx.fillSyle = color;
    ctx.fillRect(this.x, this.y, this.color, this.x, this.y, this.index, this.index2, this.type);
    }
    }
}
function updateSoko() {
    Soko.clear();
    gameWall.update();
}