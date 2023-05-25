//selects all input elements with the class specified by letter-input (which will be each individual box within each row)
const letterInputs = document.querySelectorAll('.letter-input');

//loops through each input element
letterInputs.forEach(input => {
  //listens for value being inputted into the box
  input.addEventListener('input', function () {
    //if the input length goes over 1, then it displays only the first characters
    if (this.value.length > 1)
      this.value = this.value[0];

    // Remove non-alphabetic characters and converts letters to uppercase
    /*regex: /[^a-zA-Z]/
      []  : anything between here matches a single character [..][..] matches two characters 
      /   : used to effectively bookmark the regex
      ^   : specifies inversion (anything that doesn't match the following pattern)
      a-z : specifies all lowercase letters
      A-Z : specifies all uppercase letters
      /g  : matches all occurences in the input string not the first one, redundant in this case
    */
    this.value = this.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
  });
});

function handleInput(event) {
  const input = event.target;//box in which value is being entered
  const value = input.value;//character being entered in the box

  if (value.length === 1) {
    const currentDiv = input.parentNode;
    const rowInputs = Array.from(currentDiv.getElementsByClassName('letter-input'));

    const nextBoxIndex = rowInputs.indexOf(currentInput) + 1;

    if (nextBoxIndex < rowInputs.length) {
      const nextBox = rowInputs[nextBoxIndex];
      nextBox.focus();
    }
  }
}

function handleKeyDown(event) {
  const key = event.key;
  const input = event.target;
  const currentDiv = input.parentNode;
  const rowInputs = Array.from(currentDiv.getElementsByClassName('letter-input'));

  switch (key) {
    case 'Backspace':
      const nextBoxIndex = rowInputs.indexOf(currentInput) - 1;
      if (nextBoxIndex >= 0) {
        const nextBox = rowInputs[nextBoxIndex];
        nextBox.focus();
      }
      break;
    default:
      break;
  }
}
