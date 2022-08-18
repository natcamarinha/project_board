<script>
import axios from 'axios';
export default {
  data() {
    return {
      board: {},
      columnName: '',
      cardTitle: ''
    }
  },
  methods: {
    addColumn(columnName) {
      this.board.columns.push({ name: columnName, cards: [] })
    },
    addCard(column, cardTitle) {
      column.cards.push({ title: cardTitle, estimative: 3 });
      column.estimative += 3;
    },
    increaseEstimative(card) {
			card.estimative++;
		}
  },
  computed: {
    boardEstimative() {
			return this.board.columns.reduce((total: number, column: any) => {
		total += column.cards.reduce((total: number, card: any) => {
			total += card.estimative;
			return total;
		}, 0);
		return total;
	}, 0);
  },
  async mounted() {
    const response = await axios({
      url: 'http://localhost:3001/boards/1',
      method: 'get'
    });
    this.board = response.data
  }
}
</script>

<template>
  <h3>{{ board.name }} {{ boardEstimative }}</h3>
  <div class="columns">
    <div class="column" v-for="column in board.columns">
      <h3>{{ column.name }} {{ column.estimative }}</h3>
      <div class="card" v-for="card in column.cards">
        {{ card.title }} {{ card.estimative }}
        <br/>
				<button @click="increaseEstimative(card)">+</button><button>-</button>
      </div>
      <div class="card new-card">
        <input type="text" v-model="cardTitle" />
        <button v-on:click="addCard(column, cardTitle)">Add</button>
      </div>
    </div>
    <div class="column new-column">
      {{ columnName }}
      <input type="text" v-model="columnName" />
      <button v-on:click="addColumn(columnName)">Add</button>
    </div>
  </div>
</template>

<style scoped>
.columns {
  display: flex;
  flex-direction: row;
}
.column {
  width: 200px;
  text-align: center;
  background-color: #ccc;
  margin-right: 5px;
  padding: 10px;
  border: 1px solid #000;
}
.new-column {
  background-color: #eee;
  border: 1px dashed #ccc;
  display: block;
}
.card {
  text-align: center;
  width: 100%;
  height: 80px;
  background-color: #f3e779;
  border: 1px solid #000;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.new-card {
  background-color: #eee;
  border: 1px dashed #ccc;
  display: block;
}
</style>
