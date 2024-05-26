<script>
import InputWithLabelComponent from './components/InputWithLabel/InputWithLabelComponent.vue'
import Chip from './components/Chip/ChipComponent.vue'
import AddingButtonComponent from './components/AddingButton/AddingButtonComponent.vue'

export default {
  components: {
    InputWithLabelComponent,
    Chip,
    AddingButtonComponent
  }
}
</script>

<template>
  <div class="h-screen w-screen bg-dark-purple flex flex-col items-center justify-center p-96 gap-16 text-white">
    <InputWithLabelComponent :label="'My label'" :placeholder="'malafak'" />
    <Chip>Zifukoro</Chip>
    <AddingButtonComponent class="w-[350px] h-[150px]"/>
  </div>
</template>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
