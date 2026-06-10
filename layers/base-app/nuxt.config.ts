import vueDevTools from 'vite-plugin-vue-devtools'

export default defineNuxtConfig({
   compatibilityDate: '2025-06-01',

   components: [
      {
         path: './components',
         prefix: 'B',
      },
      { path: './components/landing', prefix: 'B' },
   ],

   devtools: {
      enabled: false,
   },

   extends: ['monorepo-shared'],

   icon: {
      serverBundle: {
         collections: ['lucide'],
      },
   },

   imports: { dirs: ['stores', 'services/supabase'] },

   modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxt/ui'],

   // manter para garantir o type nos apps consumidores
   runtimeConfig: {
      public: {
         accessUrl: '',
         apiUrl: '',
         appEnv: '',
         cookieDomain: '',
         landingUrl: '',
         supabaseKey: '',
         supabaseUrl: '',
      },
   },

   ui: {
      colorMode: false,
   },

   vite: {
      plugins: [vueDevTools()],
   },
})
