// Stats tracking functionality

// Stats variables
let score = 0;
let ballsLost = 0;
let scoreFlashTimer = 0;
let flashDuration = 30; // Frames for the flash animation (0.5 seconds at 60fps)

// Reset stats to initial values
function resetStats() {
  score = 0;
  ballsLost = 0;
  scoreFlashTimer = 0;
}

// Increment score and trigger animation
function increaseScore(points) {
  score += points;
  scoreFlashTimer = flashDuration; // Start animation
}

// Increment balls lost counter
function increaseBallsLost() {
  ballsLost++;
}

// Draw stats UI (score and balls lost)
function drawStats() {
  if (currentState === GameStates.START) {
    // Don't show stats on start screen
    return;
  }
  
  // Set up text style for retro feel
  textFont('monospace');
  textAlign(LEFT, CENTER);
  
  // Draw score with possible animation
  drawScore();
  
  // Draw balls lost counter (no animation)
  textSize(18);
  fill(200, 200, 200);
  text(`BALLS LOST: ${ballsLost}`, 20, height - 20);
  
  // Update animation timer if active
  if (scoreFlashTimer > 0) {
    scoreFlashTimer--;
  }
}

// Draw score with animation
function drawScore() {
  const baseSize = 24;
  let textColor = [200, 200, 200]; // Default gray
  let fontSize = baseSize;
  
  // Calculate animation effects if timer is active
  if (scoreFlashTimer > 0) {
    // Color animation: white to yellow
    const progress = scoreFlashTimer / flashDuration;
    textColor = [
      255, // Red: always max
      255 - (55 * progress), // Green: fade from white to yellow
      100 + (155 * progress) // Blue: fade from yellow to white
    ];
    
    // Size animation: larger to normal
    const sizeFactor = 1 + (0.5 * progress);
    fontSize = baseSize * sizeFactor;
  }
  
  // Apply calculated styles
  fill(textColor);
  textSize(fontSize);
  
  // Draw the score text
  text(`SCORE: ${score}`, 20, height - 50);
}
