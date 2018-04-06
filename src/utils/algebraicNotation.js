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

  // Potential values obtained from the remaining characters
  let player = 'white';
  let pieceType= 'pawn';
  let file, fileIndex;
  let rank, rankIndex;
  let originFileIndex;
  let originRankIndex;
  let isCapture = false;
  let isEnPassantCapture = false;
  let promotedPieceType = null;
  let hasCastled = false;
  let isCheck = false;
  let isCheckmate = false;

  // Determine check and checkmate status
  algebraicNotation = algebraicNotation.split('+');
  if (algebraicNotation.length >= 2) {
    isCheck = true;
    if (algebraicNotation.length === 3) {
      isCheckmate = true;
    }
  }
  algebraicNotation = algebraicNotation[0];

  // Determine player
  algebraicNotation = algebraicNotation.split('...');
  if (algebraicNotation.length === 2) {
    player = 'black';
    algebraicNotation = algebraicNotation[1];
  } else {
    algebraicNotation = algebraicNotation[0];
  }

  // Determine en passant status
  algebraicNotation = algebraicNotation.split('e.p.');
  if (algebraicNotation.length === 2) {
    isCapture = true;
    isEnPassantCapture = true;
  }
  algebraicNotation = algebraicNotation[0];

  // Determine castling status
  if (algebraicNotation === '0-0' || algebraicNotation === '0-0-0') {
    hasCastled = true;
    pieceType = 'king';
    file = algebraicNotation === '0-0' ? 'g' : 'c';
    fileIndex = getFileIndex(file);
    rank = player === 'white' ? 1 : 8;
    rankIndex = getRankIndex(rank);
  }

  if (!hasCastled) {
    // Determine piece type
    let character = algebraicNotation.charAt(0);
    if (Object.keys(pieceLetterToTypeMap).some( pieceLetter => pieceLetter === character )) {
      pieceType = pieceLetterToTypeMap[character];
      algebraicNotation = algebraicNotation.substr(1);
    }

    // Determine if pawn was promoted
    character = algebraicNotation.charAt(algebraicNotation.length - 1);
    if (pieceType === 'pawn' && Object.keys(pieceLetterToTypeMap).includes(character)) {
      promotedPieceType = pieceLetterToTypeMap[character];
      algebraicNotation = algebraicNotation.substr(0, algebraicNotation.length - 1);
    }

    algebraicNotation.split('').forEach((character) => {
      if (isFileNotation(character)) {
        if (file) {
          originFileIndex = fileIndex;
        }
        file = character;
        fileIndex = getFileIndex(file);
      } else if (isRankNotation(character)) {
        if (rank) {
          originRankIndex = rankIndex;
        }
        rank = parseRank(character);
        rankIndex = getRankIndex(rank);
      } else if (isCaptureNotation(character)) {
        isCapture = true;
      } else {
        throw new Error(`Invalid Algebraic Notation: Expected file, rank, or capture notation; found '${ character }' instead`);
      }
    });
  }

  return {
    player,
    pieceType,
    isCapture,
    isEnPassantCapture,
    promotedPieceType,
    hasCastled,
    isCheck,
    isCheckmate,
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
  hasCastled,
  isCapture,
  isEnPassantCapture,
  promotedPieceType,
  isCheck,
  isCheckmate,
  fileIndex,
  rankIndex,
  originFileIndex,
  originRankIndex,
}) {
  const playerPrefix = player === 'black' ? '...' : '';
  const file = String.fromCharCode('a'.charCodeAt(0) + fileIndex);
  const rank = 8 - rankIndex;
  const captureNotation = isCapture ? 'x' : '';
  const checkNotation = isCheck ? '+' : '';
  const checkmateNotation = isCheckmate ? '+' : '';

  // Disambiguate piece origin
  const originFile = originFileIndex !== undefined ? String.fromCharCode('a'.charCodeAt(0) + originFileIndex) : '';
  const originRank = originRankIndex !== undefined ? 8 - originRankIndex : '';

  let algebraicNotation;
  if (pieceType === 'pawn') {
    const enPassantCaptureNotation = isEnPassantCapture ? 'e.p.' : '';
    const promotedPieceTypeNotation = promotedPieceType ? pieceTypeToLetterMap[promotedPieceType] : '';
    algebraicNotation = `${ playerPrefix }${ originFile }${ captureNotation }${ file }${ rank }${ promotedPieceTypeNotation }${ enPassantCaptureNotation }${ checkNotation }${ checkmateNotation }`;
  } else if (hasCastled) {
    const castlingNotation = fileIndex === 2 ? '0-0-0' : '0-0';
    algebraicNotation = `${ playerPrefix }${ castlingNotation }${ checkNotation }${ checkmateNotation }`;
  } else {
    const pieceLetter = pieceTypeToLetterMap[pieceType];
    algebraicNotation = `${ playerPrefix }${ pieceLetter }${ originFile }${ originRank }${ captureNotation }${ file }${ rank }${ checkNotation }${ checkmateNotation }`;
  }

  return algebraicNotation;
}

const isFileNotation = (character) => {
  const charCode = character.charCodeAt(0);
  const aCharCode = 'a'.charCodeAt(0);
  const hCharCode = 'h'.charCodeAt(0);
  return charCode >= aCharCode && charCode <= hCharCode;
};

const isRankNotation = (character) => {
  const value = parseInt(character, 10);
  return Number.isInteger(value) && value >= 1 && value <= 8;
};

const isCaptureNotation = (character) => {
  return character === 'x';
};

const parseRank = (character) => {
  return parseInt(character, 10);
};

const getFileIndex = (file) => {
  return file.charCodeAt(0) - 'a'.charCodeAt(0);
};

const getRankIndex = (rank) => {
  return 8 - rank;
};
