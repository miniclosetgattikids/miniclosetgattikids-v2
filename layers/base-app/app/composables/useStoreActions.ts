interface StoreWithCrudActions {
   removeDocs: (ids: string[]) => void
   removeDoc: (id: string) => void
   setDoc: (data: any) => void
   setDocs: (data: any) => void
   updateDoc: (data: any) => void
   updateDocs: (data: any) => void
   setActiveDoc: (data: any) => void
   upsertDoc: (data: any) => void
   upsertDocs: (data: any) => void
   activeDocs?: { id: string }[]
}

export function useStoreActions(
   store: StoreWithCrudActions,
   data: any,
   action: StoreAction | null,
) {
   if (action === null) {
      throw new Error('Store action failed')
   }
   switch (action) {
      case 'isDeletingMany':
         store.removeDocs(data)
         break
      case 'isDeletingOne':
         store.removeDoc(data)
         break
      case 'isReadingMany':
         store.upsertDocs(data)
         break
      case 'isReadingOne':
         store.upsertDoc(data)
         break
      case 'isCreatingMany':
         store.setDocs(data)
         break
      case 'isCreatingOne':
         store.setActiveDoc(data)
         store.setDoc(data)
         break
      case 'isUpdatingMany':
         store.updateDocs(data)
         break
      case 'isUpdatingOne':
         store.updateDoc(data)
         break
      case 'isUpsertingMany':
         store.upsertDocs(data)
         break
      case 'isUpsertingOne':
         store.upsertDoc(data)
         break
      default:
         throw new Error(`useStoreActions received an unknown action: ${action}`)
   }
}
