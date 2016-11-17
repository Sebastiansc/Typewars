import Game from './lib/game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;


  function fullscreen(){
   if(canvas.webkitRequestFullScreen) {
       canvas.webkitRequestFullScreen();
   }
   else {
     canvas.mozRequestFullScreen();
  }
}

  // canvas.addEventListener("click",fullscreen);
  const stage = new createjs.Stage(canvas);
  new Game(canvas, stage);
});
