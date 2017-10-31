const pieceLetterToTypeMap = {
  B: 'bishop',
  K: 'king',
  N: 'knight',
  R: 'rook',
  Q: 'queen',
};

const pieceTypeToLetterMap = {};
Object.keys(pieceLetterToTypeMap).forEach(key => pieceTypeToLetterMap[pieceLetterToTypeMap[key]] = key);

export function parseAlgebraicNotation(algebraicNotation) {

  let position = 0;
  let player = 'white';
  if (algebraicNotation.startsWith('...')) {
    player = 'black';
    position += 3;
  }

  // Determine piece type
  let pieceType = 'pawn';
  let character = algebraicNotation.charAt(position);
  if (Object.keys(pieceLetterToTypeMap).some( pieceLetter => pieceLetter === character )) {
    pieceType = pieceLetterToTypeMap[character];
    position++;
  }

  // Determine pawn origin file if capturing
  let previousFileIndex = null;
  if (pieceType === 'pawn' && (
    isCaptureNotation(algebraicNotation, position + 1) ||
      isNaN(algebraicNotation.charAt(position + 1))
  )) {
    const previousFile = algebraicNotation.charAt(position);
    previousFileIndex = previousFile.charCodeAt(0) - 'a'.charCodeAt(0);
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
    previousFileIndex,
  };
}

const isCaptureNotation = (algebraicNotation, position) => {
  const character = algebraicNotation.charAt(position);
  return character === 'x' || character === ':';
};

export function writeAlgebraicNotation({
  player,
  pieceType,
  isCapture,
  isEnPassantCapture,
  fileIndex,
  rankIndex,
  previousFileIndex,
}) {

  const playerPrefix = player === 'white' ? '' : '...';
  const file = String.fromCharCode('a'.charCodeAt(0) + fileIndex);
  const rank = 8 - rankIndex;
  const captureNotation = isCapture ? 'x' : '';

  if (pieceType === 'pawn') {
    const previousFile = isCapture ? String.fromCharCode('a'.charCodeAt(0) + previousFileIndex) : '';
    const enPassantCaptureNotation = isEnPassantCapture ? 'e.p.' : '';
    return `${ playerPrefix }${ previousFile }${ captureNotation }${ file }${ rank }${ enPassantCaptureNotation }`;
  } else {
    const pieceLetter = pieceTypeToLetterMap[pieceType];
    return `${ playerPrefix }${ pieceLetter }${ captureNotation }${ file }${ rank }`;
  }
}