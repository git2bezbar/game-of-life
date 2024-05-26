<template>
  <a class="bg-purple px-8 py-4 rounded-2xl" :href="to">
    <slot></slot>
  </a>
</template>

<script>
  export default {
    name: 'ButtonComponent',
    props: {
      to: {
        type: String,
        required: true,
      },
    },
  }
</script>
