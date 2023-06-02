import { fetchRandomWord as nerdleWord, getGuess, interpretGuess } from "./module.js";
import { populateWordHash } from "./runWordleGame.js";
let guess;
let IsNewGuess = false;//user has guessed a new guess, my idea is that it will serve as a dirty bit
let letterCounts;
let gameWord;
nerdleWord().then(word => {
  console.log(`Resolved Word: ${word}`);
  letterCounts = populateWordHash(word);
  gameWord = word;
});


const letterInputs = document.querySelectorAll('.letter-input');
letterInputs.forEach(input => {
  input.oninput = handleInput; // Use 'oninput' instead of 'addEventListener'
  input.onkeydown = handleKeyDown; // Use 'onkeydown' instead of 'addEventListener'
});



function handleInput(event) {
  const input = event.target;//box in which value is being entered
  const value = input.value;//character being entered in the box

  const correctInputForm = /[a-zA-Z]/;//regex to match input
  const isLetter = correctInputForm.test(value);//checking if input is a letter
  //uppercases for uniformity
  if (isLetter)
    input.value = input.value.toUpperCase();

  if (value.length === 1 && isLetter) {
    const currentDiv = input.parentNode;
    const rowInputs = Array.from(currentDiv.getElementsByClassName('letter-input'));

    const nextBoxIndex = rowInputs.indexOf(input) + 1;

    if (nextBoxIndex < rowInputs.length) {
      const nextBox = rowInputs[nextBoxIndex];
      nextBox.focus();
    }
  }
  else {
    input.value = '';
  }
}

function handleKeyDown(event) {
  const key = event.key;
  const input = event.target;

  switch (key) {
    case 'Enter':
      //user guess should return updated hashmap as well as the user guess
      guess = getGuess(event);
      if (guess)
        letterCounts = interpretGuess(letterCounts, guess, gameWord, event);
      else
        //invalid guess, shake write disappearing 'invalid word' and do nothing
        // newGuess = true;
        break;

    case 'Backspace':
      //condition being checked, current input is empty and there is a previous element
      if (input.value === '' && input.previousElementSibling) {
        const previousInput = input.previousElementSibling;
        previousInput.value = '';
        previousInput.focus();
      }
      break;

    default:
      break;
  }
}
