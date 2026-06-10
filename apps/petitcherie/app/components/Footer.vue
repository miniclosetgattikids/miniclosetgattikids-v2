<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

import { TZDate } from '@date-fns/tz'

defineProps({
   navItems: {
      required: true,
      type: Array as PropType<NavigationMenuItem[]>,
   },
})

function getNowDate(): Date {
   return new TZDate(new Date(), 'America/Sao_Paulo')
}

function getCurrentYear(): number {
   return getNowDate().getFullYear()
}
</script>

<template>
   <UFooter
      class="bg-default border-default 40 w-full border-t"
      :ui="{ center: 'onmobi:pb-2' }">
      <template #left>
         <div class="flex flex-col items-center justify-center">
            <span class="text-highlighted flex w-full justify-center text-base">
               {{ getCurrentYear() }} © Beatriz da Silva Gatti
            </span>
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
            linkLeadingIcon: 'hidden',
         }" />

      <template #right>
         <UButton
            icon="i-simple-icons-instagram"
            color="neutral"
            variant="ghost"
            to="https://www.instagram.com/miniclosetgattikids/"
            target="_blank"
            aria-label="Instagram" />

         <UButton
            icon="i-simple-icons-tiktok"
            color="neutral"
            variant="ghost"
            to="https://www.tiktok.com/@miniclosetgattikids"
            target="_blank"
            aria-label="TikTok" />

         <UButton
            icon="i-simple-icons-facebook"
            color="neutral"
            variant="ghost"
            to="https://www.facebook.com/p/Mini-closet-Gatti-kids-61562740177495/"
            target="_blank"
            aria-label="Facebook" />
      </template>
   </UFooter>
</template>
