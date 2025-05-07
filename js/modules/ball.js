// Ball-related functionality

// Array to store all active balls
let balls = [];

// Ball object factory function
function createBall(x, y, dx, dy, launched = false) {
  return {
    x: x,
    y: y,
    size: BALL_SIZE,
    dx: dx,
    dy: dy,
    speed: BALL_SPEED,
    launched: launched,
    enlarged: false
  };
}

// Reset all balls to a single ball on the paddle
function resetBalls() {
  balls = []; // Clear all balls

  // Create a single ball on the paddle
  balls.push(createBall(
    paddle.x + paddle.width / 2 - BALL_SIZE / 2,
    paddle.y - BALL_SIZE,
    0, 0, false
  ));
}

// Create two new balls spawning from an existing ball (multiply powerup)
function spawnBalls(originBall) {
  // Calculate different angles for the new balls
  const angle1 = Math.PI / 4;   // 45 degrees
  const angle2 = -Math.PI / 4;  // -45 degrees

  // Create two new balls with different directions, but maintain original speed
  const newBallSpeed = Math.sqrt(originBall.dx * originBall.dx + originBall.dy * originBall.dy);

  // First new ball
  balls.push(createBall(
    originBall.x,
    originBall.y,
    newBallSpeed * Math.cos(angle1),
    newBallSpeed * Math.sin(angle1),
    true
  ));

  // Second new ball
  balls.push(createBall(
    originBall.x,
    originBall.y,
    newBallSpeed * Math.cos(angle2),
    newBallSpeed * Math.sin(angle2),
    true
  ));
}

// Enlarge a specific ball (enlarge powerup)
function enlargeBall(ball) {
  // Increase the ball size up to the maximum allowed size
  const newSize = Math.min(ball.size * ENLARGE_POWERUP_FACTOR, MAX_BALL_SIZE);

  // Only enlarge if we haven't reached the maximum size
  if (newSize > ball.size) {
    ball.size = newSize;
    ball.enlarged = true;

    // After ENLARGE_POWERUP_DURATION milliseconds, reduce the ball size
    setTimeout(() => {
      if (balls.includes(ball)) { // Make sure the ball still exists
        // Shrink back by the same factor, but don't go below the original size
        ball.size = Math.max(ball.size / ENLARGE_POWERUP_FACTOR, BALL_SIZE);

        // Only set enlarged to false if we're back to the original size
        if (ball.size <= BALL_SIZE) {
          ball.enlarged = false;
        }
      }
    }, ENLARGE_POWERUP_DURATION);
  }
}

// Update all balls' positions and handle basic wall collisions
function updateBalls(canvasWidth, canvasHeight) {
  // Count how many balls have fallen below the screen
  let ballsLost = 0;

  // Update each ball
  for (let i = balls.length - 1; i >= 0; i--) {
    const ball = balls[i];

    if (ball.launched) {
      // Update position
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall collisions
      if (ball.x <= 0) {
        ball.x = 0; // Prevent getting stuck in left wall
        ball.dx = -ball.dx;
      } else if (ball.x >= canvasWidth - ball.size) {
        ball.x = canvasWidth - ball.size; // Prevent getting stuck in right wall
        ball.dx = -ball.dx;
      }

      // Ceiling collision
      if (ball.y <= 0) {
        ball.y = 0; // Prevent getting stuck in ceiling
        ball.dy = -ball.dy;
      }

      // Ball fell below screen
      if (ball.y > canvasHeight) {
        balls.splice(i, 1); // Remove this ball
        ballsLost++;
        
        // Increment the balls lost counter in stats
        increaseBallsLost();
      }
    } else {
      // Ball follows paddle until launched
      ball.x = paddle.x + paddle.width / 2 - ball.size / 2;
    }
  }

  // If all balls are lost, game over
  if (balls.length === 0) {
    handleGameStateChange(GameStates.GAME_OVER);
  }
}

// Launch the initial ball from the paddle
function launchInitialBall() {
  if (balls.length > 0 && !balls[0].launched) {
    balls[0].launched = true;
    balls[0].dx = balls[0].speed * (Math.random() * 0.5 - 0.25); // Random slight angle
    balls[0].dy = -balls[0].speed; // Always launch upward
  }
}

// Draw all balls
function drawBalls() {
  fill(255);
  for (const ball of balls) {
    ellipse(ball.x + ball.size / 2, ball.y + ball.size / 2, ball.size, ball.size);
  }
}