import Piece from '../../../src/components/pieces/Piece';
import Queen from '../../../src/components/pieces/Queen';

class TestPiece extends Piece {

  constructor(player) {
    super('test-piece', player);
  }
}

describe('Board > Piece', () => {
  it('Test instantiating subclass piece', () => {
    try {
      const piece = new Queen('white');
    } catch (e) {
      expect(e).toBeFalsy();
    }
  });

  it('Test instantiating abstract piece', () => {
    try {
      const piece = new Piece('bishop', 'white');
    } catch (e) {
      expect(e).toBeTruthy();
      expect(e.message).toBe('Piece is an abstract class and cannot be instantiated.');
    }
  });

  it('Test instantiating piece without getValidMoves', () => {
    try {
      const piece = new TestPiece('white');
    } catch (e) {
      expect(e).toBeTruthy();
      expect(e.message).toBe('getValidMoves is an abstract method and must be implemented.');
    }
  });
});