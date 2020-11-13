const canvas = document.getElementById("snakeCanvas");
const context = canvas.getContext("2d");
var randomPos = populateRandomPos(10);
var current_points = 1;
var tailPieces = [];
var isGameRunning = true; //Run or stop the game
var game_starting = 0;
var can_press_key = true;
let records = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const displayPointsElement = document.getElementById('points');
const recordListElements = document.getElementsByClassName('record_list_element');
//Food Class
function Food(width, height, posX, posY) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.randomSpawn = function () {
        this.posX = randomPos[Math.floor((Math.random() * randomPos.length))];
        this.posY = randomPos[Math.floor((Math.random() * randomPos.length))];
        this.draw();
    };
    // Drawing the rect
    this.draw = function () {
        context.fillStyle = "green";
        context.fillRect(this.posX, this.posY, this.width, this.height);
    };
    // Check for collision with snake
    this.collisionDetection = function () {
        if (this.posX === snake.posX && this.posY === snake.posY) {
            this.randomSpawn();
        }
    };
    this.disappear = function () {
        context.fillStyle = "white";
        context.fillRect(this.posX, this.posY, this.width, this.height);
    };
}
function Snake(width, height, posX, posY) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.direction = 'right';
    this.increment = 10;
    this.prevPosition = {
        posX: 0,
        posY: 0,
        direction: 'null'
    };
    this.haveTail = false;
    this.tailPoisition = 0;
    this.changeDirection = function (e) {
        if (game_starting > 2 && can_press_key === true) {
            can_press_key = false;
            let currentKeyCode = e.keyCode;
            switch (currentKeyCode) {
                case 87:
                    if (snake.direction !== 'down') {
                        snake.direction = 'up';
                    }
                    break;
                case 38:
                    if (snake.direction !== 'down') {
                        snake.direction = 'up';
                    }
                    break;
                case 68:
                    if (snake.direction !== 'left') {
                        snake.direction = 'right';
                    }
                    break;
                case 39:
                    if (snake.direction !== 'left') {
                        snake.direction = 'right';
                    }
                    break;
                case 65:
                    if (snake.direction !== 'right') {
                        snake.direction = 'left';
                    }
                    break;
                case 37:
                    if (snake.direction !== 'right') {
                        snake.direction = 'left';
                    }
                    break;
                case 83:
                    if (snake.direction !== 'up') {
                        snake.direction = 'down';
                    }
                    break;
                case 40:
                    if (snake.direction !== 'up') {
                        snake.direction = 'down';
                    }
                    break;
            }
        }
    };
    this.draw = function () {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        this.prevPosition.direction = this.direction;
        switch (this.direction) {
            case 'left':
                this.posX -= this.increment;
                break;
            case 'right':
                this.posX += this.increment;
                break;
            case 'up':
                this.posY -= this.increment;
                break;
            case 'down':
                this.posY += this.increment;
                break;
        }
        //Drawing the rect
        context.fillStyle = "black";
        context.fillRect(this.posX, this.posY, this.width, this.height);
        context.strokeStyle = "white";
        context.lineWidth = 0.5;
        context.strokeRect(this.posX, this.posY, this.width, this.height);
    };
    this.die = function () {
        isGameRunning = false;
        this.width = 10;
        this.height = 10;
        this.posX = 0;
        this.posY = 0;
        this.direction = 'right';
        this.haveTail = false;
        this.tailPoisition = 0;
        // Updating records list
        updateRecordsList(current_points);
        // Resetto il punteggio
        updatePointsText();
        // Resetto la velocità
        FPS = 5;
        // Reset della variabile che serve a far partire il gioco a 3 punti
        game_starting = 0;
        // Faccio scomparire temporaneamente il serpente
        context.fillStyle = "white";
        context.fillRect(this.posX, this.posY, this.width, this.height);
        hideTailPieces();
        tailPieces = [];
        food.disappear();
        gameOver();
    };
    this.checkForBorders = function () {
        if ((this.posX + (this.width / 2)) > canvas.width || (this.posY + (this.height / 2)) > canvas.height ||
            (this.posX + (this.width / 2)) < 0 || (this.posY + (this.height / 2)) < 0) {
            this.die();
        }
    };
    this.foodCollisionDetection = function (foodPosX, foodPosY) {
        if (this.posX === foodPosX && this.posY === foodPosY) {
            updatePointsText();
            food.randomSpawn();
            if (this.haveTail === false) {
                tailPieces.push(new Tail(this.tailPoisition));
                this.haveTail = true;
            }
            else {
                tailPieces.push(new Tail(this.tailPoisition));
            }
            this.tailPoisition++;
            if (game_starting > 2) {
                playSound("sounds/eat.mp3");
            }
        }
    };
    this.selfCollisionDetection = function () {
        //Check for collision with his tail pieces
        for (var i = 0; i < tailPieces.length; i++) {
            if (this.posX == tailPieces[i]['posX'] && this.posY == tailPieces[i]['posY']) {
                this.die();
            }
        }
    };
}
//Snake Tail Class
function Tail(tailArrPos) {
    this.width = snake.width;
    this.height = snake.height;
    this.increment = snake.increment;
    this.tailArrPos = tailArrPos;
    this.prevPosition = {
        posX: 0,
        posY: 0,
        direction: 'null'
    };
    this.draw = function () {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        this.prevPosition.direction = this.direction;
        if (this.tailArrPos === 0) {
            this.posX = snake.prevPosition['posX'];
            this.posY = snake.prevPosition['posY'];
            this.direction = snake.prevPosition['direction'];
        }
        else {
            this.posX = tailPieces[tailArrPos - 1].prevPosition['posX'];
            this.posY = tailPieces[tailArrPos - 1].prevPosition['posY'];
            this.direction = tailPieces[tailArrPos - 1].prevPosition['posY'];
        }
        switch (this.direction) {
            case 'left':
                this.posX -= this.increment;
                break;
            case 'right':
                this.posX += this.increment;
                break;
            case 'up':
                this.posY -= this.increment;
                break;
            case 'down':
                this.posY += this.increment;
                break;
        }
        // Drawing the rect
        context.fillStyle = "black";
        context.fillRect(this.posX, this.posY, this.width, this.height);
        context.strokeStyle = "white";
        context.lineWidth = 0.5;
        context.strokeRect(this.posX, this.posY, this.width, this.height);
    };
    this.disappear = function () {
        context.fillStyle = "white";
        context.fillRect(this.posX, this.posY, this.width, this.height);
    };
    this.foodCollisionDetection = function () {
        if (this.posX === food.posX && this.posY === food.posY) {
            console.log('collision food');
            food.randomSpawn();
        }
    };
}
/////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////
function playSound(sound_src) {
    var snd = new Audio(sound_src);
    snd.play();
    snd.volume = 0.2;
}
function colorBackground() {
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
}
function populateRandomPos(position_increment) {
    let single = 0;
    let randomPos = [];
    while (single <= (canvas.width - position_increment)) {
        randomPos.push(single);
        single += position_increment;
    }
    return randomPos;
}
function updatePointsText() {
    if (isGameRunning) {
        current_points++;
        if (current_points < 3)
            displayPointsElement.innerHTML = 0;
        else
            displayPointsElement.innerHTML = current_points;
    }
    else {
        current_points = 1;
        displayPointsElement.innerHTML = 0;
    }
    FPS += 0.2;
}
function updateRecordsList(entry) {
    for (let i = 0; i < records.length; i++) {
        if (entry === records[i]) {
            break;
        }
        else if (entry > records[i]) {
            records[i] = entry;
            recordListElements[i].innerHTML = records[i].toString();
            break;
        }
    }
}
function hideTailPieces() {
    for (var i = 0; i < tailPieces.length; i++) {
        tailPieces[i].disappear();
    }
}
function gameOver() {
    context.font = "30px Comic Sans MS";
    context.strokeStyle = "black";
    context.textAlign = "center";
    context.strokeText("You Lost!", canvas.width / 2, canvas.height / 2);
    //Restart the game after 2 seconds
    setTimeout(function () {
        isGameRunning = true;
        mainLoop();
    }, 1800);
}
/////////////////////////////////////// MAIN LOOP //////////////////////////////////////////////////////////
const snake = new Snake(10, 10, 0, 0);
const food = new Food(10, 10, 0, 0);
//food.randomSpawn();
window.addEventListener("keydown", snake.changeDirection);
let FPS = 6;
// Starting the main game loop
setTimeout(mainLoop, 1000 / FPS);
function mainLoop() {
    if (isGameRunning) {
        colorBackground();
        //Tail pieces update
        for (var i = 0; i < tailPieces.length; i++) {
            tailPieces[i].draw();
            tailPieces[i].foodCollisionDetection();
        }
        i = 0;
        // Starting the game with 3 points as the original game did.
        if (game_starting <= 2) {
            if (game_starting < 2) {
                food.posX = (snake.posX + snake.increment);
                food.posY = snake.posY;
            }
            game_starting++;
        }
        food.draw();
        snake.draw();
        snake.checkForBorders();
        snake.selfCollisionDetection();
        snake.foodCollisionDetection(food.posX, food.posY);
        can_press_key = true;
        setTimeout(mainLoop, 1000 / FPS);
    }
}
