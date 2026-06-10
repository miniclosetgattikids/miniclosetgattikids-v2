import { supabaseClient } from '../../supabase.config'

export async function useDocRead(
   tableName: GlobalKey,
   id: string,
): Promise<DekbotResponse> {
   const supabase = supabaseClient()

   const res = await supabase.from(tableName).select('*').eq('id', id).maybeSingle()

   return buildDekResponse(res)
}
