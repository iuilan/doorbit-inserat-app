<template>
  <div>
    INSERAT LIST
    <div v-for="inserat in inseratList" :key="inserat.id">
      <router-link :to="'/inserat/' + inserat.id">
        <v-container grid-list-xs>
          <v-card>
      
         
                <v-card-title primary-title>
              {{ inserat.title }}
              {{ inserat.title_image }}
              
            </v-card-title>
         {{ getImage('../assets/title-images/'+inserat.title_image) }}
                <v-img :src="getImage('../assets/title-images/'+inserat.title_image) "
                :alt="`Titelbild`" cover height="200px">
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
            </v-card>
        
        </v-container></router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import data from "../data.json";

interface Inserat {
  id: number;
  steet: string;
  city: string;
  postcode: number;
  price_EUR: number;
  size_m2: number;
  baths_amount: number;
  rooms_amount: number;
  kitchens_amount: number;
  energy_efficiency: string;
  title: string;
  description: string;
  local_description: string;
  title_image: string;
  images?: string[] | null;
  created_timestamp: number;
}

var inseratList: Inserat[] = [];

data.forEach((inserat: Inserat) => {
  inseratList.push(inserat);
});


function getImage(imgPath: string) {
      return imgPath ?new URL(imgPath, import.meta.url).href: ""
    }
</script>

<style lang="scss" scoped></style>
