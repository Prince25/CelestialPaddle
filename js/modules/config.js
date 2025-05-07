// Game configuration constants

// Canvas/game dimensions
const GAME_WIDTH = 1000;
const GAME_HEIGHT = 1000;

// Paddle settings
const PADDLE_WIDTH = 150;
const PADDLE_HEIGHT = 15;
const PADDLE_SPEED = 10;
const PADDLE_GRADIENT_START = [41, 128, 185]; // Nice blue
const PADDLE_GRADIENT_END = [142, 68, 173];   // Purple accent
const PADDLE_GLOW_COLOR = [120, 220, 255];    // Much brighter blue for the glow

// Ball settings
const BALL_SIZE = 10;
const BALL_SPEED = 8;
const MAX_BALL_SIZE = 50;                     // Maximum size the ball can be enlarged to

// Block settings
const BLOCK_ROWS = 45;
const BLOCK_COLS = 78;
const BLOCK_WIDTH = 10;
const BLOCK_HEIGHT = 10;
const BLOCK_COLOR_START = [100, 150, 200];
const BLOCK_COLOR_ROW_MODIFIER = [3, -2, 0];  // How much to change color per row [r, g, b]
const BLOCK_COLOR_COL_MODIFIER = [0, 0, 1];   // How much to change color per column [r, g, b]
const BLOCK_PADDING = 2;

// Powerup Block settings
const MULTIPLY_POWERUP_BLOCK_COLOR = [255, 215, 0];   // Color for ball multiplier
const MULTIPLY_POWERUP_BLOCK_CHANCE = 0.01;           // Chance for a ball multiplier powerup block
const ENLARGE_POWERUP_BLOCK_COLOR = [100, 255, 0];    // Color for ball enlargement
const ENLARGE_POWERUP_BLOCK_CHANCE = 0.01;            // Chance for a ball enlargement powerup block
const ENLARGE_POWERUP_FACTOR = 1.25;                  // Ball enlargement factor in percentage
const ENLARGE_POWERUP_BALL_SIZE = BALL_SIZE * ENLARGE_POWERUP_FACTOR;
const ENLARGE_POWERUP_DURATION = 10000;               // Duration in milliseconds

// Stats settings
const SCORE_PER_BLOCK = 10; // Points awarded for each block destroyed
