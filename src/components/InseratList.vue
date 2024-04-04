<template>
  <div>
    <search-form @search="handleSearch"></search-form>
    <city-form :cities="allCities" @selected="handleCityFilter"></city-form>
    <sort-form
      :sortTypes="['Datum', 'Preis', 'Größe']"
      @sortBy="handleSortBy"
      @sortDir="handleSortDirection"
    ></sort-form>
    <!-- <sort-form
      :sortTypes="[
           {
          type: 'date',
          label: 'Datum',
        },
        {
          type: 'price',
          label: 'Preis',
        },
  
        {
          type: 'size',
          label: 'Größe',
        },
        {
          type: 'size',
          label: 'Größe',
        },
      ]"
    ></sort-form> -->

    <div v-for="inserat in filteredInseratList" :key="inserat.id">
      <v-container grid-list-xs style="padding: ">
        <v-card grid-list-xs>
          <v-card-title primary-title>
            {{ inserat.title }}
          </v-card-title>
          <v-container row>
            <v-img
              :src="('/title-images/' + inserat.title_image)"
              :alt="`Titelbild`"
              cover
              height="200px"
              width="50%"
            >
            </v-img>
          </v-container>

          <v-contaner>
            <v-card>
              <span>Größe:</span><span>{{ inserat.size_m2 }}m²</span>
              <span>Räume:</span><span>{{ inserat.rooms_amount }}</span>
              <span>Bäder:</span><span>{{ inserat.baths_amount }}</span>
              <span>Preis:</span><span>{{ inserat.price_EUR }} €</span>
            </v-card>
            <span>Eingestellt am</span>
            {{
              new Date(inserat.created_timestamp).toLocaleString("de", {
                dateStyle: "long",
              })
            }}
            <router-link :to="'/inserat/' + inserat.id">
              <v-btn style="margin: 10px" color="success"
                >öffnen</v-btn
              ></router-link
            >
          </v-contaner>
        </v-card>
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
const sorting = ref({
  by: "date",
  asc: true,
});

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

// FILTER INSERATE------------------ COMPUTED
const filteredInseratList = computed(() => {
  let returnList = inseratList;

  // A T T R I B U T E S | City
  if (cityFilter.value.length)
    returnList = returnList.filter((inserat) =>
      cityFilter.value.includes(inserat.city)
    );

  // S E A R C H | title, description, local desription
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

  // S O R T | Price, Date, Size
  let asc = sorting.value.asc;
  let sortBy = sorting.value.by;

  switch (sortBy) {
    case "Datum":
      returnList.sort((a, b) =>
        asc
          ? a.created_timestamp - b.created_timestamp
          : b.created_timestamp - a.created_timestamp
      );
      break;
    case "Größe":
      returnList.sort((a, b) =>
        asc ? a.size_m2 - b.size_m2 : b.size_m2 - a.size_m2
      );
      break;
    case "Preis":
      returnList.sort((a, b) =>
        asc ? a.price_EUR - b.price_EUR : b.price_EUR - a.price_EUR
      );
      break;
    default:
      break;
  }

  return returnList;
});

// Handle Filters
const handleSearch = (search: string) => {
  searchFilter.value = search;
};

const handleSortBy = (by: string) => {
  sorting.value.by = by;
};

const handleSortDirection = (asc: boolean) => {
  sorting.value.asc = asc;
};

const handleCityFilter = (city: string[]) => {
  cityFilter.value = city;
};


// Get Dynamic ImagePATH
function getImage(imgPath: string) {
  return imgPath ? new URL(imgPath, import.meta.url).href : "";
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
