import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import CardRepositoryDatabase from "../../src/infra/repository/CardRepositoryDatabase";
import CardService from "../../src/service/CardService";

test("Deve listar os cartões", async () => {
	const connection = new PgPromiseConnection();
	const cardRepository = new CardRepositoryDatabase(connection);
	const cardService = new CardService(cardRepository);
	const columns = await cardService.getCards(1);
	expect(columns).toHaveLength(3);
	await connection.close();
});