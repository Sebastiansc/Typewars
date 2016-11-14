import Game from './lib/game';

document.addEventListener("DOMContentLoaded", () => {
  const stage = new createjs.Stage("canvas");
  new Game(stage);
});
