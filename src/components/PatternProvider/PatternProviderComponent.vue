<template>
  <div
    :class="[
      'bg-dark-blue rounded-lg self-start p-4 flex flex-col gap-1.5',
      type === 'display' ? 'pointer-events-none' : '',
    ]"
  >
    <div
      v-for="i in y"
      :key="i"
      class="flex items-center gap-1.5"
    >
      <PatternCellComponent
        v-for="j in x"
        :key="j"
        :value="pixelArray[i - 1][j - 1]"
        @click="togglePixel(i - 1, j - 1)"
      />
    </div>
  </div>
</template>

<script>
  import PatternCellComponent from '@/components/PatternProvider/PatternCellComponent.vue'

  export default {
    name: 'PatternProviderComponent',
    components: {
      PatternCellComponent,
    },
    props: {
      x: Number,
      y: Number,
      pixels: Array,
      type: String,
    },
    data() {
      return {
        pixelArray: [...this.pixels],
      }
    },
    methods: {
      set(target, key, value) {
        if (Array.isArray(target)) {
          target.splice(key, 1, value);
        } else {
          target[key] = value;
        }
      },
      togglePixel(row, col) {
        console.log(row, col)
        const tempArray = this.pixelArray.slice();
        this.set(tempArray[row], col, this.pixelArray[row][col] === 0 ? 1 : 0);
        this.pixelArray = [...tempArray];
      }
    },
    watch: {
      x(newValue) {
        this.pixelArray = Array.from({ length: parseInt(this.y) }, () => Array.from({ length: newValue }, () => 0))
      },
      y(newValue) {
        this.pixelArray = Array.from({ length: newValue }, () => Array.from({ length: parseInt(this.x) }, () => 0))
      },
      pixelArray(newValue) {
        this.$emit('update:pixelArray', newValue)
      }
    },
  }
</script>
