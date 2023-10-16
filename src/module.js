// API url and API key for making REST calls to WordNik Server
const wordnikAPIKey = 'z4c3qqk32klf50fp4ca36qsgydr18gg45fsw36xci64l3jw7t';
const wordnikAPI_URL = 'https://api.wordnik.com/v4/words.json/randomWords';

// fetches the word to guess from WordNik API 
function fetchRandomWord() {
  const params = new URLSearchParams({
    api_key: wordnikAPIKey,
    includePartOfSpeech: 'noun,verb,adjective',
    hasDictionaryDef: true,
    minCorpusCount: 10000,
    minLength: 5,
    maxLength: 5,
    minDictionaryCount: 20,
    limit: 1,
  });

  const getReq = `${wordnikAPI_URL}?${params}`;

  return fetch(getReq, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      const word = data[0].word;
      return word;
    })
    .catch(error => {
      console.error('Error retrieving random word:', error);
    });
}

// makes API call to WordNik to see if the guess was a valid word
async function isWordValid(word) {
  const apiUrl = `https://api.wordnik.com/v4/word.json/${word}/definitions?api_key=${wordnikAPIKey}`;

  try {
    const response = await fetch(apiUrl);
    const definitions = await response.json();
    return definitions.length > 0;
  } catch (error) {
    console.error('Error checking word definition:', error);
    return false;
  }
}

// takes user guess from the input boxes and returns it if it was a valid word
function getGuess(event) {
  const input = event.target;
  const currentDiv = input.parentNode;
  const rowInputs = Array.from(currentDiv.getElementsByClassName('letter-input'));

  //properInputs is a boolean(dirty bit) seeing if all the input boxes have a letter inside them
  let properInputs = true;
  let guess = '';
  //check each element in the input array, see if it meets the condition(if so do nothing), if not(change it)
  rowInputs.forEach((inputElement) => {
    //checking if the input element exists and it has a value(not empty)
    //sets the dirty bit only if we encounter a non conforming cell
    if (!inputElement || !inputElement.value)
      properInputs = inputElement && inputElement.value;
    guess += (inputElement.value).toLowerCase();
  })
  return isWordValid(guess).then(validWord => {
    console.log(validWord);
    if (properInputs && validWord) {
      return guess; // Propagate the guess value through the promise chain
    } else {
      return ''; // Reject the promise if the guess is invalid
    }
  });
}


// breaks down user guess and reacts
function interpretGuess(letterCounts, guess, gameWord, event, keyboard) {
  const input = event.target;
  const currentDiv = input.parentNode;
  const rowInputs = Array.from(currentDiv.getElementsByClassName('letter-input'));

  //creating a copy because Objects are passed by reference in JS
  const copyLetterCounts = new Map(letterCounts);

  //decrements amount of possible yellow characters to show up in the same word
  for (let i = 0; i < gameWord.length; i++)
    if (inCorrectSpot(guess.charAt(i), i, gameWord))
      copyLetterCounts.set(guess.charAt(i), copyLetterCounts.get(guess.charAt(i)) - 1);

  //correct letter: green, correct letter but wrong spot: yellow, wrong letter: grey
  for (let i = 0; i < gameWord.length; i++) {
    if (inCorrectSpot(guess.charAt(i), i, gameWord)) {
      rowInputs[i].style.backgroundColor = 'green';
      colorKeyboard(keyboard, guess.charAt(i), 'green');
    }
    else if (inWrongSpot(guess.charAt(i), copyLetterCounts, gameWord)) {
      rowInputs[i].style.backgroundColor = 'yellow';
      colorKeyboard(keyboard, guess.charAt(i), 'yellow');
    }
    else {
      rowInputs[i].style.backgroundColor = 'grey';
      colorKeyboard(keyboard, guess.charAt(i), 'grey');
    }
  }

  //locks the row
  rowInputs.forEach(input => input.setAttribute('disabled', 'disabled'));
}


// checks if the letter is in the correct spot
function inCorrectSpot(c, index, gameWord) {
  return c === gameWord.charAt(index);
}

// checks if the letter is in the wrong spot or not
function inWrongSpot(c, letterCounts, gameWord) {
  // if its in the wrong spot it should be in the word, and it should also not be
  // the only occurence of the letter, aka count > 0
  return gameWord.includes(String(c)) && (letterCounts.get(c) > 0);
}

// returns hashmap with letters as keys signifying the letter count
function populateWordHash(word) {
  let letterCounts = new Map();
  //[...word] is equivalent to toCharArray in Java
  // following segment of code adds to the hashmap the occurences of each letter
  // in the word, the getOrDefault method returns 0(default) if there are no keys matching the letter in the hashamp, otherwise it returns the value of the key
  // This allows the hashamp to hold the occurences of each letter in the 5 letter word
  [...word].forEach((char) => {
    letterCounts.set(char, getOrDefault(letterCounts, char) + 1);
  });
  return letterCounts;
}

//equivalent to getOrDefault method in Java
function getOrDefault(map, key) {
  if (map.has(key))
    return map.get(key);
  else
    return 0;
}

//shakes the row when the word is incorrect
function shakeRow(event) {
  const input = event.target;
  const row = input.parentNode;
  console.log(row);
  row.classList.add('shake');
  setTimeout(() => {
    row.classList.remove('shake');
  }, 1000); // Adjust the duration as needed
}

// colors the keyboard after a valid guess
function colorKeyboard(keyboard, letter, color) {
  for (let i = 0; i < keyboard.length; i++) {
    let keyboard_row = keyboard[i];
    let keys = Array.from(keyboard_row.getElementsByClassName('key'));
    for (let j = 0; j < keys.length; j++) {
      if (letter.toUpperCase() === keys[j].textContent.toUpperCase()) {
        if (keys[j].style.backgroundColor !== 'green')
          keys[j].style.backgroundColor = color;
      }
    }
  }
}
export { fetchRandomWord, getGuess, interpretGuess, populateWordHash, shakeRow };