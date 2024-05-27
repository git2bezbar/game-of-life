<script setup>
  import HeaderComponent from '../components/Header/HeaderComponent.vue'
  import FooterComponent from '../components/Footer/FooterComponent.vue'
</script>

<template>
    <HeaderComponent />
    <main class="flex flex-col items-start justify-start px-[512px] py-32 gap-8">
        <h1 class="text-7xl">Le simulateur</h1>
        <div>
            <div>
                <p>Grille</p>
                <div>
                    <input type="number">
                    <p>X</p>
                    <input type="number">
                </div>
            </div>
            <div>
                <p>Génération</p>
                <p>1</p>
                <div>
                    <button>Next</button>
                    <button>Donner vie</button>
                    <button>Reset</button>
                </div>
            </div>
        </div>
    </main>
    <FooterComponent />
</template>