/* eslint no-undef: "off", max-len: "off" */
export const selectWords = (words, fleet, min, max) => {
  let waveWords = [];
  let takenLetters = [];
  while (waveWords.length < fleet){
    let index = Math.floor(Math.random() * 39000);
    let word = words[index];
    if(!takenLetters.includes(word[0]) && isBetween(word, min, max)){
      takenLetters.push(word[0]);
      waveWords.push(word);
    }
  }
  return waveWords;
};

const isBetween = (word, min, max) => {
  return word.length >= min && word.length <= max;
};


export const typo = (letter, ship) => {
  return ship.word[0] === letter;
};


export const explode = (that, pos = [0, 0], scale = 0.5) => {
  createjs.Sound.play('explosion', {volume: 0.9});
  const image = new Image();
  image.src = `./assets/images/explosion.svg`;
  image.onload = function() {
    let bitmap = new createjs.Bitmap(image);
    bitmap.x = pos[0];
    bitmap.y = pos[1];
    bitmap.scaleX = bitmap.scaleY = bitmap.scale = scale;
    bitmap.alpha = 0;
    bitmap.name = 'explosion';
    that.container.addChild(bitmap);
    createjs.Tween.get(bitmap).to({alpha: 0.8}, 100);
    setTimeout(() => clearExplosion(that), 150);
  };
};

const clearExplosion = (that) => {
  const child = that.container.getChildByName('explosion');
  that.container.removeChild(child);
};

export const isHitting = (ship, cannon) => {
  const x = ship.container ? ship.container.x : 0;
  const y = ship.container ? ship.container.y + 130 : 0;
  return (x >= cannon.container.x - 30 && x <= cannon.container.x + 20) && y >= cannon.container.y;
};


export const randInRange = (min, max) => {
  return Math.round(Math.random() * (max - min + 1)) + min;
};
