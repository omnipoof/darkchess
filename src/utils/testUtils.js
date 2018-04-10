import { parseAlgebraicNotation } from './algebraicNotation';
import {
  cloneBoard,
  reflectBoardForDisplay,
  getSquaresForPlayersPieces,
} from './boardUtils';
import { promotePawn } from './pieceUtils';

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
  const history = [{
    move: 'Start',
    board,
  }];
  moves.forEach((move) => {
    const {
      player,
      pieceType,
      fileIndex,
      rankIndex,
      originFileIndex: parsedOriginFileIndex,
      originRankIndex: parsedOriginRankIndex,
      promotedPieceType,
    } = parseAlgebraicNotation(move);

    let originFileIndex = parsedOriginFileIndex;
    let originRankIndex = parsedOriginRankIndex;
    if (originFileIndex === undefined || originRankIndex === undefined) {
      // Find the squares that contain a piece for the player of the given type
      const squares = getSquaresForPlayersPieces(board, player, pieceType).filter((square) => {
        // Filter out any squares that do not match the parsed origin file or rank,
        // or whose valid moves do not include the destination square
        if (originFileIndex && square.fileIndex !== originFileIndex) {
          return false;
        }

        if (originRankIndex && square.rankIndex !== originRankIndex) {
          return false;
        }

        const validMoves = square.piece.getValidMoves(board, square, history, true);
        return validMoves.some(validMove => (
          validMove.destinationFileIndex === fileIndex && validMove.destinationRankIndex === rankIndex
        ));
      });

      // Only one square will be left after processing the valid moves against
      // the parsed origin file and rank
      originFileIndex = squares[0].fileIndex;
      originRankIndex = squares[0].rankIndex;
    }

    const originSquare = board[originFileIndex][originRankIndex];
    const destinationSquare = board[fileIndex][rankIndex];
    const moveInfo = originSquare.piece.move(board, originSquare, destinationSquare, history, true);
    history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });

    // Promote the pawn if applicable
    if (promotedPieceType) {
      promotePawn(board, history, destinationSquare, promotedPieceType);
    }
  });

  return {
    board,
    history,
  };
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
