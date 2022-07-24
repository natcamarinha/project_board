import Card from "../../src/Card";


test('Deve criar um cartão', () => {
  const card = new Card('Atividade 1', 3);
  expect(card.title).toBe('Atividade 1');
  expect(card.estimative).toBe(3);
})

test('Não deve criar cartão sem título', () => {
  expect(() => new Card('', 3)).toThrow(new Error('Title is required'));
})