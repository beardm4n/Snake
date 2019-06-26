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
  clearInterval(intervalId);
  context.font = "60px Courier";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("Game over", width / 2, height / 2);
};

// constructor for invisible cells
let Block = function (col, row) {
  this.col = col;
  this.row = row;
};

Block.prototype.drawSquare = function (color) {                        // draw a square for snake
  let x = this.col * blockSize;
  let y = this.row * blockSize;

  context.fillStyle = color;

  context.fillRect(x, y, blockSize, blockSize);
};

let circle = function (x, y, radius, fillCircle) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);

  if (fillCircle) {
    context.fill();
  } else {
    context.stroke();
  }
};

Block.prototype.drawCircle = function (color) {                       // draw a circle for apple
  let centerX = this.col * blockSize + blockSize / 2;
  let centerY = this.row * blockSize + blockSize / 2;

  context.fillStyle = color;

  circle(centerX, centerY, blockSize / 2, true);
};

Block.prototype.equal = function (otherBlock) {                       // compare the positions of two objects
  return this.col === otherBlock.col && this.row === otherBlock.row; 
};

// create a snake
let Snake = function () {                                             // constructor of snake
  this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5)
  ];

  this.direction = "right";
  this.nextDirection = "right";
};

Snake.prototype.draw = function () {                                  // draw a snake
  for (let i = 0; i < this.segments.length; i++) {
    this.segments[i].drawSquare("blue");
  }
};

// move the snake
Snake.prototype.move = function () {
  let head = this.segments[0],
      newHead;
  
  this.direction = this.nextDirection;

  if (this.direction === "right") {
    newHead = new Block(head.col + 1, head.row);
  } else if (this.direction === "down") {
    newHead = new Block(head.col, head.row +1);
  } else if (this.directiom === "left") {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === "up") {
    newHead = new Block(head.col, head.row - 1);
  }

  if (this.checkCollision(newHead)) {
    gameOver();
    return;
  }

  this.segments.unshift(newHead);

  if (newHead.equal(apple.position)) {
    score++;
    apple.move();
  } else {
    this.segments.pop();
  }
};

Snake.prototype.checkCollision = function (head) {                    // collision check
  let leftCollision = (head.col === 0),
      topCollision = (head.row === 0),
      rightCollision = (head.col === widthInBlock - 1),
      bottomCollision = (head.row === heightInBlock - 1);
  
  let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

  let selfCollision = false;

  for (let i = 0; i < this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
      selfCollision = true;
    }
  }

  return wallCollision || selfCollision;
};

// keyboard control
