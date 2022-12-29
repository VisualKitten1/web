// Set up canvas and get context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set up constants for game
const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 50;
const SPIKES_WIDTH = 50;
const SPIKES_HEIGHT = 50;

// Set up variables for game
let blockX = canvas.width - BLOCK_WIDTH;
let blockY = canvas.height / 2 - BLOCK_HEIGHT / 2;
let spikes = [];
let lives = 3;

// Set up keyboard controls
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Set up game loop
setInterval(() => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw block
  ctx.beginPath();
  ctx.rect(blockX, blockY, BLOCK_WIDTH, BLOCK_HEIGHT);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();

  // Move block based on keyboard input
  if (rightPressed && blockX < canvas.width - BLOCK_WIDTH) {
    blockX += 5;
  }
  if (leftPressed && blockX > 0) {
    blockX -= 5;
  }
  if (upPressed && blockY > 0) {
    blockY -= 5;
  }
  if (downPressed && blockY < canvas.height - BLOCK_HEIGHT) {
    blockY += 5;
  }

  // Update spikes
  for (let i = 0; i < spikes.length; i++) {
    // Move spike
    spikes[i].x += 5;

    // Check if spike has reached the right side
    if (spikes[i].x + SPIKES_WIDTH > canvas.width) {
      // Check if spike was absorbed by block
      if (blockX < spikes[i].x && blockX + BLOCK_WIDTH > spikes[i].x + SPIKES_WIDTH && blockY < spikes[i].y && blockY + BLOCK_HEIGHT > spikes[i].y + SPIKES_HEIGHT) {
        // Remove spike from array
        spikes.splice(i, 1);
      } else {
        // Reduce life and remove spike from array
        lives--;
        spikes.splice(i, 1);
      }
    }
  }

  // Draw spikes
  for (const spike of spikes) {
    ctx.beginPath();
    ctx.rect(spike.x, spike.y, SPIKES_WIDTH, SPIKES_HEIGHT);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }

  // Check if player has lost all lives
if (lives === 0) {
  alert('Game Over');
  document.location.reload();
}

  // Spawn new spike at random y position
  if (Math.random() < 0.01) {
    spikes.push({
      x: 0,
      y: Math.random() * (canvas.height - SPIKES_HEIGHT)
    });
  }
}, 10);

// Keyboard event handlers
function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPressed = true;
  }
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPressed = false;
  }
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    downPressed = false;
  }
}
