<template>
  <div>
    <v-select
      v-model="items_selected"
      :items="items"
      :label="title"
      multiple
      chips
      prepend-inner-icon="mdi-filter"
    >
      <!-- <template v-slot:prepend-item>
        <v-list-item title="Alle auswählen" @click="toggle"> </v-list-item>

        <v-divider class="mt-2"></v-divider>
      </template> -->

      <template v-slot:selection="{ item, index }">
      <v-chip v-if="index < 2">
        <span>{{ item }}</span>
      </v-chip>
      <span
        v-if="index === 2"
        class="text-grey text-caption align-self-center"
      >
        (+{{ items_selected.length - 2 }} others)
      </span>
    </template>
    </v-select>
  
  
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  items: {
    type: Array,
  },
  title: {
    type: String,
    default:"Filter"
  },
});

const items_selected = ref(props.items);

const emit = defineEmits(["selected"]);
watch(items_selected, (newVal) => {
  emit("selected", items_selected.value);
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
