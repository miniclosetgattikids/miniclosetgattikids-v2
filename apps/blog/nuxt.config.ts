export default defineNuxtConfig({
   compatibilityDate: '2025-06-01',

   css: ['./app/assets/css/main.css', './app/assets/css/override-theme-ui.css'],

   components: [
      {
         path: './components',
      },
   ],

   devServer: {
      port: 3081,
   },

   devtools: {
      enabled: false,
   },

   modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui'],

   ssr: false,

   ui: {
      colorMode: false,
   },

   vite: {
      optimizeDeps: {
         include: ['@date-fns/tz'],
      },
   },
})
