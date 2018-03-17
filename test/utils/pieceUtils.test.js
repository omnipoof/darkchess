import { createBoard } from '../../src/utils/boardCreationUtils';
import { promotePawn } from '../../src/utils/pieceUtils';
import { getBoardAsString } from '../../src/utils/testUtils';

describe('Piece Utils', () => {
  describe('Pawn Promotion', () => {
    describe('Promoting the Pawn', () => {

      let board;
      let history;
      let pawnSquare;
      
      beforeEach(() => {
        board = createBoard(['a8']);
        history = [{
          move: 'Start',
          board: createBoard(['a7']),
        }, {
          move: 'a8',
          board,
        }];
        pawnSquare = board[0][0];
      });
      
      it('Test promoting to rook', () => {
        promotePawn(board, history, pawnSquare, 'rook');
        expect(pawnSquare.piece.type).toBe('rook');
        expect(history.pop().move).toBe('a8R');
      });
      
      it('Test promoting to knight', () => {
        promotePawn(board, history, pawnSquare, 'knight');
        expect(pawnSquare.piece.type).toBe('knight');
        expect(history.pop().move).toBe('a8N');
      });
      
      it('Test promoting to bishop', () => {
        promotePawn(board, history, pawnSquare, 'bishop');
        expect(pawnSquare.piece.type).toBe('bishop');
        expect(history.pop().move).toBe('a8B');
      });
      
      it('Test promoting to queen', () => {
        promotePawn(board, history, pawnSquare, 'queen');
        expect(pawnSquare.piece.type).toBe('queen');
        expect(history.pop().move).toBe('a8Q');
      });

      it('Test promoting a black piece', () => {
        board = createBoard(['...a1']);
        history = [{
          move: 'Start',
          board: createBoard(['...a2']),
        }, {
          move: '...a1',
          board,
        }];
        pawnSquare = board[0][7];
        promotePawn(board, history, pawnSquare, 'queen');
        expect(pawnSquare.piece.type).toBe('queen');
        expect(history.pop().move).toBe('...a1Q');
      });
    });

    describe('Check and Checkmate Scenarios', () => {
      it('Test determining check scenario after promotion', () => {
        const board = createBoard(['a8', '...Kh8']);
        const history = [{
          move: 'Start',
          board: createBoard(['a7', '...Kh8']),
        }, {
          move: 'a8',
          board,
        }];
        const pawnSquare = board[0][0];
        promotePawn(board, history, pawnSquare, 'rook');
        expect(history.pop().move).toBe('a8R+');
      });

      it('Test determining checkmate scenario after promotion', () => {
        const board = createBoard(['a8', 'Rb7', '...Kh8']);
        const history = [{
          move: 'Start',
          board: createBoard(['a7', 'Rb7', '...Kh8']),
        }, {
          move: 'a8',
          board,
        }];
        const pawnSquare = board[0][0];
        promotePawn(board, history, pawnSquare, 'rook');
        expect(history.pop().move).toBe('a8R++');
      });
    });
  });
});
  