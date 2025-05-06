// Paddle-related functionality

// Paddle object
let paddle = {
  x: 0,
  y: 0,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  speed: PADDLE_SPEED,
  glowIntensity: 1,     // Current intensity of the glow (0 to 1)
  glowDirection: 0.005, // How fast the glow changes (0.005 = 0.5% per frame for slow animation)
  glowMax: 1.0,         // Maximum glow intensity
  glowMin: 0            // Minimum glow intensity (never completely fades out)
};

// Direction for auto-moving paddle: 1 right, -1 left
let paddleDirection = 1;

// Initialize the paddle
function initPaddle(canvasWidth, canvasHeight) {
  paddle.x = canvasWidth / 2 - paddle.width / 2;
  paddle.y = canvasHeight * 0.8;
}

// Auto-move the paddle (used in start and game over screens)
function autoMovePaddle(canvasWidth) {
  paddle.x += paddle.speed * paddleDirection * 0.5;

  // Change direction when reaching edges
  if (paddle.x <= 0) {
    paddleDirection = 1; // Change to right
    paddle.x = 0;
  } else if (paddle.x + paddle.width >= canvasWidth) {
    paddleDirection = -1; // Change to left
    paddle.x = canvasWidth - paddle.width;
  }
}

// Draw the paddle with animated gradient glow
function drawPaddle() {
  noStroke();

  // Update the glow animation
  updateGlowAnimation();

  // Draw the paddle with a three-part gradient that pulses from center
  for (let i = 0; i < paddle.width; i++) {
    const position = i / paddle.width; // Position along paddle (0 to 1)

    // Calculate distance from center (0 at center, 1 at edges)
    const distFromCenter = Math.abs(position - 0.5) * 2;

    // Intensity decreases from center to edges, and also pulses over time
    const glowFactor = paddle.glowIntensity * (1 - distFromCenter);

    // Determine which half of the paddle we're in
    if (position < 0.5) {
      // Left half: blend from start color to glow color
      const ratio = position * 2; // Rescale to 0-1 for left half

      // Base gradient colors
      let r = PADDLE_GRADIENT_START[0] * (1 - ratio) + PADDLE_GLOW_COLOR[0] * ratio;
      let g = PADDLE_GRADIENT_START[1] * (1 - ratio) + PADDLE_GLOW_COLOR[1] * ratio;
      let b = PADDLE_GRADIENT_START[2] * (1 - ratio) + PADDLE_GLOW_COLOR[2] * ratio;

      // Enhance colors based on glow factor
      r = r + (255 - r) * glowFactor * 0.3;
      g = g + (255 - g) * glowFactor * 0.3;
      b = b + (255 - b) * glowFactor * 0.3;

      fill(r, g, b);
    } else {
      // Right half: blend from glow color to end color
      const ratio = (position - 0.5) * 2; // Rescale to 0-1 for right half

      // Base gradient colors
      let r = PADDLE_GLOW_COLOR[0] * (1 - ratio) + PADDLE_GRADIENT_END[0] * ratio;
      let g = PADDLE_GLOW_COLOR[1] * (1 - ratio) + PADDLE_GRADIENT_END[1] * ratio;
      let b = PADDLE_GLOW_COLOR[2] * (1 - ratio) + PADDLE_GRADIENT_END[2] * ratio;

      // Enhance colors based on glow factor
      r = r + (255 - r) * glowFactor * 0.3;
      g = g + (255 - g) * glowFactor * 0.3;
      b = b + (255 - b) * glowFactor * 0.3;

      fill(r, g, b);
    }

    rect(paddle.x + i, paddle.y, 1, paddle.height);
  }

  // Add a subtle highlight on top, intensity varies with glow
  fill(255, 255, 255, 60 + (paddle.glowIntensity * 40)); // Semi-transparent white
  rect(paddle.x, paddle.y, paddle.width, 2);
}

// Update the glow animation
function updateGlowAnimation() {
  // Update glow intensity
  paddle.glowIntensity += paddle.glowDirection;

  // Reverse direction at min/max values for a pulsing effect
  if (paddle.glowIntensity >= paddle.glowMax) {
    paddle.glowIntensity = paddle.glowMax;
    paddle.glowDirection = -paddle.glowDirection;
  } else if (paddle.glowIntensity <= paddle.glowMin) {
    paddle.glowIntensity = paddle.glowMin;
    paddle.glowDirection = -paddle.glowDirection;
  }
}

// Handle paddle movement based on keyboard input
function updatePaddlePosition(canvasWidth) {
  // Left movement (Left arrow or A key)
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    paddle.x -= paddle.speed;
    // Prevent moving offscreen
    if (paddle.x < 0) {
      paddle.x = 0;
    }
  }

  // Right movement (Right arrow or D key)
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    paddle.x += paddle.speed;
    // Prevent moving offscreen
    if (paddle.x + paddle.width > canvasWidth) {
      paddle.x = canvasWidth - paddle.width;
    }
  }
}