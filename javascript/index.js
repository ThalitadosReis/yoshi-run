class Game {
  constructor() {
    this.player = null;
    this.obstacle = [];
    this.randomObstacle = 1000;
  }

  start() {
    this.player = new Yoshi();
    this.control();
    
    // create obstacle randomly
    setInterval(() => {
      const newObstacle = new Obstacle();
      this.obstacle.push(newObstacle);
    }, this.randomObstacle);

    setTimeout(() => {
      this.randomObstacle = Math.floor((Math.random() * 500) + 250)
    }, 3500);

    // update obstacle
    setInterval(() => {
      this.obstacle.forEach((obsInstance) => {
        obsInstance.slideLeft(); // move obstacle
        this.detectCollision(obsInstance); // detect collision
        this.removeObstacle(obsInstance); // remove obstacle
      });
    }, 15);
  }

  control() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        this.player.jump();
      }
    });
  }

  detectCollision(obsInstance) {
    if (
      obsInstance.obsPosition > 0 &&
      obsInstance.obsPosition < 50 &&
      this.player.x < 65
    ) {
      alert('u dead');
      // location.href = "gameover.html";
    }
  }

  removeObstacle(obsInstance) {
    if (obsInstance.obsPosition <= 0 - obsInstance.width) {
      obsInstance.domElement.remove();
      this.obstacle.shift();
    }
  }
}

class Yoshi {
  constructor() {
    this.width = 60;
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
    this.domElement.style.backgroundImage = "url('img/yoshi.jpg')";
    this.domElement.style.backgroundSize = "60px 60px";

    const gameElement = document.getElementById("container");
    gameElement.appendChild(this.domElement);
  }

  jump() {
    this.timerId = setInterval(() => {
      if (this.jumpTimer === 5) {
        clearInterval(this.timerId);
        this.downTimerId = setInterval(() => {
          if (this.jumpTimer === 1) {
            clearInterval(this.downTimerId);
            this.isJumping = false;
          }
          this.x -= 25;
          this.jumpTimer--;
          this.domElement.style.bottom = this.x + "px";
        }, 25);
      }
      this.jumpTimer++;
      this.x += 25;
      this.domElement.style.bottom = this.x + "px";
    }, 25);
  }
}

class Obstacle {
  constructor() {
    this.width = 34;
    this.height = 55;
    this.x = 25;
    this.r = 0;

    this.obsPosition = 676; // container size less obstacle width

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
    this.domElement.style.backgroundImage = "url('img/piranha.jpg')";
    this.domElement.style.backgroundSize = "33px 55px";

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
// });
