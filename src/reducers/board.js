import { createInitialBoard } from '../utils/boardCreationUtils';
import { cloneBoard, getValidMovesForAllPlayersPieces, getPlayersKingSquare } from '../utils/boardUtils';
import { promotePawn } from '../utils/pieceUtils';
import { parseAlgebraicNotation } from '../utils/algebraicNotation';

import { INITIALIZE_BOARD, SELECT_SQUARE, END_TURN, START_TURN, PROMOTE_PAWN } from '../actions';

const createInitialState = () => {
  const board = createInitialBoard();
  const history = [{
    move: 'Start',
    board,
  }];

  const pieces = {
    white: [],
    black: [],
  };
  for (let rankIndex = 0; rankIndex <= 1; rankIndex++) {
    for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
      pieces['black'].push(board[fileIndex][rankIndex].piece);
      pieces['white'].push(board[fileIndex][rankIndex + 6].piece);
    }
  }

  return {
    board,
    pieces,
    selectedSquare: null,
    validMoveSquares: [],
    allValidMoveSquares: getValidMovesForAllPlayersPieces(board, history, 'white', true),
    currentPlayer: 'white',
    hasMoved: false,
    history,
  };
};

const boardState = (state = createInitialState(), action) => {
  const { board, pieces, selectedSquare, validMoveSquares, allValidMoveSquares, currentPlayer, hasMoved, hasEndedTurn, isCheck, isCheckmate, threatenedKingColor, history } = state;
  const newState = { board: cloneBoard(board), pieces, selectedSquare, validMoveSquares, allValidMoveSquares, currentPlayer, hasMoved, hasEndedTurn, isCheck, isCheckmate, threatenedKingColor, history };

  switch (action.type) {
    case INITIALIZE_BOARD:
      return createInitialState();
    case SELECT_SQUARE: {
      if (hasMoved) {
        // Viewing the board after moving a piece and waiting for the turn to end
        break;
      }

      const opponentsKingSquare = getPlayersKingSquare(newState.board, currentPlayer);
      if (!opponentsKingSquare) {
        // Opponent's king has been captured
        break;
      }

      const { square } = action;

      if (selectedSquare) {

        if (selectedSquare.fileIndex === square.fileIndex && selectedSquare.rankIndex === square.rankIndex) {
          // If the same square is selected, deselect the square
          newState.selectedSquare = null;
          newState.validMoveSquares = [];
        } else if (selectedSquare.piece && square.piece && selectedSquare.piece.player === square.piece.player) {
          // If a square with another of the player's pieces is selected, select the square
          newState.selectedSquare = square;
          newState.validMoveSquares = getValidMovesFromSquare(board, square, history);
        } else if (validMoveSquares.some(validMoveSquare => (
          square.fileIndex === validMoveSquare.destinationFileIndex &&
          square.rankIndex === validMoveSquare.destinationRankIndex
        ))) {
          // If a valid move square is selected, move the piece, deselect the square, change players, and update the history
          const moveInfo = selectedSquare.piece.move(
            newState.board,
            newState.board[selectedSquare.fileIndex][selectedSquare.rankIndex],
            newState.board[square.fileIndex][square.rankIndex],
            newState.history,
            true // Determine the checkmate state
          );

          newState.selectedSquare = null;
          newState.validMoveSquares = [];
          newState.isCheck = moveInfo.isCheck;
          newState.isCheckmate = moveInfo.isCheckmate;
          newState.threatenedKingColor = (moveInfo.isCheck || moveInfo.isCheckmate) && moveInfo.player === 'white' ? 'black' : 'white';
          newState.history.push({
            move: moveInfo.algebraicNotation,
            board: newState.board,
          });

          const capturedPiece = moveInfo.capturedPiece;
          if (capturedPiece) {
            for (let index = 0; index < 16; index++) {
              const piece = newState.pieces[capturedPiece.player][index];
              if (piece.id.equals(capturedPiece.id)) {
                piece.isCaptured = true;
              }
            }
          }

          if (newState.board[square.fileIndex][square.rankIndex].piece.type === 'pawn' &&
              square.rankIndex === (currentPlayer === 'white' ? 0 : 7)
          ) {
            newState.squareToPromote = newState.board[square.fileIndex][square.rankIndex];
          } else {
            newState.allValidMoveSquares = getValidMovesForAllPlayersPieces(newState.board, newState.history, newState.currentPlayer, true);
            newState.hasMoved = true;
          }
        }
      } else if (square.piece && currentPlayer === square.piece.player) {
        newState.selectedSquare = square;
        newState.validMoveSquares = getValidMovesFromSquare(board, square, history);
      }

      break;
    }
    case END_TURN: {
      newState.hasEndedTurn = true;
      break;
    }
    case START_TURN: {
      // Switch to the next player
      newState.currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
      newState.allValidMoveSquares = getValidMovesForAllPlayersPieces(newState.board, newState.history, newState.currentPlayer, true);
      newState.hasMoved = false;
      newState.hasEndedTurn = false;
      break;
    }
    case PROMOTE_PAWN: {
      // Promote the pawn on the given square
      const { square: { fileIndex, rankIndex }, pieceType } = action;
      const pawn = newState.board[fileIndex][rankIndex].piece;
      promotePawn(newState.board, newState.history, newState.board[fileIndex][rankIndex], pieceType);

      // Update the piece management collection
      const newPiece = newState.board[fileIndex][rankIndex].piece;
      newState.pieces[currentPlayer] = newState.pieces[currentPlayer].map(piece => piece.id === pawn.id ? newPiece : piece);

      // Get whether the opponent's king is in check or checkmate
      const algebraicNotation = newState.history[newState.history.length - 1].move;
      const moveInfo = parseAlgebraicNotation(algebraicNotation);
      newState.isCheck = moveInfo.isCheck;
      newState.isCheckmate = moveInfo.isCheckmate;
      newState.threatenedKingColor = (moveInfo.isCheck || moveInfo.isCheckmate) && moveInfo.player === 'white' ? 'black' : 'white';
      newState.allValidMoveSquares = getValidMovesForAllPlayersPieces(newState.board, newState.history, newState.currentPlayer, true);
      newState.hasMoved = true;
      break;
    }
    default:
      // No default
  }

  return newState;
};

const getValidMovesFromSquare = (board, square, history) => {
  const piece = square.piece;
  return piece ? piece.getValidMoves(board, square, history, true) : [];
};

export default boardState;
