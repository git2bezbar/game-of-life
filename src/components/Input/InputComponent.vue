<template>
  <input
    class="p-4 bg-purple/10 border border-purple/40 rounded-2xl outline-none focus:border-purple/80 duration-300 placeholder:text-white:/40"
    type="text"
    :value="inputValue"
    @input="inputHandler"
  />
</template>

<script>
  export default {
    name: 'InputComponent',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        inputValue: this.value
      }
    },
    watch: {
      value(newValue) {
        this.inputValue = newValue
      }
    },
    methods: {
      inputHandler(e) {
        this.inputValue = e.target.value
        this.$emit('input', this.inputValue)
      }
    }
  }
</script>
