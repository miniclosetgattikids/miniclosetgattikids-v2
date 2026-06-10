export const useSessionStore = defineStore('sessionStore', () => {
   const showModalRegister = ref(false)

   const isLogOn = ref(false)

   const isDev = computed(() => {
      return import.meta.dev
   })

   return {
      isLogOn,
      showModalRegister,
      isDev,
   }
})
