
//Canvas e canvas Context
var canvas = document.getElementById("snakeCanvas");
var context = canvas.getContext("2d");
var randomPos = [];
randomPos = populateRandomPos(10);
var current_points = 1;
var tailPieces = [];
var gameState = true; //Run or stop the game
var game_starting = 0;
var can_press_key = true;



/////////////////////////////////////// CLASSES //////////////////////////////////////////////////////////

//Food Class
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
		//Check for collision with snake 
		if(this.posX == snake.PosX && this.posY == snake.posY){
			this.randomSpawn();
		}
	}	
	
	this.disappear = function(){
		//Faccio scomparire temporaneamente il cibo
		context.fillStyle = "white";
		context.fillRect(this.posX,this.posY,this.width,this.height);
	}
	
}


//Snake Class
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
		if(game_starting > 2 && can_press_key == true){
			
			can_press_key = false;
			var keynum = e.keyCode;
			
			switch(keynum){
				case 87:
					//Su
					if(snake.direction != 'down'){
						snake.direction = 'up';
					}
				break;
				case 38:
					//Su
					if(snake.direction != 'down'){
						snake.direction = 'up';
					}
				break;
				case 68:
					//Destra
					if(snake.direction != 'left'){
						snake.direction = 'right';
					}
				break;
				case 39:
					//Destra
					if(snake.direction != 'left'){
						snake.direction = 'right';
					}
				break;
				case 65:
					//Sinistra
					if(snake.direction != 'right'){
						snake.direction = 'left';
					}
				break;
				case 37:
					//Sinistra
					if(snake.direction != 'right'){
						snake.direction = 'left';
					}
				break;
				case 83:
					//Sotto
					if(snake.direction != 'up'){
						snake.direction = 'down';
					}
				break;
				case 40:
					//Sotto
					if(snake.direction != 'up'){
						snake.direction = 'down';
					}
				break;
			}
		}
	}
	
	
	this.draw = function(){
		//Salvo la posizione precedente di Snake
		this.prevPosition.posX = this.posX;
		this.prevPosition.posY = this.posY;
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
		context.strokeStyle = "white";
		context.lineWidth = 0.5;
		context.strokeRect(this.posX,this.posY,this.width,this.height);
	}
	
	
	this.die = function(){
		gameState = false;
		
		this.width = 10;
		this.height = 10;
		this.posX = 0;
		this.posY = 0;	
		this.direction = 'right';
		this.haveTail = false;
		this.tailPoisition = 0;
		
		
		//Resetto il punteggio
		updatePointsText();
		//Resetto la velocità
		FPS = 5;
		//Reset della variabile che serve a far partire il gioco a 3 punti		
		game_starting = 0;
		
		//Faccio scomparire temporaneamente il serpente
		context.fillStyle = "white";
		context.fillRect(this.posX,this.posY,this.width,this.height);
		
		//Svuoto l'array contentente i pezzi di coda
		hideTailPieces();
		tailPieces = [];
		food.disappear();
		
		gameOver();
		
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
			
			//Playing Sound
			if(game_starting > 2){
				playSound("sounds/eat.mp3");
			}
		}
	}
	
	this.selfCollisionDetection = function(){
		//Check for collision with his tail pieces
	
		for(var i=0; i<tailPieces.length; i++){
			if(this.posX == tailPieces[i]['posX'] && this.posY == tailPieces[i]['posY']){
				this.die();
			}
		}
	}
	
}



//Snake Tail Class
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
		}else{ // Se NON è il primo pezzo di coda
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
		context.strokeStyle = "white";
		context.lineWidth = 0.5;
		context.strokeRect(this.posX,this.posY,this.width,this.height);
	}
	
	this.disappear = function(){
		//Faccio scomparire temporaneamente il cibo
		context.fillStyle = "white";
		context.fillRect(this.posX,this.posY,this.width,this.height);
	}
	
	this.foodCollisionDetection = function(){
		//Check for collision with food  
		if(this.posX == food.PosX && this.posY == food.posY){
			console.log('collision food');
			food.randomSpawn();
		}
	}	

}




/////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////

function playSound(sound_src){
	var snd = new Audio(sound_src); 
	snd.play();
	snd.volume = 0.2;
}



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
	if(gameState == true){
		current_points++;
	}else{
		current_points = 1;
	}
	FPS += 0.2;
	document.getElementById('points').innerHTML = current_points;
}

function hideTailPieces(){
	
	for(var i=0; i<tailPieces.length; i++){
		tailPieces[i].disappear();
	}
}


function gameOver(){
	
	context.font = "30px Comic Sans MS";
	context.strokeStyle = "black";
	context.textAlign = "center";
	context.strokeText("You Lost!",canvas.width/2,canvas.height/2);

	//Restart the game after 2 seconds
	setTimeout(function(){ 
		gameState = true;
		mainLoop();
	}, 1800);
}

/////////////////////////////////////// MAIN LOOP //////////////////////////////////////////////////////////

var snake = new Snake(10,10,0,0);
var food = new Food(10,10,0,0);
//food.randomSpawn();

window.addEventListener("keydown", snake.changeDirection);

var FPS = 6;

//Actual Loop
var loop = setTimeout(mainLoop, 1000/FPS);

function mainLoop(){
	
	if(gameState == true){
		colorBackground();
		//Tail pieces update
		for(var i=0; i<tailPieces.length; i++){
			tailPieces[i].draw();
			// tailPieces[i].foodCollisionDetection();
		}
		i=0;
		
		//Funzione che permette di raggiungere i 3 punti canonici all inizio della partita
		if(game_starting <= 2){
			if(game_starting < 2){
				food.posX = (snake.posX + snake.increment);
				food.posY = snake.posY;
			}
			game_starting++; //Lo faccio arrivare a 3 per vari controlli
		}
		
		food.draw();

		snake.draw();
		snake.checkForBorders();
		snake.selfCollisionDetection();
		
		snake.foodCollisionDetection(food.posX,food.posY);
		
		can_press_key = true;
		setTimeout(mainLoop, 1000/FPS);
	}
}




