export const selectWords = (words, length) => {
  let waveWords = [];
  let takenLetters = [];
  while (waveWords.length < length){
    let index = Math.floor(Math.random() * 39000);
    let word = words[index];
    if(!takenLetters.includes(word[0])){
      takenLetters.push(word[0]);
      waveWords.push(word);
    }
  }
  return waveWords;
};


export const typo = (letter, ship) => {
  return ship.word[0] === letter;
};
