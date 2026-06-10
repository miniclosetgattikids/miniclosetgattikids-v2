import { z } from 'zod'

const globalSchemaMap = z.object({
   ...baseSchemaMap.shape,
})

const globalSchemaOptions = globalSchemaMap.keyof()

type GlobalKey = z.infer<typeof globalSchemaOptions>

type GlobalMap = {
   [K in GlobalKey]: z.infer<(typeof globalSchemaMap.shape)[K]>
}

export { globalSchemaMap, globalSchemaOptions }

export type { GlobalKey, GlobalMap }
