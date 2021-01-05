// Game Value Variables
let min = 1, max = 10, winningNum = getRandomNum(min, max), guessesLeft = 3;

// UI Elements
const game = document.getElementById('game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.getElementById('guess-btn'),
  guessInput = document.getElementById('guess-input'),
  message = document.querySelector('.message');

// Assign min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Create Eventlistener
guessBtn.addEventListener('click', guessGame);

function guessGame(e) {
  let guess = parseInt(guessInput.value);

  // Validating the Input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Guess is equal to Winning Number
  if (guess === winningNum) {

    gameOver(true, `${winningNum} is correct! YOU WON!`);

  }
  else {
    // Wrong Number and reducing the Guesses
    guessesLeft -= 1;
    if (guessesLeft === 0) {

      gameOver(false, `GAME OVER! Correct Answer was ${winningNum}`);

    }

    else {
      guessInput.style.borderColor = 'red';

      // Clear the Input
      guessInput.value = '';

      // Wrong Number 
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
    }
  }
  e.preventDefault();
}

// Changing UI base on Winning or not
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  // Disabling the Input Field
  guessInput.disabled = true;
  // Setting the Border Color
  guessInput.style.borderColor = color;
  // Setting the Text Color
  message.style.color = color;
  // Message
  setMessage(msg);

  // Play Again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Random Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message to UI
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}