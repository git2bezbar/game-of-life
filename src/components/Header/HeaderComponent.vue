<template>
  <header>
    <div class="bg-dark-purple px-16 py-8 flex justify-between">
      <router-link to="/">
        <img alt="Game of Life logo" class="logo" src="@/assets/game-of-life-logo.svg" width="265" height="50" />
      </router-link>
      <SearchInputComponent />
      <ButtonComponent class="uppercase" :to="'/login'">
        Connexion
      </ButtonComponent>
    </div>
    <HeaderMenuComponent />
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
  }
</script>

<style lang="scss" scoped>

</style>
