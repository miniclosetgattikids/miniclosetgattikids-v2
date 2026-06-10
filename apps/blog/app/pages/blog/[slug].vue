<script setup lang="ts">
import { blogPosts } from '~/data/blog-posts'

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

const breadcrumbItems = [
   { icon: 'lucide:home', label: 'Início', to: '/' },
   { label: 'Blog', to: '/#recentes' },
   { label: post.title },
]

const formattedDate = new Intl.DateTimeFormat('pt-BR', {
   day: '2-digit',
   month: 'long',
   timeZone: 'UTC',
   year: 'numeric',
}).format(new Date(post.date))

const relatedPosts = blogPosts
   .filter((item) => {
      return item.slug !== post.slug
   })
   .slice(0, 2)
   .map(({ accent, badge, date, description, slug, title }) => {
      return {
         accent,
         badge,
         date,
         description,
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
   description: post.description,
   ogDescription: post.description,
   ogTitle: `${post.title} | MiniCloset Gatti Kids Blog`,
   title: `${post.title} | MiniCloset Gatti Kids Blog`,
})

type BodyBlock = {
   text: string
   type: 'heading' | 'paragraph'
}

const parseBodyBlocks = (content: string): BodyBlock[] => {
   return content
      .split(/\n\n+/)
      .map((block) => {
         return block.trim()
      })
      .filter((block) => {
         return block.length > 0
      })
      .map((block) => {
         if (block.startsWith('#### ')) {
            return {
               text: block.slice(5),
               type: 'heading' as const,
            }
         }

         return {
            text: block,
            type: 'paragraph' as const,
         }
      })
}
</script>

<template>
   <div class="grid">
      <UContainer class="py-6 sm:py-8">
         <UBreadcrumb :items="breadcrumbItems" />
      </UContainer>

      <article class="mb-12">
         <UContainer>
            <UPageHeader
               :title="post.title"
               :description="post.description"
               :ui="{
                  description: 'max-w-3xl text-[#6d5360]',
                  title: 'max-w-4xl text-4xl sm:text-5xl lg:text-6xl text-[#2c1e25] leading-15',
               }">
               <template #headline>
                  <div class="flex flex-wrap items-center gap-3">
                     <UBadge :label="post.badge" variant="subtle" size="lg" />
                     <time :datetime="post.date" class="text-sm text-[#7f6471]">
                        {{ formattedDate }}
                     </time>
                  </div>
               </template>
            </UPageHeader>

            <div
               class="mt-3 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
               <div class="grid gap-8">
                  <section
                     v-for="(section, index) in post.sections"
                     :key="index"
                     class="grid gap-4 rounded-[1.75rem] bg-white/70 p-6 ring-1 ring-pink-100 sm:p-8">
                     <template v-for="paragraph in section.body" :key="paragraph">
                        <template
                           v-for="(block, index2) in parseBodyBlocks(paragraph)"
                           :key="`${paragraph}-${index2}`">
                           <h4
                              v-if="block.type === 'heading'"
                              class="text-xl font-semibold text-[#2c1e25]">
                              {{ block.text }}
                           </h4>
                           <p
                              v-else
                              class="text-base leading-8 whitespace-pre-line text-[#5f4853] sm:text-lg">
                              {{ block.text }}
                           </p>
                        </template>
                     </template>
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
                     }"/>

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
               :title="relatedPost.title"
               :description="relatedPost.description"
               :date="relatedPost.date"
               :badge="relatedPost.badge"
               :to="relatedPost.to"
               orientation="horizontal"
               variant="subtle"
               class="cursor-pointer bg-white/80 transition hover:-translate-y-1 hover:ring-pink-400">
               <template #header>
                  <div
                     :class="[
                        'grid min-h-full place-items-center rounded-lg bg-linear-to-br text-[#34222c]',
                        relatedPost.accent,
                     ]"/>
               </template>
            </UBlogPost>
         </div>
      </UPageSection>
   </div>
</template>
