const pieceTypeMap = {
  B: 'bishop',
  K: 'king',
  N: 'knight',
  R: 'rook',
  Q: 'queen',
};

export default function parseAlgebraicNotation(algebraicNotation) {

  let position = 0;
  let player = 'white';
  if (algebraicNotation.startsWith('...')) {
    player = 'black';
    position += 3;
  }

  // Determine piece type
  let pieceType = 'pawn';
  let character = algebraicNotation.charAt(position);
  if (Object.keys(pieceTypeMap).some( pieceLetter => pieceLetter === character )) {
    pieceType = pieceTypeMap[character];
    position++;
  }

  // Ignore pawn origin file if capturing
  if (pieceType === 'pawn' && (
    isCaptureNotation(algebraicNotation, position + 1) ||
      isNaN(algebraicNotation.charAt(position + 1))
  )) {
    position++;
  }

  // Determine if capture occurring by non-pawn piece
  let isCapture = isCaptureNotation(algebraicNotation, position);
  if (isCapture) {
    position++;
  }

  // Determine file
  const file = algebraicNotation.charAt(position);
  const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
  position++;

  // Determine rank
  const rank = parseInt(algebraicNotation.charAt(position), 10);
  const rankIndex = 8 - rank;
  position++;

  // Determine if capture occuring
  const captureSuffix = algebraicNotation.charAt(position);
  if (captureSuffix === ':') {
    isCapture = true;
  }

  const isEnPassantCapture = algebraicNotation.endsWith('e.p.');

  return {
    player,
    pieceType,
    isCapture,
    isEnPassantCapture,
    file,
    fileIndex,
    rank,
    rankIndex,
  };
}

const isCaptureNotation = (algebraicNotation, position) => {
  const character = algebraicNotation.charAt(position);
  return character === 'x' || character === ':';
};