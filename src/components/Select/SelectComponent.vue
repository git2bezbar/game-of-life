<template>
    <div class="custom-select">
      <div 
        class="selected-option border rounded-2xl py-3 flex" 
        :class="[selectedBackground, selectedBorder]" 
        
        @click="toggleDropdown">
        <div class="flex items-center gap-2 w-28 justify-center">
          <div class="w-4 h-4 rounded-xl" :class="[selectedColor]"></div>
          <p>{{ selectedLabel }}</p>
        </div>
        
      </div>
      <div v-show="dropdownOpen" class="options bg-dark-purple border border-purple/70 mt-2">
        <div
          v-for="option in options"
          :key="option.value"
          class="flex gap-4 py-3 items-center pl-2 cursor-pointer hover:bg-pink/50"
          @click="selectOption(option)"
        >
          <div class="w-4 h-4 rounded-xl" :class="['color-swatch', option.class]"></div>
          {{ option.label }}
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    changeColor : String
  },
  data() {
    return {
      dropdownOpen: false,
      selectedLabel: 'Violet',
      selectedColor: 'bg-purple',
      selectedBorder: "border-purple/40",
      selectedBackground : "bg-purple/10",
      options: [
        { value: '#8C39FF', label: 'Violet', class: 'bg-purple', border:'border-purple/40', background: 'bg-purple/10' },
        { value: '#FF005C', label: 'Rose', class: 'bg-pink', border:'border-pink/40', background: 'bg-pink/10' },
        { value: '#52ED39', label: 'Vert', class: 'bg-green', border:'border-green/40', background: 'bg-green/10' },
        { value: '#FF380D', label: 'Orange', class: 'bg-orange', border:'border-orange/40', background: 'bg-orange/10' },
        { value: '#1271FF', label: 'Bleu', class: 'bg-blue', border:'border-blue/40', background: 'bg-blue/10' }
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
      this.selectedBorder = option.border;
      this.selectedBackground = option.background;
      this.dropdownOpen = false;
      this.$emit('changeColor', option.value);  // Émettre un événement pour informer le parent
    }
  }
};
</script>
  
<style scoped>
.custom-select {
  position: relative;
}

.selected-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px
}


.options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 10;
}


</style>
