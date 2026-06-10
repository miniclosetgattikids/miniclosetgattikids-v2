import { z } from 'zod'

const baseSchemaMap = z.object({
   dekbot_logs: dekbotLogSchema,
   customer_notes: customerNoteSchema,
   places: placeSchema,
   plans: planSchema,
   users: userSchema,
})

const baseSchemaOptions = baseSchemaMap.keyof()

const baseAnySchema = z.union([
   customerNoteSchema,
   placeSchema,
   planSchema,
   userSchema,
])

type BaseKey = z.infer<typeof baseSchemaOptions>

type BaseMap = {
   [K in BaseKey]: z.infer<(typeof baseSchemaMap.shape)[K]>
}

type BaseAny = z.infer<typeof baseAnySchema>

export { baseSchemaMap, baseSchemaOptions, baseAnySchema }

export type { BaseKey, BaseMap, BaseAny }
