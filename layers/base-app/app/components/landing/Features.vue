<script setup lang="ts">
type LandingFeature = {
   title?: string
   description?: string
   icon?: string
   imageUrl?: string
}

type LandingFeaturesConfig = {
   features?: LandingFeature[]
}

const appConfig = useAppConfig() as unknown as LandingFeaturesConfig
const { features = [] } = appConfig

const featuresRef = ref<HTMLElement | null>(null)
const isFeaturesInView = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
   observer = new IntersectionObserver(
      (entries) => {
         const [entry] = entries

         isFeaturesInView.value = Boolean(entry?.isIntersecting)
      },
      { threshold: 0.2 },
   )

   if (featuresRef.value) {
      observer.observe(featuresRef.value)
   }
})

onBeforeUnmount(() => {
   observer?.disconnect()
})
</script>

<template>
   <div ref="featuresRef" class="ondesk:mt-16 mt-8">
      <div class="ondesk:mb-12 col-span-12 mb-6 flex justify-center px-3">
         <UBadge
            class="onmobi:w-full"
            label="Algumas funcionalidades"
            size="xl"
            icon="i-lucide-sparkles" />
      </div>

      <UContainer>
         <div class="onmobi:grid-cols-1 grid grid-cols-3 gap-x-8 gap-y-4">
            <div
               v-for="(feature, index) in features"
               :key="index"
               class="transition-all duration-700 ease-out will-change-transform"
               :class="[
                  isFeaturesInView
                     ? 'translate-y-0 opacity-100'
                     : 'translate-y-8 opacity-0',
               ]"
               :style="{ transitionDelay: `${index * 120}ms` }">
               <UPageCard
                  :title="feature.title"
                  :description="feature.description"
                  :icon="feature.icon"
                  variant="outline"
                  :ui="{
                     root: 'h-full',
                     container: 'gap-y-4 content-between',
                     leading: 'place-self-start rounded-sm size-10 justify-center',
                     leadingIcon: 'size-7 text-secondary',
                     title: 'truncate text-nowrap text-xl',
                     description: 'text-base',
                  }">
                  <div
                     class="border-primary bg-primary-50 flex h-38 items-center justify-center overflow-hidden rounded-[13px] border-2">
                     <NuxtImg
                        :src="feature.imageUrl"
                        :alt="feature.title"
                        loading="lazy"
                        format="png"
                        width="420"
                        sizes="sm:33vw lg:420px"
                        quality="90"
                        class="w-full" />
                  </div>
               </UPageCard>
            </div>
         </div>
      </UContainer>
   </div>
</template>
