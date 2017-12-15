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

  // String cursor position
  let position = -1;

  // Potential values obtained from the remaining characters
  let player = 'white';
  let file, fileIndex;
  let rank, rankIndex;
  let originFile, originFileIndex;
  let originRank, originRankIndex;
  let isCapture = false;
  let isEnPassantCapture = false;
  let isCheck = false;

  algebraicNotation = algebraicNotation.split('+');
  if (algebraicNotation.length === 2) {
    isCheck = true;
  }
  algebraicNotation = algebraicNotation[0];

  algebraicNotation = algebraicNotation.split('...');
  if (algebraicNotation.length === 2) {
    player = 'black';
    algebraicNotation = algebraicNotation[1];
  } else {
    algebraicNotation = algebraicNotation[0];
  }

  algebraicNotation = algebraicNotation.split('e.p.');
  if (algebraicNotation.length === 2) {
    isCapture = true;
    isEnPassantCapture = true;
  }
  algebraicNotation = algebraicNotation[0];

  // Determine piece type
  let pieceType= 'pawn';
  let character = algebraicNotation.charAt(0);
  if (Object.keys(pieceLetterToTypeMap).some( pieceLetter => pieceLetter === character )) {
    pieceType = pieceLetterToTypeMap[character];
    algebraicNotation = algebraicNotation.substr(1);
  }

  algebraicNotation.split('').forEach((character) => {
    if (isFileNotation(character)) {
      if (file) {
        originFile = file;
        originFileIndex = fileIndex;
      }
      file = character;
      fileIndex = getFileIndex(file);
    } else if (isRankNotation(character)) {
      if (rank) {
        originRank = rank;
        originRankIndex = rankIndex;
      }
      rank = parseRank(character);
      rankIndex = getRankIndex(rank);
    } else if (isCaptureNotation(character)) {
      isCapture = true;
    } else {
      throw `Invalid Algebraic Notation: Expected file, rank, or capture notation; found '${ character }' instead`;
    }
  });

  return {
    player,
    pieceType,
    isCapture,
    isEnPassantCapture,
    isCheck,
    file,
    fileIndex,
    rank,
    rankIndex,
    originFileIndex,
    originRankIndex,
  };
}

export function writeAlgebraicNotation({
  player,
  pieceType,
  isCapture,
  isEnPassantCapture,
  isCheck,
  fileIndex,
  rankIndex,
  originFileIndex,
  originRankIndex,
}) {
  const playerPrefix = player === 'white' ? '' : '...';
  const file = String.fromCharCode('a'.charCodeAt(0) + fileIndex);
  const rank = 8 - rankIndex;
  const captureNotation = isCapture ? 'x' : '';
  const checkNotation = isCheck ? '+' : '';

  // Disambiguate piece origin
  const originFile = originFileIndex !== undefined ? String.fromCharCode('a'.charCodeAt(0) + originFileIndex) : '';
  const originRank = originRankIndex !== undefined ? 8 - originRankIndex : '';

  let algebraicNotation;
  if (pieceType === 'pawn') {
    const enPassantCaptureNotation = isEnPassantCapture ? 'e.p.' : '';
    algebraicNotation = `${ playerPrefix }${ originFile }${ captureNotation }${ file }${ rank }${ enPassantCaptureNotation }${ checkNotation }`;
  } else {
    const pieceLetter = pieceTypeToLetterMap[pieceType];
    algebraicNotation = `${ playerPrefix }${ pieceLetter }${ originFile }${ originRank }${ captureNotation }${ file }${ rank }${ checkNotation }`;
  }

  return algebraicNotation;
}

const isFileNotation = (character) => {
  const charCode = character.charCodeAt(0);
  const aCharCode = 'a'.charCodeAt(0);
  const hCharCode = 'h'.charCodeAt(0);
  return charCode >= aCharCode && charCode <= hCharCode;
}

const isRankNotation = (character) => {
  const value = parseInt(character, 10);
  return Number.isInteger(value) && value >= 1 && value <= 8;
}

const isCaptureNotation = (character) => {
  return character === 'x';
};

const parseRank = (character) => {
  return parseInt(character, 10);
}

const getFileIndex = (file) => {
  return file.charCodeAt(0) - 'a'.charCodeAt(0);
}

const getRankIndex = (rank) => {
  return 8 - rank;
}
