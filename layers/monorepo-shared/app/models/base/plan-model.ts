import { z } from 'zod'

const planDiscountEnum = z.enum(['0', '25', '50', '75', '100'])

const planSchema = z.object({
   created: z.number().min(1700000000), // unix seconds
   deleted: z.number().min(1700000000).nullable().default(null), // unix seconds
   discount: planDiscountEnum.default('0'),
   id: z.string().uuid(),
   name: z
      .string()
      .min(3)
      .max(80)
      .transform((val) => {
         return setStringToCapital(val)
      }),
   priceInCents: z.number().int().min(0).default(0),
   featureSubtypes: featureSubtypeEnum.array().default([]),
   featureTypes: featureTypeEnum.array().default([]),
   updated: z.number().min(1700000000).nullable().default(null), // unix seconds
})

type PlanDiscount = z.infer<typeof planDiscountEnum>
type Plan = z.infer<typeof planSchema>

export { planDiscountEnum, planSchema }

export type { PlanDiscount, Plan }
