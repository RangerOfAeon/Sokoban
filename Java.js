//// JavaScript source code

//var gamePlayer;
//var gameBlocks = [];
//var gameGoals = [];
//var Continue = true;

//function startGame() {
//    startSoko.start();
//}

//var startSoko = {
//    canvas: document.createElement("canvas"),
//    start: function () {
//        this.canvas.width = tileMap.length * 30;
//        this.canvas.height = tileMap.length * 30;
//        this.context = this.canvas.getContext("2d");
//        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//        this.interval = setInterval(updateGameArea, 20);

//            for (index = 0; tileMap.mapGrid.length; index++) {
//                for (index2 = 0; tileMap.mapGrid[index].length; index2++) {
//                    switch (tileMap.mapGrid[index][index2].toString()) {
//                        case "W":
//                            gameBlocks.push(new allBlocks(30, 30, "green", index * 30, index2 * 30, index2, index, "wall"));
//                            break;
//                        case "G":
//                            gameGoals.push(new allBlocks(30, 30, "orange", index * 30, index2 * 30, index2, index, "goal"));
//                            gameGoals += 1;
//                            break;
//                        case "B":
//                            gameBlocks.push(new allBlocks(30, 30, "blue", indexm * 30, index2 * 30, index2, index, "move"));
//                            break;
//                        case "P":
//                            player = new gamePlayer(30, 30, "red", index * 30, index2 * 30, imdex2, index);
//                            break;
//                        default:
//                            break;
//                    }
//                }
//            }
//        window.addEventListener('keydown', function (e) {
//            startSoko.key = e.keyCode;
//        })
//        window.addEventListener('keyup', function (e) {
//            startSoko.key = false;
//        })
//    }
//}
//function component(width, height, color, x, y) {
//    this.width = width;
//    this.height = height;
//    this.speedX = 0;
//    this.speedY = 0;
//    this.x = x;
//    this.y = y;
//    this.update = function () {
//         ctx = startGame.context;
//         ctx.fillStyle = color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//    }
//    this.newPos = function () {
//        this.x += this.speedX;
//        this.y += this.speedY;
//    }
//    this.crashWith = function (otherobj) {
//        var myleft = this.x;
//        var myright = this.x + (this.width);
//        var mytop = this.y;
//        var mybottom = this.y + (this.height);
//        var otherleft = otherobj.x;
//        var otherright = otherobj.x + (otherobj.width);
//        var othertop = otherobj.y;
//        var otherbottom = otherobj.y + (otherobj.height);
//        var crash = true;
//        if ((mybottom < othertop) ||
//            (mytop > otherbottom) ||
//            (myright < otherleft) ||
//            (myleft > otherright)) {
//            crash = false;
//        }
//        return crash;
//    }
//}
//function updateGameArea() {
//    //if (gamePlayer.crashWith(gameWall)) {
//    //    if (mybottom < othertop) {
//    //        if (startGame.key && startGame.key == 37) { gamePlayer.speedX = -30; }
//    //        if (startGame.key && startGame.key == 39) { gamePlayer.speedX = 30; }
//    //        if (startGame.key && startGame.key == 38) { gamePlayer.speedY = -30; }
//    //        if (startGame.key && startGame.key == 40) { gamePlayer.speedY = 0; }
//    //    }
//    //    else if (mytop < otherbottom) {
//    //        if (startGame.key && startGame.key == 37) { gamePlayer.speedX = -30; }
//    //        if (startGame.key && startGame.key == 39) { gamePlayer.speedX = 30; }
//    //        if (startGame.key && startGame.key == 38) { gamePlayer.speedY = 0; }
//    //        if (startGame.key && startGame.key == 40) { gamePlayer.speedY = 30; }
//    //    }
//    //    else if (myright < otherleft) {
//    //        if (startGame.key && startGame.key == 37) { gamePlayer.speedX = -30; }
//    //        if (startGame.key && startGame.key == 39) { gamePlayer.speedX = 0; }
//    //        if (startGame.key && startGame.key == 38) { gamePlayer.speedY = -30; }
//    //        if (startGame.key && startGame.key == 40) { gamePlayer.speedY = 30; }
//    //    }
//    //    else if (myleft < otherright) {
//    //        if (startGame.key && startGame.key == 37) { gamePlayer.speedX = 0; }
//    //        if (startGame.key && startGame.key == 39) { gamePlayer.speedX = 30; }
//    //        if (startGame.key && startGame.key == 38) { gamePlayer.speedY = -30; }
//    //        if (startGame.key && startGame.key == 40) { gamePlayer.speedY = 30; }
//    //    }
//    //} else {
//        startGame.clear();
//        gameWall.update();
//        gamePlayer.speedX = 0;
//        gamePlayer.speedY = 0;
//        if (startGame.key && startGame.key == 37) { gamePlayer.speedX = -30; }
//        if (startGame.key && startGame.key == 39) { gamePlayer.speedX = 30; }
//        if (startGame.key && startGame.key == 38) { gamePlayer.speedY = -30; }
//        if (startGame.key && startGame.key == 40) { gamePlayer.speedY = 30; }

//        gamePlayer.newPos();
//        gamePlayer.update();
//    //}
//}
//function moveUp() {
//    gamePlayer.speedY -= 30;
//} 

//function moveDown() {
//    gamePlayer.speedY += 30;
//}

//function moveLeft() {
//    gamePlayer.speedX -= 30;
//}

//function moveRight() {
//    gamePlayer.speedX += 30;
//}
//function stopMove() {
//    gamePlayer.speedX = 0;
//    gamePlayer.speedY = 0;
//}
//function Collide() {
//    while (true) {
//        if (!collide(gamePlayer, gameWall))
//            gamePlayer.x++;
//    }
//}
////function Controll() {
////    while (Continue == true) {
////        if()
////    }
////}