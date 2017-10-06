import parseAlgebraicNotation from '../../src/utils/algebraicNotation';

describe('Algebraic Notation', () => {

  describe('Player Determination', () => {
    it('Test white player default', () => {
      const parseResults = parseAlgebraicNotation('a1');
      expect(parseResults.player).toBe('white');
    });

    it('Test black player notation', () => {
      const parseResults = parseAlgebraicNotation('...a1');
      expect(parseResults.player).toBe('black');
    });
  });

  describe('Piece Notation', () => {
    it('Test pawn notation', () => {
      const parseResults = parseAlgebraicNotation('a1');
      expect(parseResults.pieceType).toBe('pawn');
    });

    it('Test bishop notation', () => {
      const parseResults = parseAlgebraicNotation('Ba1');
      expect(parseResults.pieceType).toBe('bishop');
    });

    it('Test king notation', () => {
      const parseResults = parseAlgebraicNotation('Ka1');
      expect(parseResults.pieceType).toBe('king');
    });

    it('Test knight notation', () => {
      const parseResults = parseAlgebraicNotation('Na1');
      expect(parseResults.pieceType).toBe('knight');
    });

    it('Test rook notation', () => {
      const parseResults = parseAlgebraicNotation('Ra1');
      expect(parseResults.pieceType).toBe('rook');
    });

    it('Test queen notation', () => {
      const parseResults = parseAlgebraicNotation('Qa1');
      expect(parseResults.pieceType).toBe('queen');
    });
  });

  describe('Capture Notation', () => {
    it('Test non-pawn piece \'x\' capture notation', () => {
      const parseResults = parseAlgebraicNotation('Bxe5');
      expect(parseResults.isCapture).toBeTruthy();
    });

    it('Test non-pawn piece \':\' capture notation', () => {
      const parseResults = parseAlgebraicNotation('B:e5');
      expect(parseResults.isCapture).toBeTruthy();
    });

    it('Test non-pawn piece \':\' suffix capture notation', () => {
      const parseResults = parseAlgebraicNotation('Be5:');
      expect(parseResults.isCapture).toBeTruthy();
    });

    it('Test pawn piece \'x\' capture notation', () => {
      const parseResults = parseAlgebraicNotation('exd5');
      expect(parseResults.isCapture).toBeTruthy();
      expect(parseResults.file).toBe('d');
      expect(parseResults.rank).toBe(5);
    });

    it('Test pawn piece \':\' capture notation', () => {
      const parseResults = parseAlgebraicNotation('e:d5');
      expect(parseResults.isCapture).toBeTruthy();
      expect(parseResults.file).toBe('d');
      expect(parseResults.rank).toBe(5);
    });

    it('Test pawn piece \':\' suffix capture notation', () => {
      const parseResults = parseAlgebraicNotation('ed5:');
      expect(parseResults.isCapture).toBeTruthy();
      expect(parseResults.file).toBe('d');
      expect(parseResults.rank).toBe(5);
    });

    it('Test en passant capture notation', () => {
      const parseResults = parseAlgebraicNotation('exd5e.p.');
      expect(parseResults.isCapture).toBeTruthy();
      expect(parseResults.file).toBe('d');
      expect(parseResults.rank).toBe(5);
      expect(parseResults.isEnPassantCapture).toBeTruthy();
    });

    it('Test non-capture notation', () => {
      const parseResults = parseAlgebraicNotation('Be5');
      expect(parseResults.isCapture).toBeFalsy();
    });
  });

  describe('File and Rank Notation', () => {
    it('Test each board position\'s notation', () => {
      for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
        for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
          const file = String.fromCharCode('a'.charCodeAt(0) + fileIndex);
          const rank = rankIndex + 1;
          const parseResults = parseAlgebraicNotation(file.concat(rank));
          expect(parseResults.file).toBe(file);
          expect(parseResults.rank).toBe(rank);
          expect(parseResults.fileIndex).toBe(fileIndex);
          expect(parseResults.rankIndex).toBe(8 - rank);
        }
      }
    });
  });
});