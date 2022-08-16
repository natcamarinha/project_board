import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import BoardRepositoryDatabase from "../../src/infra/repository/BoardRepositoryDatabase";
import CardRepositoryDatabase from "../../src/infra/repository/CardRepositoryDatabase";
import ColumnRepositoryDatabase from "../../src/infra/repository/ColumnRepositoryDatabase";
import BoardService from "../../src/service/BoardService"

test('Deve listar os quadros', async () => {
  const connection = new PgPromiseConnection();
  const boardRepository = new BoardRepositoryDatabase(connection);
  const columnRepository = new ColumnRepositoryDatabase(connection);
  const cardRepository = new CardRepositoryDatabase(connection);
  const boardService = new BoardService(boardRepository, columnRepository, cardRepository);
  const boards = await boardService.getBoards();
  expect(boards).toHaveLength(1);
  const [board] = boards;
  expect(board.name).toBe('Projeto 1');
  await connection.close();
});

test('Deve retornar um quadro', async () => {
  const connection = new PgPromiseConnection();
  const boardRepository = new BoardRepositoryDatabase(connection);
  const columnRepository = new ColumnRepositoryDatabase(connection);
  const cardRepository = new CardRepositoryDatabase(connection);
  const boardService = new BoardService(boardRepository, columnRepository, cardRepository);
  const board = await boardService.getBoard(1);
  expect(board.name).toBe('Projeto 1');
  expect(board.columns).toHaveLength(3);
  const [a, b, c] = board.columns;
  expect(a.name).toBe('Coluna A');
  expect(b.name).toBe('Coluna B');
  expect(c.name).toBe('Coluna C');
  expect(a.estimative).toBe(6);
  expect(b.estimative).toBe(0);
  expect(c.estimative).toBe(0);
  expect(board.estimative).toBe(6);
  await connection.close();

})