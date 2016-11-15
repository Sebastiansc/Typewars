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
    this.cannon = new Cannon();
    Welcome(() => this.play());
  }

  play(){
    stage.removeChildAt(1, 2);
    this.pauseButton();
    this.cannon.placeSelf();
    MotherShip.placeShips();
    $(window).on('keyup', e => this.handleKeyPress(e));
    createjs.Ticker.on("tick", () => this.tick());

  }

  pauseButton(){
    const background = new createjs.Shape();
    background.name = "background";
    background.graphics.beginFill("#2c9cc9").drawRoundRect(0, 0, 100, 40, 10);

    const label = new createjs.Text("pause", "bold 20px Arial", "#fff");
    label.name = "label";
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.x = 100/2;
    label.y = 40/2;

    const button = new createjs.Container();
    button.x = 10;
    button.y = 10;
    button.name = 'pause';
    button.addChild(background, label);
    button.on('click', () => this.pause());

    stage.addChild(button);
  }

  handleKeyPress(e){
    MotherShip.checkForHit(e.key, () => this.success());
  }

  success(){

  }

  tick(e){
    if (!createjs.Ticker.getPaused()) {
      stage.update(event);
    }
  }

  pause(){
    var paused = !createjs.Ticker.getPaused();
  	createjs.Ticker.setPaused(paused);
  }

  unpause(){

  }
}
