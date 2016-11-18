/* eslint no-undef: "off", max-len: "off" */
import Bullet from './bullet';
import {mothership} from './mothership';
import {explode} from './utility';

class Cannon{
  position(){
    return [width / 2 - 50, height - 50];
  }

  constructor(){
    this.health = 1;
    this.bullets = [];
    this.word = '';
  }

  placeSelf(){
    const image = new Image();
    image.src = './assets/images/cannon.png';
    this.container = new createjs.Container();
    this.container.x = width / 2 - 50;
    this.container.y = height - 50;

    image.onload = function() {
      const bitmap = new createjs.Bitmap(image);
      bitmap.x = bitmap.y = 0;
      bitmap.regX = bitmap.image.width/2;
      bitmap.regY = bitmap.image.height/2;
      bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.4;
      this.container.addChild(bitmap);
      stage.addChild(this.container);
    }.bind(this);
  }

  aim(ship){
    let angle = Math.atan2(ship.container.y - this.container.y, ship.container.x - this.container.x );
    angle = 90 + (angle * (180/Math.PI));
    if(angle < 0) angle = 360 - (-angle);
    this.container.rotation = angle;
    this.set(ship, angle);
  }

  set(ship, angle){
    const bullet = new Bullet(angle);
    this.bullets.push(bullet);
    bullet.attach(() => this.fire(bullet, ship));
  }

  fire(bullet, ship){
    const distance = this.container.y - ship.container.y;
    const shiftBullet = () => this.bullets.shift(); //throttle ship deletion
    bullet.target(ship, distance, shiftBullet);
  }

  explosion(){
    explode(this, [-220, -280], 2.5);
  }
}

export let cannon = new Cannon();
