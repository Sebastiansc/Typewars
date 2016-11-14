/* eslint no-undef: "off", max-len: "off" */
import Welcome from './welcome';
import Board from './board';

export default class Game {
  constructor(canvas, stage){
    this.stage = stage;
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.width;
    Welcome(stage, canvas, () => this.play());
  }

  play(){
    this.stage.removeChildAt(1, 2);
    $(window).on('keypress', (e) => console.log(e));
    this.stage.update();
    // new Cannon(this.stage);
    // new MotherShip(this.stage);
  }

  pause(){

  }

  unpause(){

  }
}
