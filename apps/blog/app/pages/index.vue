<script setup lang="ts">
import { recentPosts } from '~/data/load-blog-posts'

useSeoMeta({
   description:
      'Blog MiniCloset Gatti Kids com ideias de moda infantil, presentes, cuidados e inspiração para famílias.',
   ogDescription:
      'Conteúdos leves sobre moda infantil, presentes e rotina para famílias.',
   ogTitle: 'MiniCloset Gatti Kids Blog',
   title: 'MiniCloset Gatti Kids Blog',
})
</script>

<template>
   <div class="grid">
      <UPageSection
         :ui="{
            container: 'py-14 sm:py-20',
            description: 'text-[#6d5360]',
            title: 'text-[#2c1e25]',
         }">
         <div class="grid gap-6 lg:grid-cols-3">
            <UBlogPost
               v-for="post in recentPosts"
               :key="post.title || post.badge + post.date"
               :title="post.title"
               :description="post.description"
               :date="post.date"
               :badge="post.badge"
               :to="post.to"
               variant="subtle"
               :class="[
                  'bg-white ring-pink-100 transition',
                  post.to
                     ? 'cursor-pointer hover:-translate-y-1 hover:shadow-xs hover:shadow-pink-300 hover:ring-pink-300'
                     : 'cursor-default opacity-80',
               ]"
               @click="post.to && navigateTo(post.to)">
               <template #header>
                  <div
                     :class="[
                        'place-center grid aspect-4/3 rounded-t-lg bg-linear-to-br text-[#34222c]',
                        post.accent,
                     ]">
                     <img :src="post.img" class="w-full" />
                  </div>
               </template>
            </UBlogPost>
         </div>
      </UPageSection>
   </div>
</template>
