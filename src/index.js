import { fetchRandomWord as nerdleWord, getGuess, interpretGuess, populateWordHash } from "./module.js";
let guess;
let letterCounts;
let gameWord;

nerdleWord().then(word => {
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
      //returns guess if it is valid (5 chars and english word) otherwise returns falsy empty string
      guess = getGuess(event);
      if (guess) {
        //changes color of the input boxes and lock it
        interpretGuess(letterCounts, guess, gameWord, event);

        //need to go to the next row now
        toNextRow(input.parentNode.id);
      } else { }
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

function toNextRow(currRowID) {
  //string maninpulation
  const rowStr = currRowID.substring(0, 3);
  const currRowNum = parseInt(currRowID.substring(3));

  //get the next rows ID
  const nextRowNum = currRowNum + 1;
  const nextRowID = rowStr + nextRowNum;

  if (nextRowNum <= 6) {
    //get next div by its ID
    const nextRowDiv = document.getElementById(nextRowID);

    //getting the array of inputs from the div 
    const nextRowInputs = Array.from(currentDiv.getElementsByClassName('letter-input'));
    
    nextRowInputs[0].focus();
  }
}