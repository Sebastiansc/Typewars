/* eslint no-undef: "off", max-len: "off" */
import words from '../words';
import Ship from './ship';

export default class MotherShip{
  constructor(wave) {
    this.wave = wave;
    this.ships = [];
    this.words = words;
  }

  placeShips(){
    const currentWords = ['hello', 'hey', 'you', 'simple'];
    for (let i = 0; i < 4; i++) {
      let ship = new Ship(currentWords[i]);
      this.ships.push(ship);
    }

    const update = index => {
      if(index === this.ships.length) return;
      const ship = this.ships[index];
      setTimeout(() => ship.placeSelf(index, i => update(i)), this.spawnRate());
    };

    update(0);
  }

  spawnRate(){
    const random = Math.random();
    const randomNum = random < 0.5 ? random * 100 : random * -100;
    return 200+ 2400/this.wave + randomNum;
  }
}
