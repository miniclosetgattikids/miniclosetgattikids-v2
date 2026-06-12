import { z } from 'zod'

const postStatusEnum = z.enum(['ready', 'needs_review'])

const postSchema = z.object({
   id: z.string().uuid(),
   placeId: z.string().uuid(),
   projectContextId: z.string().uuid().nullable().default(null),
   title: z.string().min(1).max(200),
   slug: z.string().min(1).max(120),
   contentMarkdown: z.string().min(1),
   excerpt: z.string().max(500).nullable().default(null),
   metaTitle: z.string().min(1).max(60),
   metaDescription: z.string().min(1).max(155),
   primaryKeyword: z.string().min(1).max(120),
   status: postStatusEnum,
   editorNotes: z.string().nullable().default(null),
   coverImageUrl: z.string().url().nullable().default(null),
   created: z.number().min(1700000000),
   updated: z.number().min(1700000000).nullable().default(null),
})

type Post = z.infer<typeof postSchema>

export { postSchema }

export type { Post }
