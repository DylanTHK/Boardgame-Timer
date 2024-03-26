
document.addEventListener("DOMContentLoaded", function () {
    // Initialize variables
    let currentPlayer = 1; // Player 1 starts
    let numPlayers = 2; // Default number of players
    let timeLeft = 10; // Default time limit for each turn (in seconds)
    let timerInterval;
    let gamePaused = false;
    let playerNames = []; // Array to store player names

    // Function to start the timer for the current player's turn
    function startTimer() {
        clearInterval(timerInterval); // Clear any existing interval
        timerInterval = setInterval(() => {
            if (!gamePaused) {
                // Display the remaining time
                document.getElementById('timer').textContent = `Player ${playerNames[currentPlayer - 1]}'s Turn: ${timeLeft} seconds left`;

                // Decrease time left
                timeLeft--;

                // If time is up, switch to the next player's turn
                if (timeLeft < 0) {
                    switchPlayer();
                }
            }
        }, 1000); // Update the timer every second
    }

    // Function to switch to the next player's turn
    function switchPlayer() {
        // Reset time left
        timeLeft = parseInt(document.getElementById('timeLimit').value);

        // Switch to the next player
        currentPlayer = (currentPlayer % numPlayers) + 1;
        console.log("%%%%%%%% Current Player: " + currentPlayer);

        // Start the timer for the next player
        startTimer();

        // Update player visualization
        updatePlayerVisual();
    }

    // Function to update player visualization
    function updatePlayerVisual() {
        document.getElementById('players').textContent = `Current Player: ${playerNames[currentPlayer - 1]}`;
    }

    // Function to get player names
    function getPlayerNames() {
        playerNames = []; // Reset player names array
        for (let i = 0; i < numPlayers; i++) {
            let playerName = prompt(`Enter name for Player ${i + 1}:`);
            if (playerName) {
                playerNames.push(playerName);
            } else {
                playerNames.push(`Player ${i + 1}`);
            }
        }
    }

    // Event listener for the start button
    document.getElementById('startBtn').addEventListener('click', () => {
        numPlayers = parseInt(document.getElementById('numPlayers').value); // Get number of players from input
        currentPlayer = 1; // Reset to player 1
        getPlayerNames(); // Get player names
        timeLeft = parseInt(document.getElementById('timeLimit').value); // Get time limit from input
        startTimer();
        updatePlayerVisual();
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('endBtn').disabled = false;
        document.getElementById('nextPlayerBtn').disabled = false; // Enable next player button
    });

    // Event listener for the next player button
    document.getElementById('nextPlayerBtn').addEventListener('click', () => {
        switchPlayer();
    });

    // Event listener for the pause button
    document.getElementById('pauseBtn').addEventListener('click', () => {
        gamePaused = !gamePaused;
        document.getElementById('pauseBtn').textContent = gamePaused ? 'Resume Game' : 'Pause Game';
    });

    // Event listener for the end game button
    document.getElementById('endBtn').addEventListener('click', () => {
        clearInterval(timerInterval);
        document.getElementById('timer').textContent = 'Game ended.';
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('nextPlayerBtn').disabled = true;
        document.getElementById('endBtn').disabled = true;
    });
});
