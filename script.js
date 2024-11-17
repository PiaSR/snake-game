const text = document.querySelector('.text');
const gameCanvas = document.querySelector('.gameCanvas');
const button = document.getElementById('button');
const startBtn = document.querySelector('.startBtn');
const playAgainButton = document.querySelector('.playAgain');



let snake = [{ x: 150, y:150}, { x: 140, y:150},{ x: 130, y:150},{ x: 120, y:150},{ x: 110, y:150}];

let score=0;
let dx=10;
let dy =0;
let foodX;
let foodY;
let changingDirection = false;
let startNewGame=true;
let gameLoopTimeout;


const canvas = document.getElementById('snakeGame');

const ctx = canvas.getContext('2d');


document.addEventListener('DOMContentLoaded', startButton);
startBtn.addEventListener('click', main)
document.addEventListener('keydown', changeDirection); 
button.addEventListener('click', restartGame);



function main() {
  if (!startNewGame) return;

  if (didGameEnd()) {

    gameOver();
    showPlayAgainButton();
    return;
};

	  
	changingDirection = false;
	  clearCanvas();
	  drawFood();
	  advanceSnake();
	  drawSnake();
    clearTimeout(gameLoopTimeout);
  gameLoopTimeout = setTimeout(main, 100);

}

function startButton () {
	button.className = "startBtn visible";
	button.innerHTML = 'START';
}


function clearCanvas() {
ctx.fillStyle='white';
ctx.strokeStyle='white';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeRect(0,0,canvas.width,canvas.height);
}

function drawFood() {
  ctx.fillStyle='red';
  ctx.strokeStyle='darkred';
  ctx.fillRect(foodX, foodY, 10,10);
  ctx.strokeRect(foodX, foodY, 10,10);
}

function advanceSnake() {
  const head= { x: snake[0].x +dx, y: snake[0].y +dy};
  snake.unshift(head);
 

  const didEatFood =
    foodX === snake[0].x && foodY === snake[0].y;
  
  if(didEatFood) { 
    score+=10;
    document.getElementById('score').innerHTML=score;
    createFood();
  } else {
    snake.pop();
  }
}


function randomTen(min, max) {
  return Math.round((Math.random()*(max-min)+min)/10)*10;
}

function createFood() {
  let foodIsOnSnake = true;

  while (foodIsOnSnake) {
    foodX = randomTen(0, canvas.width - 10);
    foodY = randomTen(0, canvas.height - 10);

    foodIsOnSnake = snake.some(part => part.x === foodX && part.y === foodY);

    
  }
}

function drawSnake() {snake.forEach(drawSnakePart);}

function drawSnakePart(snakePart){
  ctx.fillStyle='#23db8f';
  ctx.strokeStyle='#0d4f34';
  ctx.fillRect(snakePart.x, snakePart.y, 10,10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10,10);

}

function changeDirection(event) {

  const LEFT_KEY = 'ArrowLeft';
  const RIGHT_KEY = 'ArrowRight';
  const UP_KEY = 'ArrowUp';
  const DOWN_KEY = 'ArrowDown';



  if(changingDirection) {return};
  console.log('Already changing direction'); 

  const keyPressed = event.code;
   console.log('Key pressed:', keyPressed); 


  changingDirection = true;


  const goingUp = dy === 10;
  const goingDown = dy === -10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if(keyPressed === LEFT_KEY && !goingRight) {
    dx = -10; 
    dy = 0;
  }

  if(keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10; 
    dy = 0;
  }
  if(keyPressed === UP_KEY && !goingDown) {
    dx=0; 
    dy= -10;
  }
  if(keyPressed === DOWN_KEY && !goingUp) {
    dx=0; 
    dy= 10;
  }

}



function didGameEnd() {
	// Check for collision with the walls
	const hitLeftWall = snake[0].x < 0;

	const hitRightWall = snake[0].x > canvas.width - 10;

	const hitUpWall = snake[0].y < 0;

	const hitBottomWall = snake[0].y > canvas.height - 10;


	if (hitLeftWall || hitRightWall || hitUpWall || hitBottomWall) {
		console.log("hitawall")
    startNewGame=false;
	  return true; // Game ends if snake hits any wall
	}

	// Check for collision with itself (excluding head)
	for (let i = 1; i < snake.length; i++) {
	  if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      startNewGame=false;
		console.log("snakeateitself");

		return true; // Game ends if snake hits itself
	  }
	}

	return false;
  }


function gameOver() {
  setTimeout(()=> {
    document.getElementById('score').innerHTML = '';

      text.innerHTML = "Game Over!";
      text.classList.add('gameOver');
      console.log('gameoverclassAdded');

      gameCanvas.className='gameCanvas endGameCanvas';
    }, 500);
}

function showPlayAgainButton() {
  setTimeout(()=> {
button.className='playAgain visible';
  button.innerHTML = 'PLAY AGAIN';
}, 3000);
}


function restartGame() {

 startNewGame=true;

snake = [{ x: 150, y:150}, { x: 140, y:150},{ x: 130, y:150},{ x: 120, y:150},{ x: 110, y:150}];

score=0;
document.getElementById('score').innerHTML=score;
dx=10;
dy =0;

text.innerHTML = 'Score: ';
text.classList.remove('gameOver');
 gameCanvas.classList.remove('endGameCanvas');
 button.classList.remove('visible');

 clearTimeout(gameLoopTimeout);
    clearCanvas();
    createFood();
    main();

}
