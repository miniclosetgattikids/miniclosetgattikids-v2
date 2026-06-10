type MaybeRef<T> = T | Ref<T>

interface FormGuardOptions {
   onlyUpdating?: boolean
}

export function useFormGuard(
   isGlobalUpdating: MaybeRef<boolean>,
   options: FormGuardOptions = {},
) {
   const { onlyUpdating = false } = options

   onMounted(() => {
      const upserting = unref(isGlobalUpdating)

      if (!onlyUpdating) {
         if (!upserting) {
            console.info('FIX_THIS')
         }
         return
      }

      if (!upserting) {
         navigateTo('/')
      }
   })
}
