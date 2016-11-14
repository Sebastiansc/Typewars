import Board from './board';

export default class Game {
  constructor(stage){
    this.board = new Board(stage);
    this.play();
  }

  welcome(){

  }

  play(){
    // Remove welcome screen
    this.board.show();
  }

  pause(){

  }
}
