//import Player from "./player.js";
let mapOffsetX = 0;
let mapOffsetY = 0;
function drawMap() {
  mapOffsetX = -localPlayer.x;
  mapOffsetY = -localPlayer.y;
  for (var i = 0; i < mapWidth; i++) {
    for (var j = 0; j < mapHeight; j++) {
      if (
        inArea(
          (i + 1) * 64 + mapOffsetX,
          (j + 1) * 64 + mapOffsetY,
          0,
          0,
          width + 64,
          height + 64
        )
      ) {
        if (
          inArea(
            mouseX,
            mouseY,
            i * 64 + mapOffsetX,
            j * 64 + mapOffsetY,
            64,
            64
          ) &&
          mousePressed
        ) {
          map[i][j] = localPlayer.placing;
        }

        if (map[i][j] == 1) {
          renderImage(
            tiles[0],
            i * 64 + mapOffsetX,
            j * 64 + mapOffsetY,
            64,
            64
          );
        } else if (map[i][j] == 2) {
          try {
            if (
              !(
                map[i + 1][j] == 2 &&
                map[i - 1][j] == 2 &&
                map[i][j + 1] == 2 &&
                map[i][j - 1] == 2
              )
            ) {
              renderImage(
                tiles[0],
                i * 64 + mapOffsetX,
                j * 64 + mapOffsetY,
                64,
                64
              );
            }

            if (
              map[i + 1][j] == 2 &&
              map[i - 1][j] == 2 &&
              map[i][j - 1] != 2
            ) {
              cropImage(
                tiles[1],
                i * 64 + mapOffsetX,
                j * 64 + mapOffsetY,
                64,
                64,
                1 * 16,
                0,
                16,
                16
              );
            } else if (
              map[i + 1][j] == 2 &&
              map[i - 1][j] == 2 &&
              map[i][j + 1] != 2
            ) {
              saveScreenSettings();
              rotate(i * 64 + 64 + mapOffsetX, j * 64 + 64 + mapOffsetY, 180);
              cropImage(tiles[1], 0, 0, 64, 64, 1 * 16, 0, 16, 16);
              restoreScreenSettings();
            } else if (
              map[i][j + 1] == 2 &&
              map[i][j - 1] == 2 &&
              map[i + 1][j] != 2
            ) {
              saveScreenSettings();
              rotate(i * 64 + mapOffsetX, j * 64 + mapOffsetY, 90);
              cropImage(tiles[1], 0, -64, 64, 64, 1 * 16, 0, 16, 16);
              restoreScreenSettings();
            } else if (
              map[i][j + 1] == 2 &&
              map[i][j - 1] == 2 &&
              map[i - 1][j] != 2
            ) {
              saveScreenSettings();
              rotate(i * 64 + mapOffsetX, j * 64 + mapOffsetY, 90 + 180);
              cropImage(tiles[1], -64, 0, 64, 64, 1 * 16, 0, 16, 16);
              restoreScreenSettings();
            } else if (
              map[i + 1][j] == 2 &&
              map[i][j + 1] == 2 &&
              map[i][j - 1] != 2
            ) {
              cropImage(
                tiles[1],
                i * 64 + mapOffsetX,
                j * 64 + mapOffsetY,
                64,
                64,
                2 * 16,
                0,
                16,
                16
              );
            } else if (
              map[i - 1][j] == 2 &&
              map[i][j - 1] != 2 &&
              map[i][j + 1] == 2
            ) {
              saveScreenSettings();
              rotate(i * 64 + mapOffsetX, j * 64 + mapOffsetY, 90);
              cropImage(tiles[1], 0, -64, 64, 64, 2 * 16, 0, 16, 16);
              restoreScreenSettings();
            } else if (
              map[i - 1][j] == 2 &&
              map[i][j - 1] == 2 &&
              map[i][j + 1] != 2 &&
              map[i + 1][j] != 2
            ) {
              saveScreenSettings();
              rotate(i * 64 + mapOffsetX, j * 64 + mapOffsetY, 180);
              cropImage(tiles[1], -64, -64, 64, 64, 2 * 16, 0, 16, 16);
              restoreScreenSettings();
            } else if (
              map[i + 1][j] == 2 &&
              map[i][j - 1] == 2 &&
              map[i][j + 1] != 2 &&
              map[i - 1][j] != 2
            ) {
              saveScreenSettings();
              rotate(i * 64 + mapOffsetX, j * 64 + mapOffsetY, 270);
              cropImage(tiles[1], -64, 0, 64, 64, 2 * 16, 0, 16, 16);
              restoreScreenSettings();
            } else {
              cropImage(
                tiles[1],
                i * 64 + mapOffsetX,
                j * 64 + mapOffsetY,
                64,
                64,
                0 * 16,
                0,
                16,
                16
              );
            }
          } catch (error) {
            cropImage(
              tiles[1],
              i * 64 + mapOffsetX,
              j * 64 + mapOffsetY,
              64,
              64,
              0 * 16,
              0,
              16,
              16
            );
          }

          /*
                        saveScreenSettings();
              rotate(i * 64, j * 64, mouseX);
              cropImage(tiles[1], 0, -64, 64, 64, 2 * 16, 0, 16, 16);
              restoreScreenSettings();
          */
          //renderImage(tiles[1], i * 64, j * 64, 64, 64);
          //cropImage(tiles[1], i * 64, j * 64, 64, 64, 0 * 16, 0, 16, 16);
        } else if (map[i][j] == 3) {
          try {
            if (map[i][j - 1] == 3) {
              cropImage(
                tiles[2],
                i * 64 + mapOffsetX,
                j * 64 + mapOffsetY,
                64,
                64,
                0 * 16,
                0,
                16,
                16
              );
            } else {
              cropImage(
                tiles[2],
                i * 64 + mapOffsetX,
                j * 64 + mapOffsetY,
                64,
                64,
                1 * 16,
                0,
                16,
                16
              );
            }
          } catch (error) {}
        }
      }
    }
  }
}

class Player {
  //using # makes it private
  x = 0;
  y = 0;
  placing = 3;
  #speed = 10;
  talking = false;
  #chatbar = "";

  Player(x, y) {
    this.x = x;
    this.y = y;
  }
  render(anim) {
    /*
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
    }*/
    if (anim == "walkforward") {
      if (myGameArea.frameNo % 40 > 20) {
        cropImage(
          player,
          width / 2 - 16 * 2,
          height / 2 - 32 * 2,
          16 * 4,
          32 * 4,
          16 * 2,
          0,
          16,
          32
        );
      } else {
        cropImage(
          player,
          width / 2 - 16 * 2,
          height / 2 - 32 * 2,
          16 * 4,
          32 * 4,
          16 * 3,
          0,
          16,
          32
        );
      }
    } else if (anim == "walkbackward") {
      if (myGameArea.frameNo % 40 > 20) {
        cropImage(
          player,
          width / 2 - 16 * 2,
          height / 2 - 32 * 2,
          16 * 4,
          32 * 4,
          16 * 4,
          0,
          16,
          32
        );
      } else {
        cropImage(
          player,
          width / 2 - 16 * 2,
          height / 2 - 32 * 2,
          16 * 4,
          32 * 4,
          16 * 5,
          0,
          16,
          32
        );
      }
    } else {
      cropImage(
        player,
        width / 2 - 16 * 2,
        height / 2 - 32 * 2,
        16 * 4,
        32 * 4,
        0,
        0,
        16,
        32
      );
    }
  }
  update() {
    let currentAnim = "";
    let totalKeysPressed = 0;
    let velX = 0,
      velY = 0;

    /*if (keys[40]) {
      //DOWN
      this.placing--;
    } else if (keys[38]) {
      //UP
      this.placing++;
    }*/

    if (keys[controls[4]] && this.talking == false) {
      //Talk key
      this.talking = true;
      keyPressed = -1;
    }
    if (this.talking) {
      if (keyPressed == 13) {
        this.#chatbar = "";
        this.talking = false;
      } else if (keyPressed == 8) {
        this.#chatbar = this.#chatbar.substring(0, this.#chatbar.length - 1);
      } else if (keyPressed != -1 && keyPressed != 16) {
        //console.log(this.#chatbar);
        this.#chatbar = this.#chatbar + String.fromCharCode(keyPressed);
      }
      fill("white");
      setFontSize(15);
      text(
        this.#chatbar,
        width / 2 - this.#chatbar.length * 5,
        height / 2 - 60
      );
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
tiles[1].src = "./Assets/Blocks/Carpet.png";
tiles[2].src = "./Assets/Blocks/StoneBrickWall.png";

let mapWidth = 500;
let mapHeight = 500;

var map = new Array(mapWidth);
for (var i = 0; i < mapWidth; i++) {
  map[i] = new Array(mapHeight);
}

//----------------------------------------Temp set map to wood

for (var i = 0; i < mapWidth; i++) {
  for (var j = 0; j < mapHeight; j++) {
    map[i][j] = 1;
    //map[i][j] = Math.round(Math.random(2)) + 1;
  }
}
//-------------------------------------------
var lastRender = Date.now();
let fps;

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
      if (event.keyCode == 40) {
        //DOWN
        localPlayer.placing--;
      } else if (event.keyCode == 38) {
        //UP
        localPlayer.placing++;
      }
    });
    this.interval = setInterval(updateGameArea, Math.round(1000 / 60));
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

startGame();
var loadfileData;

function loadWorld() {
  (async () => {
    loadfileData = await readTextFile(
      "https://kevinwh0.github.io/SocialWeb/Online%20Chat%20Game/Maps/Home.txt"
    );

    var spl = loadfileData.split("\n");
    var dimentions = spl[0].split(" ");
    var blocks = spl[1].split(" ");

    mapWidth = parseInt(dimentions[0]);
    mapHeight = parseInt(dimentions[1]);
    console.log(spl);
    var i1 = 0;
    for (var i = 0; i < mapWidth; i++) {
      for (var j = 0; j < mapHeight; j++) {
        i1++;

        map[i][j] = parseInt(blocks[i1]);
        //map[i][j] = Math.round(Math.random(2)) + 1;
      }
    }
  })();
}
function startGame() {
  //readTextFile("https://kevinwh0.github.io/SocialWeb/Online%20Chat%20Game/Maps/Home.txt")
  loadWorld();
  localPlayer = new Player(0, 0);

  myGamePiece = new component(30, 30, "red", 10, 120);
  //myScore = new component("30px", "Consolas", "black", 280, 40, "text");
  //if (myGameArea != undefined) {
  myGameArea.start();

  window.addEventListener("keydown", function (e) {
    myGameArea.keys = myGameArea.keys || [];
    myGameArea.keys[e.keyCode] = true;
    //console.log(e.keyCode);
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

function rotate(x, y, deg) {
  var upscaledCanvas = document.getElementById("canvas").getContext("2d");
  upscaledCanvas.translate(x, y);
  upscaledCanvas.rotate((deg * Math.PI) / 180);
}
function saveScreenSettings() {
  var upscaledCanvas = document.getElementById("canvas").getContext("2d");
  upscaledCanvas.save();
}
function restoreScreenSettings() {
  var upscaledCanvas = document.getElementById("canvas").getContext("2d");
  upscaledCanvas.restore();
}
async function readTextFile(url) {
  /*
  NOTE:
  to use this you need to do somthing like this:
    (async () => {
    console.log(
      await readTextFile(
        "https://kevinwh0.github.io/SocialWeb/Online%20Chat%20Game/Maps/Home.txt"
      )
    );
  })();
  */
  const response = await fetch(url);
  return response.text();
}
// Function to download data to a file
function download(data, filename, type) {
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

function DownloadWorld() {
  if (keys[220]) {
    var downloadData = mapWidth + " " + mapHeight + "\n";

    for (var i = 0; i < mapWidth; i++) {
      for (var j = 0; j < mapHeight; j++) {
        downloadData = downloadData + " " + map[i][j];
        //map[i][j] = Math.round(Math.random(2)) + 1;
      }
    }

    download(downloadData, "tst.txt", "test");
  }
}

function updateGameArea() {
  var delta = (Date.now() - lastRender) / 1000;
  lastRender = Date.now();
  myGameArea.clear();
  myGameArea.frameNo += 1;
  drawMap();
  DownloadWorld();
  localPlayer.update();

  fps = Math.round(1 / delta);
  fill("white");
  if (fps < 15) fill("red");
  setFontSize(30);
  text(fps + " FPS" + " Placing: " + localPlayer.placing, 10, 30);

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
