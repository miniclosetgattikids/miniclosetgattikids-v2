export default defineNuxtConfig({
   compatibilityDate: '2025-06-01',

   css: ['./app/assets/css/main.css', './app/assets/css/override-theme-ui.css'],

   devServer: {
      port: 3080,
   },

   devtools: {
      enabled: false,
   },

   components: [
      {
         path: './components',
      },
   ],

   modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui'],

   ui: {
      colorMode: false,
   },

   vite: {
      optimizeDeps: {
         include: ['@date-fns/tz'],
      },
   },
})
