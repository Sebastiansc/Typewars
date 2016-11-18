/* eslint no-undef: "off", max-len: "off" */
import words from '../words';
import Ship from './ship';
import {cannon} from './cannon';
import {selectWords} from './utility';

class MotherShip{
  constructor(){
    this.create();
  }

  create(){
    this.wave = 1;
    this.ships = [];
    this.max = 4;
    this.min = 2;
    this.fleet = 3;
    this.ship = null;
  }

  placeShips(){
    window.mothership = mothership;
    const currentWords = selectWords(words, this.fleet, this.min, this.max);
    for (let i = 0; i < this.fleet; i++) {
      let ship = new Ship(currentWords[i], cannon.position());
      this.ships.push(ship);
    }

    // Asynchronous recursive call of update assures spawnRate for ships
    // placedShips is used to have a constant length array and avoid index mismatch on asynchronous calls
    const placedShips = this.ships.slice();
    const update = index => {
      if(index > placedShips.length - 1) return;
      const ship = placedShips[index];
      ship.placeSelf(index, i => update(i), this.spawnRate());
    };

    update(0);
  }

  spawnRate(){
    const random = Math.random();
    const randomNum = random < 0.5 ? random * 100 : random * -100;
    return 200+ 2100/this.wave + randomNum;
  }


  checkForHit(letter, success){
    if(this.ship){
      this.targetHit(letter);
    } else {
      for (let i = 0; i < this.ships.length; i++) {
        let ship = this.ships[i];
        if(ship.word[0] === letter){
          this.ship = ship;
          this.registerHit(ship);
          cannon.aim(ship);
          // Break is necessary to avoid useless and potentially dangerous further checks
          break;
        }
      }
    }
  }

  targetHit(letter){
    if(this.ship.word[0] === letter){
      this.registerHit();
      cannon.aim(this.ship);
      if(!this.ship.word) {
        // Clear ship to unlock target
        this.ship = null;
      }
    } else {
      createjs.Sound.play('no', {volume: 2});
      this.ship.attachWord('#ef4721');
    }
  }

  isWaveOver(ship){
    // Remove ship from array once its been killed
    for (let i = 0; i < this.ships.length; i++) {
      if(this.ships[i] === ship) this.ships.splice(i,1);
    }
    if(!this.ships.length){
      this.startNextWave();
    }
  }

  startNextWave(){
    $('.wave-number').text(`Wave ${this.wave}`);
    $('.wave').addClass('hovered');
    setTimeout(() => {
      $('.wave').removeClass('hovered');
    }, 3000);
    this.setDifficulty();
    this.placeShips();
  }

  setDifficulty(){
    this.wave += 1;
    if(this.wave % 2 === 0){
      this.fleet += 1;
      this.max += 1;
    } else if(this.wave % 4 === 0) {
      this.min += 1;
    }
  }


  registerHit(ship){
    // Order of this two calls matters for some reason.
    // Targeting gets out of synch if jquery is first. Find out why!
    this.ship.word = this.ship.word.slice(1);
    $('#score').text(`${Number($('#score').text()) + 10}`);
    if(this.ship.word) this.ship.attachWord('#f7ffa0');
  }
}

export let mothership = new MotherShip();
