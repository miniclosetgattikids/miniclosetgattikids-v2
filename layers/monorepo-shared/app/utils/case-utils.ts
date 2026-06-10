import { objectToCamel, objectToSnake } from 'ts-case-convert'

function toClientFormat<T = any>(data: any): T {
   return objectToCamel(data) as T
}

function docToDbFormat<T = any>(doc: any): T {
   return objectToSnake(doc) as T
}

export { toClientFormat, docToDbFormat }
