import { createClient } from '@supabase/supabase-js'

export const supabaseClient = () => {
   const runtimeConfig = useRuntimeConfig()
   const { supabaseKey, supabaseUrl } = runtimeConfig.public

   const dekbotToken = useCookie<string | null>('dekbot-token')

   const client = createClient(supabaseUrl, supabaseKey, {
      accessToken: async () => {
         return dekbotToken.value
      },
   })

   return client
}
