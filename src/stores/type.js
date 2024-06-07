import { createType, updateType, deleteType } from '@/services/api/types'
import { defineStore } from 'pinia'

export const useTypeStore = defineStore('type', {
  state: () => ({
    isEditing: false,
    isCreating: false,
    isDeleting: false,
    name: '',
    description: '',
    updatedTypeId: null,
    deletedTypeId: null
  }),
  actions: {
    setIsEditing(isEditing) {
      this.isEditing = isEditing
    },
    setIsCreating(isCreating) {
      this.isCreating = isCreating
    },
    setIsDeleting(isDeleting) {
      this.isDeleting = isDeleting
    },
    setName(name) {
      this.name = name
    },
    setDescription(description) {
      this.description = description
    },
    setUpdatedTypeId(id) {
      this.updatedTypeId = id
    },
    setDeletedTypeId(id) {
      this.deletedTypeId = id
    },
    async addType(name, description) {
      await createType({ name, description });
    },
    async editType(name, description) {
      if (!this.updatedTypeId) return;
      await updateType(this.updatedTypeId, { name, description });
    },
    async deleteType() {
      if (!this.deletedTypeId) return;
      await deleteType(this.deletedTypeId);
    },
    resetState() {
      this.isEditing = false
      this.isCreating = false
      this.isDeleting = false
      this.name = ''
      this.description = ''
    }
  }
})
