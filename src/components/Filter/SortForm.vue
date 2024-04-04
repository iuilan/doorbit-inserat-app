<template>
    <div>

        <v-select
    
      :items="items"
      label="Sortieren nach"
      v-model="sortBy"
    >
      <!-- <template v-slot:prepend-item>
        <v-list-item title="Alle auswählen" @click="toggle"> </v-list-item>

        <v-divider class="mt-2"></v-divider>
      </template> -->
    </v-select>

    <v-btn round color="primary" dark @click="changeDirection()" >^</v-btn>
 

    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  items: {
    type: Array,
  },
});

const sortBy = ref()

const asc = ref(true)

const emit = defineEmits(["sort","direction"]);

function changeDirection(){
    asc.value = !asc.value;
    emit("direction",asc)
}



</script>

<style scoped>

</style>