import fetch from 'node-fetch';

async function fetchRandomWord() {
  try {
    const response = await fetch(`https://api.datamuse.com/words?sp=?????&max=1000`, {
      method: 'GET'
    });

    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.length);
    const word = data[randomIndex].word;

    console.log(word);
  } catch (error) {
    console.error('Error retrieving random word:', error);
  }
}

fetchRandomWord();
