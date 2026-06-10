<script setup lang="ts">
import { pt_br } from '@nuxt/ui/locale'

const appConfig = useAppConfig()
const { appSubtitle, appTitle } = appConfig

type Device = 'desktop' | 'mobile'

const getRequestDevice = (): Device => {
   const headers = useRequestHeaders(['user-agent'])
   const userAgent = headers['user-agent']?.toLowerCase() ?? ''

   return /mobile|android|iphone|ipad|phone/i.test(userAgent) ? 'mobile' : 'desktop'
}

const device = useState<Device>('body-device', () => {
   return import.meta.server ? getRequestDevice() : 'desktop'
})

function checkIsMobile(): boolean {
   const isMobileByWidth = window.innerWidth <= 768
   const userAgent = navigator.userAgent.toLowerCase()
   const isMobileByAgent = /mobile|android|iphone|ipad|phone/i.test(userAgent)
   const isMobile = isMobileByWidth || (isMobileByAgent && window.innerWidth < 1024)
   return isMobile
}

const updateDevice = () => {
   device.value = checkIsMobile() ? 'mobile' : 'desktop'
}

onMounted(() => {
   updateDevice()
   window.addEventListener('resize', updateDevice)
})

onBeforeUnmount(() => {
   window.removeEventListener('resize', updateDevice)
})

useHead(() => {
   return {
      bodyAttrs: {
         'data-device': device.value,
      },
      meta: [{ name: `${appTitle} - ${appSubtitle}` }],
      title: `${appTitle} - ${appSubtitle}`,
   }
})
</script>

<template>
   <UApp :locale="pt_br">
      <Header :app-title="appTitle" />
      <UMain class="min-h-0">
         <NuxtLayout>
            <NuxtPage />
         </NuxtLayout>
      </UMain>
      <Footer :app-title="appTitle" />
   </UApp>
</template>
