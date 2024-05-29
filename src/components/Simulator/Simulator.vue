<script setup>
import SimulatorCell from './SimulatorCell.vue'
</script>
<template>
  <div class="grid" 
    :style="gridStyle">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex">
      <SimulatorCell
        v-bind:row="row"
        v-bind:rowIndex="rowIndex"
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        v-bind:cell="cell"
        v-bind:cellIndex="cellIndex"
        :isAliveParent="getCell(cellIndex, rowIndex)"
        @update:isAlive="updateCell(cellIndex, rowIndex, $event)"
      />
    </div>
  </div>
  <button @click="nextGeneration">Génération Suivante</button>
  <button @click="toggleSimulation">{{ isRunning ? 'Stop' : 'Play' }}</button>
  <button @click="resetSimulation">Reset</button>
  <p>{{  nbGeneration }}</p>
</template>

<script>
export default {
  components: {
    SimulatorCell
  },
  data() {
    return {
      x: 10,
      y: 10,
      grid: [],
      nextGrid: [],
      intervalId: null,
      isRunning : false,
      nbGeneration: 0
    }
  },
  computed: {
    count() {
      return this.x * this.y
    },
    gridStyle() {
      return {
        'grid-template-columns': `repeat(${this.x}, 25px)`
      };
    }
  },
  methods: {
    toggleSimulation(){
      if(this.isRunning){
        this.stopSimulation();
      }
      else{
        this.startSimulation();
      }
      this.isRunning = !this.isRunning
    },
    nextGeneration() {
      this.nextGrid = JSON.parse(JSON.stringify(this.grid))
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          let cellsAroundAlive = 0
          //console.log(this.grid[i][j])
          cellsAroundAlive = this.countCellsAroundAlive(i, j, cellsAroundAlive)
          if (this.grid[i][j] === false) {
            this.nextGrid[i][j] = this.willBeBorn(cellsAroundAlive)
          } else {
            this.nextGrid[i][j] = this.willBeDie(cellsAroundAlive)
          }
        }
      }
      this.nbGeneration++
      this.grid = JSON.parse(JSON.stringify(this.nextGrid))
    },
    resetSimulation() {
      if(this.isRunning){
        this.toggleSimulation()
      }
      for (let i = 0; i < this.x; i++) {
        for (let j = 0; j < this.y; j++) {
          this.grid[i][j] = false
        }
      }
      this.nbGeneration = 0
    },
    startSimulation() {
      if (this.intervalId === null) {
        this.intervalId = setInterval(this.nextGeneration, 200) // Changez 1000 pour ajuster le délai en millisecondes
      }
    },
    stopSimulation() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    countCellsAroundAlive(col, row, cellsAroundAlive) {
      const directions = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0 ],          [1, 0 ],
        [-1, 1 ], [0, 1 ], [1, 1 ]
      ];
        directions.forEach(([dCol, dRow]) => {
        const newCol = col + dCol;
        const newRow = row + dRow;
        if (
          newCol >= 0 && newCol < this.grid.length &&
          newRow >= 0 && newRow < this.grid[newCol].length &&
          this.grid[newCol][newRow] === true
        ) {
          cellsAroundAlive++;
        }
      });
      return cellsAroundAlive
    },
    willBeDie(cellsAroundAlive) {
      if (cellsAroundAlive < 2 || cellsAroundAlive > 3) {
        return false
      } else {
        return true
      }
    },
    willBeBorn(cellsAroundAlive) {
      // Test si nombre de celulle est suffisant
      if (cellsAroundAlive === 3) {
        return true
      } else {
        return false
      }
    },
    updateCell(rowIndex, collIndex, isAlive) {
      //console.log('row index : ' + rowIndex)
      //console.log('col index : ' + collIndex)
      // Mettre à jour l'état de la cellule dans la grille
      this.grid[rowIndex][collIndex] = isAlive
    },
    createArray(cols, rows) {
      let arr = new Array(cols)
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
      }
      return arr
    },
    getCell(rowIndex, cellIndex) {
      //console.log('getCell : ', this.grid[rowIndex][cellIndex])
      return this.grid[rowIndex][cellIndex]
    }
  },
  created() {
    // Appeler createArray pour initialiser grid
    this.grid = this.createArray(this.x, this.y)
    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.y; j++) {
        this.grid[i][j] = false
      }
    }
  },
  beforeDestroy() {
    // Assurez-vous d'arrêter l'intervalle lorsque le composant est détruit
    this.stopSimulation()
  }
}
</script>

<style scoped>
.grid {
  display: grid;
}
</style>
