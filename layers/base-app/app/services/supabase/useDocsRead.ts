import { supabaseClient } from '../../supabase.config'

export async function useDocsRead(tableName: GlobalKey): Promise<DekbotResponse> {
   const supabase = supabaseClient()

   const res = await supabase.from(tableName).select('*')

   return buildDekResponse(res)
}
