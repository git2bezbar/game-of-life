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
    props: {
      headerItems: {
        type: Array,
        required: true,
      },
    },
  }
</script>
