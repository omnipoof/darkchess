export const boardSize = 8;

export const UP = 1;
export const LEFT = 2;
export const RIGHT = 4;
export const DOWN = 8;

export const cloneBoard = (board) => {
  return board.map(array => array.slice().map(({ piece, fileIndex, rankIndex }) => (
    {
      piece,
      fileIndex,
      rankIndex,
    }
  )));
};

export const reflectBoardForDisplay = (board) => {
  let fileIndex, rankIndex;
  const newBoard = Array(8);
  for (fileIndex = 0; fileIndex < 8; fileIndex++) {
      newBoard[fileIndex] = Array(8);
      for (rankIndex = 0; rankIndex < 8; rankIndex++) {
          newBoard[fileIndex][rankIndex] = null;
      }
  }

  for (fileIndex = 0; fileIndex < 8; fileIndex++) {
      for (rankIndex = 0; rankIndex < 8; rankIndex++) {
          newBoard[rankIndex][fileIndex] = board[fileIndex][rankIndex];
      }
  }

  return newBoard;
}

export const isPositionOnBoard = (position) => {
  const { fileIndex, rankIndex } = position;
  return fileIndex >= 0 && fileIndex < boardSize && rankIndex >= 0 && rankIndex < boardSize;
};

export const isPositionLandable = (board, position, currentPlayer) => {

  if (isPositionOnBoard(position)) {
    const { fileIndex, rankIndex } = position;
    const square = board[fileIndex][rankIndex];
    return square.piece === null || square.piece.player !== currentPlayer;
  }
  
  return false;
};

export const getAdjacentPosition = (position, direction) => {

  const { fileIndex, rankIndex } = position;
  const newPosition = {
    fileIndex: fileIndex + (direction & LEFT ? -1 : (direction & RIGHT ? 1 : 0)),
    rankIndex: rankIndex + (direction & UP ? -1 : (direction & DOWN ? 1 : 0)),
  };

  return isPositionOnBoard(newPosition) ? newPosition : null;
};

export const getValidMovesInDirection = (board, currentPosition, direction, currentPlayer, recurse, validMoves) => {
  
  const nextPosition = getAdjacentPosition(currentPosition, direction);
  if (nextPosition !== null) {
    const square = board[nextPosition.fileIndex][nextPosition.rankIndex];
    if (isPositionLandable(board, nextPosition, currentPlayer)) {
      validMoves.push(nextPosition);
      if (recurse && square.piece === null) {
        return getValidMovesInDirection(board, nextPosition, direction, currentPlayer, recurse, validMoves);
      }
    }
  }

  return validMoves;
};

export const getValidMovesInDirections = (board, position, directions, currentPlayer, recurse = true) => {

  const validMoves = [];
  directions.forEach((direction) => {
    getValidMovesInDirection(board, position, direction, currentPlayer, recurse, validMoves);
  });

  return validMoves;
};

export const getValidMovesForAllPlayersPieces = (board, history, player) => {
  let allValidMoves = [];
  for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
    for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
      const square = board[fileIndex][rankIndex];
      const piece = square.piece;
      if (piece && piece.player === player) {
        allValidMoves = allValidMoves.concat(piece.getValidMoves(board, square, history).map((validMove) => (
          {
            originSquare: square,
            destinationSquare: validMove,
          }
        )));
      }
    }
  }

  return allValidMoves;
};

export const getPlayersKingSquare = (board, player) => {
  for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
    for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
      const square = board[fileIndex][rankIndex];
      const piece = square.piece;
      if (piece && piece.type === 'king' && piece.player === player) {
        return square;
      }
    }
  }

  return null;
};

export const isPlayersKingInCheck = (board, history, player) => {
  // Find if opponent's king's square is a valid move for any of the current player's pieces
  const kingSquare = getPlayersKingSquare(board, player);
  if (kingSquare) { // King may not be present during testing
    const opponent = player === 'white' ? 'black' : 'white';
    const allValidMoves = getValidMovesForAllPlayersPieces(board, history, opponent);
    return allValidMoves.some((validMove) => (
      validMove.destinationSquare.fileIndex === kingSquare.fileIndex &&
      validMove.destinationSquare.rankIndex === kingSquare.rankIndex
    ));
  }

  return false;
};

export const isPlayersKingInCheckAfterMove = (originSquare, destinationSquare, board, history, player) => {
  const clonedBoard = cloneBoard(board);
  const clonedOriginSquare = clonedBoard[originSquare.fileIndex][originSquare.rankIndex];
  const clonedDestinationSquare = clonedBoard[destinationSquare.fileIndex][destinationSquare.rankIndex];
  const clonedHistory = history.slice();
  const moveInfo = originSquare.piece.move(clonedBoard, clonedOriginSquare, clonedDestinationSquare, clonedHistory);
  return isPlayersKingInCheck(moveInfo.board, history, player);
};

export const isPlayersKingCheckmated = (board, history, player) => {
  const allValidMoves = getValidMovesForAllPlayersPieces(board, history, player);
  return allValidMoves.length === 0 || allValidMoves.every(({ originSquare, destinationSquare }) => {
    return isPlayersKingInCheckAfterMove(originSquare, destinationSquare, board, history, player);
  });
}
