<template>
  <div
    class="w-[250px] bg-purple/10 rounded-lg p-4 flex flex-col items-start gap-4 hover:bg-purple/50 duration-300"
  >
    <div class="flex justify-between items-center w-full">
      <h5 class="text-sm">{{ type }}</h5>
      <div class="flex gap-3">
        <img
          @click="openSheet"
          :class="[
            'hover:cursor-pointer hover:bg-white/10 duration-300 rounded-lg p-1',
            `${(configurationStore.isEditing || configurationStore.isCreating || configurationStore.isDeleting) ? 'opacity-50 pointer-events-none' : ''}`,
          ]"
          height="32"
          width="32"
          src="@/assets/icons/edit.svg"
        />
        <img
          @click="openDeleteSheet"
          :class="[
            'hover:cursor-pointer hover:bg-pink/10 duration-300 rounded-lg p-1',
            `${(configurationStore.isEditing || configurationStore.isCreating || configurationStore.isDeleting) ? 'opacity-50 pointer-events-none' : ''}`,
          ]"
          height="32"
          width="32"
          src="@/assets/icons/delete.svg"
        />
      </div>
    </div>
    <h4 class="text-2xl">{{ title }}</h4>
    <p class="text-sm">{{ x }} x {{ y }}</p>
  </div>
</template>

<script>
  import { mapStores } from 'pinia'
  import { useConfigurationStore } from '@/stores/configuration'

  export default {
    name: 'ConfigurationCardComponent',
    props: {
      configurationId: {
        type: [String, Number],
        required: true,
      },
      title: String,
      x: Number,
      y: Number,
      period: Number,
      speed: Number,
      pixels: Array,
      typeId: Number,
      type: String,
    },
    computed: {
      ...mapStores(useConfigurationStore),
    },
    methods: {
      openSheet() {
        this.configurationStore.setIsEditing(true)
        this.configurationStore.setName(this.title)
        this.configurationStore.setPeriod(this.period);
        this.configurationStore.setSpeed(this.speed);
        this.configurationStore.setBoundingBoxX(this.x);
        this.configurationStore.setBoundingBoxY(this.y);
        this.configurationStore.setPixels(this.pixels);
        this.configurationStore.setTypeId(this.typeId);
        
        this.configurationStore.updatedConfigurationId = this.configurationId.toString();
        this.$emit('open-sheet');
      },
      openDeleteSheet() {
        this.configurationStore.setIsDeleting(true);
        this.configurationStore.setName(this.title);
        this.configurationStore.deletedConfigurationId = this.configurationId.toString();
        this.$emit('open-delete-sheet');
      },
    }
  }
</script>
