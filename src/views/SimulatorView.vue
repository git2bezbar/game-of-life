<script setup>
  import HeaderComponent from '../components/Header/HeaderComponent.vue'
  import FooterComponent from '../components/Footer/FooterComponent.vue'
  import SimulateurComponent from '../components/Simulator/SimulatorComponent.vue'
</script>

<template>
    <HeaderComponent />
    <main class="flex flex-col items-start justify-start px-32 py-32 gap-8">
        <h1 class="text-7xl">Le simulateur</h1>
        <SimulateurComponent/>
    </main>
    <FooterComponent />
</template>