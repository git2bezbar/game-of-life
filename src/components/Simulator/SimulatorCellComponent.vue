<template>
  <div @click="toggleAlive"
  class='h-[16px] rounded cursor-pointer duraction-200'
  :style="cellClasses"
  @mouseover="applyHoverStyle"
  @mouseout="removeHoverStyle"
  ></div>
</template>

<script>
export default {
  props: ['isAliveParent','color'],
  data() {
    return {
      isAlive: this.isAliveParent,
      hoverStyle: {}
    }
  },
  computed: {
    cellClasses() {
      // const aliveClass = this.isAlive ? `background-color : ${this.color} ; hover:bg-${this.color}/70` : `bg-dark-purple hover:bg-${this.color}/40`;
      const aliveClass = this.isAlive ? `background-color : ${this.color};` : `background-color : #18132B`;
      return {
        backgroundColor: this.isAlive ? this.color : `#18132B`,
        ...this.hoverStyle,
      };
    }
  },
  watch: {
    isAliveParent(newValue) {
      this.isAlive = newValue
    },
    changeColor(){
      this.color = newColor
    }
  },
  methods: {
    toggleAlive() {
      this.isAlive = !this.isAlive
      this.$emit('update:isAlive', this.isAlive) // Émettre un événement avec la nouvelle valeur de isAlive
    },
    applyHoverStyle(){
      this.hoverStyle = {
        backgroundColor: this.isAlive ? `${this.color}` : `${this.color}`
      };
      console.log(this.hoverStyle)
    },
    removeHoverStyle() {
      this.hoverStyle = {};
    }
  }

}
</script>
