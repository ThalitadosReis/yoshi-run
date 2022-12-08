class Game {
  constructor() {
    this.player = null;
    this.obstacle = [];

    this.timeElement = document.getElementById("time");
    this.scoreElement = document.querySelector("#score span");
    this.intervalId = null;
    this.currentTime = 0;
    this.score = 0;
  }

  start() {
    this.player = new Yoshi();
    this.createObstacles();
    this.control();

    // update obstacle
    setInterval(() => {
      this.obstacle.forEach((obsInstance) => {
        obsInstance.slideLeft(); // move obstacle
        this.detectCollision(obsInstance); // detect collision
        this.removeObstacle(obsInstance); // remove obstacle
      });
    }, 15);

    // time tracker
    setInterval(() => {
      this.currentTime++;

      const minutes = Math.floor(this.currentTime / 6000);
      const seconds = Math.floor((this.currentTime % 6000) / 100);
      const milliseconds = (Math.floor(this.currentTime) % 6000) % 100;

      this.timeElement.innerText = `${this.computeTwoDigitNumber(minutes)}:${this.computeTwoDigitNumber(seconds)}.${this.computeTwoDigitNumber(milliseconds)}`
    }, 10);
  }

  computeTwoDigitNumber(value) {
    let stringValue = value.toString();
    if (stringValue.length > 1) {
      return stringValue;
    } else {
      return `0${stringValue}`;
    }
  }

  createObstacles() {
    const randomTime = Math.random() * 2000;
    setTimeout(() => {
      const newObstacle = new Obstacle();
      this.obstacle.push(newObstacle);
      this.createObstacles();
    }, 500 + randomTime);
  }

  detectCollision(obsInstance) {
    if (
      obsInstance.obsPosition > 0 &&
      obsInstance.obsPosition < 50 &&
      this.player.x < 65
    ) {
      // location.href = "gameover.html";
    }
  }

  removeObstacle(obsInstance) {
    if (obsInstance.obsPosition <= 0 - obsInstance.width) {
      obsInstance.domElement.remove();
      this.obstacle.shift();

      // for every obstable cleared - score++;
      this.score++;
      this.scoreElement.innerText = this.score;
    }
  }

  control() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        this.player.jump();
      }
    });
  }
}

class Yoshi {
  constructor() {
    this.width = 64;
    this.height = 60;
    this.x = 25;
    this.l = 0;

    this.jumpTimer = 0;

    this.domElement = null;
    this.createDomElement();
  }

  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.id = "player";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.bottom = this.x + "px";
    this.domElement.style.left = this.l + "px";
    this.domElement.style.position = "absolute";
    this.domElement.style.backgroundImage = "url('/img/yoshi.png')";

    const gameElement = document.getElementById("container");
    gameElement.appendChild(this.domElement);
  }

  jump() {
    this.timerId = setInterval(() => {
      if (this.jumpTimer === 4) {
        clearInterval(this.timerId);
        this.downTimerId = setInterval(() => {
          if (this.jumpTimer === 1) {
            clearInterval(this.downTimerId);
            this.isJumping = false;
          }
          this.x -= 25;
          this.jumpTimer--;
          this.domElement.style.bottom = this.x + "px";
        }, 30);
      }
      this.jumpTimer++;
      this.x += 25;
      this.domElement.style.bottom = this.x + "px";
    }, 30);
  }
}

class Obstacle {
  constructor() {
    this.width = 30;
    this.height = 60;
    this.x = 25;
    this.r = 0;

    this.obsPosition = 670; // container size less obstacle width

    this.domElement = null;
    this.createDomElement();
  }

  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.bottom = this.x + "px";
    this.domElement.style.right = this.r + "px";
    this.domElement.style.position = "absolute";
    this.domElement.style.backgroundImage = "url('/img/piranha.png')";

    const gameElement = document.getElementById("container");
    gameElement.appendChild(this.domElement);
  }

  slideLeft() {
    this.obsPosition -= 5;
    this.domElement.style.left = this.obsPosition + "px";
  }
}

const game = new Game();
game.start();

// document.addEventListener("keydown", (e) => {
//   if(e.code === "Enter"){
//     game.start();
//   }
// }, {once: true});
