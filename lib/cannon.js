/* eslint no-undef: "off", max-len: "off" */
import Bullet from './bullet';
import {mothership} from './mothership';

class Cannon{
  position(){
    return [width / 2 - 50, height - 60];
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
    this.cannon = new createjs.Container();
    this.cannon.x = width / 2 - 50;
    this.cannon.y = height - 60;

    image.onload = function() {
      const bitmap = new createjs.Bitmap(image);
      bitmap.regX = bitmap.image.width/2;
      bitmap.regY = bitmap.image.height/2;
      bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.5;
      this.cannon.addChild(bitmap);
      stage.addChild(this.cannon);
    }.bind(this);
  }

  aim(ship){
    let angle = Math.atan2(ship.container.y - this.cannon.y, ship.container.x - this.cannon.x );
    angle = 90 + (angle * (180/Math.PI));
    if(angle < 0) angle = 360 - (-angle);
    this.cannon.rotation = angle;
    this.set(ship, angle);
  }

  set(ship, angle){
    const bullet = new Bullet(angle);
    this.bullets.push(bullet);
    mothership.registerHit(ship);
    bullet.attach(() => this.fire(bullet, ship));
  }

  fire(bullet, ship){
    const distance = this.cannon.y - ship.container.y;
    const shiftBullet = () => this.bullets.shift(); //throttle ship deletion
    bullet.target(ship, distance, shiftBullet);
  }
}

export let cannon = new Cannon();
