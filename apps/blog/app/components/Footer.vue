<script setup lang="ts">
import { TZDate } from '@date-fns/tz'

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
