/* eslint no-undef: "off", max-len: "off" */

export default class Cannon{
  position(){
    return [width / 2 - 50, height - 120];
  }

  constructor(){
    this.health = 1;
    this.score = 0;
    this.word = '';
  }

  placeSelf(){
    const image = new Image();
    image.src = './assets/images/cannon.svg';
    image.onload = function() {
      const bitmap = new createjs.Bitmap(image);
      bitmap.x = width / 2 - 50;
      bitmap.y = height - 120;
      bitmap.name = 'cannon';
      bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.5;
      stage.addChild(bitmap);
      stage.update();
    };
  }

  fire(ship, registerHit){
    registerHit(ship);
  }
}
