<template>
  <div @click="toggleAlive" class="cell" :class="{alive: isAlive}">
    
  </div>
</template>

<style scoped>
.cell{
  height:50px ;
  border: 1px solid black;
}
.alive{
  background-color: rgb(197, 93, 93);
}
</style>

<script>
export default {
	data() {
		return {
			isAlive: false
		}
	},
  methods:{
    toggleAlive(){
      this.isAlive = !this.isAlive
    }
  }
}
</script>