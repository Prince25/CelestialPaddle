// Blocks-related functionality

// Array to store all blocks
let blocks = [];

// Confetti particle system
let confetti = [];
let victoryActive = false;

// Create a grid of blocks
function createBlocks() {
  blocks = [];
  const startX = (width - (BLOCK_COLS * (BLOCK_WIDTH + BLOCK_PADDING))) / 2 + BLOCK_PADDING / 2;
  const startY = 50;

  for (let row = 0; row < BLOCK_ROWS; row++) {
    for (let col = 0; col < BLOCK_COLS; col++) {
      // Determine if this block will be a powerup block
      const isMultiplyBlock = Math.random() < MULTIPLY_POWERUP_BLOCK_CHANCE;
      const isEnlargeBlock = !isMultiplyBlock && Math.random() < ENLARGE_POWERUP_BLOCK_CHANCE;

      blocks.push({
        x: startX + col * (BLOCK_WIDTH + BLOCK_PADDING),
        y: startY + row * (BLOCK_HEIGHT + BLOCK_PADDING),
        width: BLOCK_WIDTH,
        height: BLOCK_HEIGHT,
        isMultiplyPowerup: isMultiplyBlock,
        isEnlargePowerup: isEnlargeBlock,
        color: isMultiplyBlock ?
          MULTIPLY_POWERUP_BLOCK_COLOR :
          (isEnlargeBlock ?
            ENLARGE_POWERUP_BLOCK_COLOR :
            [
              BLOCK_COLOR_START[0] + row * BLOCK_COLOR_ROW_MODIFIER[0] + col * BLOCK_COLOR_COL_MODIFIER[0],
              BLOCK_COLOR_START[1] + row * BLOCK_COLOR_ROW_MODIFIER[1] + col * BLOCK_COLOR_COL_MODIFIER[1],
              BLOCK_COLOR_START[2] + row * BLOCK_COLOR_ROW_MODIFIER[2] + col * BLOCK_COLOR_COL_MODIFIER[2]
            ]
          )
      });
    }
  }
}

// Remove a block at specific index
function removeBlock(index) {
  blocks.splice(index, 1);
}

// Draw all blocks
function drawBlocks() {
  for (const block of blocks) {
    fill(block.color);
    rect(block.x, block.y, block.width, block.height);
  }
}

// Check if all blocks are destroyed
function areAllBlocksDestroyed() {
  if (blocks.length === 0) {
    // Trigger win celebration
    triggerVictory();
    return true;
  }
  return false;
}

// Trigger victory celebration
function triggerVictory() {
  // Only trigger once
  if (!victoryActive) {
    victoryActive = true;
    createConfetti();
  }
}

// Create confetti particles
function createConfetti() {
  confetti = [];
  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: Math.random() * width,
      y: -20 - Math.random() * 100, // Start above the canvas
      size: 5 + Math.random() * 10,
      speed: 2 + Math.random() * 4,
      color: [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
      ],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2
    });
  }
}

// Update confetti animation
function updateConfetti() {
  if (!victoryActive) return;

  for (let i = confetti.length - 1; i >= 0; i--) {
    const particle = confetti[i];

    // Update position
    particle.y += particle.speed;
    particle.x += Math.sin(particle.y * 0.01) * 1; // Gentle sideways motion
    particle.rotation += particle.rotationSpeed;

    // Remove particles that have fallen off screen
    if (particle.y > height + 50) {
      confetti.splice(i, 1);
    }
  }

  // If all confetti is gone and we're still in victory mode, create more
  if (confetti.length === 0 && victoryActive) {
    createConfetti();
  }
}

// Draw confetti
function drawConfetti() {
  if (!victoryActive) return;

  noStroke();
  for (const particle of confetti) {
    push();
    fill(particle.color);
    translate(particle.x, particle.y);
    rotate(particle.rotation);
    rect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
    pop();
  }
}