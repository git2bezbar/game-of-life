<template>
  <a
    :class="[
      type === 'subtle' ? 'bg-purple/20 hover:bg-purple/10' : type === 'danger' ? 'bg-pink hover:bg-pink/80' : 'bg-purple hover:bg-purple/80',
      'px-8 py-4 rounded-2xl hover:cursor-pointer duration-300'
    ]"
    :href="to"
  >
    <slot></slot>
  </a>
</template>

<script>
  export default {
    name: 'ButtonComponent',
    props: {
      to: {
        type: String,
      },
      type: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'subtle', 'danger'].includes(value),
      },
    },
  }
</script>
