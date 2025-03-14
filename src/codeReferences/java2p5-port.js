// import p5 from "p5";

let wrap = true; // snakes wrap to other edge of screen
let keyQ = [];
let keyQ2 = [];
let direc = 0; // 0 = East, 1 = South, 2 = West, 3 = North
let direc2 = 2;
let len;
let len2;
let headY = 0;
let headX = 0;
let headY2 = 0;
let headX2 = 0;
let goalX;
let goalY;
let game;
let grid;
let c = 0;
let l = 0;
let s1 = 0;
let s2 = 0;
let s = true;
let bg = 75;

function setup() {
  c = 0;
  game = true;
  createCanvas(500, 500);
  background(bg);
  direc = 0;
  direc2 = 2;
  len = 11;
  len2 = -11;
  grid = new Grid(50);
  grid.init();
  headX = 0;
  headY = floor(grid.squares / 2);
  headX2 = grid.squares - 1;
  headY2 = headY + 0;
  s = true;
  keyQ = [];
  keyQ2 = [];
}

function draw() {
  textAlign(CENTER, CENTER);
  if (game) {
    if (c == 2) {
      checkKeyPressed();
      c = 0;
      if (direc == 0) grid.step(headX + 1, headY, 1);
      else if (direc == 1) grid.step(headX, headY + 1, 1);
      else if (direc == 2) grid.step(headX - 1, headY, 1);
      else if (direc == 3) grid.step(headX, headY - 1, 1);

      if (direc2 == 0) grid.step(headX2 + 1, headY2, 2);
      else if (direc2 == 1) grid.step(headX2, headY2 + 1, 2);
      else if (direc2 == 2) grid.step(headX2 - 1, headY2, 2);
      else if (direc2 == 3) grid.step(headX2, headY2 - 1, 2);

      background(bg);
      fill(0);
      rect(0, 0, width, height);
      grid.set(headX, headY, len);
      grid.set(headX2, headY2, len2);
      grid.subtract();
      grid.display();
      if (l == 3) {
        if (headY != headY2 && headX != headX2) l = 1;
        else if (abs(headX - headX2) > 1 || abs(headY - headY2) > 1) l = 1;
      }
    } else c++;
  } else {
    textSize(height / 20);
    if (s) {
      s = false;
      if (l == 1) s2 += 1;
      else if (l == 2) s1 += 1;
    }
    if (l == 1) {
      fill(150, 0, 0);
      text("RED WINS", width / 2, height / 2);
    } else if (l == 2) {
      fill(0, 0, 150);
      text("BLUE WINS", width / 2, height / 2);
    } else {
      fill(150);
      text("TIE", width / 2, height / 2);
    }
    fill(0, 0, 150);
    textAlign(LEFT, TOP);
    text(s1, 0, 0);
    fill(150, 0, 0);
    textAlign(RIGHT, TOP);
    text(s2, width, 0);
    textAlign(CENTER, CENTER);
  }
}

class Grid {
  constructor(sq) {
    this.squares = sq;
    this.SQ = width / sq;
    this.x = [];
  }

  init() {
    this.x = Array(this.squares)
      .fill(0)
      .map(() => Array(this.squares).fill(0));
    this.setGoal();
  }

  display() {
    fill(255);
    noStroke();
    rect(this.gx * this.SQ, this.gy * this.SQ, this.SQ, this.SQ);
    for (let i = 0; i < this.x.length; i++) {
      for (let j = 0; j < this.x[i].length; j++) {
        fill(0, 0, 255);
        noStroke();
        if (this.x[i][j] > 0) {
          rect(i * this.SQ, j * this.SQ, this.SQ, this.SQ);
        }
        fill(255, 0, 0);
        noStroke();
        if (this.x[i][j] < 0) {
          rect(i * this.SQ, j * this.SQ, this.SQ, this.SQ);
        }
      }
    }
  }

  subtract() {
    for (let i = 0; i < this.x.length; i++) {
      for (let j = 0; j < this.x[i].length; j++) {
        if (this.x[i][j] > 0) this.x[i][j] -= 1;
        else if (this.x[i][j] < 0) this.x[i][j] += 1;
      }
    }
  }

  set(vx, vy, val) {
    this.x[vx][vy] = val;
  }

  setGoal() {
    this.gx = floor(random(this.squares - 1));
    this.gy = floor(random(this.squares - 1));
    while (this.x[this.gx][this.gy] != 0) {
      this.gx = floor(random(this.squares));
      this.gy = floor(random(this.squares));
    }
  }

  step(sx, sy, h) {
    if (!(sx > this.squares - 1 || sx < 0 || sy > this.squares - 1 || sy < 0)) {
      if (sx == this.gx && sy == this.gy) {
        if (h == 1) len += 5;
        else if (h == 2) len2 -= 5;
        this.setGoal();
        if (h == 1) {
          headX = sx;
          headY = sy;
        } else if (h == 2) {
          headX2 = sx;
          headY2 = sy;
        }
      } else if (this.x[sx][sy] != 0) {
        l = h;
        if ((sx == headX && sy == headY) || (sx == headX2 && sy == headY2))
          l = 3;
        game = false;
      } else {
        if (h == 1) {
          headX = sx;
          headY = sy;
        } else if (h == 2) {
          headX2 = sx;
          headY2 = sy;
        }
      }
    } else {
      if (wrap) {
        if (sx < 0) this.step(this.squares - 1, sy, h);
        else if (sy < 0) this.step(sx, this.squares - 1, h);
        else if (sx >= this.squares) this.step(0, sy, h);
        else if (sy >= this.squares) this.step(sx, 0, h);
      } else {
        l = h;
        game = false;
      }
    }
  }
}

function checkKeyPressed() {
  if (keyQ.length > 0) {
    if (keyQ[0] === "w" && direc != 1) direc = 3;
    else if (keyQ[0] === "d" && direc != 2) direc = 0;
    else if (keyQ[0] === "s" && direc != 3) direc = 1;
    else if (keyQ[0] === "a" && direc != 0) direc = 2;
    keyQ.shift();
  }
  if (keyQ2.length > 0) {
    if (keyQ2[0] === "ArrowUp" && direc2 != 1) direc2 = 3;
    else if (keyQ2[0] === "ArrowRight" && direc2 != 2) direc2 = 0;
    else if (keyQ2[0] === "ArrowDown" && direc2 != 3) direc2 = 1;
    else if (keyQ2[0] === "ArrowLeft" && direc2 != 0) direc2 = 2;
    keyQ2.shift();
  }
}

function keyPressed() {
  if (key === "w" || key === "a" || key === "s" || key === "d") keyQ.push(key);
  if (
    keyCode === UP_ARROW ||
    keyCode === DOWN_ARROW ||
    keyCode === LEFT_ARROW ||
    keyCode === RIGHT_ARROW
  )
    keyQ2.push(key);
}
