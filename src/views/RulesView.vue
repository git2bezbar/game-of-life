<script setup>
  import HeaderComponent from '../components/Header/HeaderComponent.vue'
  import FooterComponent from '../components/Footer/FooterComponent.vue'
</script>

<template>
  <HeaderComponent />
  <main class="flex flex-col items-start justify-start px-[512px] py-32 gap-8">
    <h1 class="text-7xl">Qu’est-ce que le jeu de la vie ?</h1>
    <p>Bienvenue dans le monde fascinant du Jeu de la vie de Conway. Ce guide vous expliquera les règles de base pour que vous puissiez commencer à explorer et à créer vos propres configurations.</p>
    <h2 class="text-5xl">Règles de base</h2>
    <h3 class="text-4xl">Le plateau de jeu</h3>
    <p>Le Jeu de la vie se joue sur une grille infinie de cellules carrées. Chaque cellule peut être soit vivante (colorée), soit morte (vide).</p>
    <h3 class="text-4xl">Configuration initiale</h3>
    <p>Pour démarrer, vous placez des cellules vivantes sur la grille dans la configuration de votre choix. Vous pouvez commencer avec un motif aléatoire ou un motif préconçu.</p>
    <h3 class="text-4xl">Évolution des cellules</h3>
    <p>Le jeu se déroule en générations, où l'état de chaque cellule pour la génération suivante est déterminé par l'état actuel de ses huit cellules voisines (les cellules adjacentes horizontalement, verticalement et diagonalement).</p>
    <ul class="list-disc">
      <li>Naissance : Une cellule morte avec exactement trois cellules voisines vivantes devient vivante dans la génération suivante.</li>
      <li>Survie : Une cellule vivante avec deux ou trois cellules voisines vivantes reste vivante dans la génération suivante.</li>
      <li>Mort par isolement : Une cellule vivante avec moins de deux cellules voisines vivantes meurt de solitude dans la génération suivante.</li>
      <li>Mort par surpopulation : Une cellule vivante avec plus de trois cellules voisines vivantes meurt d'étouffement dans la génération suivante.</li>
    </ul>
    <h2 class="text-5xl">Exemple</h2>
    <h3 class="text-4xl">Configuration initiale</h3>
    <p>Supposons que vous commencez avec un "lightweight spaceship" (vaisseau spatial léger), un motif préconçu bien connu qui se déplace au fil des générations. La configuration initiale est la suivante :</p>
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-4" v-for="(item, i) in 5" :key="i">
        <img :src="'/gen-' + item + '.png'" :alt="'Génération ' + item" width="150">
        <p>Génération {{ item }}</p>
      </div>
    </div>
    <p>Avec ces règles de base, vous êtes prêt à explorer le Jeu de la vie de Conway. Utilisez notre simulateur pour expérimenter et découvrir de nouveaux motifs et configurations. Amusez-vous bien !</p>
  </main>
  <FooterComponent />
</template>
