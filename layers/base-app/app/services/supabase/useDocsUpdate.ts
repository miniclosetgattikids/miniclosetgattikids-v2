import { supabaseClient } from '../../supabase.config'

export async function useDocsUpdate(
   tableName: GlobalKey,
   docs: any[],
): Promise<DekbotResponse> {
   const supabase = supabaseClient()

   for (const doc of docs) {
      const res = await supabase.from(tableName).update(doc).eq('id', doc.id)
      if (res.error) {
         return buildDekResponse(res)
      }
   }

   return buildSuccessResponse(docs)
}
