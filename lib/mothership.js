/* eslint no-undef: "off", max-len: "off" */
import words from '../words';
import Ship from './ship';
import {cannon} from './cannon';

const WAVE = 1,
      SHIPS = [],
      WORDS = words;

export default class MotherShip{
  static wave(){
    return WAVE;
  }

  static ships(){
    return SHIPS;
  }

  static words(){
    return words;
  }

  static add(ship){
    SHIPS.push(ship);
  }

  static placeShips(){
    const currentWords = ['hello', 'okay', 'you', 'simple'];
    for (let i = 0; i < 4; i++) {
      let ship = new Ship(currentWords[i], cannon.position());
      this.add(ship);
    }

    const update = index => {
      if(this.ships().length === index) return;
      const ship = this.ships()[index];
      ship.placeSelf(index, i => update(i), this.spawnRate());
    };

    update(0);
  }

  static spawnRate(){
    const random = Math.random();
    const randomNum = random < 0.5 ? random * 100 : random * -100;
    return 200+ 2100/this.wave() + randomNum;
  }


  static checkForHit(letter, success){
    for (let i = 0; i < this.ships().length; i++) {
      let ship = this.ships()[i];
      if(i === this.ships().length - 1) this.checkStatus();
      if(ship.word[0] === letter && this.isTarget(i)){
        this.targeted = !this.targeted ? i : this.targeted;
        success();
        cannon.fire(ship, s => this.registerHit(s));
      }
    }
  }

  static checkStatus(){
    if(this.status === 'destroyed'){
      this.targeted = undefined;
      this.status = '';
    }
  }

  static isTarget(i){
    return (this.targeted === i || this.targeted === undefined);
  }

  static registerHit(ship){
    ship.word = ship.word.slice(1);
    if(!ship.word){
      this.status = 'destroyed';
    } else {
      ship.attachWord();
    }
  }
}
