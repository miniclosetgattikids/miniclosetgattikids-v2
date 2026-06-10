<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps({
   appTitle: {
      default: '',
      type: String,
   },
   navItems: {
      required: true,
      type: Array as PropType<NavigationMenuItem[]>,
   },
})
</script>

<template>
   <UHeader class="bg-primary border-none py-11" :toggle="false">
      <template #title>
         <div class="onmobi:w-28 onmobi:ml-3 flex w-32 items-center justify-center">
            <img
               src="/logo.webp"
               class="w-full"
               alt="Logotipo Mini Closet Gatti Kids" />
         </div>
      </template>

      <UNavigationMenu
         :items="navItems"
         variant="link"
         color="neutral"
         :ui="{
            item: 'px-2',
            root: 'bg-white rounded-xl h-11 px-3.5',
            link: 'px-0 gap-x-0',
            linkLabel:
               'text-base text-default font-medium rounded-[11px] hover:bg-primary-500 hover:text-white py-1 px-1',
            linkLeadingIcon: 'text-secondary size-6',
         }" />

      <template #right>
         <UButton
            label="Fale conosco"
            icon="i-lucide-message-circle"
            variant="solid"
            class="onmobi:rounded-full onmobi:px-3 onmobi:py-1.5 rounded-xl bg-white px-6 py-2.5 hover:bg-white"
            size="xl"
            :ui="{
               label: 'text-default hover:text-primary-500',
               leadingIcon: 'text-secondary onmobi:hidden',
            }"
            to="https://wa.me/5518997591410"
            target="_blank" />
      </template>
   </UHeader>
</template>
