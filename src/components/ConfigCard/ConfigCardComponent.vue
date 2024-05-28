<template>
  <a
    :href="to"
    class="bg-purple/10 rounded-lg p-4 flex flex-col items-start gap-4 hover:bg-purple/50 duration-300"
  >
    <h4 class="text-2xl">{{ title }}</h4>
    <p class="text-sm">{{ description }}</p>
  </a>
</template>

<script>
  export default {
    name: 'ConfigCardComponent',
    props: {
      title: String,
      description: String,
      to: String,
    },
  }
</script>
