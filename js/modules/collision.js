// Collision detection logic

// Check for collisions between balls and paddle
function checkPaddleCollisions() {
  for (const ball of balls) {
    if (ball.y + ball.size >= paddle.y && 
        ball.y <= paddle.y + paddle.height &&
        ball.x + ball.size >= paddle.x && 
        ball.x <= paddle.x + paddle.width) {
      
      // Calculate where on the paddle the ball hit
      const hitPos = (ball.x + ball.size / 2 - paddle.x) / paddle.width;
      // Angle the ball based on where it hit (-1 to 1 range)
      const angle = (hitPos - 0.5) * 2;

      ball.dy = -Math.abs(ball.dy); // Always bounce up
      ball.dx = ball.speed * angle; // Adjust horizontal direction
      
      // Ensure the ball doesn't get stuck in the paddle
      if (ball.y + ball.size > paddle.y) {
        ball.y = paddle.y - ball.size;
      }
    }
  }
}

// Check for collisions between balls and blocks
function checkBlockCollisions() {
  const destroyedBlockIndices = new Set(); // Track indices of blocks to destroy
  
  for (const ball of balls) {
    // For larger balls, we need to check multiple blocks for collision
    const ballCenterX = ball.x + ball.size / 2;
    const ballCenterY = ball.y + ball.size / 2;
    const ballRadius = ball.size / 2;
    
    let hasCollided = false; // Track if the ball has collided with any block this frame
    
    // Check all blocks for collisions with this ball
    for (let i = blocks.length - 1; i >= 0; i--) {
      // Skip if this block is already marked for destruction
      if (destroyedBlockIndices.has(i)) continue;
      
      const block = blocks[i];
      
      // Calculate the closest point on the block to the ball's center
      const closestX = Math.max(block.x, Math.min(ballCenterX, block.x + block.width));
      const closestY = Math.max(block.y, Math.min(ballCenterY, block.y + block.height));
      
      // Calculate the distance between the closest point and the ball's center
      const distanceX = ballCenterX - closestX;
      const distanceY = ballCenterY - closestY;
      const distanceSquared = distanceX * distanceX + distanceY * distanceY;
      
      // Check if the distance is less than the ball's radius squared (collision)
      if (distanceSquared <= ballRadius * ballRadius) {
        // Mark this block for destruction
        destroyedBlockIndices.add(i);
        
        // Check if this is a multiply powerup block
        if (block.isMultiplyPowerup) {
          // Only spawn new balls from the ball that hit the powerup block
          spawnBalls(ball);
        }
        
        // Check if this is an enlarge powerup block
        if (block.isEnlargePowerup) {
          // Only enlarge the ball that hit the powerup block
          enlargeBall(ball);
        }
        
        // Only change ball direction on first collision
        if (!hasCollided) {
          hasCollided = true;
          
          // Determine if horizontal or vertical collision
          if (Math.abs(distanceX) > Math.abs(distanceY)) {
            // Horizontal collision
            ball.dx = -ball.dx;
          } else {
            // Vertical collision
            ball.dy = -ball.dy;
          }
        }
      }
    }
  }
  
  // Remove all blocks marked for destruction (starting from highest index)
  const sortedIndices = Array.from(destroyedBlockIndices).sort((a, b) => b - a);
  
  // Update score and remove blocks
  if (sortedIndices.length > 0) {
    // Increment score by points per block * number of blocks
    increaseScore(SCORE_PER_BLOCK * sortedIndices.length);
    
    // Remove blocks
    for (const index of sortedIndices) {
      removeBlock(index);
    }
  }
  
  // Check if all blocks are destroyed
  if (areAllBlocksDestroyed()) {
    // Player won!
    handleGameStateChange(GameStates.VICTORY);
  }
}