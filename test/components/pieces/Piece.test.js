import { createBoard } from '../../../src/utils/boardCreationUtils';
import { performMoves } from '../../../src/utils/testUtils';
import { parseAlgebraicNotation } from '../../../src/utils/algebraicNotation';
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
      expect(e.message).toBe('getOptimisticValidMoves is an abstract method and must be implemented.');
    }
  });

  it('Test filtering valid moves if they will create a check state', () => {
    const board = createBoard([
      '...Ba1',
      'Kh8',
      'f6',
    ]);
    const originSquare = board[5][2];
    let validMoves = originSquare.piece.getValidMoves(board, originSquare, [], false);
    expect(validMoves.length).toBe(2);
    validMoves = originSquare.piece.getValidMoves(board, originSquare, [], true);
    expect(validMoves.length).toBe(0);
  });

  it('Test moving piece', () => {
    const board = createBoard([
      'Be4',
    ]);
    const moveResults = performMoves(board, [ 'e4f5' ]);
    expect(moveResults.history[0].move).toBe('Bf5');
  });

  it('Test moving piece into check state', () => {
    const board = createBoard([
      'Be4',
      '...Kc8',
    ]);
    const moveResults = performMoves(board, [ 'e4f5' ]);
    const moveInfo = parseAlgebraicNotation(moveResults.history[0].move);
    expect(moveInfo.isCheck).toBeTruthy();
  });

  it('Test moving piece exposing check state', () => {
    const board = createBoard([
      'Qb1',
      'Rc3',
      '...Kh8',
    ]);
    const moveResults = performMoves(board, [ 
      'b1b2',
      '...h8g7',
      'c3c4',
    ]);
    let moveInfo = parseAlgebraicNotation(moveResults.history[0].move);
    expect(moveInfo.isCheck).toBeFalsy();
    moveInfo = parseAlgebraicNotation(moveResults.history[2].move);
    expect(moveInfo.isCheck).toBeTruthy();
  });
});