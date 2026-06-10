<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

type LandingFaqConfig = {
   faqItems?: AccordionItem[]
}

const appConfig = useAppConfig() as unknown as LandingFaqConfig
const { faqItems = [] } = appConfig

const accordionItems = computed<AccordionItem[]>(() => {
   return faqItems.filter((item: AccordionItem) => {
      return Boolean(item.label && item.content)
   })
})

const faqRef = ref<HTMLElement | null>(null)
const isFaqInView = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
   observer = new IntersectionObserver(
      (entries) => {
         const [entry] = entries

         isFaqInView.value = Boolean(entry?.isIntersecting)
      },
      { threshold: 0.2 },
   )

   if (faqRef.value) {
      observer.observe(faqRef.value)
   }
})

onBeforeUnmount(() => {
   observer?.disconnect()
})
</script>

<template>
   <div ref="faqRef" class="ondesk:mt-16 mt-8">
      <div class="ondesk:mb-12 col-span-12 mb-6 flex justify-center px-3">
         <UBadge
            class="onmobi:w-full"
            label="Perguntas frequentes"
            size="xl"
            icon="i-lucide-message-circle-question-mark" />
      </div>

      <UContainer class="flex justify-center">
         <UCard class="w-full max-w-4xl" :ui="{ body: 'max-w-none py-2!' }">
            <UAccordion
               :items="accordionItems"
               :ui="{
                  root: 'ondesk:px-8 px-1 w-full',
                  item: 'py-4',
                  trigger: 'w-full justify-between',
                  label: 'ondesk:text-lg text-base',
                  body: 'text-base',
               }">
               <template #trailing="{ open }">
                  <div class="bg-primary flex rounded-full p-0.75">
                     <UIcon
                        class="size-5 text-white"
                        :name="open ? 'lucide-minus' : 'lucide-plus'" />
                  </div>
               </template>
            </UAccordion>
         </UCard>
      </UContainer>
   </div>
</template>
