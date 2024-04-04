<template>
  <v-footer height="40" app>
    <div
      class="text-caption text-disabled"
      style=" width: 100%;text-align: center;"
    >
    Created with ♥ by <span class="d-none d-sm-inline-block">IUILAN</span>

  
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon
        :icon="item.icon"
    
      />
    </a>
    |  {{ (new Date()).getFullYear() }}   </div>

  </v-footer>
</template>

<script setup lang="ts">
  const items = [


    {
      title: 'Iuilan Website',
      icon: `mdi-web`,
      href: 'https://iuilan.com',
    },

  ]
</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
