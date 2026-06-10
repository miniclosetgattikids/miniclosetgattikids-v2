export default defineNuxtPlugin(async () => {
   const platformStore = usePlatformStore()

   const { setupDeviceDetection } = useDeviceState()

   if (setupDeviceDetection) {
      setupDeviceDetection(platformStore)
   } else {
      console.warn('setupDeviceDetection not found')
   }

   useHead(() => {
      return {
         bodyAttrs: {
            'data-device': platformStore.device ?? 'desktop',
         },
      }
   })

   useTranslateErrorForm()
})
