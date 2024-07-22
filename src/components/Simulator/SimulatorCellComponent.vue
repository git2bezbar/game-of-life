<template>
  <div @click="toggleAlive"
  class='h-[16px] rounded cursor-pointer duraction-200'
  :style="cellStyle"
  @mouseover="applyHoverStyle"
  @mouseout="removeHoverStyle"
  ></div>
</template>

<script>
export default {
  props: {
    isAliveParent : Boolean,
    color: String
  },
  data(props) {
    return {
      isAlive: this.isAliveParent,
      cellColor: props.color,
      hoverStyle: {}
    }
  },
  computed: {
    cellStyle() {
      // const aliveClass = this.isAlive ? `background-color : ${this.color} ; hover:bg-${this.color}/70` : `bg-dark-purple hover:bg-${this.color}/40`;
      return {
        backgroundColor: this.isAlive ? this.cellColor : `#18132B`,
        ...this.hoverStyle,
      };
    },

  },
  watch: {
    isAliveParent(newValue) {
      this.isAlive = newValue
    },
    color(newColor){
      this.cellColor = newColor;
    }
  },
  methods: {
    toggleAlive() {
      this.isAlive = !this.isAlive
      this.$emit('update:isAlive', this.isAlive) // Émettre un événement avec la nouvelle valeur de isAlive
    },
    applyHoverStyle(){
      this.hoverStyle = {
        backgroundColor: this.isAlive ? `${this.cellColor}` : `${this.cellColor}`
      };
    },
    removeHoverStyle() {
      this.hoverStyle = {};
    }
  }

}
</script>
