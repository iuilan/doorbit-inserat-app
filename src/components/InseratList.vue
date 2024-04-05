<template>
  <div>
    <v-container >
   <v-row class="ma-6 d-flex flex-wrap flex-md-nowrap ga-2" >
    
      <select-form
        :items="allCities"
        @selected="handleCityFilter"
        title="Städte"
      ></select-form>
  
      <select-form
        :items="allEnergieClasses"
        @selected="handleEnergyFilter"
        title="Energie-Effizenzklassen"
      ></select-form>
   
    </v-row>
    <v-row class="ma-6 d-flex flex-wrap flex-md-nowrap ga-2 "><v-col> <search-form @search="handleSearch"></search-form></v-col><v-col><sort-form
        :sortTypes="['Datum', 'Preis', 'Wohnfläche', 'Zimmeranzahl']"
        @sortBy="handleSortBy"
        @sortAsc="handleSortDirection"
      ></sort-form></v-col></v-row>
     

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
<div class="text-center">
      <div v-if="filteredInseratList.length <= 0">Keine Inserate gefunden.</div>

      <div v-else>
        Es <span v-if="filteredInseratList.length == 1">wurde</span>
        <span v-else>wurden</span> <span class="font-weight-bold">{{ filteredInseratList.length }} </span> 
        <span v-if="filteredInseratList.length == 1"> Inserat</span>
        <span v-else> Inserate</span> gefunden.
      </div>
    </div> <div v-for="inserat in filteredInseratList" :key="inserat.id">
        <v-card class="ma-6">
          <div class="d-flex flex-wrap flex-md-nowrap">
            <v-col
              style="min-width: 500px"
             
            >
              <v-card-media>
                <router-link :to="'/inserat/' + inserat.id" target="_blank">
                  <v-img
                    :src="'/title-images/' + inserat.title_image"
                    :alt="`Titelbild`"
                    cover
                    height="300px"
                  
                  >
                  </v-img>
                </router-link>
              </v-card-media>
            </v-col>

            <v-col cols="auto" class="flex-fill">
              <router-link :to="'/inserat/' + inserat.id" target="_blank">
                <v-card-text class="text-black" style="font-size:large">
                  {{ inserat.title }}
                </v-card-text></router-link
              >
              <v-card-text>
                <v-row style="font-size: larger"
                  ><v-col cols="auto"> <span>Preis:</span> </v-col
                  ><v-col cols="5">
                    <span
                      >{{ inserat.price_EUR.toLocaleString("de") }} €</span
                    ></v-col
                  ></v-row
                >
                <v-row
                  ><v-col cols="auto"> <span>Wohnfläche:</span> </v-col
                  ><v-col cols="5">
                    <span>{{ inserat.size_m2 }}m²</span></v-col
                  ></v-row
                >
                <v-row
                  ><v-col cols="auto"> <span>Effizienzklasse:</span> </v-col
                  ><v-col cols="5">
                    <span>{{ inserat.energy_efficiency }}</span></v-col
                  ></v-row
                >
                <v-row
                  ><v-col cols="auto"> <span>Zimmeranzahl:</span> </v-col
                  ><v-col cols="5">
                    <span>{{ inserat.rooms_amount }}</span></v-col
                  ></v-row
                >
                <!-- <v-row
                  ><v-col cols="auto"> <span>Bäder:</span> </v-col
                  ><v-col cols="5">
                    <span>{{ inserat.baths_amount }}</span></v-col
                  ></v-row
                > -->
              </v-card-text>
              <v-card-actions width="100%">
                <v-btn size="x-large" block elevation="4"
                  ><router-link :to="'/inserat/' + inserat.id" target="_blank"
                    >ansehen</router-link
                  ></v-btn
                >
              </v-card-actions>
            </v-col>
          </div>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import data from "../data.json";
import type { IInserat } from "../types";

var inseratList: IInserat[] = [];

const searchFilter = ref("");
const cityFilter = ref<string[]>([]);

const energyFilter = ref<string[]>([]);
const sorting = ref({
  by: "Datum",
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

// extract energy-efficiencies from data --> composables
const allEnergieClasses = computed(() => {
  let returnList: string[] = [];
  inseratList.forEach((inserat: IInserat) => {
    if (returnList.indexOf(inserat["energy_efficiency"]) === -1) {
      returnList.push(inserat["energy_efficiency"]);
    }
  });
  return returnList;
});

// FILTER INSERATE------------------ COMPUTED
const filteredInseratList = computed(() => {
  let returnList = inseratList;

  // A T T R I B U T E S | City, Energy
  if (cityFilter.value.length)
    returnList = returnList.filter((inserat) =>
      cityFilter.value.includes(inserat.city)
    );

    if (energyFilter.value.length)
    returnList = returnList.filter((inserat) =>
    energyFilter.value.includes(inserat.energy_efficiency)
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
    case "Wohnfläche":
      returnList.sort((a, b) =>
        asc ? a.size_m2 - b.size_m2 : b.size_m2 - a.size_m2
      );
      break;
    case "Preis":
      returnList.sort((a, b) =>
        asc ? a.price_EUR - b.price_EUR : b.price_EUR - a.price_EUR
      );
      break;
    case "Zimmeranzahl":
      returnList.sort((a, b) =>
        asc ? a.rooms_amount - b.rooms_amount : b.rooms_amount - a.rooms_amount
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

const handleEnergyFilter = (energyClass: string[]) => {
  energyFilter.value = energyClass;
};

// // Get Dynamic ImagePATH
// function getImage(imgPath: string) {
//   return imgPath ? new URL(imgPath, import.meta.url).href : "";
// }
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  &:hover{
    text-decoration: underline;
  }
}
</style>
