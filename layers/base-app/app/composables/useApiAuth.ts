export function useApiAuth() {
   const runtimeConfig = useRuntimeConfig()
   const { apiUrl } = runtimeConfig.public

   async function checkIsNewUser(
      phone: string,
      type: UserType,
   ): Promise<{ user: User | null }> {
      const whatsapp = setStringToWhatsApp(phone)
      const { error, data } = await $fetch<DekbotResponse>(
         '/supabase/check-is-new-user',
         {
            baseURL: apiUrl,
            body: { phone: whatsapp, type },
            method: 'POST',
         },
      )

      if (error) {
         throw new Error(error)
      }

      if (!data) {
         throw new Error('Erro ao verificar o novo usuário.')
      }

      const user =
         data.users.find((u: User) => {
            return u.type === type
         }) ?? null
      return { user }
   }

   async function createToken(user: User): Promise<{ token: string }> {
      const { error, data } = await $fetch<DekbotResponse>('/token/create', {
         baseURL: apiUrl,
         body: user,
         method: 'POST',
      })

      if (error) {
         throw new Error(error)
      }

      if (!data) {
         throw new Error('Erro ao gerar novo token.')
      }

      return data
   }

   return {
      checkIsNewUser,
      createToken,
   }
}
