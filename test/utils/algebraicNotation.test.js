import {
  parseAlgebraicNotation,
  writeAlgebraicNotation,
} from '../../src/utils/algebraicNotation';

describe('Parsing Algebraic Notation', () => {

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
    it('Test non-pawn piece capture notation', () => {
      const parseResults = parseAlgebraicNotation('Bxe5');
      expect(parseResults.isCapture).toBeTruthy();
    });

    it('Test pawn piece capture notation', () => {
      const parseResults = parseAlgebraicNotation('exd5');
      expect(parseResults.isCapture).toBeTruthy();
      expect(parseResults.file).toBe('d');
      expect(parseResults.rank).toBe(5);
    });

    it('Test en passant capture notation', () => {
      const parseResults = parseAlgebraicNotation('exd5e.p.');
      expect(parseResults.isCapture).toBeTruthy();
      expect(parseResults.isEnPassantCapture).toBeTruthy();
      expect(parseResults.file).toBe('d');
      expect(parseResults.rank).toBe(5);
      expect(parseResults.originFileIndex).toBe(4);
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

  describe('Invalid Algebraic Notation', () => {
    it('Test invalid character during file/rank/capture notation parsing', () => {
      try {
        const previousCharCode = String.fromCharCode('a'.charCodeAt(0) - 1);
        const parseResults = parseAlgebraicNotation(`B${ previousCharCode }5`);
      } catch (e) {
        expect(e.startsWith('Invalid')).toBeTruthy();
      }

      try {
        const parseResults = parseAlgebraicNotation('Bj5');
      } catch (e) {
        expect(e.startsWith('Invalid')).toBeTruthy();
      }

      try {
        const parseResults = parseAlgebraicNotation('B 5');
      } catch (e) {
        expect(e.startsWith('Invalid')).toBeTruthy();
      }

      try {
        const parseResults = parseAlgebraicNotation('Be0');
      } catch (e) {
        expect(e.startsWith('Invalid')).toBeTruthy();
      }

      try {
        const parseResults = parseAlgebraicNotation('Be9');
      } catch (e) {
        expect(e.startsWith('Invalid')).toBeTruthy();
      }
    });
  });
});

describe('Writing Algebraic Notation', () => {
  describe('Writing Non-Pawn Algebraic Notation', () => {
    it('Test basic notation', () => {
      const writeResults = writeAlgebraicNotation({
        player: 'white',
        pieceType: 'bishop',
        fileIndex: 4,
        rankIndex: 4,
      });
      expect(writeResults).toBe('Be4');
    });

    it('Test black player notation', () => {
      const writeResults = writeAlgebraicNotation({
        player: 'black',
        pieceType: 'bishop',
        fileIndex: 4,
        rankIndex: 4,
      });
      expect(writeResults).toBe('...Be4');
    });

    it('Test disambiguous file notation', () => {
      const writeResults = writeAlgebraicNotation({
        player: 'white',
        pieceType: 'bishop',
        originFileIndex: 3,
        fileIndex: 4,
        rankIndex: 4,
      });
      expect(writeResults).toBe('Bde4');
    });

    it('Test disambiguous rank notation', () => {
      const writeResults = writeAlgebraicNotation({
        player: 'white',
        pieceType: 'bishop',
        originRankIndex: 3,
        fileIndex: 4,
        rankIndex: 4,
      });
      expect(writeResults).toBe('B5e4');
    });

    it('Test disambiguous file and rank notation', () => {
      const writeResults = writeAlgebraicNotation({
        player: 'white',
        pieceType: 'bishop',
        originFileIndex: 3,
        originRankIndex: 3,
        fileIndex: 4,
        rankIndex: 4,
      });
      expect(writeResults).toBe('Bd5e4');
    });

    it('Test disambiguous file and rank notation with zero indices', () => {
      const writeResults = writeAlgebraicNotation({
        player: 'white',
        pieceType: 'bishop',
        originFileIndex: 0,
        originRankIndex: 0,
        fileIndex: 4,
        rankIndex: 4,
      });
      expect(writeResults).toBe('Ba8e4');
    });

    it('Test capture notation', () => {
      const writeResults = writeAlgebraicNotation({
        player: 'white',
        pieceType: 'bishop',
        fileIndex: 4,
        rankIndex: 4,
        isCapture: true,
      });
      expect(writeResults).toBe('Bxe4');
    });
  });

  describe('Writing Pawn Algebraic Notation', () => {
    it('Test basic notation', () => {
      const writeResults = writeAlgebraicNotation({
        player: 'white',
        pieceType: 'pawn',
        fileIndex: 4,
        rankIndex: 4,
      });
      expect(writeResults).toBe('e4');
    });

    it('Test pawn capture notation', () => {
      const writeResults = writeAlgebraicNotation({
        player: 'white',
        pieceType: 'pawn',
        fileIndex: 4,
        rankIndex: 4,
        isCapture: true,
        originFileIndex: 3,
      });
      expect(writeResults).toBe('dxe4');
    });

    it('Test en passant pawn capture notation', () => {
      const writeResults = writeAlgebraicNotation({
        player: 'white',
        pieceType: 'pawn',
        fileIndex: 4,
        rankIndex: 4,
        isCapture: true,
        isEnPassantCapture: true,
        originFileIndex: 3,
      });
      expect(writeResults).toBe('dxe4e.p.');
    });
  });
});

describe('Parsing and Writing Algebraic Notation', () => {
  it('Test restoring board positions', () => {
    for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
      for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
        const file = String.fromCharCode('a'.charCodeAt(0) + fileIndex);
        const rank = rankIndex + 1;
        const position = file.concat(rank);
        expect(writeAlgebraicNotation(parseAlgebraicNotation(position))).toBe(position);
      }
    }
  });

  it('Test restoring black piece notation', () => {
    expect(writeAlgebraicNotation(parseAlgebraicNotation('...Ba8'))).toBe('...Ba8');
  });

  it('Test restoring non-pawn piece position', () => {
    expect(writeAlgebraicNotation(parseAlgebraicNotation('Ba8'))).toBe('Ba8');
  });

  it('Test restoring capture notation', () => {
    expect(writeAlgebraicNotation(parseAlgebraicNotation('Bxa8'))).toBe('Bxa8');
  });

  it('Test restoring pawn capture notation', () => {
    expect(writeAlgebraicNotation(parseAlgebraicNotation('exd4'))).toBe('exd4');
  });

  it('Test restoring pawn en passant capture notation', () => {
    expect(writeAlgebraicNotation(parseAlgebraicNotation('exd4e.p.'))).toBe('exd4e.p.');
  });

  it('Test restoring file disambiguation notation', () => {
    expect(writeAlgebraicNotation(parseAlgebraicNotation('Bab5'))).toBe('Bab5');
  });

  it('Test restoring rank disambiguation notation', () => {
    expect(writeAlgebraicNotation(parseAlgebraicNotation('B1b5'))).toBe('B1b5');
  });

  it('Test restoring file and rank disambiguation notation', () => {
    expect(writeAlgebraicNotation(parseAlgebraicNotation('Ba1b5'))).toBe('Ba1b5');
  });
});
