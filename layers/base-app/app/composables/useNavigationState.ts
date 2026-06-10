export function useNavigationState() {
   const platformStore = usePlatformStore()

   const installPWA = async () => {
      if (!platformStore.installPrompt) {
         return
      }
      await platformStore.installPrompt.prompt()
      platformStore.installPrompt = null
      platformStore.pwaStates = platformStore.pwaStates.filter((state) => {
         return state !== 'isInstallable'
      })
   }

   const getNavigationState = () => {
      globalThis.addEventListener('beforeinstallprompt', (event) => {
         event.preventDefault()
         platformStore.installPrompt = event
         if (!platformStore.pwaStates.includes('isInstallable')) {
            platformStore.pwaStates.push('isInstallable')
         }
      })

      // onChrome - notChrome
      const onChrome = 'chrome' in window
      if (onChrome) {
         if (!platformStore.pwaStates.includes('onChrome')) {
            platformStore.pwaStates.push('onChrome')
         }
         platformStore.pwaStates = platformStore.pwaStates.filter((state) => {
            return state !== 'notChrome'
         })
      } else {
         if (!platformStore.pwaStates.includes('notChrome')) {
            platformStore.pwaStates.push('notChrome')
         }
         platformStore.pwaStates = platformStore.pwaStates.filter((state) => {
            return state !== 'onChrome'
         })
      }

      // onPWA - notPWA
      const isOnPWA = () => {
         return window.matchMedia('(display-mode: standalone)').matches
      }

      const onPWA = isOnPWA()
      if (onPWA) {
         if (!platformStore.pwaStates.includes('onPWA')) {
            platformStore.pwaStates.push('onPWA')
         }
         platformStore.pwaStates = platformStore.pwaStates.filter((state) => {
            return state !== 'notPWA'
         })
      } else {
         if (!platformStore.pwaStates.includes('notPWA')) {
            platformStore.pwaStates.push('notPWA')
         }
         platformStore.pwaStates = platformStore.pwaStates.filter((state) => {
            return state !== 'onPWA'
         })
      }
   }

   return { getNavigationState, installPWA }
}
