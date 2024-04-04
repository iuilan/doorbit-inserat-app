import { useRoute } from "vue-router";

<template>
    <div>
INSERAT 

{{ route }}
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { IInserat } from '../../types';



var route = useRoute()



</script>

<style scoped>

</style>