<template>
  <div class="flex flex-col items-start gap-4 w-full">
    <label class="text-lg" :for="label.toLowerCase()">{{ label }}</label>
    <input
      :id="label.toLowerCase()"
      class="p-4 bg-purple/10 border border-purple/40 rounded-2xl outline-none focus:border-purple/80 duration-300 placeholder:text-white/40 min-w-[300px] w-full"
      type="text"
      :value="inputValue"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
  export default {
    name: 'InputWithLabelComponent',
    props: {
      value: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      placeholder: {
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
  }
</script>
