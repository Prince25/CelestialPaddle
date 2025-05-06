// Game update logic

// Update game state based on current state
function update() {
  // Update confetti animation if it's active
  if (victoryActive) {
    updateConfetti();
  }
  
  if (currentState === GameStates.PLAYING) {
    // Update paddle position based on input
    updatePaddlePosition(width);
    
    // Update all balls' positions
    updateBalls(width, height);
    
    // Check for collisions
    checkPaddleCollisions();
    checkBlockCollisions();
  }
}