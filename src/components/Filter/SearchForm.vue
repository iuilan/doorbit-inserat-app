<template>
  <div>
    <v-form>
      <v-text-field
      prepend-inner-icon="mdi-magnify"
        name="search"
        label="Suche"
        single-line
        @input="(e) => $emit('search', e.target.value)"
      ></v-text-field>
    </v-form>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
