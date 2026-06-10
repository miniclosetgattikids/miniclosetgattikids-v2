import { supabaseClient } from '../../supabase.config'

export async function useDocsUpsert(
   tableName: GlobalKey,
   docs: any[],
): Promise<DekbotResponse> {
   const supabase = supabaseClient()

   const res = await supabase.from(tableName).upsert(docs)

   return buildDekResponse(res)
}
