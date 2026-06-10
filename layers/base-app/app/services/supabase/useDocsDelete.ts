import { supabaseClient } from '../../supabase.config'

export async function useDocsDelete(
   tableName: GlobalKey,
   ids: string[],
): Promise<DekbotResponse> {
   const supabase = supabaseClient()

   const res: SupabaseDeleteResponse = await supabase
      .from(tableName)
      .delete({ count: 'exact' })
      .in('id', ids)

   return buildDekResponse(res)
}
