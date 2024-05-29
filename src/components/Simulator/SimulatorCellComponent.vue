<template>
  <div @click="toggleAlive" 
  :class="[
      isAlive ? 'bg-purple hover:bg-purple/70' : 'bg-dark-purple hover:bg-purple/30',
      'h-[16px] rounded cursor-pointer'
    ]"
  ></div>
</template>

<script>
export default {
  props: ['isAliveParent'],
  data() {
    return {
      isAlive: this.isAliveParent
    }
  },
  watch: {
    isAliveParent(newValue) {
      this.isAlive = newValue
    }
  },
  methods: {
    toggleAlive() {
      this.isAlive = !this.isAlive
      this.$emit('update:isAlive', this.isAlive) // Émettre un événement avec la nouvelle valeur de isAlive
    }
  }
}
</script>
