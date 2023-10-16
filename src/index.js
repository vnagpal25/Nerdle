import { fetchRandomWord as nerdleWord, getGuess, interpretGuess, populateWordHash, shakeRow } from "./module.js";
let letterCounts;
let gameWord;
let activeRowNum = 1; // flag keeps track of current row
let activeBoxNum = 1;
const letterInputs = document.querySelectorAll('.letter-input');
const nerdleRows = document.querySelectorAll('.input-row');
const keyboard = document.querySelectorAll('.keyboard-row');

//gets the nerdle word from WordnikAPI and populates the hashmap of letter counts also
nerdleWord().then(word => {
  letterCounts = populateWordHash(word);
  console.log(word);
  gameWord = word;
});

//places cursor on the first input box
focusCursor();


//disables rows 2-6 so user can only enter their guess in the first row(activeRow = 1)
disableUneditableRows();

//linking defined functions to user I/O
letterInputs.forEach(input => {
  input.oninput = handleInput;
  input.onkeydown = handleKeyDown;
});

// listens to user input in each box
keyboard.forEach(row => {
  const buttons = row.querySelectorAll('.key');
  buttons.forEach(button => {
    button.addEventListener('click', function (event) {
      const letter = event.target.textContent;
      enterInBox(letter);
    });
  });
});

// focuses cursor on the first box of the row
function focusCursor() {
  const currentRow = nerdleRows[activeRowNum - 1];
  const firstInput = currentRow.querySelector('.letter-input');

  //slight time delay to allow for the DOM to finish rendering
  setTimeout(() => {
    firstInput.focus();
  }, 0);
}

//disables rows based on the activeRow variable
function disableUneditableRows() {
  //need to disable all other rows besides the currrent one
  nerdleRows.forEach((row, index) => {
    //gets all of the input elements in specific row
    const rowInputs = row.querySelectorAll('.letter-input');

    //this boolean will be T for all elements in the activeRow, and F for all elements in other rows
    //this is because it matches the specifc row's index with the active row's index
    const isEditable = (index === (activeRowNum - 1));

    //disables all input elements in the specific row
    rowInputs.forEach(input => { input.disabled = !isEditable });
  });
}

//this function handles user input in the input elements
function handleInput(event) {
  const input = event.target;//box in which value is being entered
  const value = input.value;//character being entered in the box

  const correctInputForm = /[a-zA-Z]/;//regex to match input
  const isLetter = correctInputForm.test(value);//checking if input is a letter

  //uppercases for uniformity
  if (isLetter)
    input.value = input.value.toUpperCase();

  //automatically moves the cursor to the next element
  if (value.length === 1 && isLetter) {
    const currentDiv = input.parentNode;
    const rowInputs = Array.from(currentDiv.getElementsByClassName('letter-input'));

    //index of next input element within the row
    const nextBoxIndex = rowInputs.indexOf(input) + 1;

    if (nextBoxIndex < rowInputs.length) {
      const nextBox = rowInputs[nextBoxIndex];
      nextBox.focus();
    }

    activeBoxNum++;
  }
  else {
    input.value = '';
  }
}

// this is for keys pressed
function handleKeyDown(event) {
  const key = event.key;
  const input = event.target;

  switch (key) {
    case 'Enter':
      //returns guess if it is valid (5 chars & english word) otherwise returns falsy empty string
      getGuess(event).then(guess => {
        if (guess) {
          //changes color of the input boxes and lock it
          interpretGuess(letterCounts, guess, gameWord, event, keyboard);

          //need to go to the next row now
          if (guess !== gameWord) {
            toNextRow(input.parentNode.id);
          }
          else {
            let winBlock = document.getElementById("win_text");
            winBlock.innerHTML += ` ${activeRowNum}/6 guesses!`;
            winBlock.style.opacity = 1;
          }
        } else {
          shakeRow(event);
          '/TODO/'
          //invalid guess, shake write disappearing 'invalid word' and do nothing
        }
      })
      break;

    case 'Backspace':
      //condition being checked, current input is empty and there is a previous element
      //should only go to the previous square if the current square is empty
      if(activeBoxNum>1)
        activeBoxNum--;
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

// this function is for when user presses enter and we want to progress to next row
function toNextRow(currRowID) {
  //string maninpulation
  const rowStr = currRowID.substring(0, 3);
  const currRowNum = parseInt(currRowID.substring(3));

  //get the next rows ID
  const nextRowNum = currRowNum + 1;
  const nextRowID = rowStr + nextRowNum;
  if (nextRowNum <= 6) {
    //get next div by its ID
    // const nextRowDiv = document.getElementById(nextRowID);

    //getting the array of inputs from the div 
    // const nextRowInputs = Array.from(nextRowDiv.getElementsByClassName('letter-input'));

    //puts the cursor in the first box of the next row
    // nextRowInputs[0].focus();

    //increments the activeRow variable and disables subsequent rows
    activeRowNum++;
    focusCursor();
    disableUneditableRows();
  }
  else {
    //the user has lost the game and hasn't gotten it within 6 tries
    //display a 'you lost' message and type out what the word was
    let loseBlock = document.getElementById("lose_text");
    loseBlock.innerHTML += ` ${gameWord.toUpperCase()}.`;
    loseBlock.style.opacity = 1;
  }

  activeBoxNum = 1;
}

// this function handles user input within the boxes
function enterInBox(letter) {
  //use activeRowNum and nerdleRows to get the active Row
  const activeRow = nerdleRows[activeRowNum - 1];
  const rowInputs = Array.from(activeRow.getElementsByClassName('letter-input'));

  if (activeBoxNum <= 5) {
    const currentBox = rowInputs[activeBoxNum - 1];
    currentBox.value = letter;
  }

  //index of next input element within the row
  const nextBoxIndex = activeBoxNum;

  if (nextBoxIndex < rowInputs.length) {
    const nextBox = rowInputs[nextBoxIndex];
    nextBox.focus();
  }

  activeBoxNum++;
}