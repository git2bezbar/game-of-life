<template>
  <a
    :class="[
      type === 'subtle' ? 'bg-purple/10 hover:bg-purple/5' : 'bg-purple hover:bg-purple/80',
      'px-8 py-4 rounded-2xl duration-300'
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
        required: true,
      },
      type: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'subtle'].includes(value),
      },
    },
  }
</script>
