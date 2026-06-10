export function useApiN8n() {
   const runtimeConfig = useRuntimeConfig()
   const { apiUrl } = runtimeConfig.public

   const authInterceptor = useAuthInterceptor()

   const getProfileImage = async (opts: {
      whatsapp: string
   }): Promise<{ profileImage: string | null }> => {
      const { whatsapp } = opts
      const { error, data } = await authInterceptor<DekbotResponse>(
         '/n8n/get-profile-image',
         {
            baseURL: apiUrl,
            body: {
               whatsapp,
            },
            method: 'POST',
         },
      )

      if (error) {
         throw new Error(error)
      }

      return data
   }

   async function requestAccessCode(opts: {
      appSubtitle: string
      appTitle: string
      whatsapp: string
   }): Promise<{ isDelivered: boolean }> {
      const { appSubtitle, appTitle, whatsapp } = opts
      const { error, data } = await $fetch<DekbotResponse>(
         '/n8n/request-access-code',
         {
            baseURL: apiUrl,
            body: {
               appSubtitle,
               appTitle,
               whatsapp,
            },
            method: 'POST',
         },
      )

      if (error) {
         throw new Error(error)
      }

      return data
   }

   async function verifyAccessCode(opts: {
      accessCode: string
      whatsapp: string
   }): Promise<{ isValid: boolean }> {
      const { accessCode, whatsapp } = opts
      const { error, data } = await $fetch<DekbotResponse>(
         '/n8n/verify-access-code',
         {
            baseURL: apiUrl,
            body: {
               accessCode,
               whatsapp,
            },
            method: 'POST',
         },
      )

      if (error) {
         throw new Error(error)
      }

      return data
   }

   return {
      getProfileImage,
      requestAccessCode,
      verifyAccessCode,
   }
}
