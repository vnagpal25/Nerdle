export function runWordleGame(word) {
  let letterCounts = new Map();
  console.log('no problems, map created');

  //[...word] is equivalent to toCharArray in java
  [...word].forEach((char) => {
    //need to replicate the getOrDefault method in javascript
    letterCounts.set(char,getOrDefault(letterCounts, char) + 1);
  });
  console.log(letterCounts);
}

function getOrDefault(map, key) {
  if (map.has(key))
    return map.get(key);
  else
    return 0;
}