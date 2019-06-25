// define variables
let canvas = document.querySelector("#canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

// divide the canvas into cells
let blockSize = 10,
    widthInBlock = width / blockSize,
    heightInBlock = height / blockSize;

// variable score
let score = 0;

//draw a border
let drawBorder = function () {
  context.fillStyle = "gray";
  context.fillRect(0, 0, width, blockSize);
  context.fillRect(0, height - blockSize, width, blockSize);
  context.fillRect(0, 0, blockSize, height);
  context.fillRect(width - blockSize, 0, blockSize, height);
};

//display score
let drawScore = function () {
  context.font = "20px Courier";
  context.fillStyle = "black";
  context.align = "left";
  context.textBaseline = "top";
  context.fillText("Score: " + score, blockSize, blockSize);
};

//game over
let gameOver = function () {
  // clearInterval(intervalId);
  context.font = "60px Courier";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("Game over", width / 2, height / 2);
};

