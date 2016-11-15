/* eslint no-undef: "off", max-len: "off" */
export default class Ship {
  constructor(word, target){
    this.word = word;
    this.speed = 10000;
    this.target = target;
  }

  placeSelf(index, update, spawnRate){
    const image = new Image();
    image.src = `./assets/images/ufo${Math.ceil(Math.random() * 3)}.png`;
    this.container = new createjs.Container();
    this.container.textAlign = 'center';
    this.container.x = width * Math.random() - 50 | 0;
    this.container.y = -100;

    const handleload = function() {
      let bitmap = new createjs.Bitmap(image);
      bitmap.x = bitmap.y = 0;
      bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.5;
      this.container.addChild(bitmap);
      this.attachWord();
      stage.addChild(this.container);
      this.go();
      stage.update();
      update(index+1);
    }.bind(this);

    image.onload = setTimeout(handleload, spawnRate);
  }

  attachWord(){
    if(this.container.children[1]) this.container.removeChildAt(1);
    const label = new createjs.Text(this.word);
    label.font = " 30px Delius Unicase, cursive";
    label.color = '#fff';
    label.x = 0;
    label.y = 60;
    this.container.addChild(label);
  }

  die(){
    stage.removeChild(this.container);
  }

  go(){
    createjs.Tween.get(this.container).
      to({x: this.target[0], y: this.target[1]}, this.speed);
  }

  explosion(){
    const image = new Image();
    image.src = `./assets/images/explosion.svg`;
    image.onload = function() {
      let bitmap = new createjs.Bitmap(image);
      bitmap.x = bitmap.y = 0;
      bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.5;
      bitmap.alpha = 0;
      this.container.addChild(bitmap);
      createjs.Tween.get(bitmap).to({alpha: 0.8}, 100);
      setTimeout(() => this.clearExplosion(), 150);
    }.bind(this);
  }

  clearExplosion(){
    this.container.removeChildAt(this.container.children.length - 1);
  }
}
