const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
const canvasSize = 20;
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const startBtn = document.getElementById("startBtn");

let snake;
let food;
let direction;
let score;
let highScore = localStorage.getItem("snakeHighScore") || 0;
highScoreEl.textContent = highScore;

let game;

function startGame() {
  clearInterval(game);
  snake = [{ x: 10, y: 10 }];
  direction = "RIGHT";
  score = 0;
  scoreEl.textContent = score;
  food = {
    x: Math.floor(Math.random() * canvasSize),
    y: Math.floor(Math.random() * canvasSize),
  };
  game = setInterval(draw, 150);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // snake
   for (let i = 0; i <= 0; i++) {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(snake[i].x * box, snake[i].y * box, box, box);
  }
 for (let i = 1; i < snake.length; i++) {
  ctx.fillStyle = i % 2 === 0 ? "#ff6600" : "#fffb00"; 
  ctx.beginPath();
  ctx.arc(
    snake[i].x * box + box / 2, 
    snake[i].y * box + box / 2, 
    box / 2,                    
    0, Math.PI * 2              
  );
  ctx.fill();
}
  //food
  
// ctx.fillStyle = "white";
// ctx.fillRect(food.x * box, food.y * box, box, box);
ctx.fillStyle = "white"; 
ctx.beginPath();
ctx.arc(food.x * box + box / 2, food.y * box + box / 2, box / 2, 0, Math.PI * 2);
ctx.fill();

  
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX--;
  if (direction === "RIGHT") headX++;
  if (direction === "UP") headY--;
  if (direction === "DOWN") headY++;

  // GAME CONDITION
  if (
    headX < 0 || headY < 0 ||
    headX >= canvasSize || headY >= canvasSize ||
    snake.some((s, i) => i > 0 && s.x === headX && s.y === headY)
  ) {
    clearInterval(game);
    alert("Game Over!");
    if (score > highScore) {
      localStorage.setItem("snakeHighScore", score);
      highScore = score;
      highScoreEl.textContent = highScore;
    }
    return;
  }

  let newHead = { x: headX, y: headY };

  if (headX === food.x && headY === food.y) {
    score++;
    scoreEl.textContent = score;
    food = {
      x: Math.floor(Math.random() * canvasSize),
      y: Math.floor(Math.random() * canvasSize),
    };
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
}

startBtn.addEventListener("click", startGame);
