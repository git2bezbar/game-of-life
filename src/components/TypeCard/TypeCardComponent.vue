<template>
  <div class="bg-purple/10 rounded-lg p-4 flex flex-col items-start gap-2 duration-300 w-[250px]">
    <div class="flex gap-3 justify-end w-full">
      <img
        @click="openSheet"
        :class="[
          'hover:cursor-pointer hover:bg-white/10 duration-300 rounded-lg p-1',
          `${(typeStore.isEditing || typeStore.isCreating || typeStore.isDeleting) ? 'opacity-50 pointer-events-none' : ''}`,
        ]"
        height="32"
        width="32"
        src="@/assets/icons/edit.svg"
      />
      <img
        @click="openDeleteSheet"
        :class="[
          'hover:cursor-pointer hover:bg-pink/10 duration-300 rounded-lg p-1',
          `${(typeStore.isEditing || typeStore.isCreating || typeStore.isDeleting) ? 'opacity-50 pointer-events-none' : ''}`,
        ]"
        height="32"
        width="32"
        src="@/assets/icons/delete.svg"
      />
    </div>
    <h4 class="text-2xl">{{ title }}</h4>
    <p class="text-sm">
      {{ description.length > 50 ? description.substring(0, 50) + '...' : description }}
    </p>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useTypeStore } from '@/stores/type'

  export default {
    name: 'TypeCardComponent',
    data() {
      return {
        updatedName: this.title,
        updatedDescription: this.description,
      }
    },
    computed: {
      ...mapStores(useTypeStore),
    },
    props: {
      typeId: {
        type: [String, Number],
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    methods: {
      openSheet() {
        this.typeStore.setIsEditing(true)
        this.typeStore.setName(this.title)
        this.typeStore.setDescription(this.description)
        this.typeStore.updatedTypeId = this.typeId.toString()
        this.$emit('open-sheet')
      },
      openDeleteSheet() {
        this.typeStore.setIsDeleting(true)
        this.typeStore.setName(this.title)
        this.typeStore.deletedTypeId = this.typeId.toString()
        this.$emit('open-delete-sheet')
      },
    }
  }
</script>
