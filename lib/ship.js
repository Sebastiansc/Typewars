/* eslint no-undef: "off", max-len: "off" */

export default class Ship {
  constructor(word){
    this.word = word;
  }

  placeSelf(index, update){
    const image = new Image();
    image.src = './assets/images/ufo.svg';
    const label = new createjs.Text(this.word, 'bold 14px sans-serif', '#fff');
    label.x = 20;
    label.y = 50;
    const container = new createjs.Container();
    container.x = width * Math.random() - 50 | 0;
    container.y = Math.random() * 10 | 0;

    image.onload = function() {
      let bitmap = new createjs.Bitmap(image);
      bitmap.x = bitmap.y = 0;
      bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.1;
      container.addChild(bitmap, label);
      stage.addChild(container);
      stage.update();
      update(index+1);
    };
  }
}
