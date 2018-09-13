
//Canvas e canvas Context
var canvas = document.getElementById("snakeCanvas");
var context = canvas.getContext("2d");
var randomPos = [];
randomPos = populateRandomPos(10);
console.log(randomPos);
var current_points = 0;


/////////////////////////////////////// OBJECTS //////////////////////////////////////////////////////////

//Oggetto Cibo
function Food(width,height,posX,posY){
	
	this.width = width;
	this.height = height;
	this.posX = posX;
	this.posY = posY;
	
	
	this.randomSpawn = function(){
		this.posX = randomPos[Math.floor((Math.random() * randomPos.length) + 1)];
		this.posY = randomPos[Math.floor((Math.random() * randomPos.length) + 1)];
		
		this.draw();
	}
	
	
	this.draw = function(){
		//Drawing the rect
		context.fillStyle = "green";
		context.fillRect(this.posX,this.posY,this.width,this.height);
	}
	
	this.collisionDetection = function(snakePosX,snakePosY){
		if(this.posX == snakePosX && this.posY == snakePosY){
			this.randomSpawn();
		}
	}
	
}


//Oggetto Serpente
function Snake(width,height,posX,posY){
	
	this.width = width;
	this.height = height;
	this.posX = posX;
	this.posY = posY;
	this.direction = 'right';
	this.increment = 10;
	
	
	this.changeDirection = function(e){
		
		var keynum = e.keyCode;
		console.log('keynum: ' + keynum);
		
		switch(keynum){
			case 87:
				//Su
				snake.direction = 'up';
			break;
			case 68:
				//Destra
				snake.direction = 'right';
			break;
			case 65:
				//Sinistra
				snake.direction = 'left';
			break;
			case 83:
				//Sotto
				snake.direction = 'down';
			break;
		}
	}
	
	
	this.draw = function(){
		
		switch(this.direction){
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
		context.fillRect(this.posX,this.posY,this.width,this.height);
	}
	
	
	this.die = function(){
		this.width = 10;
		this.height = 10;
		this.posX = 0;
		this.posY = 0;	
		this.direction = 'right';
	}
	
	
	this.checkForBorders = function(){
		if((this.posX + (this.width/2)) > canvas.width || (this.posY + (this.height/2)) > canvas.height ||
		(this.posX + (this.width/2)) < 0 || (this.posY + (this.height/2)) < 0){
			this.die();
		}
	}
	
	this.collisionDetection = function(foodPosX,foodPosY){
		if(this.posX == foodPosX && this.posY == foodPosY){
			updatePointsText();
			food.randomSpawn();
		}
	}
	
}



/////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////

//Ricolora lo sfondo del canvas
function colorBackground(){	
	context.fillStyle = "#FFFFFF";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

//Popola l'array delle posizioni possibili per tenere l'unita di misura scelta, in questo caso 10.
function populateRandomPos(position_increment){
	var single = 0;
	
	while(single <= (canvas.width - position_increment)){
		randomPos.push(single);
		single += position_increment;
	}
	return randomPos;
}

//Mostra il punteggio attuale
function updatePointsText(){
	current_points++;
	getElementById('points').innerHTML = current_points;
}



/////////////////////////////////////// MAIN LOOP //////////////////////////////////////////////////////////

var snake = new Snake(10,10,0,0);
var food = new Food(10,10,0,0);
food.randomSpawn();

window.addEventListener("keydown", snake.changeDirection);

var FPS = 5;

//Actual Loop
setInterval(function() {
	colorBackground();
	snake.checkForBorders();
	
	food.draw();
	snake.draw();
	snake.collisionDetection(food.posX,food.posY);

}, 1000/FPS);




