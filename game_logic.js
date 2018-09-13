
//Canvas e canvas Context
var canvas = document.getElementById("snakeCanvas");
var context = canvas.getContext("2d");
var randomPos = [];
randomPos = populateRandomPos(10);
console.log(randomPos);
var current_points = 0;
var tailPieces = [];


/////////////////////////////////////// OBJECTS //////////////////////////////////////////////////////////

//Oggetto Cibo
function Food(width,height,posX,posY){
	
	this.width = width;
	this.height = height;
	this.posX = posX;
	this.posY = posY;
	
	
	this.randomSpawn = function(){
		this.posX = randomPos[Math.floor((Math.random() * randomPos.length))];
		this.posY = randomPos[Math.floor((Math.random() * randomPos.length))];
		// console.log(this.posX,this.posY);
		this.draw();
	}
	
	
	this.draw = function(){
		//Drawing the rect
		context.fillStyle = "green";
		context.fillRect(this.posX,this.posY,this.width,this.height);
	}
	
	this.collisionDetection = function(){
		if(this.posX == snake.PosX && this.posY == snake.posY){
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
	this.prevPosition = {
		posX:0,
		posY:0,
		direction:'null'
	}
	this.haveTail = false;
	this.tailPoisition = 0;
	this.speed = 1;
	
	
	this.changeDirection = function(e){
		var keynum = e.keyCode;
		// console.log('keynum: ' + keynum);
		
		switch(keynum){
			case 87:
				//Su
				snake.direction = 'up';
			break;
			case 38:
				//Su
				snake.direction = 'up';
			break;
			case 68:
				//Destra
				snake.direction = 'right';
			break;
			case 39:
				//Destra
				snake.direction = 'right';
			break;
			case 65:
				//Sinistra
				snake.direction = 'left';
			break;
			case 37:
				//Sinistra
				snake.direction = 'left';
			break;
			case 83:
				//Sotto
				snake.direction = 'down';
			break;
			case 40:
				//Sotto
				snake.direction = 'down';
			break;
		}
	}
	
	
	this.draw = function(){
		//Salvo la posizione precedente di Snake
		this.prevPosition.posX = this.posX;
		this.prevPosition.posY = this.posY;
		//Salvo la direzione precedente di Snake
		this.prevPosition.direction = this.direction;
		// console.log('Prima:' +  this.posX, this.posY,this.direction);
		
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
		// console.log('Dopo:' +  this.posX, this.posY,this.direction);

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
		//Svuoto l'array contentente i pezzi di coda
		tailPieces = [];
		this.haveTail = false;
		this.tailPoisition = 0;
		
		//Resetto il punteggio
		current_points = 0;
		updatePointsText();
	}
	
	
	this.checkForBorders = function(){
		if((this.posX + (this.width/2)) > canvas.width || (this.posY + (this.height/2)) > canvas.height ||
		(this.posX + (this.width/2)) < 0 || (this.posY + (this.height/2)) < 0){
			this.die();
		}
	}
	
	
	this.foodCollisionDetection = function(foodPosX,foodPosY){
		if(this.posX == foodPosX && this.posY == foodPosY){
			updatePointsText();
			food.randomSpawn();
			//Creo un nuovo pezzo di coda
			if(this.haveTail == false){
				tailPieces.push(new Tail(this.tailPoisition));
				this.haveTail = true;
			}else{
				tailPieces.push(new Tail(this.tailPoisition));
			}
			this.tailPoisition++;
		}
	}
	
}



//Oggetto Coda Serpente
function Tail(tailArrPos){
	
	this.width = snake.width;
	this.height = snake.height;
	this.increment = snake.increment;
	this.tailArrPos = tailArrPos;
	this.prevPosition = {
		posX:0,
		posY:0,
		direction:'null'
	}
	
	this.draw = function(){
		//Salvo la posizione precedente di questo pezzo di coda
		this.prevPosition.posX = this.posX;
		this.prevPosition.posY = this.posY;
		this.prevPosition.direction = this.direction;
	
	
		if(this.tailArrPos == 0){ //Se è il primo pezzo di coda 
			this.posX = snake.prevPosition['posX'];
			this.posY = snake.prevPosition['posY'];
			this.direction = snake.prevPosition['direction'];
		}else{ // Se non è il primo pezzo di coda
			this.posX = tailPieces[tailArrPos - 1].prevPosition['posX'];
			this.posY = tailPieces[tailArrPos - 1].prevPosition['posY'];
			this.direction = tailPieces[tailArrPos - 1].prevPosition['posY'];
		}
		// console.log('Tail: ' + this.posX,this.posY);
		// console.log('Snake: ' + snake.posX,snake.posY);
		
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

//Aggiorna il punteggio 
function updatePointsText(){
	current_points++;
	FPS += 0.1;
	document.getElementById('points').innerHTML = current_points;
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
	//Tail pieces update
	for(var i=0; i<tailPieces.length; i++){
		tailPieces[i].draw();
	}
	i=0;
	
	snake.draw();
	snake.foodCollisionDetection(food.posX,food.posY);


}, 1000/FPS);




