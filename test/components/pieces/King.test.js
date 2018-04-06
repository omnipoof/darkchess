import { createInitialBoard } from '../../../src/utils/boardCreationUtils';
import { performMoves } from '../../../src/utils/testUtils';

describe('Board > Piece > King', () => {
  it('Test determining standard valid move scenarios', () => {
    const board = createInitialBoard();
    const moveResults = performMoves(board, [
      'e2e3',
      '...e7e6',
      'd2d3',
      '...f8b4',
      'd1d2',
      '...b4d2',
    ]);

    const updatedBoard = moveResults.board;
    const originSquare = updatedBoard[4][7];
    const king = originSquare.piece;
    const validMoves = king.getValidMoves(updatedBoard, originSquare, moveResults.history, true);
    expect(validMoves.length).toBe(3);
  });

  it('Test determining kingside castling valid move scenario', () => {
    const board = createInitialBoard();
    const moveResults = performMoves(board, [
      'g2g3',
      '...a7a6',
      'g1f3',
      '...b7b6',
      'f1h3',
      '...c7c6',
    ]);

    const updatedBoard = moveResults.board;
    const originSquare = updatedBoard[4][7];
    const king = originSquare.piece;
    const validMoves = king.getValidMoves(updatedBoard, originSquare, moveResults.history, true);
    expect(validMoves.length).toBe(2);
  });

  it('Test determining queenside castling valid move scenario', () => {
    const board = createInitialBoard();
    const moveResults = performMoves(board, [
      'd2d4',
      '...c7c5',
      'c1f4',
      '...b7b5',
      'b1a3',
      '...d7d5',
      'd1d3',
      '...a7a6',
    ]);

    const updatedBoard = moveResults.board;
    const originSquare = updatedBoard[4][7];
    const king = originSquare.piece;
    const validMoves = king.getValidMoves(updatedBoard, originSquare, moveResults.history, true);
    expect(validMoves.length).toBe(3);
  });

  it('Test determining black kingside castling valid move scenario', () => {
    const board = createInitialBoard();
    const moveResults = performMoves(board, [
      'g2g4',
      '...e7e5',
      'f2f4',
      '...f8c5',
      'e2e4',
      '...g8h6',
      'h2h4',    
    ]);

    const updatedBoard = moveResults.board;
    const originSquare = updatedBoard[4][0];
    const king = originSquare.piece;
    let validMoves = king.getValidMoves(updatedBoard, originSquare, moveResults.history, true);
    expect(validMoves.length).toBe(3);
    validMoves = king.getValidMoves(updatedBoard, originSquare, moveResults.history, true);
    expect(validMoves.length).toBe(3);
  });

  it('Test preventing castling due to check state', () => {
    const board = createInitialBoard();
    const moveResults = performMoves(board, [
      'g2g3',
      '...b8c6',
      'g1h3',
      '...c6d4',
      'f1g2',
      '...d4f3',
    ]);

    const updatedBoard = moveResults.board;
    const originSquare = updatedBoard[4][7];
    const king = originSquare.piece;
    const validMoves = king.getValidMoves(updatedBoard, originSquare, moveResults.history, true);
    expect(validMoves.length).toBe(1);
  });

  it('Test preventing kingside castling due to king passing through checked square', () => {
    const board = createInitialBoard();
    const moveResults = performMoves(board, [
      'g2g3',
      '...b8c6',
      'g1h3',
      '...c6e5',
      'f1g2',
      '...e5c4',
      'a2a3',
      '...c4e3',
    ]);

    const updatedBoard = moveResults.board;
    const originSquare = updatedBoard[4][7];
    const king = originSquare.piece;
    const validMoves = king.getValidMoves(updatedBoard, originSquare, moveResults.history, true);
    expect(validMoves.length).toBe(0);
  });

  it('Test preventing queenside castling due to king passing through checked square', () => {
    const board = createInitialBoard();
    const moveResults = performMoves(board, [
      'e2e4',
      '...d7d5',
      'd1h5',
      '...d5e4',
      'd2d3',
      '...e4d3',
      'f1d3',
      '...d8d7',
      'd3e4',
      '...d7d6',
      'c1f4',
      '...d6d5',
      'b1a3',
      '...d5d4',
    ]);

    const updatedBoard = moveResults.board;
    const originSquare = updatedBoard[4][7];
    const king = originSquare.piece;
    const validMoves = king.getValidMoves(updatedBoard, originSquare, moveResults.history, true);
    expect(validMoves.length).toBe(2);
  });

  it('Test preventing kingside castling due to king ending on checked square', () => {
    const board = createInitialBoard();
    const moveResults = performMoves(board, [
      'g2g3',
      '...g8f6',
      'g1h3',
      '...f6e4',
      'f1g2',
      '...e4g5',
      'a2a3',
      '...g5h3',
    ]);

    const updatedBoard = moveResults.board;
    const originSquare = updatedBoard[4][7];
    const king = originSquare.piece;
    const validMoves = king.getValidMoves(updatedBoard, originSquare, moveResults.history, true);
    expect(validMoves.length).toBe(1);
  });

  it('Test preventing queenside castling due to king ending on checked square', () => {
    const board = createInitialBoard();
    const moveResults = performMoves(board, [
      'c2c4',
      '...d7d5',
      'c4d5',
      '...d8d5',
      'd1b3',
      '...d5c4',
      'd2d4',
      '...c7c5',
      'c1f4',
      '...e7e5',
      'b1a3',
      '...e5f4',
    ]);

    const updatedBoard = moveResults.board;
    const originSquare = updatedBoard[4][7];
    const king = originSquare.piece;
    const validMoves = king.getValidMoves(updatedBoard, originSquare, moveResults.history, true);
    expect(validMoves.length).toBe(2);
  });

  it('Test preventing castling due to king having already moved', () => {
    const board = createInitialBoard();
    const moveResults = performMoves(board, [
      'g2g3',
      '...a7a6',
      'g1f3',
      '...b7b6',
      'f1h3',
      '...c7c6',
      'e1f1',
      '...d7d6',
      'f1e1',
      '...e7e6',
    ]);

    const updatedBoard = moveResults.board;
    const originSquare = updatedBoard[4][7];
    const king = originSquare.piece;
    const validMoves = king.getValidMoves(updatedBoard, originSquare, moveResults.history, true);
    expect(validMoves.length).toBe(1);
  });

  it('Test preventing castling due to rook having already moved', () => {
    const board = createInitialBoard();
    const moveResults = performMoves(board, [
      'g2g3',
      '...a7a6',
      'g1f3',
      '...b7b6',
      'f1h3',
      '...c7c6',
      'h1g1',
      '...d7d6',
      'g1h1',
      '...e7e6',
    ]);

    const updatedBoard = moveResults.board;
    const originSquare = updatedBoard[4][7];
    const king = originSquare.piece;
    const validMoves = king.getValidMoves(updatedBoard, originSquare, moveResults.history, true);
    expect(validMoves.length).toBe(1);
  });
});