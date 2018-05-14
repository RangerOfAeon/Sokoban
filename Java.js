// JavaScript source code

var gamePlayer;
var gameWall;
var Continue = true;

function startSoko() {
    startGame.start();
    gamePlayer = new component(30, 30, "red", 10, 120,);
    gameWall = new component(30, 30, "green", 300, 120);
}

var startGame = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            startGame.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            startGame.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
         ctx = startGame.context;
         ctx.fillStyle = color;
         ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}
function updateGameArea() {
    if (gamePlayer.crashWith(gameWall)) {
        startGame.stop();
    } else {
    startGame.clear();
    gameWall.update();
    gamePlayer.speedX = 0;
    gamePlayer.speedY = 0;
    if (startGame.key && startGame.key == 37) { gamePlayer.speedX = -30; }
    if (startGame.key && startGame.key == 39) { gamePlayer.speedX = 30; }
    if (startGame.key && startGame.key == 38) { gamePlayer.speedY = -30; }
    if (startGame.key && startGame.key == 40) { gamePlayer.speedY = 30; }
   
    gamePlayer.newPos();
    gamePlayer.update();
  
}
function moveUp() {
    gamePlayer.speedY -= 30;
} 

function moveDown() {
    gamePlayer.speedY += 30;
}

function moveLeft() {
    gamePlayer.speedX -= 30;
}

function moveRight() {
    gamePlayer.speedX += 30;
}
function stopMove() {
    gamePlayer.speedX = 0;
    gamePlayer.speedY = 0;
}
function Collide() {
    while (true) {
        if (!collide(gamePlayer, gameWall))
            gamePlayer.x++;
    }
}
//function Controll() {
//    while (Continue == true) {
//        if()
//    }
//}