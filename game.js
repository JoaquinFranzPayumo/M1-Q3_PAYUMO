
// =========================
// 🎨 Load Assets
// =========================
const background = new Image();
background.src = "assets/background.png";

const catcher = new Image();
catcher.src = "assets/catcher.png";

const cat = new Image();
cat.src = "assets/cat.png";

// =========================
// 🖥️ Canvas Setup
// =========================
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.width = 800;
canvas.height = 500;

// =========================
// 🧑 Player (Catcher)
// =========================
let player = {
  x: 350,
  y: 400,
  width: 80,
  height: 80,
  speed: 6
};

// =========================
// 🐱 Cat (Target)
// =========================
let enemy = {
  x: Math.random() * 700,
  y: Math.random() * 300,
  width: 60,
  height: 60
};

// =========================
// ⌨️ Controls
// =========================
let keys = {};

window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// =========================
// ⚔️ Collision Detection
// =========================
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// =========================
// 🏆 Game State
// =========================
let gameWon = false;

// =========================
// 🎮 Update Logic
// =========================
function update() {
  if (gameWon) return;

  // Movement
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;

  // Keep player inside screen
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

  // Collision check
  if (isColliding(player, enemy)) {
    gameWon = true;

    console.log("🎉 You caught the cat! You win!");

    // Show win message
    const msg = document.getElementById("winMessage");
    if (msg) {
      msg.style.display = "block";
      msg.style.color = "gold";
    }

    // Hide cat
    enemy.x = -1000;
    enemy.y = -1000;
  }
}

// =========================
// 🎨 Draw Everything
// =========================
function draw() {
  // clear frame (IMPORTANT FIX)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // catcher
  ctx.drawImage(catcher, player.x, player.y, player.width, player.height);

  // cat
  ctx.drawImage(cat, enemy.x, enemy.y, enemy.width, enemy.height);
}

// =========================
// 🔁 Game Loop
// =========================
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// =========================
// 🚀 Start Game
// =========================
window.onload = () => {
  gameLoop();
};
