<template>
  <HeaderComponent />
  <main class="px-[256px] flex items-start py-32 gap-8">
    <WikiSideBarComponent />
    <div class="flex flex-col items-start justify-start gap-8">
      <h1 v-if="this.isFetching" class="text-7xl">Chargement</h1>
      <h1 v-else class="text-7xl">{{ this.config.name }}</h1>
      <p v-if="this.isFetching">Chargement</p>
      <div class="flex flex-col gap-4">  
        <p class="text-4xl text-jaro">Configuration</p>
        <p class="text-2xl text-purple text-jaro">{{ this.type.name }}</p>
      </div>
      <div class="flex flex-col gap-4">  
        <p class="text-4xl text-jaro">Bounding box</p>
        <p class="text-2xl text-purple text-jaro">{{ this.config.bounding_box_x }} x {{ this.config.bounding_box_y }}</p>
      </div>
      <div class="flex flex-col gap-4">  
        <p class="text-4xl text-jaro">Schéma</p>
        <div class="text-2xl text-purple text-jaro self-start">
          <div
            class="bg-dark-blue rounded-lg self-start p-4 flex flex-col gap-1.5 pointer-events-none"
          >
            <div
              v-for="i in this.config.bounding_box_y"
              :key="i"
              class="flex items-center gap-1.5"
            >
              <PatternCellComponent
                v-for="j in this.config.bounding_box_x"
                :key="j"
                :value="this.config.pixels[i - 1][j - 1]"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4" v-if="this.config.period">  
        <p class="text-4xl text-jaro">Période</p>
        <p class="text-2xl text-purple text-jaro">{{ this.config.period }}</p>
      </div>
      <div class="flex flex-col gap-4" v-if="this.config.speed">  
        <p class="text-4xl text-jaro">Vitesse</p>
        <p class="text-2xl text-purple text-jaro">C/{{ this.config.speed }}</p>
      </div>
    </div>
  </main>
  <FooterComponent />
</template>

<script>
  import WikiSideBarComponent from '../components/SideBar/SideBarComponent.vue'
  import HeaderComponent from '../components/Header/HeaderComponent.vue'
  import FooterComponent from '../components/Footer/FooterComponent.vue'
  import PatternCellComponent from '../components/PatternProvider/PatternCellComponent.vue'

  import { getType } from '@/services/api/types';
  import { getConfig } from '@/services/api/configs';

  export default {
    name: 'WikiTypeView',
    components: {
      WikiSideBarComponent,
      HeaderComponent,
      FooterComponent,
      PatternCellComponent,
    },
    data() {
      return {
        type: {},
        config: {},
        isFetching: false,
      }
    },
    methods: {
      async fetchType() {
        this.isFetching = true;
        this.type = await getType(this.$route.params.id);
        this.isFetching = false;
      },
      async fetchConfig() {
        this.isFetching = true;
        this.config = await getConfig(this.$route.params.patternId);
        this.isFetching = false;
      }
    },
    watch: {
    async '$route'(to, from) {
      this.fetchType();
      this.fetchConfig();
    },
  },
    async created() {
      this.fetchType();
      this.fetchConfig();
    },
    mounted() {
      console.log(this.config.pixels)
    },
  }
</script>
