<template>
  <div>
    <v-select
      v-model="cities_selected"
      :items="cities"
      label="Städte"
      multiple
      chips
    >
      <!-- <template v-slot:prepend-item>
        <v-list-item title="Alle auswählen" @click="toggle"> </v-list-item>

        <v-divider class="mt-2"></v-divider>
      </template> -->
    </v-select>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  cities: {
    type: Array,
  },
});

const cities_selected = ref(props.cities);

const emit = defineEmits(["selected"]);
watch(cities_selected, (newVal) => {
  emit("selected", cities_selected.value);
});

// function toggle() {
//   console.log(allSelected);
//   if (allSelected) {
//     cities_selected.value = [];
//   } else {
//     cities_selected.value = cities.splice();
//   }
// }

// const allSelected = computed(() => {
//   cities_selected.value.length === cities.length;
// });
</script>

<style scoped></style>
