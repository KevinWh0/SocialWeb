//import Player from "./player.js";

class Player {
  //using # makes it private
  #x = 0;
  #y = 0;

  Player(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    console.log("Updated Player");
    if (mousePressed) fill("blue");
    else fill("red");

    //rect(mouseX, mouseY, 100, 100);
    image("./Assets/Player.png", mouseX, mouseY, 64, 128);
  }

  get getX() {
    return this.x;
  }
  get getY() {
    return this.y;
  }

  move(x_vel, y_vel) {
    x += x_vel;
    y += y_vel;
  }
}

var myGamePiece;
var myObstacles = [];
var myScore;
let localPlayer;

let width = window.innerWidth;
let height = window.innerHeight;

let mousePressed = false;
let mouseX, mouseY;

let myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.id = "canvas";
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.canvas.addEventListener("mousedown", function (e) {
      mousePressed = true;
    });
    window.addEventListener("mousemove", function (e) {
      mouseX = e.x;
      mouseY = e.y;
    });
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

startGame();

function startGame() {
  localPlayer = new Player(0, 0);

  myGamePiece = new component(30, 30, "red", 10, 120);
  //myScore = new component("30px", "Consolas", "black", 280, 40, "text");
  //if (myGameArea != undefined) {
  myGameArea.start();

  window.addEventListener("keydown", function (e) {
    myGameArea.keys = myGameArea.keys || [];
    myGameArea.keys[e.keyCode] = true;
  });
  window.addEventListener("keyup", function (e) {
    myGameArea.keys[e.keyCode] = false;
  });
  //} else {
  //  console.error("Could not load The canvas");
  //}
}

function component(x, y, width, height, color, type) {
  this.type = type;
  this.score = 0;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.gravity = 0;
  this.gravitySpeed = 0;
  this.update = function () {
    ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
}

function fill(col) {
  myGameArea.context.fillStyle = col;
}

function rect(x, y, w, h) {
  myGameArea.context.fillRect(x, y, w, h);
}
function image(image, x, y, w, h) {
  var img = new Image();

  img.src = image;
  var upscaledCanvas = document.getElementById("canvas").getContext("2d");
  upscaledCanvas.mozImageSmoothingEnabled = false;
  upscaledCanvas.webkitImageSmoothingEnabled = false;
  upscaledCanvas.msImageSmoothingEnabled = false;
  upscaledCanvas.imageSmoothingEnabled = false;

  myGameArea.context.drawImage(img, x, y, w, h);
}
function updateGameArea() {
  myGameArea.clear();
  myGameArea.frameNo += 1;
  localPlayer.update();

  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    //myObstacles.push(
    //  new component(10, x - height - gap, "green", x, height + gap)
    //);
  }

  //myScore.text = "SCORE: " + myGameArea.frameNo;
  //myScore.update();
  //myGamePiece.newPos();
  //myGamePiece.update();
  mousePressed = false;
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

function accelerate(n) {
  myGamePiece.gravity = n;
}
/*
this.userInput = function () {
  // keyMap is accessed via closure
  this.speedY = this.speedX = 0;
  if (myGameArea.keys[keyMap[2]]) {
    move(-2, 0);
  } //  Left
  if (myGameArea.keys[keyMap[3]]) {
    move(2, 0);
  } //  Right
  if (myGameArea.keys[keyMap[0]]) {
    move(0, -2);
  } //  Up
  if (myGameArea.keys[keyMap[1]]) {
    move(0, 2);
  } //  Down
};*/

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  console.log("Coordinate x: " + x, "Coordinate y: " + y);
}

export default class {
  component;
}
