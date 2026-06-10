<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

import { pt_br } from '@nuxt/ui/locale'

const appConfig = useAppConfig()
const { appSubtitle, appTitle } = appConfig

const route = useRoute()

type Device = 'desktop' | 'mobile'

const goToSectionPage = async (sectionId: string) => {
   const hash = `#${sectionId}`
   const isTargetSection = route.path === '/' && route.hash === hash

   if (!isTargetSection) {
      await navigateTo({ hash, path: '/' })

      return
   }

   const section = document.getElementById(sectionId)

   section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

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

const headerItems: NavigationMenuItem[] = [
   {
      icon: 'i-lucide-house',
      label: 'Início',
      to: '/',
   },
   {
      label: 'Mini Melissa',
      onSelect: (event) => {
         event.preventDefault()
         void goToSectionPage('mini-melissa')
      },
   },
   {
      label: 'Nossa Loja',
      target: '_blank',
      to: 'https://miniclosetgattikids.com/calcados/?brand=Melissa',
   },
   {
      icon: 'i-lucide-message-circle-heart',
      label: 'Blog',
      to: 'https://blog.miniclosetgattikids.online',
   },
]

const footerItems: NavigationMenuItem[] = [
   {
      label: 'Início',
      to: '/',
   },
   {
      label: 'Mini Melissa',
      onSelect: (event) => {
         event.preventDefault()
         void goToSectionPage('mini-melissa')
      },
   },
   {
      label: 'Nossa Loja',
      target: '_blank',
      to: 'https://miniclosetgattikids.com/calcados/?brand=Melissa',
   },
   {
      icon: 'i-lucide-message-circle-heart',
      label: 'Blog',
      to: 'https://blog.miniclosetgattikids.online',
   },
]
</script>

<template>
   <UApp :locale="pt_br">
      <Header :app-title="appTitle" :nav-items="headerItems" />

      <UMain class="min-h-0">
         <NuxtLayout>
            <NuxtPage />
         </NuxtLayout>
      </UMain>

      <Footer :app-title="appTitle" :nav-items="footerItems" />
   </UApp>
</template>
