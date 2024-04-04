import { useRoute } from "vue-router";

<template>
    <div>
INSERAT 

{{ inserat }}
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { IInserat } from '../../types';
import data from '../../data.json'



var route = useRoute()

var inserat:IInserat

// fetch single inserat by id
data.forEach((data_inserat:IInserat) =>{
    if(data_inserat.id === Number(route.params.id)){
    inserat = data_inserat
    }
})



</script>

<style scoped>

</style>