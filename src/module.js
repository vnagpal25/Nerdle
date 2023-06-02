function fetchRandomWord() {
  //makes HTTP request to server and returned response contains status code, headers, and the body of the response
  return fetch('https://api.datamuse.com/words?sp=?????&md=d&max=10000', {
    method: 'GET' // HTTP request method is GET because we're only requesting info from the server, not sending
  })
    //data is json object data extracted from the body of the response (in this case it contains 1000 words)
    .then(response => response.json())
    .then(data => {
      //returns a random number from 0 to data.length - 1
      const randomIndex = Math.floor(Math.random() * data.length);
      const word = data[randomIndex].word;
      console.log(word);
      return word;
    })
    .catch(error => {
      console.error('Error retrieving random word:', error);
    });
}

function isWordValid(word) {
  // const apiKey = 'YOUR_API_KEY'; // Replace with your Wordnik API key

  // return fetch(`https://api.wordnik.com/v4/word.json/${word}/definitions?api_key=${apiKey}`)
  //   .then(response => response.json())
  //   .then(definitions => definitions.length > 0)
  //   .catch(error => {
  //     console.error('Error checking word validity:', error);
  //     return false;
  //   });
  return true;
}

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

  if (properInputs && isWordValid(guess)) {
    //lock the row for editing and analyze the word(colors)
    console.log(guess);
    return guess;
  }
  return '';
}

function interpretGuess(letterCounts, guess, gameWord, event) {
  const input = event.target;
  const currentDiv = input.parentNode;
  const rowInputs = Array.from(currentDiv.getElementsByClassName('letter-input'));


  for (let i = 0; i < gameWord.length; i++) {
    // if the letter is in the correct spot, then green
    if (inCorrectSpot(guess.charAt(i), i, gameWord)) {
      rowInputs[i].style.backgroundColor = 'green';
      letterCounts.set(guess.charAt(i), letterCounts.get(guess.charAt(i)) - 1);//decrements amount of possible yellow characters in a subsequent guesses
    }
    // if the letter is in the word, but in the wrong spot, then yellow
    else if (inWrongSpot(guess.charAt(i), i, letterCounts, gameWord)) {
      rowInputs[i].style.backgroundColor = 'yellow';
    }
    else {
      rowInputs[i].style.backgroundColor = 'grey';
    }
  }
  return letterCounts;
}

function inCorrectSpot(c, index, gameWord) {
  return c === gameWord.charAt(index);
}

function inWrongSpot(c, index, letterCounts, gameWord) {
  // if its in the wrong spot it should be in the word, and it should also not be
  // the only occurence of the letter, aka count > 0
  return gameWord.includes(String(c)) && (letterCounts.get(c) > 0);
}

export { fetchRandomWord, getGuess, interpretGuess };