import { z } from 'zod'

const userSchema = z.object({
   affiliateId: z.string().nullable().default(null),
   address: z.string().min(5).max(255).nullable().default(null),
   cnpj: z.string().length(18).nullable().default(null), // customer info
   cpf: z.string().length(14).nullable().default(null), // customer info
   created: z.number().min(1700000000), // unix seconds
   deleted: z.number().min(1700000000).nullable().default(null), // unix seconds
   email: z.string().email().min(10).max(75).nullable().default(null),
   id: z.string().uuid(),
   imageUrl: z.string().min(10).max(1000).nullable().default(null),
   isAnonymousCustomer: z.boolean().default(false),
   name: z
      .string()
      .min(8)
      .max(50)
      .transform((value) => {
         return setStringToCapital(value)
      }),
   phone: phoneSchema, // DTO toClient: handled in Store e toDb: handled in useDtoToDb
   phone2: phoneSchema.nullable().default(null), // DTO toClient: handled in Store e toDb: handled in useDtoToDb
   pixKey: z.string().max(100).nullable().default(null),
   placeId: z.string().uuid().nullable().default(null), // customers
   type: userTypeEnum,
   updated: z.number().min(1700000000).nullable().default(null), // unix seconds
})

const authSchema = userSchema.pick({
   phone: true,
})

type User = z.infer<typeof userSchema>

type Auth = z.infer<typeof authSchema>

export { authSchema, userSchema }

export type { Auth, User }
