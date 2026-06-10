export default defineNuxtPlugin(() => {
   const runtimeConfig = useRuntimeConfig()
   const { apiUrl } = runtimeConfig.public

   const authInterceptor = $fetch.create({
      baseURL: apiUrl,
      onRequest({ options }) {
         const dekbotToken = useCookie<string | null>('dekbot-token')

         options.headers = new Headers(options.headers)
         if (dekbotToken.value) {
            options.headers.set('Authorization', `Bearer ${dekbotToken.value}`)
         }
      },
   })

   return {
      provide: {
         authInterceptor,
      },
   }
})
