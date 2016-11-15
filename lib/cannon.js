/* eslint no-undef: "off", max-len: "off" */
import Bullet from './bullet';
import {mothership} from './mothership';

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
      this.cannon = new createjs.Bitmap(image);
      this.cannon.x = width / 2 - 50;
      this.cannon.y = height - 60;
      this.cannon.regX = this.cannon.image.width/2;
      this.cannon.regY = this.cannon.image.height/2;
      this.cannon.name = 'cannon';
      this.cannon.scaleX = this.cannon.scaleY = this.cannon.scale = 0.5;
      stage.addChild(this.cannon);
      stage.update();
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
