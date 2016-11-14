import Game from './lib/game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const stage = new createjs.Stage(canvas);
  new Game(canvas, stage);
});
