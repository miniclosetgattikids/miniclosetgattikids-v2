<script setup lang="ts">
type LandingHeroConfig = {
   hero: {
      title?: string
      headline?: string
   }
}

const appConfig = useAppConfig() as unknown as LandingHeroConfig
const { hero } = appConfig
const { headline, title } = hero
</script>

<template>
   <UPageSection
      class="ring-0"
      orientation="horizontal"
      :ui="{
         container:
            'ondesk:pt-12 onmobi:py-0 ondesk:pb-10 h-[50dvh] bg-[#f8e9ed] bg-[url(/hero-bg.webp)] relative bg-cover bg-center bg-no-repeat max-w-none before:block before:h-dvh before:w-full before:bg-[#fcf1f2]/85  before:absolute before:inset-0 before:z-0 justify-center ondesk:flex',
         wrapper: 'z-10 h-[50dvh]',
      }">
      <template #default>
         <div
            class="onmobi:flex-col ondesk:pr-[6%] ondesk:absolute ondesk:bottom-0 z-10 flex items-center justify-end">
            <div class="onmobi:hidden flex h-[50dvh] shrink-0 items-end justify-end">
               <img
                  class="mr-[-10%] h-full max-h-[50dvw] w-auto max-w-none object-contain"
                  src="/hero-foreground.png"
                  alt="Menina vestindo Petit Cherry" />
            </div>

            <div class="ondesk:gap-y-3 ondesk:pt-12 z-10 flex flex-col items-center">
               <div class="flex">
                  <span
                     class="ondesk:text-6xl font-brand onmobi:leading-8.5 onmobi:mb-3 max-w-160 text-center text-4xl leading-13 font-extrabold text-black">
                     {{ title }}
                  </span>
               </div>

               <div class="onmobi:mb-2 mt-1 flex">
                  <span
                     class="text-primary onmobi:text-xs max-w-200 rounded-xs bg-[#f4637e]/10 px-3 py-1 text-center text-sm text-[14px] font-semibold text-balance">
                     {{ headline }}
                  </span>
               </div>

               <UButton
                  label="Conheça nossa loja virtual"
                  trailing-icon="i-lucide-arrow-right"
                  class="bg-primary ondesk:mt-6 mt-2 rounded-full"
                  size="xl"
                  :ui="{
                     base: 'before:bg-default before:block before:absolute before:right-1 relative before:rounded-full onmobi:before:hidden before:size-9.75 onmobi:h-10 flex justify-end items-center ondesk:pr-12.5 ondesk:pl-4 h-13',
                     trailingIcon:
                        'text-secondary z-10 size-6 absolute right-3 onmobi:hidden',
                     label: 'font-semibold',
                  }"
                  to="https://miniclosetgattikids.com"
                  target="_blank" />
            </div>
         </div>
      </template>
   </UPageSection>
</template>
