<template>
  <div>
    INSERAT LIST
    
    <div v-for="inserat in getFilteredInseratList()" :key="inserat.id">

        <v-container grid-list-xs>
          <router-link :to="'/inserat/' + inserat.id">
          <v-card>
      
         
                <v-card-title primary-title>
              {{ inserat.title }}
           
              
            </v-card-title>
    
                <v-img :src="getImage('/title-images/'+inserat.title_image)"
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
                {{ inserat.created_timestamp }}
                {{       new Date(inserat.created_timestamp).toLocaleString("de", {
                dateStyle: "long",
              }) }}
            </v-card>
            </router-link
      >
        </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">

import data from "../data.json";
import type {IInserat}  from "../types"


var inseratList: IInserat[] = [];
var sortBy




// Fill inserat-list
data.forEach((inserat: IInserat) => {
  inseratList.push(inserat);
});



function getFilteredInseratList():IInserat[]{
  var filteredList:IInserat[] = inseratList





  return filteredList
}






function getImage(imgPath: string) {
      return imgPath ? new URL(imgPath, import.meta.url).href : ""
    }


</script>

<style lang="scss" scoped></style>
