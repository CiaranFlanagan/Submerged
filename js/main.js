let canvas, c, fishies, w, h, dt, sub, lives, lastUpdate, generation;

//initialize the canvas and context
canvas = document.createElement("canvas");
document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.style.backgroundColor = "#1e3c72"; // dark blue background , for rest of screen

//intitial canvas dimensions -  need to ch nage to allow for better risizing
function resizeCanvas() {
  w = canvas.width = window.innerWidth * 0.25;
  h = canvas.height = window.innerHeight * 0.9;
  //inst; working as well as i would like
  if (window.devicePixelRatio > 1) {
    c.canvas.width = w * window.devicePixelRatio;
    c.canvas.height = h * window.devicePixelRatio;
    c.canvas.style.width = w + "px";
    c.canvas.style.height = h + "px";
    c.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
}

c = canvas.getContext("2d");
resizeCanvas();

// initialize the game
function init() {
  lives = 0;
  generation = 1;
  dt = 0;
  lastUpdate = Date.now();
  if (!document.body.contains(canvas)) {
    document.body.appendChild(canvas);
  }
  fishies = new Genetics(); //instance of Genetics
  fishies.createPopulation();
  sub = new SubmarinePilot(w / 4 / 2, h / 4 - 4); //positiion the sub
  update(); //start the game
}

//calculate the time elapsed since the last update
function deltaTime() {
  let now = Date.now();
  dt = now - lastUpdate;
  lastUpdate = now;
}

//find and store the best-performing fish of the generation
function getBestOfGeneration() {
  let index = 0,
    best = 0;
  for (let i = 0; i < fishies.population.length; i++) {
    if (fishies.population[i].fit > best) {
      best = fishies.population[i].fit;
      index = i;
    }
  }
  if (
    !fishies.bestOfGeneration ||
    fishies.population[index].fit > fishies.bestOfGeneration.fit
  ) {
    fishies.bestOfGeneration = fishies.population[index];
  }
}

//display the "Game Over" screen if the game is over
function gameOver() {
  c.fillStyle = "#ADD8E6"; //light blue for game background
  c.fillRect(0, 0, w, h);
  c.fillStyle = "black";
  c.font = "10px Arial";
  c.fillText("Generation: " + generation, 5, 10);
  c.fillText("fishies: " + lives, 5, 20);
  let txt = "Game Over!";
  c.font = "30px Arial";
  c.fillText(txt, (w - c.measureText(txt).width) / 2, h / 2);
}

//game loop
function update() {
  c.fillStyle = "#ADD8E6"; //light blue as the game background
  c.fillRect(0, 0, w, h);

  //display game stats
  c.fillStyle = "black";
  c.font = "10px Arial";
  c.fillText("Generation: " + generation, 5, 10);
  c.fillText("Fish: " + lives, 5, 20);

  //update and display all fishies
  for (let i = 0; i < fishies.population.length; i++) {
    fishies.population[i].show();
  }
  sub.show(); // Display the sub

  //check if all fishies are dead
  let allDead = true;
  for (let i = 0; i < fishies.population.length; i++) {
    if (fishies.population[i].isAlive) {
      allDead = false;
      break;
    }
  }

  //evolve the population after 7 generations
  if (allDead) {
    getBestOfGeneration();
    if (generation % 7) {
      fishies.evolve();
    } else {
      fishies.elitism();
    }
    generation++;
  }

  if (lives > 4) {
    gameOver();
    return;
  }

  deltaTime(); //update delta time
  requestAnimationFrame(update); //schedule the next frame
}

//handle key events for sub control
function addEvents() {
  document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 13: //enter key to restart
        init();
        break;
      case 32: //spacebar to shoot
        sub.shoot();
        break;
      case 37: //left arrow or 'A' key
      case 65:
        sub.isMovingLeft = true;
        break;
      case 39: //right arrow or 'D' key
      case 68:
        sub.isMovingRight = true;
        break;
    }
  });

  document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
      case 37: //left arrow or 'A' key
      case 65:
        sub.isMovingLeft = false;
        break;
      case 39: //right arrow or 'D' key
      case 68:
        sub.isMovingRight = false;
        break;
    }
  });

  window.addEventListener("focus", function () {
    lastUpdate = Date.now(); //reset update time on window focus
  });
}

//event listener for resizing
window.addEventListener("resize", resizeCanvas);

//set the game up
addEvents();
init();
