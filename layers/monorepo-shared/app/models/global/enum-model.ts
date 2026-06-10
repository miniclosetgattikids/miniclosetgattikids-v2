import { z } from 'zod'

const dekbotLogEnvEnum = z.enum(['PROD', 'DEV', 'UNKNOWN'])

const dekbotLogTypeEnum = z.enum(['info', 'warn'])

const dekbotLogSourceEnum = z.enum([
   'app-consumer',
   'app-landing',
   'dekbot-server',
   'openclaw-health',
   'dekbot-router',
   'schedly-hooks',
   'schedly-router',
   'schedly-tools',
   'flow-register',
   'flow-sign-in',
   'flow-welcome',
])

const userTypeEnum = z.enum([
   'consumer-orderbot',
   'consumer-publishr',
   'consumer-schedly',
   'customer',
   'dekbot-affiliate',
   'dekbot-super',
   'disallowed',
   'registered',
])

const crudStateEnum = z.enum([
   'isOneDeleting',
   'isManyDeleting',
   'isOneReading',
   'isManyReading',
   'isGlobalCreating',
   'isManyCreating',
   'isOneUpdating',
   'isManyUpdating',
])

const featureTypeEnum = z.enum(['schedly', 'publishr'])

const featureSubtypeEnum = z.enum([
   'schedly:blue',
   'schedly:rose',
   'schedly:lime',
   'publishr:default',
])

const genderEnum = z.enum(['male', 'female', 'other', 'inapplicable'])

const planNameEnum = z.enum(['smart', 'pro', 'ultra'])

const pwaStateEnum = z.enum([
   'notChrome',
   'onChrome',
   'onPWA',
   'notPWA',
   'isInstallable',
])

type UserType = z.infer<typeof userTypeEnum>
type FeatureType = z.infer<typeof featureTypeEnum>
type FeatureSubtype = z.infer<typeof featureSubtypeEnum>
type Gender = z.infer<typeof genderEnum>
type PlanName = z.infer<typeof planNameEnum>
type PwaState = z.infer<typeof pwaStateEnum>
type DekbotLogEnv = z.infer<typeof dekbotLogEnvEnum>
type DekbotLogType = z.infer<typeof dekbotLogTypeEnum>
type DekbotLogSource = z.infer<typeof dekbotLogSourceEnum>

export {
   userTypeEnum,
   crudStateEnum,
   featureTypeEnum,
   featureSubtypeEnum,
   genderEnum,
   planNameEnum,
   pwaStateEnum,
   dekbotLogEnvEnum,
   dekbotLogTypeEnum,
   dekbotLogSourceEnum,
}
export type {
   UserType,
   FeatureType,
   FeatureSubtype,
   Gender,
   PlanName,
   PwaState,
   DekbotLogEnv,
   DekbotLogSource,
   DekbotLogType,
}
