import {fetchRandomWord} from "./fetchRandomWord.js"


fetchRandomWord().then(word => {
  console.log(`Resolved Word: ${word}`);

});