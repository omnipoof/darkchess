import { parseAlgebraicNotation } from './algebraicNotation';
import { cloneBoard, reflectBoardForDisplay } from './boardUtils';

const pieceTypeToLetterMap = {
  bishop: 'b',
  king: 'k',
  knight: 'n',
  rook: 'r',
  queen: 'q',
  pawn: 'p',
};

export const performMoves = (initialBoard, moves) => {
  const board = cloneBoard(initialBoard);
  const history = [];
  moves.forEach((move) => {
    const {
      currentPlayer,
      pieceType,
      fileIndex,
      rankIndex,
      originFileIndex,
      originRankIndex,
    } = parseAlgebraicNotation(move);

    const originSquare = board[originFileIndex][originRankIndex];
    const destinationSquare = board[fileIndex][rankIndex];
    const moveInfo = originSquare.piece.move(board, originSquare, destinationSquare, history);
    history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
  });

  return {
    board,
    history,
  }
};

export const getBoardAsString = (board) => {
  const reflectedBoard = reflectBoardForDisplay(board);
  let boardString = ' ';
  for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
    boardString += String.fromCharCode('A'.charCodeAt(0) + fileIndex);
  }
  boardString += '\n';

  for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
    boardString += 8 - fileIndex;
    for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
      const piece = reflectedBoard[fileIndex][rankIndex].piece;
      let pieceChar = '-';
      if (piece) {
        pieceChar = pieceTypeToLetterMap[piece.type];
        if (piece.player === 'black') {
          pieceChar = pieceChar.toUpperCase();
        }
      }

      boardString += pieceChar;
    }

    if (fileIndex < 7) {
      boardString += '\n';
    }
  }
  return boardString;
};
