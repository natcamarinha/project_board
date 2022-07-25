import pgp from "pg-promise";
import Board from "../entity/Board";

export default class BoardService {
  constructor() {

  }

  async getBoards() {
    const connection = pgp()("postgres://postgres:123@localhost:5432");
    const boardsData = await connection.query('select * from board', []);
    const boards: Board[] = [];
    for (const boardData of boardsData) {
      boards.push(new Board(boardData.name));
    }
    await connection.$pool.end();
    return boards;
  };
};