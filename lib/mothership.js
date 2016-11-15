/* eslint no-undef: "off", max-len: "off" */
import words from '../words';
import Ship from './ship';
import Cannon from './cannon';

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
    this.cannon = new Cannon();
    for (let i = 0; i < 4; i++) {
      let ship = new Ship(currentWords[i], this.cannon.position());
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
    return 200+ 2400/this.wave() + randomNum;
  }

  static checkForHit(letter, success){
    this.ships().forEach(ship => {
      if(ship.word[0] === letter){
        success();
        this.cannon.fire(ship, s => this.registerHit(s));
      }
    });
  }

  static registerHit(ship){
    ship.word = ship.word.slice(1);
    console.log(ship.word);
  }
}
