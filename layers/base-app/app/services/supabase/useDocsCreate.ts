import { supabaseClient } from '../../supabase.config'

export async function useDocsCreate(
   tableName: GlobalKey,
   docs: any[],
): Promise<DekbotResponse> {
   const supabase = supabaseClient()

   const res = await supabase.from(tableName).insert(docs)

   return buildDekResponse(res)
}
