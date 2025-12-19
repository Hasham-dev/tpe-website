import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { BlogPost } from '@/lib/blog-posts'

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-sm shadow-md p-6">
      <h3 className="font-serif text-2xl text-brand-primary mb-6 pb-3 border-b border-gray-200">
        Related Articles
      </h3>

      <div className="space-y-6">
        {posts.map((post) => {
          const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })

          return (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="flex gap-4">
                <div className="relative w-24 h-24 flex-shrink-0 rounded-sm overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-lg text-brand-primary mb-2 group-hover:text-brand-accent transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h4>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} />
                    <time dateTime={post.publishedAt}>{formattedDate}</time>
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-brand-accent font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300"
        >
          View All Articles
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
