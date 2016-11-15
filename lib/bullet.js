/* eslint no-undef: "off", max-len: "off" */

export default class Bullet{
  constructor(){
    console.log("constructed");
    this.speed = 250;
    this.attach();
  }

  attach(){
    const image = new Image();
    image.src = './assets/images/bullet.png';
    this.bitmap = new createjs.Bitmap(image);
    this.bitmap.x = width / 2 - 50;
    this.bitmap.y = height - 170;
    this.bitmap.scaleX = this.bitmap.scaleY = this.bitmap.scale = 0.5;
    stage.addChild(this.bitmap);
  }

  handleTick(e){
  }

  target(ship){
    createjs.Tween.get(this.bitmap).
      to({x: ship.container.x, y: ship.container.y}, this.speed).
      call(() => this.hitTarget(ship));
  }

  hitTarget(ship, registerHit){
    stage.removeChild(this.bitmap);
  }
}
