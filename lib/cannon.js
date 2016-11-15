/* eslint no-undef: "off", max-len: "off" */
import Bullet from './bullet';

class Cannon{
  position(){
    return [width / 2 - 50, height - 120];
  }

  constructor(){
    this.health = 1;
    this.score = 0;
    this.bullets = [];
    this.word = '';
  }

  placeSelf(){
    const image = new Image();
    image.src = './assets/images/cannon.svg';
    image.onload = function() {
      this.bitmap = new createjs.Bitmap(image);
      this.bitmap.x = width / 2 - 50;
      this.bitmap.y = height - 120;
      this.bitmap.name = 'cannon';
      this.bitmap.scaleX = this.bitmap.scaleY = this.bitmap.scale = 0.5;
      stage.addChild(this.bitmap);
      stage.update();
    }.bind(this);
  }

  fire(ship, registerHit){
    const distance = this.bitmap.y - ship.container.y;
    const bullet = new Bullet();
    bullet.target(ship, distance);
    registerHit(ship);
  }
}

export let cannon = new Cannon();
