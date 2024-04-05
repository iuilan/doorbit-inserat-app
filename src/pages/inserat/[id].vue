<template>
  <div>
    <v-card>
      <v-container>
        <h1>{{ inserat.title }}</h1>
        <div class="d-flex flex-wrap flex-lg-nowrap mt-12">
          <v-col style="min-width: 500px">
           
                <v-img
                  :src="'/title-images/' + inserat.title_image"
                  :alt="`Titelbild`"
                  cover
                  height="300px"
                >
                </v-img>
                <v-row style="font-size: small" class="ma-3"
                >
                  <span 
                    ><v-icon icon="mdi-map-marker"></v-icon> {{ inserat.street }}, {{ inserat.postcode }} {{ inserat.city }}</span
                  >
                </v-row
              >
          </v-col>

          <v-col cols="lg-5 md-1" class="flex-fill mt-8">
            
             
              <v-row class="border-b-sm"
                ><v-col cols="5"> <span>Wohnfläche:</span> </v-col
                ><v-col cols="auto">
                  <span>{{ inserat.size_m2 }}m²</span></v-col
                ></v-row
              >   <v-row class="border-b-sm"
                ><v-col cols="5"> <span>Effizienzklasse:</span> </v-col
                ><v-col cols="auto">
                  <span>{{ inserat.energy_efficiency }}</span></v-col
                ></v-row
              >
              <v-row class="border-b-sm"
                ><v-col cols="5"> <span>Zimmeranzahl:</span> </v-col
                ><v-col cols="auto">
                  <span>{{ inserat.rooms_amount }}</span></v-col
                ></v-row
              >
              <v-row class="border-b-sm"
                ><v-col cols="5"> <span>Bäder:</span> </v-col
                ><v-col cols="auto">
                  <span>{{ inserat.baths_amount }}</span></v-col
                ></v-row
              >
              <v-row class="border-b-sm"
                ><v-col cols="5"> <span>Küchen:</span> </v-col
                ><v-col cols="auto">
                  <span>{{ inserat.kitchens_amount }}</span></v-col
                ></v-row
              >
           
              <v-row style="font-size: larger"
                ><v-col cols="5"> <span>Preis:</span> </v-col
                ><v-col cols="auto">
                  <span
                    >{{ inserat.price_EUR.toLocaleString("de") }} €</span
                  ></v-col
                ></v-row
              >
          </v-col>
        </div>

        <div class="mt-5">
          <h2>Beschreibung:</h2>
          <p>
            {{ inserat.description }} Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Inventore eum praesentium, ad unde ex porro
            ratione placeat totam odit incidunt alias quibusdam! Similique velit
            iure accusantium doloribus non incidunt tempore?
          </p></div><div class="mt-8">

          <h2>Lagebeschreibung:</h2>
          <p>
            {{ inserat.local_description }} Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Corrupti voluptatum deserunt ipsum
            nam, dicta amet autem fugit dolorem nihil voluptate delectus
            laboriosam facere blanditiis rerum error animi ipsa nemo doloremque.
          </p>
        </div>
        <div class="mt-5">
            <h2>Bildergallerie:</h2>
        <v-carousel class="border-lg ma-2 mb-10">
          <v-carousel-item
            v-for="image in inserat.images"
            :key="image"
            :src="'/images/' + image + '.jpeg'"
            cover
          ></v-carousel-item>
        </v-carousel> Eingestellt am
        {{
              new Date(inserat.created_timestamp).toLocaleString("de", {
                dateStyle: "long",
              })
            }}
     
    </div>
      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import type { IInserat } from "../../types";
import data from "../../data.json";

var route = useRoute();

var inserat: IInserat;

// fetch single inserat by id
data.forEach((data_inserat: IInserat) => {
  if (data_inserat.id === Number(route.params.id)) {
    inserat = data_inserat;
  }
});
</script>

<style scoped></style>
