<template>
  <div class="bg-dark-blue">
    <ul class="flex items-center px-16 pt-8 gap-8">
      <HeaderMenuItemComponent
        v-for="(headerItem, i) in headerItems"
        :key="i"
        :link="headerItem.link"
        :title="headerItem.title"
      />
    </ul>
  </div>
</template>

<script>
import HeaderMenuItemComponent from './HeaderMenuItemComponent.vue';

  export default {
    name: 'HeaderMenuComponent',
    components: {
      HeaderMenuItemComponent,
    },
    setup() {
      const headerItems = [
        { link: '/wiki', title: 'Wiki' },
        { link: '/simulator', title: 'Simulateur' },
        { link: '/rules', title: 'Règles' },
      ];

      return { headerItems };
    },
  }
</script>
