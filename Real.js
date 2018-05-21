// JavaScript source code

var block = [];                                 //De två arreyerna som tar hand om väggarna, flyttbara lådorna och målen. 
var goal = [];
var player;                                     //Variablen som är spelaren.

//var stopX = 0;
//var stopY = 0;

var collideLeft = false;                        //De fyra variblerna som frågar om man går in i något.
var collideRight = false;
var collideUp = false;
var collideDown = false;

var goalBlocks = 0;                             //Hur många flyttbara låder som finns kvar.

var ctx;
var currentMap = 0;                             

function startGame() {                          //Functionen som startar spelet.
    Soko.start();
    console.log(goalBlocks);
}

var Soko = {
    canvas: document.createElement("canvas"),                                       //Skapar en canvas, som är lika lång och bred som det finns arrayer i en mapGrid,
    start: function () {                                                            //och gör varje array i mapgrid 30px lång och bred, och gör den till ett 2d plan,
        currentMap = Math.floor(Math.random() * mapsArray.length);                  //och den uppdaterar sig själv.
        this.canvas.height = mapsArray[currentMap].mapGrid.length * 30;
        this.canvas.width = mapsArray[currentMap].mapGrid[0].length * 30;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateSoko, 150);
       

        window.addEventListener('keydown', function (e) {                           //EventListeners som känner av att man trycker på en tangent, och slutar när man tar bort
            Soko.key = e.keyCode;                                                   //fingret från tangent.
        });
        window.addEventListener('keyup', function (e) {
            Soko.key = false;
        });


        for (index = 0; index < mapsArray[currentMap].mapGrid.length; index++) {                                //En for-loop som går igenom varje array i en mapGrid, och ger
            for (index2 = 0; index2 < mapsArray[currentMap].mapGrid[index].length; index2++) {                  //dom olika attribut genom en switch-case, som förvandlar
                switch (mapsArray[currentMap].mapGrid[index][index2].toString()) {                              // varje bokstav i en mapGrid.
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

        window,addEventListener("keydown", function(e) {
            if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {              //Gör så att piltangenterna inte flyttar på skärmen, som dom brukar göra.
                e.preventDefault();
            }
            Soko.key = e.keyCode;
        });

        for(var i = 0; i < block.length; i++) {                         //Går igenom varje block-array, och kollar så att dom inte krockar med varandra.
            block[i].blockCollide();
        }

    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);        //Rensar canvasen varje update, så att pixlarna inte sitter kvar.
    },
    end: function () {
        clearInterval(this.interval);                                               //Slutar uppdatera spelet.
    }

};
class Blocks {
    constructor(width, height, color, x, y, indexX, indexY, type) {
        this.width = width;
        this.height = height;                                               //Visar och sätter vilka attributer varje block har, så som höjd, bredd, färg, vilken x & y
        this.color = color;                                                 //position som blocken har, och vilken typ av block blocken är.
        this.x = x;
        this.y = y;
        this.positionX = indexX;
        this.positionY = indexY;
        this.type = type;
        //console.log(this.positionX);
        //console.log(this.positionY);
        this.update = function () {
            this.moveBlock();                                               //Visar up och fyller blocken, och bestämmer hur de flyttbara blocken får röras. 
            ctx = Soko.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        
        this.moveBlock = function() {                   //Funktionen som bestämmer hur de flyttbara blocken får röra sig, berornde på spelaren föredetta position.
            if(this.type == "block") {
                
                
                if(this.positionY == player.myPositionY && this.positionX == player.myPositionX) {
                if(this.positionY < player.formerY && this.positionX == player.formerX && collideUp == false) {             //Upp
                    this.y -= 30;
                    this.positionY -= 1;
                }
                if(this.positionY > player.formerY && this.positionX == player.formerX && collideDown == false) {           //Ner
                    this.y += 30;
                    this.positionY += 1;
                }
                if(this.positionX < player.formerX && this.positionY == player.formerY && collideLeft == false) {           //Vänster
                    this.x -= 30;
                    this.positionX -= 1;
                }
                if(this.positionX > player.formerX && this.positionY == player.formerY && collideRight == false) {          //Höger
                    this.x += 30;
                    this.positionX += 1;
                }
            }
            this.collideUp = false;                     //Återställer variablerna som kollar om blocken krockar med varandra.
            this.collideDown = false;
            this.collideLeft = false;
            this.collideRight = false;
            
            this.blockCollide();                        //Kollar om blocken krockar med varandra.
  }
        
             // Bara en klump kod som inte fungerade
        };
        //this.blockMove = function () {
        //    if (this.type == "block") {
        //        if (this.positionX == player.myPositionX == this.positionY == player.myPositionY) {
        //            if(this.positionX < player.formerX && this.positionY == player.formerY && this.collideLeft == false) {
        //                this.x -= 30;
        //                this.positionX -= 1;
        //            }
        //            if(this.positionX > player.formerX && this.positionY == player.formerY && this.collideRight == false) {
        //                this.x += 30;
        //                this.positionX += 1;
        //            }
        //            if(this.positionY < player.formerY && this.positionX == player.formerX && this.collideUp == false) {
        //                this.y -= 30;
        //                this.positionY -= 1;
        //            }
        //            if(this.positionY > player.formerY && this.positionX == player.formerX && this.collideDown == false) {
        //                this.y += 30;
        //                this.positionY -= 1;
        //            }
        //        }
        //
        //
        //        this.blockCollide();
        //    }
        //};
         this.blockCollide = function(){
            for (var i = 0; i < block.length; i++) {                    //Går igenom varje block och kollar deras position, och två variabler som håller deras värde.
                var myX = this.positionX;
                var myY = this.positionY;
                var otherX = block[i].positionX;
                var otherY = block[i].positionY;

                                                                            //Kollar om blocken är goals, och ser till så att blocken inte stapplas på varandra om de inte  
                if (block[i].type != "goal") {                              //är goals.
                    if (otherX == myX - 1 && otherY == myY) {               //Vänster
                        this.collideLeft = true;
                    }
                    if (otherX == myX + 1 && otherY == myY) {               //Höger
                        this.collideRight = true;
                    }
                    if (otherY == myY - 1 && otherX == myX) {               //Upp       
                        this.collideUp = true;
                    }
                    if (otherY == myY + 1 && otherX == myX) {               //Ner
                        this.collideDown = true;
                    }
                }
                
            }
    };

      
}
}

class PlayerBlock  {
    
    constructor(width, height, color, x, y, indexX, indexY, type) {

        this.width = width;                                             //Samma somm för blocken, fast för spelaren, fast håller också koll på spelarens förra position.
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
        this.colliding = function(intersectingObject) {                 //En function som kollar så att spelaren inte går på blocken.
            var myX = this.myPositionX;
            var myY = this.myPositionY;
            var otherX = intersectingObject.positionX;
            var otherY = intersectingObject.positionY;

            if(intersectingObject.type == "wall" || intersectingObject.type == "block") {       //Kollar om spelaren krockar med en vägg eller flyttbar block.
                
                   if(myY - 1 == otherY && myX == otherX) {
                    if(intersectingObject.type == "wall") {             //Om spelaren krockar med väggen, så stannar spelaren där den var.
                        collideUp = true;
                    }
                    else if(intersectingObject.collideUp == true){      //Om en av checkarna innan märker att spelaren krockar med något, så stanner den spelaren.
                        collideUp = true;
                    }                                                   //Upp
                }
                 if(myY + 1 == otherY && myX == otherX) {
                    if(intersectingObject.type == "wall") {
                        collideDown = true;
                    } else if(intersectingObject.collideDown == true){  //Ner
                        collideDown = true;
                    }
                }
                 if(myX - 1 == otherX && myY == otherY) {
                    if(intersectingObject.type == "wall") {
                        collideLeft = true;
                    } else if(intersectingObject.collideLeft == true ){ //Vänster
                        collideLeft = true;
                    }
                }
                 if(myX + 1 == otherX && myY == otherY) {
                    if(intersectingObject.type == "wall") {
                        collideRight = true;
                    } else if(intersectingObject.collideRight == true){ //Höger
                        collideRight = true;
                    }
                }
            
            }
            
        };          //När jag försökte kolla i framtiden med spelaren, fast det fungerade inte så bra.
        
        //this.futurePositionUp = this.myPositionY -= 1;
        //this.futurePositionDown = this.myPositionY += 1;
        //this.futurePositionLeft = this.myPositionX -= 1;
        //this.futurePositionRight = this.myPositionX += 1;

        this.type = type;
        this.update = function () {                                     //En function som uppdaterar spelarens position, fast håller kvar den senaste ändringen.
            //if (stopX > 1) {
            if (Soko.key && Soko.key == 37 && collideLeft == false) {   //Vänster
                this.formerX = this.myPositionX;
                player.formerY = player.myPositionY;
                this.formerX++;
                //this.formerX--;
                console.log("Former" + player.formerX);
                console.log("Former" + player.formerY);
            }
            if (Soko.key && Soko.key == 39 && collideRight == false) {  //Höger
                player.formerX = player.myPositionX;
                player.formerY = player.myPositionY;
                this.formerX--;
                console.log("Former" + player.formerX);
                console.log("Former" + player.formerY);
            }
            //}
            //if (stopY > 1) {
            if (Soko.key && Soko.key == 38 && collideUp == false) {     //Upp
                player.formerX = player.myPositionX;
                player.formerY = player.myPositionY;
                this.formerY++;
                console.log("Former" + player.formerX);
                console.log("Former" + player.formerY);
            }
            if (Soko.key && Soko.key == 40 && collideDown == false) {   //Ner
                player.formerX = player.myPositionX;
                player.formerY = player.myPositionY;
                this.formerY--;
                console.log("Former" + player.formerX);
                console.log("Former" + player.formerY);
            }
            //}
            
            ctx = Soko.context;                             //Visar och fyller spelaren.
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        
                                                    //En function som jag försökte använda för att se till att spelaren eller de flyttbara blocken inte krockade,
                                                    //men den fungerade inte så bra.

        //this.collide = function () {
        //    for (var i = 0; i < block.length; i++) {
        //        //if (block[i].type != "goal") {
        //        if (block[i].type == "block") {
        //            if (block.myX == block.otherX && block.myY == block.otherY) {
        //
        //                //if (block[i].type != "goal") {
        //                //    if ((block.positionY - 1) == block[i].positionY && (player.myPositionY - 2) == block[i].positionY && block.positionX == block[i].positionX) {
        //                //        collideUp = true;
        //                //    }
        //                //this.dontMove();
        //                if (this.formerY > block.otherY && this.myPositionX == block.otherX && collideUp == false && (this.myPositionY - 2) != block.otherY) {
        //
        //                    block.myY -= 30;
        //                    block.myY -= 1;
        //                    console.log("Up");
        //                    //console.log(this.formerY);
        //                    //collideUp = true;
        //
        //
        //                }
        //                if (block[i].type != "goal") {
        //                    if ((block.positionY + 1) == block[i].positionY && block.positionX == block[i].positionX && block.positionY != (block[i].positionY - 1)) {
        //                        collideDown = true;
        //                        console.log("works");
        //                    }
        //                    if (this.formerY < block[i].positionY && this.myPositionX == block[i].positionX && collideDown == false) {
        //                        block[i].y += 30;
        //                        block[i].positionY += 1;
        //                        console.log("Down");
        //                        console.log(block.positionY);
        //                        console.log(block.positionY);
        //                        //console.log(this.formerY);
        //                        //collideUp = true;
        //                    }
        //                }
        //
        //                if (block[i].type != "goal") {
        //                    if ((block.positionX - 1) == block[i].positionX && block.positionY == block[i].positionY) {
        //                        collideLeft = true;
        //                    }
        //                    if (this.formerX > block[i].positionX && this.myPositionY == block[i].positionY && collideLeft == false) {
        //                        block[i].x -= 30;
        //                        block[i].positionX -= 1;
        //                        console.log("Left");
        //                        //console.log(this.formerX);
        //                        //collideUp = true;
        //                    }
        //                }
        //
        //                if (block[i].type != "goal") {
        //                    if ((block.positionX + 1) == block[i].positionX && block.positionY == block[i].positionY) {
        //                        collideRight = true;
        //                    }
        //                    if (this.formerX < block[i].positionX && this.myPositionY == block[i].positionY && collideRight == false) {
        //                        block[i].x += 30;
        //                        block[i].positionX += 1;
        //                        console.log("Right");
        //                        //console.log(this.formerX);
        //                        //collideUp = true;
        //                    }
        //                }
        //
        //
        //
        //
        //
        //
        //                if (block[i].type == "wall") {
        //                    if ((this.myPositionY - 1) == block.otherY && this.myPositionX == block[i].positionX) {
        //                        collideUp = true;
        //                        //console.log("yes");
        //                    }
        //                    if ((this.myPositionY + 1) == block[i].positionY && this.myPositionX == block[i].positionX) {
        //                        collideDown = true;
        //                        //console.log("yes");
        //                    }
        //                    if ((this.myPositionX - 1) == block[i].positionX && this.myPositionY == block[i].positionY) {
        //                        collideLeft = true;
        //                        //console.log("yes");
        //                    }
        //                    if ((this.myPositionX + 1) == block[i].positionX && this.myPositionY == block[i].positionY) {
        //                        collideRight = true;
        //                        //console.log("yes");
        //                    }
        //                }
        //               
        //            }
        //
        //
        //        }
        //    }
        //};
        //

        this.newPosition = function () {                            //Funktionen som flyttar på spelaren, beronde på vilken pil den tryckte på.

            if (Soko.key && Soko.key == 37 && collideLeft == false) {       //Vänster
                
                player.speedX = -30;
                player.myPositionX--;
                this.x += this.speedX;
                this.y += this.speedY;
                console.log("My" + player.myPositionX);
                console.log("My" + player.myPositionY);
                //stopX++;
                //console.log(player.formerX)
                //console.log(player.formerY)

            }
            if (Soko.key && Soko.key == 39 && collideRight == false) {      //Höger
                player.speedX = 30;
                player.myPositionX++;
                this.x += this.speedX;
                this.y += this.speedY;
                console.log("My" + player.myPositionX);
                console.log("My" + player.myPositionY);
                //stopX++;
                //console.log(player.formerX)
                //console.log(player.formerY)

            }
            if (Soko.key && Soko.key == 38 && collideUp == false) {         //Upp
                player.speedY = -30;
                player.myPositionY--;
                this.x += this.speedX;
                this.y += this.speedY;
                console.log("My" + player.myPositionX);
                console.log("My" + player.myPositionY);
                //stopY++;
                //console.log(player.formerX)
                //console.log(player.formerY)

            }
            if (Soko.key && Soko.key == 40 && collideDown == false) {       //Ner
                player.speedY = 30;
                player.myPositionY++;
                this.x += this.speedX;
                this.y += this.speedY;
                console.log("My" + player.myPositionX);
                console.log("My" + player.myPositionY);
                //stopY++;
                //console.log(player.formerX)
                //console.log(player.formerY)


            }
        };
    
    }
}


function EndSoko() {                            //Går igenom varje goals för att kolla hur många flyttbara blocks står på dom, och räknar om det är nog.
    for (j = 0; j < goal.length; j++) {
        if (goal[j].positionX == block[i].positionX && goal[j].positionY == block[i].positionY) {   
            goalBlocks -= 1;
            //console.log(goalBlocks);
        }
    }
}

//}
function updateSoko() {                             //Uppdaterar spelet.
    Soko.clear();
  
    for (i = 0; i < goal.length; i++) {             //Går igenom varje goal och uppdaterar dom.
        goal[i].update();
    }
    for (i = 0; i < block.length; i++) {            //Går igenom varje block och uppdaterar dom, och kollar varje flyttbar block som står på ett goal.
        block[i].update();
        if (block[i].type == "block") {
            EndSoko(block[i]);
        }
   }
        if (goalBlocks == 0) {                      //Om varje flyttbar block står på ett goal, så avslutas spelet.
            console.log("You Won!")
            Soko.end();
        }
        else {
            goalBlocks = 6;
        }
        for(i = 0; i < block.length; i++) {         //Kollar om spelaren krockar.
            player.colliding(block[i]);
        }
    
    player.speedX = 0;                              //Sätter spelarens fart till noll.
    player.speedY = 0;
   
   
    player.newPosition();                           //Flyttar och uppdaterar spelaren.
    player.update();
    
  
    collideLeft = false;                    //Återställer checken.
    collideRight = false;
    collideUp = false;
    collideDown = false;

    //console.log(player.myPositionX);
    //console.log(player.myPositionY);
   
}
