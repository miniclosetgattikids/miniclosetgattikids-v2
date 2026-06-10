<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps({
   navItems: {
      required: true,
      type: Array as PropType<NavigationMenuItem[]>,
   },
})
</script>

<template>
   <UFooter>
      <BRegister />

      <div class="flex flex-col items-center justify-center">
         <UNavigationMenu :items="navItems" variant="link" />

         <span class="text-muted flex w-full justify-center text-sm">
            CNPJ 64.312.423/0001-20 - Dekbot System I.S.
         </span>

         <span class="text-muted flex w-full justify-center text-sm">
            {{ getCurrentYear() }} © Todos os Direitos Reservados
         </span>
      </div>
   </UFooter>
</template>
