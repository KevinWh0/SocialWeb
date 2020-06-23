//import Player from "./player.js";

function drawMap() {
  for (var i = 0; i < 40; i++) {
    for (var j = 0; j < 20; j++) {
      if (inArea(i * 64, j * 64, 0, 0, width, height)) {
        if (map[i][j] == 1) {
          renderImage(tiles[0], i * 64, j * 64, 64, 64);
        }
      }
    }
  }
}

class Player {
  //using # makes it private
  x = 0;
  y = 0;
  #speed = 10;
  talking = false;
  #chatbar = "";

  Player(x, y) {
    this.x = x;
    this.y = y;
  }
  render(anim) {
    if (anim == "walkforward") {
      if (myGameArea.frameNo % 40 > 20) {
        cropImage(player, this.x, this.y, 16 * 4, 32 * 4, 16 * 2, 0, 16, 32);
      } else {
        cropImage(player, this.x, this.y, 16 * 4, 32 * 4, 16 * 3, 0, 16, 32);
      }
    } else if (anim == "walkbackward") {
      if (myGameArea.frameNo % 40 > 20) {
        cropImage(player, this.x, this.y, 16 * 4, 32 * 4, 16 * 4, 0, 16, 32);
      } else {
        cropImage(player, this.x, this.y, 16 * 4, 32 * 4, 16 * 5, 0, 16, 32);
      }
    } else {
      cropImage(player, this.x, this.y, 16 * 4, 32 * 4, 0, 0, 16, 32);
    }
  }
  update() {
    let currentAnim = "";
    let totalKeysPressed = 0;
    let velX = 0,
      velY = 0;

    if (keys[controls[4]]) {
      //Talk key
      this.talking = true;
      keyPressed = -1;
    }
    if (this.talking) {
      if (keyPressed == 13) {
        this.#chatbar = "";
        this.talking = false;
      } else if (keyPressed != -1) {
        //console.log(this.#chatbar);

        this.#chatbar = this.#chatbar + String.fromCharCode(keyPressed);
      }
      fill("red");
      setFontSize(20);
      text(this.#chatbar, this.x, this.y);
    }
    if (
      (keys[controls[0]] ||
        keys[controls[1]] ||
        keys[controls[2]] ||
        keys[controls[3]]) &&
      this.talking == false
    ) {
      if (keys[controls[0]] == true) {
        //this.y -= this.#speed;
        velY = -this.#speed;
        totalKeysPressed++;
        currentAnim = "walkbackward";
      }
      if (keys[controls[1]] == true) {
        //this.x -= this.#speed;
        velX = -this.#speed;
        totalKeysPressed++;
        currentAnim = "walkforward";
      }
      if (keys[controls[2]] == true) {
        //this.y += this.#speed;
        velY = this.#speed;
        totalKeysPressed++;
        currentAnim = "walkforward";
      }
      if (keys[controls[3]] == true) {
        //this.x += this.#speed;
        velX = this.#speed;
        totalKeysPressed++;
        currentAnim = "walkforward";
      }
      if (totalKeysPressed > 1) {
        velX = Math.floor(velX / 1.5) + 1;
        velY = Math.floor(velY / 1.5) + 1;
      }
      this.x += velX;
      this.y += velY;
      this.render(currentAnim);
    } else {
      this.render("still");
    }
    //rect(mouseX, mouseY, 100, 100);
    //image("./Assets/Player.png", mouseX, mouseY, 64, 128);
    //cropImage("./Assets/Player.png", mouseX, mouseY, 64, 128, 16, 0, 32, 32);
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

//WASD
//87 65 83 68
var player = new Image();
player.src = "./Assets/Player.png";

var tiles = new Array(20);
for (var i = 0; i < tiles.length; i++) {
  tiles[i] = new Image();
}
tiles[0].src = "./Assets/Blocks/FloorTile.png";

let mapWidth = 200;
let mapHeight = 200;

var map = new Array(mapWidth);
for (var i = 0; i < map.length; i++) {
  map[i] = new Array(mapHeight);
}

//----------------------------------------Temp set map to wood

for (var i = 0; i < mapWidth; i++) {
  for (var j = 0; j < mapHeight; j++) {
    map[i][j] = 1;
  }
}
//-------------------------------------------
var lastRender = Date.now();

var myGamePiece;
var myObstacles = [];
var myScore;
let localPlayer;

let width = window.innerWidth;
let height = window.innerHeight;

let mousePressed = false;
let mouseX, mouseY;
//WASD T(talking)
let controls = [87, 65, 83, 68, 84];
let keyPressed = -1;
let keys = new Array(255);

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
    window.addEventListener("keydown", function (e) {
      keys[event.keyCode] = true;
      keyPressed = event.keyCode;
      //console.log(event.keyCode);
    });
    window.addEventListener("keyup", function (e) {
      keys[event.keyCode] = false;
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
function setFontSize(size) {
  myGameArea.context.font = size + "px Arial";
}
function text(text, x, y) {
  myGameArea.context.fillText(text, x, y);
}
function image(image, x, y, w, h) {
  //OUTDATED DONT USE
  var img = new Image();

  img.src = image;
  var upscaledCanvas = document.getElementById("canvas").getContext("2d");
  upscaledCanvas.mozImageSmoothingEnabled = false;
  upscaledCanvas.webkitImageSmoothingEnabled = false;
  upscaledCanvas.msImageSmoothingEnabled = false;
  upscaledCanvas.imageSmoothingEnabled = false;

  myGameArea.context.drawImage(img, x, y, w, h);
}

function renderImage(image, x, y, w, h) {
  var upscaledCanvas = document.getElementById("canvas").getContext("2d");
  upscaledCanvas.mozImageSmoothingEnabled = false;
  upscaledCanvas.webkitImageSmoothingEnabled = false;
  upscaledCanvas.msImageSmoothingEnabled = false;
  upscaledCanvas.imageSmoothingEnabled = false;

  myGameArea.context.drawImage(image, x, y, w, h);
}

function inArea(X, Y, x, y, w, h) {
  if (X > x - 1 && Y > y - 1 && X < x + w && Y < y + h) {
    return true;
  } else {
    return false;
  }
}

function cropImage(img, x, y, w, h, cropX, cropY, cropW, cropH) {
  //var img = new Image();

  //img.src = image;
  var upscaledCanvas = document.getElementById("canvas").getContext("2d");

  upscaledCanvas.mozImageSmoothingEnabled = false;
  upscaledCanvas.webkitImageSmoothingEnabled = false;
  upscaledCanvas.msImageSmoothingEnabled = false;
  upscaledCanvas.imageSmoothingEnabled = false;
  upscaledCanvas.drawImage(img, cropX, cropY, cropW, cropH, x, y, w, h);

  //upscaledCanvas.drawImage(img, -x, -y, w - x, h -, x, y, cropW, cropH);
}
function updateGameArea() {
  var delta = (Date.now() - lastRender) / 1000;
  lastRender = Date.now();
  myGameArea.clear();
  myGameArea.frameNo += 1;
  drawMap();
  localPlayer.update();
  fill("red");
  setFontSize(30);
  text(1 / delta + " FPS", 10, 30);

  if (everyinterval(150)) {
  }

  mousePressed = false;
  keyPressed = -1;
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

export default class {
  component;
}
