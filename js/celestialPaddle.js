// --- Entry Point & p5.js Hooks ---
function preload() {
  loadAssets(); // modules/preload.js
}

function setup() {
  createCanvas(GAME_WIDTH, GAME_HEIGHT);
  frameRate(60);
  setupGame();
}

function draw() {
  update(); // modules/update.js
  render(); // modules/renderer.js
}

function keyPressed() {
  switch (keyCode) {
    case 32: // Space key
      handleSpaceKey();
      return false;
    case 82: // R key
      handleRKeyPress();
      return false;
    case 67: // C key
      handleCKeyPress();
      return false;
    default:
      return true;
  }
}

// --- Game Initialization ---
function setupGame() {
  initPaddle(GAME_WIDTH, GAME_HEIGHT);  // modules/paddle.js
  resetBalls();                         // modules/ball.js
  createBlocks();                       // modules/blocks.js
}

// --- Key Handlers ---
function handleSpaceKey() {
  if (currentState === GameStates.START || currentState === GameStates.GAME_OVER) {
    handleGameStateChange(GameStates.PLAYING);      // modules/gameState.js
    launchInitialBall();                            // modules/ball.js
  } else if (currentState === GameStates.PLAYING) {
    launchInitialBall();                            // modules/ball.js
  } else if (currentState === GameStates.VICTORY) {
    handleGameStateChange(GameStates.START);        // modules/gameState.js
  }
}

function handleRKeyPress() {
  if (currentState === GameStates.GAME_OVER) {
    createBlocks();   // modules/blocks.js
    resetBalls();     // modules/ball.js
  }
}

function handleCKeyPress() {
  if (currentState === GameStates.PLAYING) {
    blocks = [];
    triggerVictory();                           // modules/gameState.js
    handleGameStateChange(GameStates.VICTORY);  // modules/gameState.js
  }
}
