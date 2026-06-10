export function useMutationStore<T extends { id: string }>() {
   const activeDoc = ref({} as T) as Ref<T>

   const baseDocs = ref([]) as Ref<T[]>

   // get

   const getActiveDoc = () => {
      return activeDoc.value
   }

   const getOneDoc = (docId: string) => {
      return (
         baseDocs.value.find((doc) => {
            return doc.id === docId
         }) || null
      )
   }

   // set

   const setActiveDoc = (doc: T) => {
      activeDoc.value = doc
   }

   const setDoc = (doc: T) => {
      baseDocs.value.push(doc)
   }

   const setDocs = (docs: T[]) => {
      if (!docs || !docs.length) return

      docs.forEach((doc) => {
         const exists = baseDocs.value.some((item) => {
            return item.id === doc.id
         })
         if (!exists) {
            baseDocs.value.push(doc)
         }
      })
   }

   // update

   const updateDoc = (doc: T) => {
      const index = baseDocs.value.findIndex((item) => {
         return item.id === doc.id
      })
      if (index !== -1) {
         baseDocs.value[index] = doc
      } else {
         throw new Error('👾 Doc not found! ~ updateDoc')
      }
   }

   const updateDocs = (docs: T[]) => {
      if (!docs || !docs.length) return

      docs.forEach((doc) => {
         updateDoc(doc)
      })
   }

   // upsert

   const upsertDoc = (doc: T) => {
      const index = baseDocs.value.findIndex((item) => {
         return item.id === doc.id
      })
      if (index !== -1) {
         baseDocs.value[index] = doc
      } else {
         baseDocs.value.push(doc)
      }
   }

   const upsertDocs = (docs: T[]) => {
      if (!docs?.length) return

      docs.forEach(upsertDoc)
   }

   // reset

   const resetDoc = () => {
      activeDoc.value = {} as T
   }

   // remove

   const removeDoc = (id: string) => {
      activeDoc.value = {} as T

      const index = baseDocs.value.findIndex((item) => {
         return item.id === id
      })
      if (index !== -1) {
         baseDocs.value.splice(index, 1)
      }
   }

   const removeDocs = (ids: string[]) => {
      activeDoc.value = {} as T

      for (const id of ids) {
         const index = baseDocs.value.findIndex((item) => {
            return item.id === id
         })
         if (index !== -1) {
            baseDocs.value.splice(index, 1)
         }
      }
   }

   return {
      activeDoc,
      baseDocs,
      getActiveDoc,
      getOneDoc,
      setActiveDoc,
      setDoc,
      setDocs,
      updateDoc,
      updateDocs,
      upsertDoc,
      upsertDocs,
      resetDoc,
      removeDoc,
      removeDocs,
   }
}
