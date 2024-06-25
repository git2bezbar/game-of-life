<template>
  <div class="fixed top-0 bottom-0 right-0 bg-dark-purple border-l-2 border-purple w-[660px] flex flex-col gap-8 p-16 items-start duration-300 z-20">
    <div class="flex flex-col gap-4 items-start">
      <h2 class="text-5xl">
        <slot name="title"></slot>
      </h2>
      <p class="text-gray">
        <slot name="subtitle">
          Renseignez les informations dans les champs dédiés.
        </slot>
      </p>
    </div>
    <form class="flex flex-col gap-8 w-full">
      <slot name="form"></slot>
      <div class="flex w-full justify-end items-center gap-8">
        <ButtonComponent @click="onSubmit">
          <slot name="submitButtonText"></slot>
        </ButtonComponent>
        <ButtonComponent type="danger" @click="onCancel">
          <slot name="cancelButtonText"></slot>
        </ButtonComponent>
      </div>
    </form>
  </div>
</template>

<script>
  import ButtonComponent from '@/components/Button/ButtonComponent.vue';

  export default {
    name: 'SheetComponent',
    components: {
      ButtonComponent,
    },
    methods: {
      onCancel() {
        this.$emit('close');
      },
      onSubmit() {
        this.$emit('submit');
      },
    }
  }
</script>
