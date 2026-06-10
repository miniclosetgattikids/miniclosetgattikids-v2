export const useUserStore = defineStore('userStore', () => {
   type ActiveType = User

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

   // 🡻🡻🡻 DTO handler 🡻🡻🡻
   const withDto = (doc: ActiveType): ActiveType => {
      return {
         ...doc,
         phone: setStringToPhone(doc.phone),
         phone2: doc.phone2 ? setStringToPhone(doc.phone2) : null,
      }
   }
   // 🡹🡹🡹 DTO handler 🡹🡹🡹

   const activeDocs = computed((): ActiveType[] => {
      if (!baseDocs.value) {
         return []
      }
      return [...baseDocs.value]
         .filter((item) => {
            return item.deleted === null
         })
         .sort((a, b) => {
            return a.name.localeCompare(b.name)
         })
         .map(withDto)
   })

   const activeCustomers = computed((): ActiveType[] => {
      return activeDocs.value.filter((item) => {
         return item.type === 'customer' && !item.isAnonymousCustomer
      })
   })

   const deletedCustomers = computed((): ActiveType[] => {
      return baseDocs.value.filter((item) => {
         return item.type === 'customer' && item.deleted
      })
   })

   const activeDisalloweds = computed((): ActiveType[] => {
      return activeDocs.value.filter((item) => {
         return item.type === 'disallowed'
      })
   })

   return {
      activeCustomers,
      deletedCustomers,
      activeDisalloweds,
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
