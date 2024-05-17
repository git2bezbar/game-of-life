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
  props: ['initialIsAlive'],
  data() {
    return {
      isAlive: this.initialIsAlive
    };
  },
  methods:{
    toggleAlive() {
      this.isAlive = !this.isAlive;
      this.$emit('update:isAlive', this.isAlive); // Émettre un événement avec la nouvelle valeur de isAlive
    }
  }
}
</script>