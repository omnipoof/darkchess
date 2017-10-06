class Piece {

  constructor(type, player) {
        
    if (new.target === Piece) {
      throw new TypeError('Piece is an abstract class and cannot be instantiated.');
    }
    this.enforceMethodAbstraction('getValidMoves');

    this.type = type;
    this.player = player;
  }

  enforceMethodAbstraction(methodName) {
    if (this[methodName] === undefined) {
      throw new TypeError(`${ methodName } is an abstract method and must be implemented.`);
    }
  }
}

export default Piece;