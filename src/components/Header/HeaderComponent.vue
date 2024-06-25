<template>
  <header>
    <div class="bg-dark-purple px-16 py-8 flex justify-between items-center">
      <router-link to="/">
        <img v-if="type === 'website'" alt="Game of Life logo" class="logo" src="@/assets/game-of-life-logo.svg" width="265" height="50" />
        <img v-else alt="Kreator logo" class="logo" src="@/assets/kreator-logo.svg" width="265" height="50" />
      </router-link>
      <SearchInputComponent />
      <ButtonComponent class="uppercase" :to="'/login'">
        {{ type === 'website' ? 'Connexion' : 'Déconnexion' }}
      </ButtonComponent>
    </div>
    <HeaderMenuComponent :headerItems="headerItems" />
  </header>
</template>

<script>
  import ButtonComponent from '../Button/ButtonComponent.vue'
  import SearchInputComponent from '../SearchInput/SearchInputComponent.vue'
  import HeaderMenuComponent from './HeaderMenuComponent.vue'

  export default {
    name: 'HeaderComponent',
    components: {
      ButtonComponent,
      SearchInputComponent,
      HeaderMenuComponent,
    },
    props: {
      type: {
        type: String,
        default: 'website',
      },
    },
    setup(props) {
      const headerItems = props.type === 'website' ? [
        { link: '/wiki', title: 'Wiki' },
        { link: '/simulator', title: 'Simulateur' },
        { link: '/rules', title: 'Règles' },
      ] : [
        { link: '/dashboard/types', title: 'Types' },
        { link: '/dashboard/config', title: 'Configurations' },
      ];
      return {
        headerItems,
      }
    },
  }
</script>
