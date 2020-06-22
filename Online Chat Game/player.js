//import mainScript from "./mainScript.js";

const KEY_W = 87;
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;

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

export default class {
  Player;
}
