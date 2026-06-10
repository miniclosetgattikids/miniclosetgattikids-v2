import { supabaseClient } from '../../supabase.config'

export async function useDocCreate(
   tableName: GlobalKey,
   doc: any,
): Promise<DekbotResponse> {
   const supabase = supabaseClient()

   const res = await supabase.from(tableName).insert(doc)

   return buildDekResponse(res)
}
