import ColumnRepository from "../domain/repository/ColumnRepository";

export default class ColumnService {
  constructor(readonly columnRepository: ColumnRepository) {

  }

  async getColumns(idColumn: number) {
    const columns = this.columnRepository.findAllByIdBoard(idColumn)
    return columns;
  };
};