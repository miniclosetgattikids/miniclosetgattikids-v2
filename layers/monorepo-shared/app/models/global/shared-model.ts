import type { ResetFormOpts } from 'vee-validate'

import { z } from 'zod'

const phoneSchema = z.string().min(13, 'Deve conter 11 dígitos').max(14)

const postgresErrorSchema = z.object({
   code: z.string(),
   details: z.string(),
   hint: z.string(),
   message: z.string(),
})

const supabaseResponseSchema = z.object({
   data: z.any().array().nullable(),
   error: postgresErrorSchema.nullable(),
})

const supabaseDeleteResponseSchema = z.object({
   count: z.number().nullable(),
   data: z.null(),
   error: postgresErrorSchema.nullable(),
   status: z.number(),
   statusText: z.string(),
})

const dekbotResponseSchema = z.object({
   data: z.any().nullable(),
   error: z.string().nullable(),
})

const crudFormParamsSchema = z.object({
   creatingProps: z.record(z.string(), z.any()).optional(),
   resetForm:
      z.custom<(state?: { values: any }, opts?: Partial<ResetFormOpts>) => void>(),
   schema: z.custom<z.ZodObject<any>>(),
   store: z.custom<MaybeRef<any>>(),
})

type Phone = z.infer<typeof phoneSchema>

type SupabaseResponse = z.infer<typeof supabaseResponseSchema>

type SupabaseDeleteResponse = z.infer<typeof supabaseDeleteResponseSchema>

type DekbotResponse<T = any> = Omit<z.infer<typeof dekbotResponseSchema>, 'data'> & {
   data: T | null
}

type CrudFormParams = z.infer<typeof crudFormParamsSchema>

type StoreAction =
   | 'isDeletingMany'
   | 'isDeletingOne'
   | 'isReadingMany'
   | 'isReadingOne'
   | 'isCreatingMany'
   | 'isCreatingOne'
   | 'isUpdatingOne'
   | 'isUpdatingMany'
   | 'isUpsertingMany'
   | 'isUpsertingOne'

export {
   phoneSchema,
   crudFormParamsSchema,
   dekbotResponseSchema,
   supabaseDeleteResponseSchema,
   supabaseResponseSchema,
}

export type {
   Phone,
   CrudFormParams,
   DekbotResponse,
   StoreAction,
   SupabaseDeleteResponse,
   SupabaseResponse,
}
