<template>
  <div>
    <search-form @search="handleSearch"></search-form>
    <city-form :cities="allCities" @selected="handleCityFilter"></city-form>
    
    <sort-form :items="['Preis','Größe','Räume']" @direction="handleCityFilter"></sort-form>

    <div v-for="inserat in filteredInseratList" :key="inserat.id">
      <v-container grid-list-xs>
        <router-link :to="'/inserat/' + inserat.id">
          <v-card>
            <v-card-title primary-title>
              {{ inserat.title }}
            </v-card-title>

            <v-img
              :src="getImage('/title-images/' + inserat.title_image)"
              :alt="`Titelbild`"
              cover
              height="200px"
            >
            </v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">headline</h3>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="primary">text</v-btn>
              <v-btn flat color="primary">text</v-btn>
            </v-card-actions>

            {{
              new Date(inserat.created_timestamp).toLocaleString("de", {
                dateStyle: "long",
              })
            }}
          </v-card>
        </router-link>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import data from "../data.json";
import type { IInserat } from "../types";

var inseratList: IInserat[] = [];

const searchFilter = ref("");
const cityFilter = ref<string[]>([]);

var sorting = {
  by: "",
  asc: true,
};

// Fetch all inserats
data.forEach((inserat: IInserat) => {
  inseratList.push(inserat);
});

// extract cities from data --> composables
const allCities = computed(() => {
  let returnList: string[] = [];
  inseratList.forEach((inserat: IInserat) => {
    if (returnList.indexOf(inserat["city"]) === -1) {
      returnList.push(inserat["city"]);
    }
  });
  return returnList;
});

// filter Inserats
const filteredInseratList = computed(() => {
  let returnList = inseratList;

  if (cityFilter.value.length)
    returnList = returnList.filter((inserat) =>
      cityFilter.value.includes(inserat.city)
    );

  //search
  if (searchFilter.value !== "") {
    returnList = returnList.filter(
      (inserat) =>
        inserat.title
          .toLocaleLowerCase()
          .includes(searchFilter.value.toLocaleLowerCase()) ||
        inserat.description
          .toLocaleLowerCase()
          .includes(searchFilter.value.toLocaleLowerCase()) ||
        inserat.local_description
          .toLocaleLowerCase()
          .includes(searchFilter.value.toLocaleLowerCase())
    );
  }

  return returnList;
});

// Handle Filters
const handleSearch = (search: string) => {
  searchFilter.value = search;
};

const handleCityFilter = (city: string[]) => {
  cityFilter.value = city;
};

function getImage(imgPath: string) {
  return imgPath ? new URL(imgPath, import.meta.url).href : "";
}
</script>

<style lang="scss" scoped></style>
