<template>
  <nav class="min-w-[256px] flex flex-col gap-2">
    <h5 v-if="this.isFetching">Chargement...</h5>
    <router-link
      v-else 
      v-for="type in types"
      :key="type.id"
      :class="[
        route.params.id == type.id ? 'bg-purple/10 text-purple': 'hover:bg-purple/10',
        'px-4 py-2 w-full rounded-lg duration-300'
      ]"
      :to="`/wiki/${type.id}`"
    >
      {{ type.name }}
    </router-link>
  </nav>
</template>

<script>
  import { getAllTypes } from '@/services/api/types';
  import { useRoute } from 'vue-router'

  export default {
    name: 'WikiSideBarComponent',
    data() {
      const route = useRoute();

      return {
        types: [],
        isFetching: false,
        route
      }
    },
    async created() {
      this.isFetching = true;
      this.types = await getAllTypes();
      this.isFetching = false;
    }
  }
</script>
