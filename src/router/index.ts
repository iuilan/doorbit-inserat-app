/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import Inserat from '../pages/inserat/[id].vue'


const routes = [
  // dynamic segments start with a colon
  { path: '/inserat/:id', component: Inserat },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
 routes
})

export default router
