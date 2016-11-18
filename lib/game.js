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
    // Key bindings must go first to ensure they're not attached twice
    $('.pause').click(() => this.pause());
    $('.mute').click(() => this.mute());
    $(window).on('keypress', e => this.handleKeyPress(e));

    Background();
    $('.play').click(() => {
      $('.hide').hide();
      this.play();
    });
  }

  play(){
    stage.removeChildAt(1, 2);
    cannon.placeSelf();
    mothership.placeShips();
    createjs.Ticker.setFPS(40);
    createjs.Ticker.on("tick", this.tick.bind(this));
  }

  gameOver(){
    mothership.over = true;
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
    $('.instructions').hide();
    $('.play').text('Play again');
    $('.show').show();
    // Placing it here to allow for info to be populated before reset
    mothership.create();
  }

  handleKeyPress(e){
    if (createjs.Ticker.getPaused()) return;
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
    const paused = !createjs.Ticker.getPaused();
    const toRemove = paused ? 'fa-pause' : 'fa-play';
    const toAdd = paused ? 'fa-play' : 'fa-pause';
    $(`.pause`).removeClass(`${toRemove}`);
    $(`.pause`).addClass(`${toAdd}`);
  	createjs.Ticker.setPaused(paused);
  }
}
