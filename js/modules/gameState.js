// Game state management

// Game state constants
const GameStates = {
  START: 'start',
  PLAYING: 'playing',
  GAME_OVER: 'gameOver',
  VICTORY: 'victory'
};

// Current game state
let currentState = GameStates.START;

// Handle game state changes
function handleGameStateChange(newState) {
  // If we're leaving the VICTORY state, clear confetti
  if (currentState === GameStates.VICTORY && newState !== GameStates.VICTORY) {
    victoryActive = false;
    confetti = [];
  }

  currentState = newState;

  // Additional logic when changing states
  if (newState === GameStates.PLAYING) {
    // Reset balls to a single ball when starting game
    resetBalls();

    // Create blocks if none exist
    if (blocks.length === 0) {
      createBlocks();
    }
  } else if (newState === GameStates.VICTORY) {
    victoryActive = true;
    createConfetti();
  } else if (newState === GameStates.START) {
    if (blocks.length === 0) {
      createBlocks();
    }
  }
}