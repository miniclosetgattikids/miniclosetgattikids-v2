<script setup lang="ts">
defineProps({
   appTitle: {
      default: '',
      type: String,
   },
})
</script>

<template>
   <UHeader class="bg-primary border-none py-11" :toggle="false" title="">
      <div class="onmobi:w-28 onmobi:ml-3 flex w-32 items-center justify-center">
         <img
            src="/logo.webp"
            class="w-full"
            alt="Logotipo Mini Closet Gatti Kids" >
      </div>
   </UHeader>
</template>
