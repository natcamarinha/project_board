export default class Column {
  constructor(readonly name: string, readonly hasEstimative: true) {
		if (name === '') throw new Error('Name is required');	
  }
}