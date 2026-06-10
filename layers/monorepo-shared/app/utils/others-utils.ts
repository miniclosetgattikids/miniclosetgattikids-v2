import type { z } from 'zod'

function buildDocId(): string {
   return crypto.randomUUID()
}

function buildShapeDefaults(shape: Record<string, any>) {
   const defaultsObject: any = {}

   for (const key in shape) {
      const field = shape[key]

      if (field._def.defaultValue !== undefined) {
         defaultsObject[key] = field._def.defaultValue()
      } else {
         const typeName = field._def.typeName
         switch (typeName) {
            case 'ZodString':
               defaultsObject[key] = ''
               break
            case 'ZodNumber':
               defaultsObject[key] = null
               break
            case 'ZodBoolean':
               defaultsObject[key] = false
               break
            case 'ZodArray':
               defaultsObject[key] = []
               break
            case 'ZodObject':
               defaultsObject[key] = {}
               break
            case 'ZodNull':
               defaultsObject[key] = null
               break
         }
      }
   }
   return defaultsObject
}

function buildDocDefault(schema: z.ZodObject<any>) {
   const shape = schema.shape
   const defaultsObject: any = {}

   for (const key in shape) {
      const field = shape[key]

      if (field._def.defaultValue !== undefined) {
         defaultsObject[key] = field._def.defaultValue()
      } else {
         const typeName = field._def.typeName
         switch (typeName) {
            case 'ZodString':
               defaultsObject[key] = ''
               break
            case 'ZodNumber':
               defaultsObject[key] = null
               break
            case 'ZodBoolean':
               defaultsObject[key] = false
               break
            case 'ZodArray':
               defaultsObject[key] = []
               break
            case 'ZodObject':
               defaultsObject[key] = buildShapeDefaults(field.shape)
               break
            case 'ZodNull':
               defaultsObject[key] = null
               break
         }
      }
   }
   return defaultsObject
}

export { buildDocDefault, buildDocId }
