/* eslint no-undef: "off", max-len: "off" */
import {explode} from './utility';
import {mothership} from './mothership';

export default class Ship {
  constructor(word, target){
    this.word = word;
    this.target = target;
  }

  placeSelf(index, update, spawnRate, gameOver){
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
      this.go(gameOver);
      stage.update();
      update(index+1);
    }.bind(this);

    image.onload = setTimeout(handleload, spawnRate);
  }

  go(gameOver){
    createjs.Tween.get(this.container).
      to({x: this.target[0] - 10, y: this.target[1] - 30}, this.speed());
      // call(gameOver);
  }

  speed(){
    return Math.round(Math.random() * (25000 - 15000 + 1)) + 15000;
  }


  attachWord(){
    if(this.container.children[1]){
      const child = this.container.getChildByName('word');
      this.container.removeChild(child);
    }
    const label = new createjs.Text(this.word);
    label.font = " 30px Delius Unicase, cursive";
    label.color = '#fff';
    label.x = 0;
    label.y = 60;
    label.name = 'word';
    this.container.addChild(label);
  }

  die(){
    stage.removeChild(this.container);
    mothership.isWaveOver(this);
  }

  explosion(){
    explode(this);
  }
}
