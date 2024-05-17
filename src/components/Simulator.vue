<script setup>
import SimulatorCell from './SimulatorCell.vue'
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
        :isAliveParent="getCell(cellIndex, rowIndex)"
        @update:isAlive="updateCell(cellIndex, rowIndex, $event)"
      />
    </div>
  </div>
  <button @click="nextGeneration">Génération Suivante</button>
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
      nextGrid: []
    }
  },
  computed: {
    count() {
      return this.x * this.y
    }
  },
  methods: {
    nextGeneration() {
      this.nextGrid = JSON.parse(JSON.stringify(this.grid))
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          let cellsAroundAlive = 0
          //console.log(this.grid[i][j])
          if (this.grid[i][j] === false) {
            this.nextGrid[i][j] = this.willBeBorn(i, j, cellsAroundAlive)
          }
        }
      }
      console.log('Grid normal : ')
      console.table(this.grid)
      console.log('Prochaine grid : ')
      console.table(this.nextGrid)
      this.grid = JSON.parse(JSON.stringify(this.nextGrid))
    },
    willBeBorn(col, row, cellsAroundAlive) {
      if (col > 0 && row > 0) {
        if (this.grid[col - 1][row - 1] === true) {
          cellsAroundAlive++
        }
      }
      if (row > 0) {
        if (this.grid[col][row - 1] === true) {
          cellsAroundAlive++
        }
      }
      if (col < this.grid.length - 1 && row > 0) {
        if (this.grid[col + 1][row - 1] === true) {
          cellsAroundAlive++
        }
      }
      if (col > 0) {
        if (this.grid[col - 1][row] === true) {
          cellsAroundAlive++
        }
      }
      if (col < this.grid.length - 1) {
        if (this.grid[col + 1][row] === true) {
          cellsAroundAlive++
        }
      }

      if (row < this.grid[col].length - 1 && col > 0) {
        if (this.grid[col - 1][row + 1] === true) {
          cellsAroundAlive++
        }
      }

      if (row < this.grid[col].length - 1) {
        if (this.grid[col][row + 1] === true) {
          cellsAroundAlive++
        }
      }
      if (row < this.grid[col].length - 1 && col < this.grid.length - 1) {
        if (this.grid[col + 1][row + 1] === true) {
          cellsAroundAlive++
        }
      }

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
  }
}
</script>

<style scoped>
.grid {
  display: grid;
}
</style>
