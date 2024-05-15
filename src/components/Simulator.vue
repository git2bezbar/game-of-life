
<script setup>
import SimulatorCell from "./SimulatorCell.vue"
</script>
<template>
  <div class="grid">
    <SimulatorCell v-bind:key={n} v-for="n in count"/>
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
      x:5,
			y:5
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
      console.log(SimulatorCellComponent.isAlive);
    }
  }
	}
</script>

<style scoped>
.grid{
  display: grid;
  grid-template-columns: repeat(var(--x) , 50px);
}
</style>
