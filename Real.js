// JavaScript source code

var block = [];
var goal = [];
var player;

var collideLeft = false;
var collideRight = false;
var collideUp = false;
var collideDown = false;

var goalBlocks = 0;

var ctx;
var currentMap = 0;

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
        this.interval = setInterval(updateSoko, 150);
       

        window.addEventListener('keydown', function (e) {
            Soko.key = e.keyCode;
        });
        window.addEventListener('keyup', function (e) {
            Soko.key = false;
        });


        for (index = 0; index < mapsArray[currentMap].mapGrid.length; index++) {
            for (index2 = 0; index2 < mapsArray[currentMap].mapGrid[index].length; index2++) {
                switch (mapsArray[currentMap].mapGrid[index][index2].toString()) {
                    case "W":
                        block.push(new Blocks(30, 30, "green", index2 * 30, index * 30, index2, index, "wall"));
                        //console.log("1");
                        break;
                    case "G":
                        goal.push(new Blocks(30, 30, "orange", index2 * 30, index * 30, index2, index, "goal"));
                        goalBlocks += 1;
                        //console.log("2");
                        break;
                    case "B":
                        block.push(new Blocks(30, 30, "blue", index2 * 30, index * 30, index2, index, "block"));
                        //console.log("3");
                        break;
                    case "P":
                        player = new PlayerBlock(30, 30, "red", index2 * 30, index * 30, index2, index, "player");
                        //console.log("4");
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
        console.log(this.positionX);
        console.log(this.positionY);
        this.update = function () {
            ctx = Soko.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        //this.moveBlock = function () {
        //    for (var i = 0; i < block.length; i++) {
                
        //    }

        //}
    }
}

class PlayerBlock {
    constructor(width, height, color, x, y, indexX, indexY, type) {
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.color = color;
        this.x = x;
        this.y = y;
        this.myPositionX = indexX;
        this.myPositionY = indexY;
        this.formerX = indexX;
        this.formerY = indexY;
        this.futurePositionUp = this.myPositionY -= 1;
        this.futurePositionDown = this.myPositionY += 1;
        this.futurePositionLeft = this.myPositionX -= 1;
        this.futurePositionRight = this.myPositionX += 1;

        this.type = type;
        this.update = function () {
            ctx = Soko.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        this.collide = function () {
            for (var i = 0; i < block.length; i++) {
                if (block[i].type == "wall") {
                    if ((this.myPositionY - 1) == block[i].positionY && this.myPositionX == block[i].positionX) {
                        collideUp = true;
                        //console.log("yes");
                    }
                    if ((this.myPositionY + 1) == block[i].positionY && this.myPositionX == block[i].positionX) {
                        collideDown = true;
                        //console.log("yes");
                    }
                    if ((this.myPositionX - 1) == block[i].positionX && this.myPositionY == block[i].positionY) {
                        collideLeft = true;
                        //console.log("yes");
                    }
                    if ((this.myPositionX + 1) == block[i].positionX && this.myPositionY == block[i].positionY) {
                        collideRight = true;
                        //console.log("yes");
                    }

                }
                if (block[i].type == "block") {
                    if (player.myPositionY == block[i].positionY && player.myPositionX == block[i].positionY) {
                        //if (player.formerX < block[i].positionX) {
                        //    this.x -= 30;
                            console.log("No");
                        //}
                    }
                }
               
            };

            this.newPosition = function () {

                if (Soko.key && Soko.key == 37 && collideLeft == false) {
                    player.speedX = -30;
                    player.myPositionX--;
                    this.x += this.speedX;
                    this.y += this.speedY;
                    console.log(player.myPositionX)
                    console.log(player.myPositionY)
                }
                if (Soko.key && Soko.key == 39 && collideRight == false) {
                    player.speedX = 30;
                    player.myPositionX++;
                    this.x += this.speedX;
                    this.y += this.speedY;
                    console.log(player.myPositionX)
                    console.log(player.myPositionY)
                }
                if (Soko.key && Soko.key == 38 && collideUp == false) {
                    player.speedY = -30;
                    player.myPositionY--;
                    this.x += this.speedX;
                    this.y += this.speedY;
                    console.log(player.myPositionX);
                    console.log(player.myPositionY);
                }
                if (Soko.key && Soko.key == 40 && collideDown == false) {
                    player.speedY = 30;
                    player.myPositionY++;
                    this.x += this.speedX;
                    this.y += this.speedY;
                    console.log(player.myPositionX)
                    console.log(player.myPositionY)
                }
            };
        }
    }
}
//function stopMove() {
//    player.speedX = 0;
//    player.speedY = 0;
//}
function updateSoko() {
    Soko.clear();
    for (i = 0; i < block.length; i++) {
        block[i].update();
    }
    for (i = 0; i < goal.length; i++) {
        goal[i].update();
    }
    player.speedX = 0;
    player.speedY = 0;
   
    //if (Soko.key && Soko.key == 37 && collideLeft == false) { player.speedX = -30; /*console.log(player.myPositionX);*/ }
    //if (Soko.key && Soko.key == 39 && collideRight == false) { player.speedX = 30; /*console.log(player.myPositionX);*/ }
    ////if (Soko.key && Soko.key == 38 && collideUp == true) { player.speedY = -30; /*console.log(player.myPositionY);*/ }
    //if (Soko.key && Soko.key == 40 && collideDown == false) { player.speedY = 30; /*console.log(player.myPositionY);*/ }
    //else {
    //    player.myPositionY = player.myPositionY;
    //    player.speedY = 0;
    //}
    player.collide();
    player.newPosition();
    player.update();

    collideLeft = false;
    collideRight = false;
    collideUp = false;
    collideDown = false;

    //console.log(player.myPositionX);
    //console.log(player.myPositionY);
   
}
