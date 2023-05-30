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

function registerGuess(event) {
  const input = event.target;

  const currentDiv = input.parentNode;
  const rowInputs = Array.from(currentDiv.getElementsByClassName('letter-input'));

  //properInputs is a boolean(dirty bit) seeing if all the input boxes have a letter inside them
  let properInputs = true;
  let guess ='';
  //check each element in the input array, see if it meets the condition(if so do nothing), if not(change it)
  rowInputs.forEach((inputElement) => {
    //checking if the input element exists and it has a value(not empty)
    //sets the dirty bit only if we encounter a non conforming cell
    if (!inputElement || !inputElement.value)
      properInputs = inputElement && inputElement.value;
    guess+=inputElement.value;
  })

  if(properInputs){
    //lock the row for editing and analyze the word(colors)

    console.log(guess);
  }

}
export { fetchRandomWord, registerGuess };