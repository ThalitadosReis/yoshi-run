class Game {
    constructor() {
      this.obstacle = null;
      this.player = null;
    }
  
    start() {
      this.player = new Yoshi();
      this.player.createDomElement();
      this.obstacle = new Obstacles();
      this.obstacle.createDomElement();
      this.obstacle.slideLeft();
  
      this.eventListeners();
    }
  
    eventListeners() {
      document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
          this.player.jump();
        }
      });
    }
  
    detectCollision() {
      if (
        this.player.positionX < obsInstance.positionX + obsInstance.width &&
        this.player.positionX + this.player.width + obsInstance.positionX &&
        this.player.positionY < this.obsInstance.positionY + obsInstance.height &&
        this.player.height + this.player.positionY > obsInstance.positionY
      ) {
        location.href = "gameover.hrml";
      }
    }
  
    removeObstacle() {
      setTimeout(() => {
        if (obsInstance.positionX < 0 - obsInstance.width) {
          this.obstacle.shift();
        }
      });
    }
  }
  
  class Yoshi {
    constructor() {
      this.width = 60;
      this.height = 60;
      this.y = 162;
      this.x = 0;
  
      // this.gravity = 0.9;
      // this.isJumping = false;
  
      this.domElement = null;
    }
  
    createDomElement() {
      this.domElement = document.createElement("div");
      this.domElement.id = "player";
      this.domElement.style.width = this.width + "px";
      this.domElement.style.height = this.height + "px";
      this.domElement.style.bottom = this.x + "px";
      this.domElement.style.top = this.y + "px";
      this.domElement.style.position = "absolute";
      this.domElement.style.backgroundImage = "url('../img/yoshi.jpg')";
      this.domElement.style.backgroundSize = "60px 60px";
  
      const gameElement = document.getElementById("container");
      gameElement.appendChild(this.domElement);
    }
  
    jump() {
  
      this.y -= 60;
      this.domElement.style.top = this.y + "px";
  
      console.log("passou");
    }
  }
  
  class Obstacles {
    constructor() {
      this.width = 34;
      this.height = 55;
      this.y = 166;
      this.r = 0;
  
      this.domElement = null;
    }
  
    createDomElement() {
      this.domElement = document.createElement("div");
      this.domElement.id = "obstacle";
      this.domElement.style.width = this.width + "px";
      this.domElement.style.height = this.height + "px";
      this.domElement.style.top = this.y + "px";
      this.domElement.style.right = this.r + "px";
      this.domElement.style.position = "absolute";
      this.domElement.style.backgroundImage = "url('../img/piranha.jpg')";
      this.domElement.style.backgroundSize = "33px 55px";
  
      const gameElement = document.getElementById("container");
      gameElement.appendChild(this.domElement);
    }
  
    slideLeft() {
      this.r += 60;
      this.domElement.style.right = this.r + "px";
    }
  }
  
  const game = new Game();
  game.start();
  