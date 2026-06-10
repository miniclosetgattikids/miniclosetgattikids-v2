<script setup lang="ts">
type LandingCtaConfig = {
   landingTitle?: string
   landingDescription?: string
}

const appConfig = useAppConfig() as unknown as LandingCtaConfig
const { landingDescription, landingTitle } = appConfig
</script>

<template>
   <div class="ondesk:mb-16">
      <UContainer class="onmobi:px-0 flex justify-center">
         <UPageSection
            class="ring-0"
            :title="landingTitle"
            :description="landingDescription"
            variant="solid"
            orientation="vertical"
            :ui="{
               root: 'bg-primary w-full max-w-5xl onmobi:rounded-none rounded-xl',
               container: 'pt-16! pb-18! gap-y-8!',
               title: 'max-w-140 mx-auto text-center',
               description: 'text-neutral opacity-80',
               footer: 'mt-10',
            }">
            <template #header>
               <div class="flex flex-col items-center gap-y-1 text-white">
                  <div class="mx-auto">
                     <div
                        class="onmobi:w-28 mb-7 flex w-42 items-center justify-center">
                        <img
                           src="/logo.webp"
                           class="w-full"
                           alt="Logotipo Mini Closet Gatti Kids" />
                     </div>
                  </div>

                  <div class="flex">
                     <span
                        class="max-w-200 text-center text-5xl font-bold text-balance">
                        {{ landingTitle }}
                     </span>
                  </div>

                  <div class="mt-2 flex">
                     <span
                        class="max-w-200 text-center text-lg text-balance text-white/90">
                        {{ landingDescription }}
                     </span>
                  </div>
               </div>
            </template>

            <div class="mt-4 flex justify-center">
               <UButton
                  label="Compre online"
                  trailing-icon="i-lucide-arrow-right"
                  size="xl"
                  :ui="{
                     base: 'before:bg-primary before:block before:absolute before:right-1 relative before:rounded-full before:size-9.75 flex justify-end items-center pr-12.5 h-11.5 bg-default text-primary hover:bg-default hover:outline outline-white outline-offset-2 duration-200 rounded-full pl-5',
                     trailingIcon: 'text-white z-10 size-6 absolute right-3',
                     label: 'font-semibold',
                  }"
                  to="https://miniclosetgattikids.com"
                  target="_blank" />
            </div>
         </UPageSection>
      </UContainer>
   </div>
</template>
