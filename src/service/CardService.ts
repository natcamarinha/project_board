import pgp from "pg-promise";
import Card from "../entity/Card";

export default class CardService {
  constructor() {

  }

  async getCards(idColumn: number) {
    const connection = pgp()("postgres://postgres:123@localhost:5432");
    const cardsData = await connection.query('select * from card where id_column = $1', [idColumn]);
    const cards: Card[] = [];
    for (const cardData of cardsData) {
      cards.push(new Card(cardData.title, cardData.estimative));
    }
    await connection.$pool.end();
    return cards;
  }
}