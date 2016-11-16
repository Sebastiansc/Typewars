/* eslint no-undef: "off", max-len: "off" */
import words from '../words';
import Ship from './ship';
import {cannon} from './cannon';
import {selectWords} from './utility';

class MotherShip{
  constructor(){
    this.wave = 5;
    this.ships = [];
    this.words = words;
    // this.maxLength = 4;
    // this.minLength = 2;
  }

  placeShips(gameOver){
    const currentWords = selectWords(this.words, 4);
    for (let i = 0; i < 4; i++) {
      let ship = new Ship(currentWords[i], cannon.position());
      this.ships.push(ship);
    }

    const update = index => {
      if(this.ships.length === index) return;
      const ship = this.ships[index];
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
      if(i === this.ships.length - 1) this.checkStatus();
      if(ship.word[0] === letter && this.isTarget(i)){
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
