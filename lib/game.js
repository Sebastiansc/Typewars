/* eslint no-undef: "off", max-len: "off" */
import {isHitting} from './utility';
import Background from './background';
import Board from './board';
import {cannon} from './cannon';
import {mothership} from './mothership';

export default class Game {
  constructor(canvas, stage){
    window.stage = stage;
    window.width = canvas.width;
    window.height = canvas.height;
    this.setup();
  }

  setup(){
    Background();
    $('.play').click(() => {
      $('.welcome-screen').hide();
      $('.fa-pause').click(() => this.pause());
      $('.mute').click(() => this.mute());
      this.play();
    });
  }

  boundButton(){
    $('.pause').click(() => this.pause());
    $('.mute').click(() => this.mute());
  }

  play(){
    stage.removeChildAt(1, 2);
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
      this.setHtml();
    };
    setTimeout(cleanUp, 350);
  }

  setHtml(){
    Background();
    $('.lost-message').text('Game Over ):');
    $('#score').text('0');
    $('.welcome-screen').show();
  }

  handleKeyPress(e){
    mothership.checkForHit(e.key, () => this.success());
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
