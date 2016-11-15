/* eslint no-undef: "off", max-len: "off" */
export default class Ship {
  constructor(word, target){
    this.word = word;
    this.speed = 10000;
    this.target = target;
  }

  placeSelf(index, update, spawnRate){
    const image = new Image();
    image.src = './assets/images/ufo.svg';
    const label = new createjs.Text(this.word, 'bold 14px sans-serif', '#fff');
    label.x = 20;
    label.y = 50;
    this.container = new createjs.Container();
    this.container.x = width * Math.random() - 50 | 0;
    this.container.y = Math.random() * 10 | 0;

    const handleload = function() {
      let bitmap = new createjs.Bitmap(image);
      bitmap.x = bitmap.y = 0;
      bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.1;
      this.container.addChild(bitmap, label);
      stage.addChild(this.container);
      this.go();
      stage.update();
      update(index+1);
    }.bind(this);
    
    image.onload = setTimeout(handleload, spawnRate);
  }

  go(){
    createjs.Tween.get(this.container).
      to({x: this.target[0], y: this.target[1]}, this.speed);
  }
}
