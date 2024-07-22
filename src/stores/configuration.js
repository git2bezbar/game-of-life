import { createConfig, updateConfig, deleteConfig } from '@/services/api/configs';
import { defineStore } from 'pinia'

export const useConfigurationStore = defineStore('configuration', {
  state: () => ({
    isEditing: false,
    isCreating: false,
    isDeleting: false,
    name: '',
    period: '',
    speed: '',
    bounding_box_x: 0,
    bounding_box_y: 0,
    pixels: [],
    typeId: null,
    updatedConfigurationId: null,
    deletedConfigurationId: null
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
    setPeriod(period) {
      this.period = period
    },
    setSpeed(speed) {
      this.speed = speed
    },
    setBoundingBoxX(bounding_box_x) {
      this.bounding_box_x = bounding_box_x
    },
    setBoundingBoxY(bounding_box_y) {
      this.bounding_box_y = bounding_box_y
    },
    setPixels(pixels) {
      this.pixels = pixels
    },
    setTypeId(typeId) {
      this.typeId = typeId
    },
    setUpdatedConfigurationId(id) {
      this.updatedConfigurationId = id
    },
    setDeletedConfigurationId(id) {
      this.deletedConfigurationId = id
    },
    async addConfiguration(
      name,
      period,
      speed,
      bounding_box_x,
      bounding_box_y,
      pixels,
      typeId
    ) {
      await createConfig({
        name,
        period,
        speed,
        bounding_box_x,
        bounding_box_y,
        pixels,
        typeId
      });
    },
    async editConfiguration(
      name,
      period,
      speed,
      bounding_box_x,
      bounding_box_y,
      pixels,
      typeId
    ) {
      if (!this.updatedConfigurationId || !(
        name ||
        period ||
        speed ||
        bounding_box_x ||
        bounding_box_y ||
        pixels ||
        typeId
      )) return;
      await updateConfig(this.updatedConfigurationId, {
        name,
        period,
        speed,
        bounding_box_x,
        bounding_box_y,
        pixels,
        typeId
      });
    },
    async deleteConfiguration() {
      if (!this.deletedConfigurationId) return;
      await deleteConfig(this.deletedConfigurationId);
    },
    resetState() {
      this.isEditing = false
      this.isCreating = false
      this.isDeleting = false
      this.name = ''
      this.period = ''
      this.speed = ''
      this.bounding_box_x = 0
      this.bounding_box_y = 0
      this.pixels = []
      this.typeId = null
    }
  }
});
