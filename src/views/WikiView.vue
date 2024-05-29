<template>
  <HeaderComponent />
  <main class="flex flex-col items-start justify-start px-[512px] py-32 gap-8">
    <h1 class="text-7xl">Bienvenue sur LifeWiki</h1>
    <p>Bienvenue sur le Wiki de Game of Life, votre guide complet sur le Jeu de la vie de Conway. Découvrez ici une variété de configurations, de motifs célèbres et de concepts fascinants.</p>
    <h2 class="text-5xl">Le wiki</h2>
    <p>Vous découvrirez une multitude de configurations fascinantes du Jeu de la vie de Conway. Nous avons classé ces configurations en différentes catégories pour vous faciliter l'exploration. Plongez-vous dans chaque catégorie pour découvrir les différents types de configurations et leurs spécificités uniques.</p>
    <h2 class="text-5xl">Les types de configuration</h2>
    <div class="grid grid-cols-2 gap-4">
      <ConfigCardComponent
      v-if="this.isFetching"
      to="/wiki/"
      title="Chargment..."
      description="Chargement des types de configurations..."
    />
      <ConfigCardComponent
        v-else
        v-for="type in this.types"
        :key="type.id"
        :to="`/wiki/${type.id}`"
        :title="type.name"
        :description="type.description"
      />
    </div>
  </main>
  <FooterComponent />
</template>

<script>
  import HeaderComponent from '../components/Header/HeaderComponent.vue'
  import FooterComponent from '../components/Footer/FooterComponent.vue'
  import ConfigCardComponent from '@/components/ConfigCard/ConfigCardComponent.vue';
  import { getAllTypes } from '@/services/api/types';

  export default {
    name: 'WikiView',
    components: {
      HeaderComponent,
      FooterComponent,
      ConfigCardComponent
    },
    data() {
      return {
        types: [],
        isFetching: false,
      }
    },
    async mounted() {
      this.isFetching = true;
      this.types = await getAllTypes();
      this.isFetching = false;
    }
  }
</script>
