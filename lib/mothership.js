/* eslint no-undef: "off", max-len: "off" */
import words from '../words';
import Ship from './ship';
import {cannon} from './cannon';
import {selectWords} from './utility';

class MotherShip{
  constructor(){
    this.wave = 1;
    this.ships = [];
    this.max = 4;
    this.min = 2;
    this.fleet = 3;
  }

  placeShips(gameOver){
    // debugger;
    window.mothership = mothership;
    const currentWords = selectWords(words, this.fleet, this.min, this.max);
    for (let i = 0; i < this.fleet; i++) {
      let ship = new Ship(currentWords[i], cannon.position());
      this.ships.push(ship);
    }
    // debugger;

    const placedShips = this.ships.slice();
    const update = index => {
      if(index > placedShips.length - 1) return;
      const ship = placedShips[index];
      ship.placeSelf(index, i => update(i), this.spawnRate(), gameOver);
    };

    update(0);
  }

  spawnRate(){
    const random = Math.random();
    const randomNum = random < 0.5 ? random * 100 : random * -100;
    return 200+ 2100/this.wave + randomNum;
  }


  checkForHit(letter, success){
    for (let i = 0; i < this.ships.length; i++) {
      let ship = this.ships[i];
      this.checkStatus();
      console.log(`Target: ${this.targeted}. Index: ${i}, Letter: ${letter}`);
      if(ship.word[0] === letter && this.isTarget(i)){
        // debugger;
        this.targeted = !this.targeted ? i : this.targeted;
        cannon.aim(ship);
      }
    }
  }

  checkStatus(){
    if(this.status === 'destroyed'){
      this.targeted = undefined;
      this.status = '';
    }
  }

  isTarget(i){
    return (this.targeted === i || this.targeted === undefined);
  }

  isWaveOver(ship){
    for (var i = 0; i < this.ships.length; i++) {
      if(this.ships[i] === ship) this.ships.splice(i,1);
    }
    if(!this.ships.length){
      console.log("starting next wave");
      this.startNextWave();
    }
  }

  startNextWave(){
    this.setDifficulty();
    this.placeShips();
  }

  setDifficulty(){
    this.wave += 1;
    if(this.wave % 3 === 0){
      this.fleet += 1;
      this.max += 1;
    } else if(this.wave % 6 === 0) {
      this.min += 1;
    }
  }


  registerHit(ship){
    ship.word = ship.word.slice(1);
    if(!ship.word){
      this.status = 'destroyed';
    } else {
      ship.attachWord();
    }
  }
}

export let mothership = new MotherShip();
