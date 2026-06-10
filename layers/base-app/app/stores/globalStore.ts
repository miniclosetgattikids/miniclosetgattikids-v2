export const useGlobalStore = defineStore('globalStore', () => {
   const isReadingMany = ref<boolean>(false)

   const filterState = ref<'initial' | 'filtering'>('initial')

   const filtered = ref<any[]>([])

   const showWelcomeTip = ref<boolean>(false)

   const showLoading = ref<boolean>(false)

   const loadingTrue = () => {
      showLoading.value = true
   }

   const loadingFalse = () => {
      showLoading.value = false
   }

   const hasSearchResult = ref<boolean>(false)

   return {
      isReadingMany,
      filtered,
      filterState,
      hasSearchResult,
      loadingFalse,
      loadingTrue,
      showLoading,
      showWelcomeTip,
   }
})
