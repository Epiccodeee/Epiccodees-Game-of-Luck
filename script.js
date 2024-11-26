'use strict';

/* ===== 🎮 Player and Score Elements ===== */
const player0El = document.querySelector('.player--0'); // Player 0 container
const player1El = document.querySelector('.player--1'); // Player 1 container
const score0El = document.querySelector('#score--0'); // Total score of Player 0
const score1El = document.getElementById('score--1'); // Total score of Player 1
const current0El = document.getElementById('current--0'); // Current score of Player 0
const current1El = document.getElementById('current--1'); // Current score of Player 1

/* ===== 🎲 Game Elements ===== */
const diceEl = document.querySelector('.dice'); // Dice image element
const btnNew = document.querySelector('.btn--new'); // "New Game" button
const btnRoll = document.querySelector('.btn--roll'); // "Roll Dice" button
const btnHold = document.querySelector('.btn--hold'); // "Hold Score" button

/* ===== 🌟 Game State Variables ===== */
let scores, currentScore, activePlayer, playing;

/* ===== 🛠 Initialize Game Function ===== */
const init = function () {
  // Reset scores and active player
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset UI
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden'); // Hide dice at start

  // Reset player styles
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

/* ===== 🔄 Switch Player Function ===== */
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // Reset current score display
  currentScore = 0; // Reset current score
  activePlayer = activePlayer === 0 ? 1 : 0; // Toggle active player
  player0El.classList.toggle('player--active'); // Toggle active class
  player1El.classList.toggle('player--active');
};

/* ===== 🎲 Roll Dice Functionality ===== */
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll (1-6)
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check for rolled 1
    if (dice !== 1) {
      // Add dice value to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the other player
      switchPlayer();
    }
  }
});

/* ===== ✋ Hold Score Functionality ===== */
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's total
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player has won
    if (scores[activePlayer] >= 100) {
      playing = false; // End the game
      diceEl.classList.add('hidden'); // Hide dice

      // Add winner styles
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the other player
      switchPlayer();
    }
  }
});

/* ===== 🔄 Reset Game Button ===== */
btnNew.addEventListener('click', init); // Restart game when "New Game" button is clicked
