<template>
  <span
    :class="
      [
        'w-5 h-5 rounded cursor-pointer bg-dark-purple text-white',
        value === 1 ? 'bg-purple' : 'bg-dark-purple'
      ]"
  />
</template>

<script>
  export default {
    name: 'PatternCellComponent',
    props: {
      value: Number,
    },
  }
</script>
