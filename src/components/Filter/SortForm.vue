<template>
  <div>
    
    <v-select
      v-model="selectedSort"
      :items="sortTypes"
      label="Sortieren nach"
      filled
    ></v-select>
    <!--v-btn round color="primary" @click="changeDirection()"><span v-if="asc">aufsteigend</span><span v-else>absteigend</span></v-btn-->

    <v-radio-group v-model="asc" @click="$emit('sortDir', asc)">
      <v-radio label="aufsteigend" :value="true"></v-radio>
      <v-radio label="absteigend" :value="false"></v-radio>
    </v-radio-group>
   {{ selectedSort }}
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  sortTypes: {
    type: Array,
  },
});

const asc=ref(true)
const selectedSort =ref('')



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
