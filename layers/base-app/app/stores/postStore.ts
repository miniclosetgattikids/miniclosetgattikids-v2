export const usePostStore = defineStore('postStore', () => {
   type ActiveType = Post

   const {
      activeDoc,
      getActiveDoc,
      getOneDoc,
      baseDocs,
      removeDocs,
      removeDoc,
      resetDoc,
      setActiveDoc,
      setDoc,
      setDocs,
      updateDoc,
      updateDocs,
      upsertDoc,
      upsertDocs,
   } = useMutationStore<ActiveType>()

   const activeDocs = computed((): ActiveType[] => {
      if (!baseDocs.value) {
         return []
      }

      return [...baseDocs.value].sort((a: ActiveType, b: ActiveType) => {
         return (b.updated ?? b.created) - (a.updated ?? a.created)
      })
   })

   return {
      activeDoc,
      getActiveDoc,
      getOneDoc,
      activeDocs,
      removeDocs,
      removeDoc,
      resetDoc,
      setActiveDoc,
      setDoc,
      setDocs,
      updateDoc,
      updateDocs,
      upsertDoc,
      upsertDocs,
   }
})
