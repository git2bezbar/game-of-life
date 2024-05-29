<script setup>
import SimulatorCell from './SimulatorCell.vue'
</script>
<template>
  <div class="grid" 
    :style="gridStyle">
    <div v-for="(col, colIndex) in grid" :key="colIndex">
      <SimulatorCell
        v-bind:col="col"
        v-bind:colIndex="colIndex"
        v-for="(cell, rowIndex) in col"
        :key="rowIndex"
        v-bind:cell="cell"
        v-bind:rowIndex="rowIndex"
        :isAliveParent="getCell(colIndex, rowIndex)"
        @update:isAlive="updateCell(colIndex, rowIndex, $event)"
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
      y: 5,
      grid: [],
      nextGrid: [],
      intervalId: null,
      isRunning : false,
      nbGeneration: 0
    }
  },
  computed: {
    gridStyle() {
      // Style pour la grille
      return {
        'grid-template-columns': `repeat(${this.x}, 25px)`
      };
    }
  },
  methods: {
    toggleSimulation(){
      // Toggle le bouton play & start
      if(this.isRunning){
        this.stopSimulation();
      }
      else{
        this.startSimulation();
      }
      this.isRunning = !this.isRunning
    },
    nextGeneration() {
      // Génére la prochaine génération
      this.nextGrid = JSON.parse(JSON.stringify(this.grid))
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          let cellsAroundAlive = 0
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
      // Met à l'état initial la simulation
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
      // Débute les génération automatique
      if (this.intervalId === null) {
        this.intervalId = setInterval(this.nextGeneration, 200) // Changez 1000 pour ajuster le délai en millisecondes
      }
    },
    stopSimulation() {
      // Stop les génération automatique
      if (this.intervalId !== null) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    countCellsAroundAlive(col, row, cellsAroundAlive) {
      // Compteur du nombre de cellule vivante autour de la cellule
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
      // Test pour la suppresion de la cellule
      if (cellsAroundAlive < 2 || cellsAroundAlive > 3) {
        return false
      } else {
        return true
      }
    },
    willBeBorn(cellsAroundAlive) {
      // Test si nombre de celulle est suffisant pour naissance d'une nouvelle cellule
      if (cellsAroundAlive === 3) {
        return true
      } else {
        return false
      }
    },
    updateCell(collIndex, rowIndex, isAlive) {
      // Mettre à jour l'état de la cellule dans la grille
      this.grid[collIndex][rowIndex] = isAlive
    },
    createArray(cols, rows) {
      // Création de la grille
      let arr = new Array(cols)
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
      }
      return arr
    },
    getCell(colIndex, rowIndex) {
      // Récupération des données pour chaque cellule
      return this.grid[colIndex][rowIndex]
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
