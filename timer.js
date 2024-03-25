// Initialize variables
let currentPlayer = 1; // Player 1 starts
let numPlayers = 2; // Default number of players
let timeLeft = 10; // Time limit for each turn (in seconds)
let timerInterval;

// Function to start the timer for the current player's turn
function startTimer() {
  clearInterval(timerInterval); // Clear any existing interval
  timerInterval = setInterval(() => {
    // Display the remaining time
    document.getElementById('timer').textContent = `Player ${currentPlayer}'s Turn: ${timeLeft} seconds left`;

    // Decrease time left
    timeLeft--;

    // If time is up, switch to the next player's turn
    if (timeLeft < 0) {
      switchPlayer();
    }
  }, 1000); // Update the timer every second
}

// Function to switch to the next player's turn
function switchPlayer() {
  // Reset time left
  timeLeft = 10;

  // Switch to the next player
  currentPlayer = (currentPlayer % numPlayers) + 1;

  // Stop the timer interval
  clearInterval(timerInterval);

  // Start the timer for the next player
  startTimer();

  // Update player visualization
  updatePlayerVisual();
}

// Function to update player visualization
function updatePlayerVisual() {
  document.getElementById('players').textContent = `Current Player: ${currentPlayer}`;
}

// Event listener for the start button
document.getElementById('startBtn').addEventListener('click', () => {
  numPlayers = parseInt(document.getElementById('numPlayers').value); // Get number of players from input
  currentPlayer = 1; // Reset to player 1
  startTimer();
  updatePlayerVisual();
});
