/* eslint no-undef: "off", max-len: "off" */
import Game from './lib/game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;


  function fullscreen(){
    if(canvas.webkitRequestFullScreen) {
      canvas.webkitRequestFullScreen();
    }
    else {
      canvas.mozRequestFullScreen();
    }
  }
  // Loading sounds
  const sounds = [
		{src: "explosion.wav", id: "explosion"},
		{src: "laser.wav", id: "laser"},
		{src: "automation.mp3", id: "music"},
    {src: 'no.mp3', id: 'no'},
    {src: 'typo.mp3', id: 'typo'}
  ];
  createjs.Sound.alternateExtensions = ["mp3"];
  const ppc = new createjs.PlayPropsConfig().set({loop: -1, volume: 0.6});
  createjs.Sound.on('fileload', () => play());
  createjs.Sound.registerSounds(sounds, './assets/audio/');

  // Attaching pause
  $('.fa-volume-off').click(() => pause());

  let music;
  let paused = false;
  const play = () => {
    music = createjs.Sound.play("music", ppc);
  };

  const pause = () =>{
    paused = !paused;
    const toAdd = paused ? 'fa-volume-up' : 'fa-volume-off';
    const toRemove = paused ? 'fa-volume-off' : 'fa-volume-up';
    $('.volume').removeClass(toRemove);
    $('.volume').addClass(toAdd);
    music.paused = !music.paused;
  };

  // canvas.addEventListener("click",fullscreen);
  const stage = new createjs.Stage(canvas);
  new Game(canvas, stage);
});
