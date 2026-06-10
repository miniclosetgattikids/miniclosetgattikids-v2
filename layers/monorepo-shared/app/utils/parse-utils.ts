function parseDoc<K extends GlobalKey>(tableName: K, doc: GlobalMap[K]) {
   const schema = globalSchemaMap.shape[tableName]

   const res = schema.safeParse(doc)

   if (res.success) {
      return res.data as GlobalMap[K]
   }

   throw new Error(`${res.error}, ${JSON.stringify(doc)}`)
}

function parseDocs<K extends GlobalKey>(tableName: K, docs: GlobalMap[K][]) {
   const parsed = docs.map((doc) => {
      const schema = globalSchemaMap.shape[tableName]

      const res = schema.safeParse(doc)

      if (res.success) {
         return res.data
      }

      const parseId = []
      if (typeof doc === 'object' && doc !== null && 'id' in doc && doc.id) {
         parseId.push(`c/ Id: ${doc.id}`)
      }
      if (typeof doc === 'object' && doc !== null && 'name' in doc && doc.name) {
         parseId.push(`c/ name: ${doc.name}`)
      }
      if (!parseId.length) {
         parseId.push('desconhecido')
      }

      throw new Error(`
            Erro! PATH: parseDocs ORIGEM: ${parseId}. MSG: ${res.error}
            `)
   })

   return parsed as GlobalMap[K][]
}

export { parseDoc, parseDocs }
