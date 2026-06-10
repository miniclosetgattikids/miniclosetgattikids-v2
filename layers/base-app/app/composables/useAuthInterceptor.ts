export const useAuthInterceptor = () => {
   const { $authInterceptor } = useNuxtApp()
   return $authInterceptor
}
