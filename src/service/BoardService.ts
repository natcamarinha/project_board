import Board from "../domain/entity/Board";
import BoardRepository from "../domain/repository/BoardRepository";
import CardRepository from "../domain/repository/CardRepository";
import ColumnRepository from "../domain/repository/ColumnRepository";

export default class BoardService {
  constructor(
    readonly boardRepository: BoardRepository,
    readonly columnRepository: ColumnRepository,
    readonly cardRepository: CardRepository
  ) {
  }

  async getBoards(): Promise<Board[]> {
    const boards = await this.boardRepository.findAll();
    return boards;
  };

  async getBoard(idBoard: number): Promise<GetBoardOutput> {
    const board = await this.boardRepository.get(idBoard);
    const output: GetBoardOutput = {
      name: board.name,
      estimative: 0,
      columns: []
    }
    const columns = await this.columnRepository.findAllByIdBoard(idBoard);
    for (const column of columns) {
      let estimative = 0;
      const cards = await this.cardRepository.findAllByIdColumn(column.idColumn);
      for (const card of cards) {
        estimative += card.estimative;
      }
      output.estimative += estimative;
      output.columns.push({
        name: column.name,
        hasEstimative: column.hasEstimative,
        estimative,
        cards: []
      })
    }
    return output;
  }
};

type GetBoardOutput = {
  name: string,
  estimative: number,
  columns: {
    name: string,
    estimative: number,
    hasEstimative: boolean,
    cards: {
      title: string,
      estimative: number
    }[]
  }[]
}