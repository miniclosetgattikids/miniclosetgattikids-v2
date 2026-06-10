<script setup lang="ts">
const canonicalUrl = 'https://petitcherie.miniclosetgattikids.online/'

useHead({
   link: [{ href: canonicalUrl, rel: 'canonical' }],
})

useSeoMeta({
   description:
      'Procurando vestidos de festa infantis? Somos revenda autorizada Petit Cherie com peças exclusivas e 100% originais para aniversários e batizados.',
   ogDescription:
      'Procurando vestidos de festa infantis? Somos revenda autorizada Petit Cherie com peças exclusivas e 100% originais para aniversários e batizados.',
   ogTitle: 'Vestidos de Festa Infantis: Luxo e Sofisticação com Petit Cherie',
   ogUrl: canonicalUrl,
   title: 'Vestidos de Festa Infantis: Luxo e Sofisticação com Petit Cherie',
})
</script>

<template>
   <div class="grid">
      <Hero />

      <Post />

      <Faq />

      <Newsletter />

      <Cta />

      <UButton
         class="border-secondary-100 onmobi:size-14 onmobi:right-4 onmobi:bottom-5 fixed right-8 bottom-16 z-50 aspect-square size-18 min-w-auto rounded-full border-4 bg-[#2cd46d] p-2 shadow hover:bg-[#2cd46d]/80"
         color="secondary"
         to="https://wa.me/5518997591410"
         target="_blank">
         <WhatsApp class="size-10 text-white" />
      </UButton>
   </div>
</template>
