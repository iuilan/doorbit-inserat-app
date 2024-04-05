<template>
  <div>
    <v-row>    <v-select
      v-model="selectedSort"
      :items="sortTypes"
      label="Sortieren nach"
      prepend-inner-icon="mdi-sort"
       
    ></v-select>
    <!--v-btn round color="primary" @click="changeDirection()"><span v-if="asc">aufsteigend</span><span v-else>absteigend</span></v-btn-->

    <v-radio-group v-model="asc">
      <v-radio label="aufsteigend" @click="$emit('sortAsc', true)" :value="true"></v-radio>
      <v-radio label="absteigend" @click="$emit('sortAsc', false)" :value="false"></v-radio>
    </v-radio-group>
   </v-row>
    

  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  sortTypes: {
    type: Array,
  },
});

const asc = ref(true)
const selectedSort =ref('Datum')



const emit = defineEmits(["sortBy","sortDir"]);
watch(selectedSort, (newVal) => {
  emit("sortBy", selectedSort.value);
});

// function changeDirection(){
//  asc.value=!asc.value
//  emit("sortDir", asc.value);

// }



</script>

<style scoped></style>
