import { supabaseClient } from '../../supabase.config'

export async function useDocUpdate(
   tableName: GlobalKey,
   doc: any,
): Promise<DekbotResponse> {
   const supabase = supabaseClient()

   const res = await supabase.from(tableName).update(doc).eq('id', doc.id)

   return buildDekResponse(res)
}
