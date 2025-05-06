// Rendering functions for the game

// Main render function that decides what to draw based on game state
function render() {
  switch (currentState) {
    case GameStates.START:
      drawStartScreen();
      break;
    case GameStates.PLAYING:
      drawGameScreen();
      break;
    case GameStates.GAME_OVER:
      drawGameOverScreen();
      break;
    case GameStates.VICTORY:
      drawVictoryScreen();
      break;
  }
}

// Draw the start screen
function drawStartScreen() {
  background(0);

  // Move paddle automatically
  autoMovePaddle(width);  // modules/paddle.js

  // Make sure we have at least one ball for the start screen
  if (balls.length === 0) {
    resetBalls();
  }

  // Update ball position to follow paddle
  if (balls.length > 0) {
    balls[0].x = paddle.x + paddle.width / 2 - balls[0].size / 2;
    balls[0].y = paddle.y - balls[0].size;
  }

  // Draw game elements
  drawPaddle(); // modules/paddle.js
  drawBalls();  // modules/balls.js
  drawBlocks(); // modules/blocks.js

  // Draw instructions below the paddle
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text('Press SPACE to Start', width / 2, paddle.y + 100);
  textSize(18);
  text('Use LEFT/RIGHT arrows or A/D keys to move', width / 2, paddle.y + 140);
}

// Draw the main game screen
function drawGameScreen() {
  background(0);

  // Draw game elements
  drawPaddle(); // modules/paddle.js
  drawBalls();  // modules/balls.js
  drawBlocks(); // modules/blocks.js

  // Draw confetti if victory is active
  drawConfetti(); // modules/blocks.js
}

// Draw the game over screen
function drawGameOverScreen() {
  background(0);

  // Move paddle automatically
  autoMovePaddle(width);  // modules/paddle.js

  // Make sure we have at least one ball for the game over screen
  if (balls.length === 0) {
    resetBalls();
  }

  // Update ball position to follow paddle
  if (balls.length > 0) {
    balls[0].x = paddle.x + paddle.width / 2 - balls[0].size / 2;
    balls[0].y = paddle.y - balls[0].size;
  }

  // Draw game elements
  drawPaddle(); // modules/paddle.js
  drawBalls();  // modules/balls.js
  drawBlocks(); // modules/blocks.js

  // Draw game over text
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text('Game Over', width / 2, paddle.y + 100);
  textSize(24);
  text('Press SPACE to Launch', width / 2, paddle.y + 140);
  textSize(18);
  text('Press R to Reset Board', width / 2, paddle.y + 170);
}

// Draw the victory screen
function drawVictoryScreen() {
  background(0);

  // Move paddle automatically
  autoMovePaddle(width);  // modules/paddle.js

  // Make sure we have at least one ball for the victory screen
  if (balls.length === 0) {
    resetBalls();
  }

  // Update ball position to follow paddle
  if (balls.length > 0) {
    balls[0].x = paddle.x + paddle.width / 2 - balls[0].size / 2;
    balls[0].y = paddle.y - balls[0].size;
  }

  // Draw game elements
  drawPaddle(); // modules/paddle.js
  drawBalls();  // modules/balls.js
  drawBlocks(); // modules/blocks.js

  // Draw confetti
  drawConfetti(); // modules/blocks.js

  // Draw victory text
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text('Victory!', width / 2, paddle.y + 100);
  textSize(24);
  text('Press SPACE to Restart', width / 2, paddle.y + 140);
}
