import Board from "../src/entities/Board";

test('Deve criar um quadro', () => {
  const board = new Board('Projeto 1');
  expect(board.name).toBe('Projeto 1');
  expect(board.columns).toHaveLength(0);
  expect(board.getEstimative()).toBe(0);
});

test('Deve criar um quadro com 3 colunas e cartões', () => {
  const board = new Board('Projeto 1');
  board.addColumn('Todo', true);
  board.addColumn('Doing', false);
  board.addColumn('Done', false);
  board.addCard('Todo', 'Atividade 1', 3);
  board.addCard('Todo', 'Atividade 2', 2);
  board.addCard('Todo', 'Atividade 3', 1);
  expect(board.getEstimative()).toBe(6);
});