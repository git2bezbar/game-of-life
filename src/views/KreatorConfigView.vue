<template>
  <HeaderComponent :type="'dashboard'" />
  <div class="flex flex-col items-start p-16 gap-4">
    <h1 class="text-7xl">Configurations</h1>
    <div class="flex flex-wrap gap-16 items-stretch">
      <div
        class="w-[250px] flex flex-col items-start gap-8"
        v-for="type in types"
        :key="type.id"
      >
        <TypeChip>{{ type.name }}</TypeChip>
        <AddingButtonComponent
          class="w-[250px] h-[150px]"
          @click="openAddSheet(type.id)"
        />
        <ConfigurationCardComponent
          v-for="config in configs.filter(config => config.typeId === type.id)"
          :key="config.id"
          :configurationId="config.id"
          :title="config.name"
          :x="config.bounding_box_x"
          :y="config.bounding_box_y"
          :period="config.period"
          :speed="config.speed"
          :pixels="config.pixels"
          :typeId="type.id"
          :type="type.name"
          @open-sheet="sheetSettings"
        />
      </div> 
    </div>

    <Transition>
      <SheetComponent
        class="overflow-y-scroll"
        @close="
          configurationStore.resetState(); 
          error = ''; 
          name = '';
          period = 0;
          speed = 0;
          bounding_box_x = 0;
          bounding_box_y = 0;
          pixels = [];
          typeId = null;
        "
        @submit="submitForm"
        v-if="configurationStore.isEditing || configurationStore.isCreating || configurationStore.isDeleting"
      >
        <template #title>
          {{ 
            configurationStore.isEditing 
              ? 'Modifier la configuration' 
              :  configurationStore.isCreating 
                ? 'Ajouter une configuration'
                : 'Supprimer la configuration'
          }}
        </template>
        <template v-if="configurationStore.isDeleting" #subtitle>
          Êtes-vous sûr de vouloir supprimer <strong>{{ configurationStore.name }}</strong> ?
        </template>
        <template v-else #form>
          <InputWithLabelComponent
            id="nameContainer"
            label="Nom"
            type="text"
            placeholder="Entrez le nom de la configuration"
            :value="configurationStore.name"
            @input="(event) => { name = event.target.value }"
          />
          <InputWithLabelComponent
            id="boundingBoxXContainer"
            label="Longueur de la configuration"
            type="number"
            placeholder="Entrez la longueur de la configuration"
            :value="bounding_box_x.toString()"
            @input="(event) => { bounding_box_x = event.target.value }"
          />
          <InputWithLabelComponent
            id="boundingBoxYContainer"
            label="Largeur de la configuration"
            type="number"
            placeholder="Entrez la largeur de la configuration"
            :value="bounding_box_y.toString()"
            @input="(event) => { bounding_box_y = event.target.value }"
          />
          <PatternProviderComponent
            :x="parseInt(bounding_box_x)"
            :y="parseInt(bounding_box_y)"
            :pixels="pixels"
            @update:pixelArray="pixels = $event"
          />
          <SelectWithLabelComponent
            id="typeContainer"
            label="Type"
            :value="typeId.toString()"
            placeholder="Sélectionnez un type"
            @input="(event) => { typeId = event.target.value }"
          >
            <template v-slot:default>
              <option
                v-for="type in types"
                class="text-black"
                :key="type.id"
                :value="type.id"
              >
                {{ type.name }}
              </option>
            </template>
          </SelectWithLabelComponent>
          <CheckboxComponent
            id="hasPeriod"
            label="La configuration a une période"
            :value="hasPeriod"
            @input="(event) => { hasPeriod = event.target.checked }"
          />
          <InputWithLabelComponent
            id="periodContainer"
            label="Période"
            type="number"
            placeholder="Entrez la période de la configuration"
            :value="period.toString()"
            @input="(event) => { period = event.target.value }"
            v-show="hasPeriod"
          />
          <InputWithLabelComponent
            id="speedContainer"
            label="Vitesse"
            type="number"
            placeholder="Entrez la vitesse de la configuration"
            :value="speed.toString()"
            @input="(event) => { speed = event.target.value }"
            v-show="typeId == types.find(type => type.name === 'Spaceships').id"
          />
          <p v-show="error.length" class="px-8 py-4 rounded-2xl bg-pink/50">{{ error }}</p>
        </template>
        <template #submitButtonText>
          {{ 
            configurationStore.isEditing 
            ? 'Sauvegarder les modifications' 
            :  configurationStore.isCreating 
              ? 'Ajouter une configuration'
              : 'Supprimer la configuration'
          }}
        </template>
        <template #cancelButtonText>Annuler</template>
      </SheetComponent>
    </Transition>
  </div>
</template>

<script>
  import { mapStores } from 'pinia';
  
  import HeaderComponent from '@/components/Header/HeaderComponent.vue'
  import SheetComponent from '@/components/Sheet/SheetComponent.vue';
  import InputWithLabelComponent from '@/components/InputWithLabel/InputWithLabelComponent.vue';
  import SelectWithLabelComponent from '@/components/SelectWithLabel/SelectWithLabelComponent.vue';
  import CheckboxComponent from '@/components/Checkbox/CheckboxComponent.vue';
  import PatternProviderComponent from '@/components/PatternProvider/PatternProviderComponent.vue';

  import { getAllTypes } from '@/services/api/types';
  import { useTypeStore } from '@/stores/type';
  import { useConfigurationStore } from '@/stores/configuration';
  import TypeChip from '@/components/TypeChip/TypeChipComponent.vue';
  import AddingButtonComponent from '@/components/AddingButton/AddingButtonComponent.vue';
  import ConfigurationCardComponent from '@/components/dashboard/ConfigurationCard/ConfigurationCardComponent.vue';
  import { getAllConfigs } from '@/services/api/configs';

  export default {
    name: 'KreatorTypeView',
    components: {
      HeaderComponent,
      TypeChip,
      AddingButtonComponent,
      ConfigurationCardComponent,
      SheetComponent,
      InputWithLabelComponent,
      SelectWithLabelComponent,
      CheckboxComponent,
      PatternProviderComponent,
    },
    data() {
      return {
        types: [],
        configs: [],
        isFetching: false,
        error: '',
        name: '',
        hasPeriod: false,
        period: 0,
        speed: 0,
        bounding_box_x: 0,
        bounding_box_y: 0,
        pixels: [],
        typeId: null,
      }
    },
    methods: {
      async fetchTypes() {
        this.isFetching = true;
        this.types = await getAllTypes();
        this.configs = await getAllConfigs();
        this.isFetching = false;
      },
      async submitForm() {
        if (
          this.configurationStore.isDeleting 
          && this.configurationStore.deletedConfigurationId
        ) {
          try {
            await this.configurationStore.deleteConfiguration();
            this.configurationStore.resetState();
            this.error = '';
            this.name = '';
            this.hasPeriod = false;
            this.period = 0;
            this.speed = 0;
            this.bounding_box_x = 0;
            this.bounding_box_y = 0;
            this.pixels = [];
            this.typeId = null;

            await this.fetchTypes();
          } catch (error) {
            this.error = error.message;
          }
        } else {
          if (!this.name.trim()) {
            this.error = 'Le nom ne peut pas être vide';
            return;
          }

          if (this.bounding_box_x == 0 || this.bounding_box_y == 0) {
            this.error = 'La longueur et/ou la largeur ne peuvent pas être nuls';
            return;
          }

          // if (this.pixels.length === 0) {
          //   this.error = 'Les pixels ne peuvent pas être vides';
          //   return;
          // }

          if (!this.typeId) {
            this.error = 'Le type ne peut pas être vide';
            return;
          }

          if (this.hasPeriod && !this.period) {
            this.error = 'La période ne peut pas être vide';
            return;
          }

          if (this.typeId == this.types.find(type => type.name === 'Spaceships').id && !this.speed) {
            this.error = 'La vitesse ne peut pas être vide';
            return;
          }

          try {
            if (this.configurationStore.isEditing) {
              console.log(
                this.name.trim(),
                this.period,
                this.speed,
                this.bounding_box_x,
                this.bounding_box_y,
                this.pixels,
                this.typeId
              )
              await this.configurationStore.editConfiguration(
                this.name.trim(),
                this.hasPeriod ? this.period : 0,
                this.speed,
                this.bounding_box_x,
                this.bounding_box_y,
                this.pixels,
                this.typeId
              );
            } else {
              await this.configurationStore.addConfiguration(
                this.name.trim(),
                this.period,
                this.speed,
                this.bounding_box_x,
                this.bounding_box_y,
                this.pixels,
                this.typeId
              );
            }

            this.configurationStore.resetState();
            this.error = '';
            this.name = '';
            this.hasPeriod = false;
            this.period = 0;
            this.speed = 0;
            this.bounding_box_x = 0;
            this.bounding_box_y = 0;
            this.pixels = [];
            this.typeId = null;

            await this.fetchTypes();
          } catch (error) {
            this.error = error.message;
          }
        }
      },
      sheetSettings() {
        this.error = '';
        this.name = this.configurationStore.name;
        this.period = this.configurationStore.period;
        this.speed = this.configurationStore.speed;
        this.bounding_box_x = this.configurationStore.bounding_box_x;
        this.bounding_box_y = this.configurationStore.bounding_box_y;
        this.pixels = this.configurationStore.pixels;
        this.typeId = this.configurationStore.typeId;

        this.hasPeriod = this.period > 0;
      },
      openAddSheet(typeId) {
        this.configurationStore.setIsCreating(true);
        this.configurationStore.setName('');
        this.configurationStore.setPeriod(0);
        this.configurationStore.setSpeed(0);
        this.configurationStore.setBoundingBoxX(0);
        this.configurationStore.setBoundingBoxY(0);
        this.configurationStore.setPixels([]);
        this.configurationStore.setTypeId(typeId);
        this.typeId = typeId.toString();
      },
    },
    computed: {
      ...mapStores(useTypeStore),
      ...mapStores(useConfigurationStore),
    },
    async mounted() {
      await this.fetchTypes();
    },
    watch: {
      pixels(newValue) {
        console.log(newValue)
      }
    }
  }
</script>

<style>
  .v-enter-active,
  .v-leave-active {
    transform: translateX(0);
    transition: 0.5s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
    transform: translateX(100%);
  }
</style>