export const getPieceImage = (piece) => {
  return require(`../images/pieces/${ piece.player }/${ piece.type }.svg`);
};
