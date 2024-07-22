<template>
  <div class="grid grid-cols-2 content-stretch h-screen w-screen bg-dark-purple">
    <div class="flex flex-col p-16 gap-4 bg-purple justify-center">
      <img src="@/assets/kreator-logo.svg" alt="Kreator Logo" width="210" height="50" />
      <h1 class="text-7xl">Bienvenue sur Kreator</h1>
      <p>La plateforme d'administration du Wiki de Game of Life.</p>
    </div>
    <form class="flex flex-col p-16 gap-8 justify-center items-start max-w-[680px]">
      <h2 class="text-5xl">Connectez-vous</h2>
      <InputWithLabelComponent
        id="username"
        label="Pseudo"
        type="text"
        placeholder="Entrez votre pseudo"
        :value="username"
        @input="username = $event.target.value"
      />
      <InputWithLabelComponent
        id="password"
        label="Mot de passe"
        type="password"
        placeholder="Entrez votre mot de passe"
        :value="password"
        @input="password = $event.target.value"
      />
      <ButtonComponent
        type="primary"
        @click="loginToDashboard"
        >
        Se connecter
      </ButtonComponent>
    </form>
  </div>
</template>

<script>
  import InputWithLabelComponent from '@/components/InputWithLabel/InputWithLabelComponent.vue';
  import ButtonComponent from '@/components/Button/ButtonComponent.vue';

  import { login } from '@/services/api/auth';

  export default {
    name: 'LoginView',
    components: {
      InputWithLabelComponent,
      ButtonComponent,
    },
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async loginToDashboard() {
        await login(this.username, this.password);
        this.$router.push('/dashboard');
      },
    },
  }
</script>
