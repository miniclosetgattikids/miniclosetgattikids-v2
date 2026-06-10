export const usePlatformStore = defineStore('platformStore', () => {
   const device = ref<'mobile' | 'desktop'>()

   const isMobile = computed(() => {
      return device.value === 'mobile'
   })

   const isDesktop = computed(() => {
      return device.value === 'desktop'
   })

   const display = ref<'browser' | 'pwa'>()
   const browser = ref<null | 'chrome' | 'notChrome'>()
   const pwaState = ref<undefined | 'installed' | 'notInstalled'>() // logic not yet implemented
   const orientation = ref<'landscape' | 'portrait'>()
   const battery = ref<null | 'charging' | 'dying'>()
   const visibility = ref<'visible' | 'hidden'>()
   const screenWidth = ref<number>(0)

   const pwaStates = ref<PwaState[]>([])

   const installPrompt = ref<any>(null)

   return {
      battery,
      browser,
      device,
      display,
      installPrompt,
      isDesktop,
      isMobile,
      orientation,
      pwaState,
      pwaStates,
      screenWidth,
      visibility,
   }
})
