import Column from "../../src/Column";

test('Deve criar uma coluna', () => {
    const column = new Column('Coluna A', true);
    expect(column.name).toBe('Coluna A');
    expect(column.hasEstimative).toBeTruthy();
})