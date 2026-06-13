<script setup lang="ts">
import { blogPosts, toPostDate } from '~/data/load-blog-posts'

const route = useRoute()
const slug = String(route.params.slug ?? '')
const post = blogPosts.find((item) => {
   return item.slug === slug
})

if (!post) {
   throw createError({
      statusCode: 404,
      statusMessage: 'Post não encontrado',
   })
}

const postContentHtml = post.content_markdown.replace(
   /<h1[^>]*>[\s\S]*?<\/h1>\s*/i,
   '',
)

const breadcrumbItems = [
   { icon: 'lucide:home', label: 'Início', to: '/' },
   { label: 'Blog', to: '/#recentes' },
   { label: post.title },
]

const relatedPosts = blogPosts
   .filter((item) => {
      return item.slug !== post.slug
   })
   .slice(0, 2)
   .map(({ cover_image_url, created, excerpt, slug, title }) => {
      return {
         accent: 'from-pink-200 via-orange-100 to-rose-100',
         badge: 'Post',
         date: toPostDate(created),
         description: excerpt ?? '',
         image: cover_image_url,
         title,
         to: `/blog/${slug}`,
      }
   })

const copied = ref(false)

const copyPostUrl = async () => {
   if (!import.meta.client || !navigator.clipboard) {
      return
   }

   await navigator.clipboard.writeText(window.location.href)
   copied.value = true

   window.setTimeout(() => {
      copied.value = false
   }, 2000)
}

useSeoMeta({
   description: post.meta_description,
   ogDescription: post.meta_description,
   ogTitle: `${post.meta_title} | MiniCloset Gatti Kids Blog`,
   title: `${post.meta_title} | MiniCloset Gatti Kids Blog`,
})
</script>

<template>
   <div class="grid">
      <UContainer class="py-6 sm:py-8">
         <UBreadcrumb :items="breadcrumbItems" />
      </UContainer>

      <UContainer>
         <UBlogPost
            class="bg-white/70 pr-8"
            :title="post.title"
            :description="post.meta_description"
            :image="post.cover_image_url"
            :date="formatUnixToDate(post.created)"
            orientation="horizontal" />
      </UContainer>

      <article class="mb-12">
         <UContainer>
            <div
               class="mt-3 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
               <div class="grid gap-8">
                  <section
                     class="blog-post-content grid gap-4 rounded-lg bg-white/70 p-6 ring-1 ring-pink-100 sm:p-8">
                     <div v-html="postContentHtml" />
                  </section>
               </div>

               <aside class="grid gap-5 lg:sticky lg:top-24">
                  <UCard
                     title="Resumo rápido"
                     description="Pontos principais para salvar antes de comprar ou organizar."
                     variant="subtle"
                     class="bg-white/85 ring-pink-100"
                     :ui="{
                        body: 'p-5 sm:p-6',
                        description: 'text-[#7f6471]',
                        header: 'p-5 sm:p-6 pb-0',
                        title: 'text-[#2c1e25]',
                     }" />

                  <UCard
                     variant="outline"
                     class="bg-white/70 ring-pink-100"
                     :ui="{ body: 'p-5 sm:p-6' }">
                     <div class="grid gap-4">
                        <div>
                           <p class="font-semibold text-[#2c1e25]">
                              Gostou do post?
                           </p>
                           <p class="mt-1 text-sm leading-6 text-[#7f6471]">
                              Compartilhe com alguém que também cuida dos pequenos.
                           </p>
                        </div>
                        <UButton
                           :label="copied ? 'Link copiado' : 'Copiar link'"
                           :icon="copied ? 'lucide:check' : 'lucide:link'"
                           color="neutral"
                           variant="subtle"
                           class="justify-center"
                           @click="copyPostUrl" />
                     </div>
                  </UCard>
               </aside>
            </div>
         </UContainer>
      </article>

      <UPageSection
         headline="Continue lendo"
         title=""
         description=""
         :ui="{
            container: 'py-14 sm:py-20',
            description: 'text-[#6d5360]',
            title: 'text-[#2c1e25]',
         }">
         <div class="grid gap-6 md:grid-cols-2">
            <UBlogPost
               v-for="relatedPost in relatedPosts"
               :key="relatedPost.title"
               :title="relatedPost.image"
               :description="relatedPost.description"
               :date="relatedPost.date"
               :badge="relatedPost.badge"
               :to="relatedPost.to"
               :image="relatedPost.image"
               orientation="horizontal"
               variant="subtle"
               class="cursor-pointer bg-white/80 transition hover:-translate-y-1 hover:ring-pink-400">
               <template #header>
                  <div
                     :class="[
                        'grid min-h-full place-items-center rounded-lg bg-linear-to-br text-[#34222c]',
                        relatedPost.accent,
                     ]" />
               </template>
            </UBlogPost>
         </div>
      </UPageSection>
   </div>
</template>
