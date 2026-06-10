import { z } from 'zod'

const originEnum = z.enum(['bot', 'consumer', 'super'])

const customerNoteSchema = z.object({
   created: z.number().min(1700000000), // unix seconds
   deleted: z.number().min(1700000000).nullable().default(null), // unix seconds
   note: z.string().min(3).max(1000),
   id: z.string().uuid(),
   origin: originEnum,
   placeId: z.string().uuid(),
   updated: z.number().min(1700000000), // unix seconds
   userId: z.string().uuid(),
})

type Origin = z.infer<typeof originEnum>
type CustomerNote = z.infer<typeof customerNoteSchema>

export { originEnum, customerNoteSchema }

export type { Origin, CustomerNote }
