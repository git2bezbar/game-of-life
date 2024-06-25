<template>
  <HeaderComponent :type="'dashboard'" />
  <div class="flex flex-col items-start p-16 gap-4">
    <h1 class="text-7xl">Types</h1>
    <div class="flex flex-wrap gap-8 items-stretch">
      <AddingButtonComponent
        :class="['w-[250px]', `${(typeStore.isEditing || typeStore.isCreating || typeStore.isDeleting) ? 'opacity-50 pointer-events-none' : ''}`]"
        @click="openAddSheet"
      />
      <TypeCardComponent
        v-if="this.isFetching"
        title="Chargement..."
        description="Chargement..."
        typeId="-1"
      />
      <TypeCardComponent
        v-for="type in this.types"
        :key="type.id"
        :typeId="type.id"
        :title="type.name"
        :description="type.description"
        @open-sheet="sheetSettings"
      />
    </div>

    <Transition>
      <SheetComponent
        @close="typeStore.resetState(); error = ''; name = ''; description = '';"
        @submit="submitForm"
        v-if="typeStore.isEditing || typeStore.isCreating || typeStore.isDeleting"
      >
        <template #title>
          {{ 
            typeStore.isEditing 
              ? 'Modifier le type' 
              :  typeStore.isCreating 
                ? 'Ajouter un type'
                : 'Supprimer le type'
          }}
        </template>
        <template v-if="typeStore.isDeleting" #subtitle>
          Êtes-vous sûr de vouloir supprimer <strong>{{ typeStore.name }}</strong> ?
        </template>
        <template v-else #form>  
          <InputWithLabelComponent
            id="nameContainer"
            label="Nom"
            type="text"
            placeholder="Entrez le nom du type"
            :value="typeStore.name"
            @input="(event) => { name = event.target.value }"
          />
          <InputWithLabelComponent
            id="descriptionContainer"
            label="Description"
            type="text"
            placeholder="Entrez la description du type"
            :value="typeStore.description"
            @input="(event) => { description = event.target.value }"
          />
          <p v-show="error.length" class="px-8 py-4 rounded-2xl bg-pink/50">{{ error }}</p>
        </template>
        <template #submitButtonText>
          {{ 
            typeStore.isEditing 
            ? 'Sauvegarder les modifications' 
            :  typeStore.isCreating 
              ? 'Ajouter un type'
              : 'Supprimer le type'
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
  import AddingButtonComponent from '@/components/AddingButton/AddingButtonComponent.vue'
  import TypeCardComponent from '@/components/TypeCard/TypeCardComponent.vue'
  import InputWithLabelComponent from '@/components/InputWithLabel/InputWithLabelComponent.vue';
  import SheetComponent from '@/components/Sheet/SheetComponent.vue';

  import { getAllTypes } from '@/services/api/types';
  import { useTypeStore } from '@/stores/type';

  export default {
    name: 'KreatorTypeView',
    components: {
      HeaderComponent,
      AddingButtonComponent,
      TypeCardComponent,
      InputWithLabelComponent,
      SheetComponent,
    },
    data() {
      return {
        types: [],
        isFetching: false,
        error: '',
        name: '',
        description: '',
      }
    },
    methods: {
      async fetchTypes() {
        this.isFetching = true;
        this.types = await getAllTypes();
        this.isFetching = false;
      },
      async submitForm() {
        if (this.typeStore.isDeleting) {
          try {
            await this.typeStore.deleteType();
            this.typeStore.resetState();
            this.error = '';
            this.name = '';
            this.description = '';

            await this.fetchTypes();
          } catch (error) {
            this.error = error.message;
          }
        } else {
          if (!this.name.trim() || !this.description.trim()) {
            this.error = 'Veuillez remplir tous les champs';
          } else if (this.name.trim() === this.typeStore.name && this.description.trim() === this.typeStore.description) {
            this.error = 'Aucune modification n\'a été apportée';
          } else {
            try {
              this.typeStore.isEditing 
              ? await this.typeStore.editType(this.name.trim(), this.description.trim())
              : await this.typeStore.addType(this.name.trim(), this.description.trim());
              
              this.typeStore.resetState();
              this.error = '';
              this.name = '';
              this.description = '';
  
              await this.fetchTypes();
            } catch (error) {
              this.error = error.message;
            }
          }
        }

      },
      sheetSettings() {
        this.error = '';
        this.name = this.typeStore.name;
        this.description = this.typeStore.description;
      },
      openAddSheet() {
        this.typeStore.setIsCreating(true);
        this.typeStore.setName('');
        this.typeStore.setDescription('');
      },
    },
    computed: {
      ...mapStores(useTypeStore),
    },
    mounted() {
      this.fetchTypes();
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