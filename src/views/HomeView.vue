<script setup>
  import HeaderComponent from '../components/Header/HeaderComponent.vue'
  import FooterComponent from '../components/Footer/FooterComponent.vue'
  import ButtonConmponent from '../components/Button/ButtonComponent.vue'
</script>

<template>
  <HeaderComponent />
  <main class="flex flex-col items-center justify center px-[512px] py-32 gap-32">
    <div class="flex flex-col items-center gap-8 text-center">
      <img class="rounded-2xl" src="/home.png" alt="Accueil">
      <h1 class="text-7xl">Découvrez le jeu de la vie de Conway</h1>
      <p>Bienvenue sur Game of Life ! Plongez dans l'univers fascinant du Jeu de la vie de Conway. Explorez notre Wiki pour découvrir une variété de configurations, utilisez notre Simulateur pour expérimenter et créer vos propres motifs, et apprenez tout sur les Règles du jeu. Amusez-vous et laissez libre cours à votre créativité !</p>
      <div class="flex items-center gap-8">
        <ButtonConmponent to="/rules" type="subtle">Lire les règles</ButtonConmponent>
        <ButtonConmponent to="/simulator">Tester le simulateur</ButtonConmponent>
      </div>
    </div>
    <div class="flex items-center gap-32">
      <div class="flex flex-col items-start gap-8">
        <h2 class="text-5xl">Un wiki dédié</h2>
        <p>Explorez notre Wiki pour tout savoir sur le Jeu de la vie de Conway. Découvrez une multitude de configurations possibles, des plus simples aux plus complexes, et plongez-vous dans l'univers fascinant du jeu de Conway.</p>
        <ButtonConmponent to="/wiki" type="subtle">Aller sur le wiki</ButtonConmponent>
      </div>
      <img class="rounded-2xl" src="/wiki.png" alt="Wiki" width="384" height="384">
    </div>
    <div class="flex items-center gap-32">
      <img class="rounded-2xl" src="/simulator.png" alt="Simulateur" width="384" height="384">
      <div class="flex flex-col items-start gap-8">
        <h2 class="text-5xl">Un simulateur design</h2>
        <p>Utilisez notre simulateur interactif pour créer et tester vos propres motifs dans le Jeu de la vie de Conway. Expérimentez en temps réel avec un outil convivial et laissez libre cours à votre imagination.</p>
        <ButtonConmponent to="/simulator" type="subtle">Tester le simulateur</ButtonConmponent>
      </div>
    </div>
    <div class="flex items-center gap-32">
      <div class="flex flex-col items-start gap-8">
        <h2 class="text-5xl">Les règles expliquées</h2>
        <p>Découvrez les Règles du Jeu de la vie de Conway expliquées en détail. Apprenez les principes fondamentaux qui régissent ce jeu captivant et commencez à explorer les possibilités infinies qu'il offre.</p>
        <ButtonConmponent to="/rules" type="subtle">Lire les règles</ButtonConmponent>
      </div>
      <img class="rounded-2xl" src="/rules.png" alt="Règles" width="384" height="384">
    </div>
  </main>
  <FooterComponent />
</template>
