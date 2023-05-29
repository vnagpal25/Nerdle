import { fetchRandomWord as nerdleWord, registerGuess} from "./modules.js";
import { runWordleGame } from "./runWordleGame.js";

nerdleWord().then(word => {
  console.log(`Resolved Word: ${word}`);
  runWordleGame(word);
});

function handleInput(event) {
  const input = event.target;//box in which value is being entered
  const value = input.value;//character being entered in the box

  const correctInputForm = /[a-zA-Z]/;//regex to match input
  const isLetter = correctInputForm.test(value);//checking if input is a letter
  //uppercases for uniformity
  if (isLetter)
    input.value = value.toUpperCase();

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
      //user guess
      registerGuess(event);
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

