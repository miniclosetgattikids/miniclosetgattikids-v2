export type BlogPostJson = {
   content_markdown: string
   cover_image_url: string | null
   created: number
   editor_notes: string | null
   excerpt: string | null
   id: string
   meta_description: string
   meta_title: string
   place_id: string
   primary_keyword: string
   project_context_id: string | null
   slug: string
   status: 'needs_review' | 'ready'
   title: string
   updated: number | null
}

const postAccents = [
   'from-pink-200 via-orange-100 to-rose-100',
   'from-sky-100 via-lime-100 to-emerald-100',
   'from-violet-100 via-fuchsia-100 to-pink-100',
]

const postFiles = import.meta.glob<BlogPostJson>('./*.json', {
   eager: true,
   import: 'default',
})

export const blogPosts = Object.values(postFiles)
   .filter((post) => {
      return post.status === 'ready' && post.slug.length > 0
   })
   .sort((left, right) => {
      return right.created - left.created
   })

export const toPostDate = (created: number) => {
   return new Date(created * 1000).toISOString().slice(0, 10)
}

export const recentPosts = blogPosts.map((post, index) => {
   return {
      accent: postAccents[index % postAccents.length],
      badge: 'Post',
      date: toPostDate(post.created),
      description: post.excerpt ?? '',
      img: post.cover_image_url ?? '',
      title: post.title,
      to: `/blog/${post.slug}`,
   }
})
