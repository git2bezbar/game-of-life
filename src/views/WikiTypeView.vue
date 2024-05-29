<template>
  <HeaderComponent />
  <main class="px-[256px] flex items-start py-32 gap-8">
    <WikiSideBarComponent />
    <div class="flex flex-col items-start justify-start gap-8">
      <h1 v-if="this.isFetching" class="text-7xl">Chargement</h1>
      <h1 v-else class="text-7xl">{{ this.type.name }}</h1>
      <p v-if="this.isFetching">Chargement</p>
      <p else>{{ this.type.description }}</p>
      <h2 class="text-4xl">Configurations</h2>
      <div class="grid grid-cols-2 gap-4 w-full">
        <ConfigCardComponent
          v-for="config in this.configs"
          :key="config.id"  
          :title="config.name"
          description="Cliquez pour voir plus"
          :to="`/wiki/${config.typeId}/${config.id}`"
        />
        <p v-if="this.configs.length === 0">Aucune configuration ajoutée pour l'instant</p>
      </div>
    </div>
  </main>
  <FooterComponent />
</template>

<script>
  import WikiSideBarComponent from '../components/SideBar/SideBarComponent.vue'
  import HeaderComponent from '../components/Header/HeaderComponent.vue'
  import FooterComponent from '../components/Footer/FooterComponent.vue'
  import ConfigCardComponent from '@/components/ConfigCard/ConfigCardComponent.vue';

  import { getType } from '@/services/api/types';
  import { getAllConfigs } from '@/services/api/configs';

  export default {
    name: 'WikiTypeView',
    components: {
      WikiSideBarComponent,
      HeaderComponent,
      FooterComponent,
      ConfigCardComponent
    },
    data() {
      return {
        type: {},
        configs: [],
        isFetching: false,
      }
    },
    methods: {
      async fetchType() {
        this.isFetching = true;
        this.type = await getType(this.$route.params.id);
        this.isFetching = false;
      },
      async fetchConfigs() {
        this.isFetching = true;
        this.configs = await getAllConfigs(this.$route.params.id);
        this.isFetching = false;
      }
    },
    watch: {
    async '$route'(to, from) {
      this.fetchType();
      this.fetchConfigs();
    },
  },
    async created() {
      this.fetchType();
      this.fetchConfigs();
    }
  }
</script>
