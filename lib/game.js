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
    mothership.placeShips();
    $(window).on('keypress', e => this.handleKeyPress(e));
    createjs.Ticker.setFPS(40);
    createjs.Ticker.on("tick", () => this.tick());
  }

  gameOver(){
    cannon.explosion();
    const cleanUp = () => {
      stage.removeAllChildren();
      this.setHtml();
    };
    setTimeout(cleanUp, 350);
  }

  setHtml(){
    Background();
    $('.lost-message').text('Game Over');
    $('.score-total').text('Score: ' + $('#score').text());
    $('.waves-completed').text(`Completed: ${mothership.wave} waves`);
    $('#score').text('0');
    $('.welcome-screen').addClass('game-over');
    $('.welcome-screen').show();
    // Placing it here to allow for info to be populated before reset
    mothership.create();
  }

  handleKeyPress(e){
    mothership.checkForHit(e.key, () => this.success());
  }

  tick(e){
    if (!createjs.Ticker.getPaused()) {
      if(mothership.ships.some(ship => isHitting(ship, cannon))) {
        mothership.ships = [];
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
