
import fetch from 'node-fetch';//allows http requests
export async function fetchRandomWord() {
  try {

    //  makes HTTP request to server and returned response contains status code, headers, and the body of the response
    //  await pauses execution of this async function until promise after await is resolved or rejected
    const response = await fetch(`https://api.datamuse.com/words?sp=?????&md=d&max=10000`, {
      method: 'GET' // HTTP request method is GET because we're only requesting info from the server, not sending
    });
    //data is json object data extracted from the body of the response (in this case it contains 1000 words)
    const data = await response.json();

    //returns a random number from 0 to data.length - 1
    const randomIndex = Math.floor(Math.random() * data.length);

    //a random word from the data, .word key specifies the actual word
    const word = data[randomIndex].word;
    console.log(word);
    return word;
  } catch (error) {
    console.error('Error retrieving random word:', error);
  }
}

// export {fetchRandomWord};