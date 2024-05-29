<template>
  <div
    class="bg-purple/10 rounded-lg p-4 flex flex-col items-start gap-2 hover:bg-purple/50 duration-300"
  >
    <div class="flex gap-2 justify-end w-full">
      <img src="@/assets/icons/edit.svg" />
      <img src="@/assets/icons/delete.svg" />
    </div>
    <h4 class="text-2xl">{{ title }}</h4>
    <p class="text-sm">{{ description.substring(0, 50) + '...' }}</p>
  </div>
</template>

<script>
  export default {
    name: 'TypeCardComponent',    
    props: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  }
</script>
