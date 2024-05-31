<template>
    <div class="custom-select">
      <div class="selected-option" @click="toggleDropdown">
        <div :class="['color-swatch', selectedColor]"></div>
        {{ selectedLabel }}
      </div>
      <div v-if="dropdownOpen" class="options bg-dark-purple">
        <div
          v-for="option in options"
          :key="option.value"
          class="option hover:bg-pink/50"
          @click="selectOption(option)"
        >
          <div :class="['color-swatch', option.class]"></div>
          {{ option.label }}
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
      selectedLabel: 'Violet',
      selectedColor: 'bg-purple',
      options: [
        { value: '#8C39FF', label: 'Violet', class: 'bg-purple' },
        { value: '#FF005C', label: 'Rose', class: 'bg-pink' },
        { value: '#52ED39', label: 'Vert', class: 'bg-green' },
        { value: '#FF380D', label: 'Orange', class: 'bg-orange' },
        { value: '#1271FF', label: 'Bleu', class: 'bg-blue' }
      ]
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    selectOption(option) {
      this.selectedLabel = option.label;
      this.selectedColor = option.class;
      this.dropdownOpen = false;
      this.$emit('changeColor', option.value);  // Émettre un événement pour informer le parent
    }
  }
};
</script>
  
<style scoped>
.custom-select {
  position: relative;
  width: 200px;
}

.selected-option {
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.color-swatch {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  z-index: 10;
}

.option {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
}


.bg-purple {
  background-color: #8C39FF;
}

.bg-pink {
  background-color: #FF005C;
}

.bg-green {
  background-color: #52ED39;
}

.bg-orange {
  background-color: #FF380D;
}

.bg-blue {
  background-color: #1271FF;
}
</style>
