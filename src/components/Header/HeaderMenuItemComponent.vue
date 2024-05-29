<template>
  <li class="flex flex-col gap-4">
    <router-link
      :class="[
        isActive(link) ? 'bg-purple ' : 'bg-dark-purple ',
        'font-bold px-8 py-3 rounded-xl'
      ]"
      :to="link"
    >
      {{ title }}
    </router-link>
    <span
      :class="[
        isActive(link) ? 'bg-purple' : 'bg-dark-purple', 
        'h-[4px] rounded-full'
      ]"
    />
  </li>
</template>

<script>
  import { useRoute } from 'vue-router';

  export default {
    name: 'HeaderMenuItemComponent',
    setup() {
      const route = useRoute();
      const isActive = (path) => route.path.includes(path);

      return { isActive };
    },
    props: {
      link: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  }
</script>
