/* eslint no-undef: "off", max-len: "off" */
import {cannon} from './cannon';
export default class Bullet{
  constructor(angle){
    this.speed = 2;
    this.rotation = angle;
  }

  attach(fire){
    const image = new Image();
    image.src = './assets/images/bullet.png';
    image.onload = () => {
      this.bullet = new createjs.Bitmap(image);
      this.bullet.x = width / 2 - 50;
      this.bullet.y = height - 100;
      this.bullet.alpha = 0.4;
      this.bullet.regX = this.bullet.image.width/2;
      this.bullet.regY = this.bullet.image.height/2;
      this.bullet.scaleX = this.bullet.scaleY = this.bullet.scale = 0.5;
      this.bullet.rotation = this.rotation;
      stage.addChild(this.bullet);
      fire();
    };
  }

  target(ship, distance, shiftBullet){
    createjs.Sound.play('laser');
    createjs.Tween.get(this.bullet).
      to({x: ship.container.x + 45, y: ship.container.y, alpha: 1}, distance / this.speed).
        call(() => this.hitTarget(ship, shiftBullet));
  }

  hitTarget(ship, shiftBullet){
    createjs.Sound.play('explosion', {volume: 0.9});
    stage.removeChild(this.bullet);
    ship.explosion();
    shiftBullet();
    if(!ship.word){
      setTimeout(() => ship.die(), 100);
    }
  }
}
