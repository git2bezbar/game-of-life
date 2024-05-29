<template>
  <footer class="bg-dark-purple px-44 pt-16 pb-12 flex flex-col items-center">
    <div class="grid grid-cols-4 pb-16">
      <router-link to="/">
        <img alt="Game of Life logo" class="logo" src="@/assets/game-of-life-logo.svg" width="265" height="50" />
      </router-link>
      <div class="flex flex-col items-start gap-4">
        <h3 class="text-2xl">Le site</h3>
        <ul class="flex flex-col items-start gap-4">
          <li v-for="(siteLink, i) in siteLinks" :key="i">
            <router-link :to="siteLink.to">{{ siteLink.title }}</router-link>
          </li>
        </ul>
      </div>
      <div class="flex flex-col items-start gap-4">
        <h3 class="text-2xl">Légal</h3>
        <ul class="flex flex-col items-start gap-4">
          <li v-for="(legalLink, i) in legalLinks" :key="i">
            <router-link :to="legalLink.to">{{ legalLink.title }}</router-link>
          </li>
        </ul>
      </div>
      <div class="flex flex-col items-start gap-4">
        <h3 class="text-2xl">À propos</h3>
        <p class="text-xs">Bienvenue sur Game of Life ! Découvrez notre Wiki pour explorer les configurations du Jeu de la vie de Conway, utilisez notre Simulateur pour créer et tester vos propres motifs, et consultez la section Règles pour tout savoir sur le jeu. Amusez-vous bien !</p>
      </div>
    </div>
    <h4 class="uppercase">Copyright © 2024 Game of Life. Tous droits réservés.</h4>
  </footer>  
</template>

<script>
  export default {
    name: 'FooterComponent',
    setup() {
      const siteLinks = [
        { title: 'Accueil', to: '/' },
        { title: 'Wiki', to: '/wiki' },
        { title: 'Simulateur', to: '/simulator' },
        { title: 'Règles', to: '/rules' },
      ]

      const legalLinks = [
        { title: 'Gestion des cookies', to: '/cookies' },
        { title: 'Politique de confidentialité', to: '/privacy-policy' },
      ]
      
      return {
        siteLinks,
        legalLinks,
      }
    }
  }
</script>
