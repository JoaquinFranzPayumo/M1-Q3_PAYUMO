// Load assets
const background = new Image();
background.src = "assets/background.png";

const catcher = new Image();
catcher.src = "assets/catcher.png";

const cat = new Image();
cat.src = "assets/cat.png";

// Canvas setup
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.width = 800;
canvas.height = 500;

// Player (catcher)
let player = {
  x: 350,
  y: 400,
  width: 80,
  height: 80,
  speed: 6
};

// Cat (object to catch)
let enemy = {
  x: Math.random() * 700,
  y: Math.random() * 300,
  width: 60,
  height: 60
};

// Movement
let keys = {};

window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// Collision check
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Win condition
let gameWon = false;

function update() {
  if (gameWon) return;

  // Movement controls
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;

  // Collision detection
  if (isColliding(player, enemy)) {
    gameWon = true;

    console.log("You caught the cat! You win!");

    document.getElementById("winMessage").style.display = "block";

    // remove cat visually
    enemy.x = -1000;
    enemy.y = -1000;
  }
}

function draw() {
  // background
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // player
  ctx.drawImage(catcher, player.x, player.y, player.width, player.height);

  // cat
  ctx.drawImage(cat, enemy.x, enemy.y, enemy.width, enemy.height);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// start game once images load
window.onload = () => {
  gameLoop();
};