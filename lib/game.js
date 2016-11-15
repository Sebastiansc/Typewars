/* eslint no-undef: "off", max-len: "off" */

import Welcome from './welcome';
import Board from './board';
import Cannon from './cannon';
import MotherShip from './mothership';

export default class Game {
  constructor(canvas, stage){
    window.stage = stage;
    window.width = canvas.width;
    window.height = canvas.height;
    this.wave = 1;
    this.cannon = new Cannon();
    // this.mothership = new MotherShip(this.wave);
    Welcome(() => this.play());
  }

  play(){
    stage.removeChildAt(1, 2);
    this.cannon.placeSelf();
    MotherShip.placeShips();
    $(window).on('keypress', e => this.handleKeyPress(e));
    createjs.Ticker.on("tick", () => this.tick());

  }

  handleKeyPress(e){

  }

  tick(e){
    if (!createjs.Ticker.getPaused()) {
      stage.update(event);
    }
  }

  pause(){

  }

  unpause(){

  }
}
