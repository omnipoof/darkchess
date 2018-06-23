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
      new Queen('white');
    } catch (e) {
      expect(e).toBeFalsy();
    }
  });

  it('Test instantiating abstract piece', () => {
    try {
      new Piece('bishop', 'white');
    } catch (e) {
      expect(e).toBeTruthy();
      expect(e.message).toBe('Piece is an abstract class and cannot be instantiated.');
    }
  });

  it('Test instantiating piece without getValidMoves', () => {
    try {
      new TestPiece('white');
    } catch (e) {
      expect(e).toBeTruthy();
      expect(e.message).toBe('getOptimisticValidMoves is an abstract method and must be implemented.');
    }
  });

  it('Test not filtering valid moves if they will create a check state', () => {
    const board = createBoard([
      '...Ba1',
      'Kh8',
      'f6',
    ]);
    const originSquare = board[5][2];
    let validMoves = originSquare.piece.getValidMoves(board, originSquare, [], false);
    expect(validMoves.length).toBe(2);
    validMoves = originSquare.piece.getValidMoves(board, originSquare, [], true);
    expect(validMoves.length).toBe(2);
  });

  it('Test moving piece', () => {
    const board = createBoard([
      'Be4',
      '...Kc7',
    ]);
    const moveResults = performMoves(board, [ 'e4f5' ]);
    expect(moveResults.history[1].move).toBe('Bf5');
  });

  it('Test moving piece into check state', () => {
    const board = createBoard([
      'Be4',
      '...Kc8',
    ]);
    const moveResults = performMoves(board, [ 'e4f5' ]);
    const moveInfo = parseAlgebraicNotation(moveResults.history[1].move);
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
    let moveInfo = parseAlgebraicNotation(moveResults.history[1].move);
    expect(moveInfo.isCheck).toBeFalsy();
    moveInfo = parseAlgebraicNotation(moveResults.history[3].move);
    expect(moveInfo.isCheck).toBeTruthy();
  });

  it('Test moving piece into checkmate state', () => {
    const board = createBoard([
      'Be4',
      '...b8',
      '...b7',
      '...c7',
      '...Bd8',
      '...Kc8',
    ]);
    const moveResults = performMoves(board, [ 'e4f5' ]);
    const moveInfo = parseAlgebraicNotation(moveResults.history[1].move);
    expect(moveInfo.isCheck).toBeTruthy();
    expect(moveInfo.isCheckmate).toBeTruthy();
  });

  it('Test moving piece into check state but another piece can intercept', () => {
    const board = createBoard([
      'Be4',
      '...b8',
      '...b7',
      '...c7',
      '...Rd8',
      '...Kc8',
    ]);
    const moveResults = performMoves(board, [ 'e4f5' ]);
    const moveInfo = parseAlgebraicNotation(moveResults.history[1].move);
    expect(moveInfo.isCheck).toBeTruthy();
    expect(moveInfo.isCheckmate).toBeFalsy();
  });

  it('Test moving piece into check state but another piece can capture checker', () => {
    const board = createBoard([
      'Bd5',
      '...b8',
      '...b7',
      '...c7',
      '...Nd8',
      '...Kc8',
    ]);
    const moveResults = performMoves(board, [ 'd5e6' ]);
    const moveInfo = parseAlgebraicNotation(moveResults.history[1].move);
    expect(moveInfo.isCheck).toBeTruthy();
    expect(moveInfo.isCheckmate).toBeFalsy();
  });

  it('Test moving piece with another piece in the same file', () => {
    const board = createBoard(['Rb7', 'Rb5']);
    const moveResults = performMoves(board, ['b7b6']);
    const moveInfo = parseAlgebraicNotation(moveResults.history[1].move);
    expect(moveInfo.originFileIndex).toBeFalsy();
    expect(moveInfo.originRankIndex).toBe(1);
  });

  it('Test moving piece with another piece in the same rank', () => {
    const board = createBoard(['Rb7', 'Rd7']);
    const moveResults = performMoves(board, ['b7c7']);
    const moveInfo = parseAlgebraicNotation(moveResults.history[1].move);
    expect(moveInfo.originFileIndex).toBe(1);
    expect(moveInfo.originRankIndex).toBeFalsy();
  });

  it('Test moving piece with another piece not in the same file or rank that can move there too', () => {
    const board = createBoard(['Rb7', 'Rc6']);
    const moveResults = performMoves(board, ['b7b6']);
    const moveInfo = parseAlgebraicNotation(moveResults.history[1].move);
    expect(moveInfo.originFileIndex).toBe(1);
    expect(moveInfo.originRankIndex).toBeFalsy();
  });

  it('Test moving piece with several pieces that can move there too', () => {
    const board = createBoard(['Rb7', 'Rb5', 'Rc6']);
    const moveResults = performMoves(board, ['b7b6']);
    const moveInfo = parseAlgebraicNotation(moveResults.history[1].move);
    expect(moveInfo.originFileIndex).toBe(1);
    expect(moveInfo.originRankIndex).toBe(1);
  });
});