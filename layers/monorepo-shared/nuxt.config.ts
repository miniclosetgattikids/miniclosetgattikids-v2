export default defineNuxtConfig({
   compatibilityDate: '2025-06-01',

   imports: {
      dirs: [
         'utils',
         'models/base',
         'models/global',
         'models/schedly',
         'models/publishr',
      ],
      presets: [
         {
            from: 'vee-validate',
            imports: ['useField', 'useForm', 'useIsFormValid', 'useIsFormDirty'],
         },
      ],
   },

   modules: ['@nuxt/eslint'],
})
