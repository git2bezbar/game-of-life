
<script setup>
import SimulatorCell from "./SimulatorCell.vue"
</script>
<template>
  <div class="grid" :style="{ 'grid-template-columns': 'repeat(' + x + ', 50px)' }">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex">
      <SimulatorCell 
        v-bind:row="row"
        v-bind:rowIndex="rowIndex"
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        v-bind:cell="cell"
        v-bind:cellIndex="cellIndex"
        :initialIsAlive="false" 
        @update:isAlive="updateCell(index, $event)"
      />
    </div>
    
  </div>
  <button @click="nextGeneration">Génération Suivante</button>
</template>

<script>
export default {
  components:{
    SimulatorCell
  },
	data() {
		return {
      x:10,
			y:10,
      grid: []
		}
	},
  computed:{
    count(){
      return this.x*this.y
    }
  },
  methods:{
    nextGeneration(){
      const SimulatorCellComponent = this.$options.components.SimulatorCell;
      console.table(this.grid);
    },
    updateCell(index, isAlive) {
      // Mettre à jour l'état de la cellule dans la grille
      this.grid[index].isAlive = isAlive;
    },
    createArray(cols, rows){
      let arr = new Array(cols);
      for(let i = 0; i<arr.length; i++){
        arr[i] = new Array(rows)
      }
      return arr
    }
  },
  created() {
    // Appeler createArray pour initialiser grid
    this.grid = this.createArray(this.x, this.y);
    for(let i = 0; i<this.x; i++){
      for(let j = 0; j<this.y; j++){
        this.grid[i][j] = false
      }
    }
  }
}
</script>

<style scoped>
.grid{
  display: grid;
}
</style>
