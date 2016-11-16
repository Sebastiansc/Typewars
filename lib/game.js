/* eslint no-undef: "off", max-len: "off" */
import {isHitting} from './utility';
import Welcome from './welcome';
import Board from './board';
import {cannon} from './cannon';
import {mothership} from './mothership';

export default class Game {
  constructor(canvas, stage){
    window.stage = stage;
    window.width = canvas.width;
    window.height = canvas.height;
    Welcome(() => this.play(), "Welcome to Typewars");
  }

  play(){
    stage.removeChildAt(1, 2);
    this.pauseButton();
    cannon.placeSelf();
    mothership.placeShips(() => this.gameOver());
    $(window).on('keypress', e => this.handleKeyPress(e));
    createjs.Ticker.setFPS(40);
    createjs.Ticker.on("tick", () => this.tick());

  }

  gameOver(){
    cannon.explosion();
    const cleanUp = () => {
      stage.removeAllChildren();
      mothership.create();
      Welcome(() => this.play(), "Game Over");
    };
    setTimeout(cleanUp, 350);
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
    mothership.checkForHit(e.key, () => this.success());
  }

  success(){

  }

  tick(e){
    if (!createjs.Ticker.getPaused()) {
      if(mothership.ships.some(ship => isHitting(ship, cannon))) {
        this.gameOver();
      }
      stage.update();
    }
  }

  pause(){
    var paused = !createjs.Ticker.getPaused();
  	createjs.Ticker.setPaused(paused);
  }
}
