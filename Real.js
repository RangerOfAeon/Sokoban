// JavaScript source code

var block = [];
var goal = [];
var player;

var stopX = 0;
var stopY = 0;

var collideLeft = false;
var collideRight = false;
var collideUp = false;
var collideDown = false;

var goalBlocks = 0;

var ctx;
var currentMap = 0;

function startGame() {
    Soko.start();
    console.log(goalBlocks);
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
    },
    end: function () {
        clearInterval(this.interval);
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
        //console.log(this.positionX);
        //console.log(this.positionY);
        this.update = function () {
            this.BlockCollide();
            ctx = Soko.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        this.BlockCollide = function() {
            for (var i = 0; i < block.length; i++) {
                var myX = this.positionX;
                var myY = this.positionY;
                var otherX = block[i].positionX;
                var otherY = block[i].positionY;

                if (block[i].type != "goal") {
                    if (otherX == myX - 1 && otherY == myY) {
                        this.collideLeft = true;
                    }
                    if (otherX == myX + 1 && otherY == myY) {
                        this.collideRight = true;
                    }
                    if (otherY == myY - 1 && otherX == myX) {
                        this.collideUp = true;
                    }
                    if (otherY == myY - 1 && otherX == myX) {
                        this.collideDown = true;
                    }
                }
            }
        }

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
        this.formerX = this.myPositionX;
        this.formerY = this.myPositionY;

        this.futurePositionUp = this.myPositionY -= 1;
        this.futurePositionDown = this.myPositionY += 1;
        this.futurePositionLeft = this.myPositionX -= 1;
        this.futurePositionRight = this.myPositionX += 1;

        this.type = type;
        this.update = function () {
            //if (stopX > 1) {
            if (Soko.key && Soko.key == 37 && collideLeft == false) {
                this.formerX = this.myPositionX;
                player.formerY = player.myPositionY;
                this.formerX++;
                //this.formerX--;
                console.log("Former" + player.formerX);
                console.log("Former" + player.formerY);
            }
            if (Soko.key && Soko.key == 39 && collideRight == false) {
                player.formerX = player.myPositionX;
                player.formerY = player.myPositionY;
                this.formerX--;
                console.log("Former" + player.formerX);
                console.log("Former" + player.formerY);
            }
            //}
            //if (stopY > 1) {
            if (Soko.key && Soko.key == 38 && collideUp == false) {
                player.formerX = player.myPositionX;
                player.formerY = player.myPositionY;
                this.formerY++;
                console.log("Former" + player.formerX);
                console.log("Former" + player.formerY);
            }
            if (Soko.key && Soko.key == 40 && collideDown == false) {
                player.formerX = player.myPositionX;
                player.formerY = player.myPositionY;
                this.formerY--;
                console.log("Former" + player.formerX);
                console.log("Former" + player.formerY);
            }
            //}
            
            ctx = Soko.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };

        //this.dontMove = function () {
        //    for (var k = 0; i < block.length; k++) {
        //        if (block[k].type != "goal") {
        //            if ((block.positionY - 1) == block[k].positionY && (player.myPositionY - 2) == block[k].positionY && block.positionX == block[k].positionX) {
        //                collideUp = true;
        //            }
        //        }
        //    }
        //}

        //this.move = function () {
        //    if (this.type == "block") {
        //        if (this.myPositionY == block[i].positionY && this.myPositionX == block[i].positionX) {
        //            if (this.formerY < block[i].positionY && this.myPositionX == block[i].positionX && collideUp == false) {
        //                block.y - 30;
        //                block.positionY - 1;
        //                console.log("Yes");
        //            }
        //        }
        //    }
        //}
        this.collide = function () {
            for (var i = 0; i < block.length; i++) {
                //if (block[i].type != "goal") {
                if (block[i].type == "block") {
                    if (block.myX == block.otherX && block.myY == block.otherY) {

                        //if (block[i].type != "goal") {
                        //    if ((block.positionY - 1) == block[i].positionY && (player.myPositionY - 2) == block[i].positionY && block.positionX == block[i].positionX) {
                        //        collideUp = true;
                        //    }
                        //this.dontMove();
                        if (this.formerY > block.otherY && this.myPositionX == block.otherX && collideUp == false && (this.myPositionY - 2) != block.otherY) {

                            block.myY -= 30;
                            block.myY -= 1;
                            console.log("Up");
                            //console.log(this.formerY);
                            //collideUp = true;


                        }
                        if (block[i].type != "goal") {
                            if ((block.positionY + 1) == block[i].positionY && block.positionX == block[i].positionX && block.positionY != (block[i].positionY - 1)) {
                                collideDown = true;
                                console.log("works")
                            }
                            if (this.formerY < block[i].positionY && this.myPositionX == block[i].positionX && collideDown == false) {
                                block[i].y += 30;
                                block[i].positionY += 1;
                                console.log("Down");
                                console.log(block.positionY)
                                console.log(block.positionY)
                                //console.log(this.formerY);
                                //collideUp = true;
                            }
                        }

                        if (block[i].type != "goal") {
                            if ((block.positionX - 1) == block[i].positionX && block.positionY == block[i].positionY) {
                                collideLeft = true;
                            }
                            if (this.formerX > block[i].positionX && this.myPositionY == block[i].positionY && collideLeft == false) {
                                block[i].x -= 30;
                                block[i].positionX -= 1;
                                console.log("Left");
                                //console.log(this.formerX);
                                //collideUp = true;
                            }
                        }

                        if (block[i].type != "goal") {
                            if ((block.positionX + 1) == block[i].positionX && block.positionY == block[i].positionY) {
                                collideRight = true;
                            }
                            if (this.formerX < block[i].positionX && this.myPositionY == block[i].positionY && collideRight == false) {
                                block[i].x += 30;
                                block[i].positionX += 1;
                                console.log("Right");
                                //console.log(this.formerX);
                                //collideUp = true;
                            }
                        }






                        if (block[i].type == "wall") {
                            if ((this.myPositionY - 1) == block.otherY && this.myPositionX == block[i].positionX) {
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
                       
                    }
                   

                }
            }
        }
    

        this.newPosition = function () {

            if (Soko.key && Soko.key == 37 && collideLeft == false) {
                player.speedX = -30;
                player.myPositionX--;
                this.x += this.speedX;
                this.y += this.speedY;
                console.log("My" + player.myPositionX)
                console.log("My" + player.myPositionY)
                stopX++;
                //console.log(player.formerX)
                //console.log(player.formerY)

            }
            if (Soko.key && Soko.key == 39 && collideRight == false) {
                player.speedX = 30;
                player.myPositionX++;
                this.x += this.speedX;
                this.y += this.speedY;
                console.log("My" + player.myPositionX)
                console.log("My" + player.myPositionY)
                stopX++;
                //console.log(player.formerX)
                //console.log(player.formerY)

            }
            if (Soko.key && Soko.key == 38 && collideUp == false) {
                player.speedY = -30;
                player.myPositionY--;
                this.x += this.speedX;
                this.y += this.speedY;
                console.log("My" + player.myPositionX);
                console.log("My" + player.myPositionY);
                stopY++;
                //console.log(player.formerX)
                //console.log(player.formerY)

            }
            if (Soko.key && Soko.key == 40 && collideDown == false) {
                player.speedY = 30;
                player.myPositionY++;
                this.x += this.speedX;
                this.y += this.speedY;
                console.log("My" + player.myPositionX)
                console.log("My" + player.myPositionY)
                stopY++;
                //console.log(player.formerX)
                //console.log(player.formerY)


            }
        };
    
    }
}


function EndSoko() {
    for (j = 0; j < goal.length; j++) {
        if (goal[j].positionX == block[i].positionX && goal[j].positionY == block[i].positionY) {
            goalBlocks -= 1;
            console.log(goalBlocks);
        }
    }
}

//}
function updateSoko() {
    Soko.clear();
  
    for (i = 0; i < goal.length; i++) {
        goal[i].update();
    }
    for (i = 0; i < block.length; i++) {
        block[i].update();
        if (block[i].type == "block") {
            EndSoko(block[i]);
        }
    }
        if (goalBlocks == 0) {
            Soko.end();
        }
        else {
            goalBlocks = 6;
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
