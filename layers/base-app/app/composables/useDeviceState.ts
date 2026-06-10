let isInitialized = false

const isOffline = ref(false)
const isOnline = ref(true)

const isClient = import.meta.client

function setupOnlineListeners() {
   globalThis.addEventListener('online', () => {
      isOnline.value = true
   })

   globalThis.addEventListener('offline', () => {
      isOnline.value = false

      setTimeout(() => {
         isOffline.value = true
      }, 5000)
   })
}

function setupDeviceDetection(platformStore: ReturnType<typeof usePlatformStore>) {
   function detectDeviceType() {
      // Usar screen width como critério principal
      const isMobileByWidth = window.innerWidth <= 768

      // Fallback com user agent se screen width não for definitivo
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileByAgent = /mobile|android|iphone|ipad|phone/i.test(userAgent)

      // Considera mobile se ambos os critérios concordarem ou se screen width indicar claramente
      const isMobile =
         isMobileByWidth || (isMobileByAgent && window.innerWidth < 1024)

      platformStore.device = isMobile ? 'mobile' : 'desktop'
   }

   // Detectar na inicialização
   detectDeviceType()

   // Re-detectar em resize (com debounce)
   let resizeTimeout: NodeJS.Timeout
   globalThis.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(detectDeviceType, 250)
   })
}

export function useDeviceState() {
   const platformStore = usePlatformStore()

   if (!isClient) {
      return {
         getNavigationState: () => {},
         installPWA: async () => {},
         isOnline,
      }
   }

   if (!isInitialized) {
      setupOnlineListeners()
      isInitialized = true
   }

   const installPWA = async () => {
      if (!isClient) {
         return
      }

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
      if (!isClient) {
         return
      }

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

   return { getNavigationState, installPWA, isOnline, setupDeviceDetection }
}
