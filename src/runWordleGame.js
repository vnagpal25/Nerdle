export function populateWordHash(word) {
  let letterCounts = new Map();

  //[...word] is equivalent to toCharArray in Java
  // following segment of code adds to the hashmap the occurences of each letter
  // in the word, the getOrDefault method returns 0(default) if there are no keys matching the letter in the hashamp, otherwise it returns the value of the key
  // This allows the hashamp to hold the occurences of each letter in the 5 letter word
  [...word].forEach((char) => {
    letterCounts.set(char, getOrDefault(letterCounts, char) + 1);
  });
  console.log(letterCounts);
  return letterCounts;
}

//equivalent to getOrDefault method in Java
function getOrDefault(map, key) {
  if (map.has(key))
    return map.get(key);
  else
    return 0;
}