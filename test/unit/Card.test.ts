import Card from "../../src/Card";


test('Deve criar um cartão', () => {
    const card = new Card('Atividade 1', 3);
    expect(card.title).toBe('Atividade 1');
    expect(card.estimative).toBe(3);
})