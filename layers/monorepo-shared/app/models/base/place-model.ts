import { z } from 'zod'

const placeAddressSchema = z.object({
   address: z.string().min(5).max(255),
   addressComplement: z.string().max(255).nullable().default(null),
   addressNumber: z.string().max(20).nullable().default(null),
   city: z.string().max(100).nullable().default(null),
   neighborhood: z.string().max(100).nullable().default(null),
   state: z.string().length(2).nullable().default(null),
   zipCode: z.string().min(8).max(9).nullable().default(null),
})

const placeSchema = z
   .object({
      active: z.boolean().default(true),
      cnpj: z.string().length(18).nullable().default(null), // company info
      codeStart: z.number().default(1),
      created: z.number().min(1700000000), // unix seconds
      creditCents: z.number().int().min(0).default(0), // sem creditCents p/ o valor diário do plano = plano expirado
      creditDaysLeft: z.number().optional(), // DTO toClient: handled in Store; removido em toDb
      email: z.string().email().min(10).max(75).nullable().default(null),
      hasPaidPlan: z.boolean().optional(), // DTO toClient: handled in Store; removido em toDb
      id: z.string().uuid(),
      imageUrl: z.string().min(10).max(1000).nullable().default(null),
      isPaymentRequired: z.boolean().optional(), // DTO toClient: handled in Store; removido em toDb
      isWhatsappBusinessOnly: z.boolean().default(false),
      legalName: z.string().min(1).max(255).nullable().default(null), // company info
      manifestIcons: z
         .object({
            maskable: z.string().min(10).max(255).nullable().default(null),
            pwa64: z.string().min(10).max(255).nullable().default(null),
            pwa192: z.string().min(10).max(255).nullable().default(null),
            pwa512: z.string().min(10).max(255).nullable().default(null),
         })
         .nullable()
         .default(null),
      municipalRegistration: z.string().max(50).nullable().default(null), // company info
      name: z.string().min(3).max(80),
      phone: phoneSchema, // DTO toClient: handled in Store e toDb: handled in useDtoToDb
      phone2: phoneSchema.nullable().default(null), // DTO toClient: handled in Store e toDb: handled in useDtoToDb
      planId: z.string().uuid().nullable().default(null),
      serviceTerms: z.string().max(10000).nullable().default(null),
      slug: z.string().min(3).max(80),
      stateRegistration: z.string().max(50).nullable().default(null), // company info
      tenantId: z.string().min(3).max(80).nullable().default(null),
      theme: z.string().min(1).max(80).default('transparent'),
      updated: z.number().min(1700000000).nullable().default(null), // unix seconds
      userId: z.string().uuid(),
      userAffiliateId: z.string().nullable().default(null),
   })
   .merge(placeAddressSchema)

type Place = z.infer<typeof placeSchema>

export { placeSchema }

export type { Place }
