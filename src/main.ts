import express from "express";
import pgp from "pg-promise";

const app = express();
const connection = pgp()("postgres://postgres:123@localhost:5432");

app.get('/boards', async (req, res) => {
  const boards = await connection.query('select * from board', []);
  console.log(boards);
  
  res.json(boards);
});

app.get('/boards/:idBoard/columns', async (req, res) => {
  const columns = await connection.query('select * from board_column where id_board = $1', [req.params.idBoard]);
  console.log(columns);
  
  res.json(columns);
});

app.get('/boards/:idBoard/columns/:idColumn/cards', async (req, res) => {
  const cards = await connection.query('select * from card where id_column = $1', [req.params.idColumn]);
  console.log(cards);
  
  res.json(cards);
});

app.listen(3000);
