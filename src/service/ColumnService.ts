import pgp from "pg-promise";
import Column from "../entity/Column";

export default class ColumnService {
  constructor() {

  }

  async getColumns(idBoard: number) {
    const connection = pgp()("postgres://postgres:123@localhost:5432");
    const columnsData = await connection.query('select * from board_column where id_board = $1', [idBoard]);
    const columns: Column[] = [];
    for (const columnData of columnsData) {
      columns.push(new Column(columnData.name, columnData.has_estimative));
    }
    await connection.$pool.end();
    return columns;
  };
};