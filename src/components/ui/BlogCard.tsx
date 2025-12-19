import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { BlogPost } from '@/lib/blog-posts'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-brand-accent text-white text-xs font-semibold uppercase tracking-wider rounded-full">
              {post.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <time dateTime={post.publishedAt}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-serif text-2xl text-brand-primary mb-3 group-hover:text-brand-accent transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <User size={16} />
            <span>{post.author}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-brand-accent font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300"
          >
            Read More
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  )
}
