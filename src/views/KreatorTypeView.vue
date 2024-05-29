<template>
  <HeaderComponent :type="'dashboard'" />
  <div class="flex flex-col items-start p-16 gap-4">
    <h1 class="text-7xl">Types</h1>
    <div class="flex flex-wrap gap-8">
      <AddingButtonComponent class="w-[250px] h-[136px]" />
      <TypeCardComponent
        v-if="this.isFetching"
        class="w-[250px]"
        title="Chargement..."
        description="Chargement..."
      />
      <TypeCardComponent
        class="w-[250px]"
        v-for="type in this.types"
        :key="type.id"
        :title="type.name"
        :description="type.description"
        />
    </div>
  </div>
</template>

<script>
  import HeaderComponent from '../components/Header/HeaderComponent.vue'
  import AddingButtonComponent from '../components/AddingButton/AddingButtonComponent.vue'
  import TypeCardComponent from '../components/TypeCard/TypeCardComponent.vue'
  import { getAllTypes } from '@/services/api/types';

  export default {
    name: 'KreatorTypeView',
    components: {
      HeaderComponent,
      AddingButtonComponent,
      TypeCardComponent
    },
    data() {
      return {
        types: [],
        isFetching: false,
      }
    },
    methods: {
      async fetchTypes() {
        this.isFetching = true;
        this.types = await getAllTypes();
        console.log(await getAllTypes());
        this.isFetching = false;
      }
    },
    mounted() {
      this.fetchTypes();
    }
  }
</script>
