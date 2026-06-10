import { z } from 'zod'

const dekbotLogContextSchema = z.object({
   action: z.string().optional(),
   user: z.string().optional(),
   table: z.string().optional(),
})

const dekbotLogSchema = z.object({
   id: z.string().uuid(),
   created: z.string().datetime({ local: true }),
   type: dekbotLogTypeEnum.default('info'),
   message: z.string().min(1).max(1000).nullable().default(null),
   env: dekbotLogEnvEnum.default('UNKNOWN'),
   source: dekbotLogSourceEnum,
   action: z.string().nullable().default(null),
   user: z.string().nullable().default(null),
   table: z.string().nullable().default(null),
})

type DekbotLogContext = z.infer<typeof dekbotLogContextSchema>
type DekbotLog = z.infer<typeof dekbotLogSchema>

export { dekbotLogContextSchema, dekbotLogSchema }

export type { DekbotLogContext, DekbotLog }
