import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RelatedPosts } from '@/components/ui/RelatedPosts'
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from '@/lib/blog-posts'
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/StructuredData'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://theperfectevent.com'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | The Perfect Event Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
    keywords: post.tags,
  }
}

// Simple markdown-like content renderer
function renderContent(content: string) {
  const lines = content.trim().split('\n')
  const elements: JSX.Element[] = []
  let currentList: string[] = []
  let listType: 'ul' | 'ol' | null = null
  let key = 0

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListTag = listType
      elements.push(
        <ListTag key={key++} className={`${listType === 'ul' ? 'list-disc' : 'list-decimal'} list-inside space-y-2 mb-6 text-gray-700`}>
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ListTag>
      )
      currentList = []
      listType = null
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // Skip empty lines
    if (!trimmedLine) {
      flushList()
      continue
    }

    // Headers
    if (trimmedLine.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={key++} className="font-serif text-2xl text-brand-primary mt-8 mb-4">
          {trimmedLine.slice(4)}
        </h3>
      )
      continue
    }

    if (trimmedLine.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={key++} className="font-serif text-3xl text-brand-primary mt-10 mb-6">
          {trimmedLine.slice(3)}
        </h2>
      )
      continue
    }

    if (trimmedLine.startsWith('# ')) {
      flushList()
      // Skip the title since we show it in the hero
      continue
    }

    // List items
    if (trimmedLine.startsWith('- ')) {
      if (listType !== 'ul') {
        flushList()
        listType = 'ul'
      }
      currentList.push(trimmedLine.slice(2))
      continue
    }

    if (/^\d+\.\s/.test(trimmedLine)) {
      if (listType !== 'ol') {
        flushList()
        listType = 'ol'
      }
      currentList.push(trimmedLine.replace(/^\d+\.\s/, ''))
      continue
    }

    // Bold text handling
    const processedLine = trimmedLine
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Regular paragraph
    flushList()
    elements.push(
      <p
        key={key++}
        className="text-gray-700 leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: processedLine }}
      />
    )
  }

  flushList()
  return elements
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3)
  const postUrl = `${BASE_URL}/blog/${post.slug}`

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <>
      {/* Structured Data for SEO */}
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        url={postUrl}
        image={post.featuredImage}
        author={post.author}
        publishedAt={post.publishedAt}
        tags={post.tags}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: BASE_URL },
          { name: 'Blog', url: `${BASE_URL}/blog` },
          { name: post.category, url: `${BASE_URL}/blog?category=${encodeURIComponent(post.category)}` },
          { name: post.title, url: postUrl },
        ]}
      />

      {/* Hero Section */}
      <Section background="default" spacing="none" className="relative">
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          <Container className="relative h-full flex flex-col justify-end pb-12">
            <Breadcrumb
              items={[
                { label: 'Blog', href: '/blog' },
                { label: post.category, href: `/blog?category=${encodeURIComponent(post.category)}` },
                { label: post.title },
              ]}
              className="mb-6 text-white/80"
            />
            <span className="inline-block px-4 py-1 bg-brand-accent text-white text-sm font-semibold uppercase tracking-wider rounded-sm mb-4 w-fit">
              {post.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 max-w-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <time dateTime={post.publishedAt}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </Container>
        </div>
      </Section>

      {/* Content Section */}
      <Section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2">
              {/* Back to Blog Link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-brand-accent font-semibold mb-8 hover:gap-3 transition-all duration-300"
              >
                <ArrowLeft size={18} />
                Back to Blog
              </Link>

              {/* Excerpt */}
              <p className="text-xl text-gray-700 leading-relaxed mb-8 pb-8 border-b border-gray-200">
                {post.excerpt}
              </p>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {renderContent(post.content)}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={18} className="text-brand-accent" />
                    <span className="font-semibold text-brand-primary">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-brand-cream text-brand-primary text-sm rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <div className="mt-12 p-8 bg-brand-cream rounded-sm">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center text-white text-2xl font-serif">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-brand-primary mb-2">
                      Written by {post.author}
                    </h3>
                    <p className="text-gray-700">
                      Part of The Perfect Event team, dedicated to creating unforgettable experiences across Southern California.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <RelatedPosts posts={relatedPosts} />
                )}

                {/* CTA Card */}
                <div className="bg-brand-primary text-white rounded-sm p-8">
                  <h3 className="font-serif text-2xl mb-4">Ready to Plan Your Event?</h3>
                  <p className="text-gray-300 mb-6">
                    Let our expert team bring your vision to life with full-service event production.
                  </p>
                  <Link
                    href="/quote"
                    className="block w-full px-6 py-3 bg-brand-accent text-white font-semibold text-center uppercase tracking-wider rounded-sm hover:bg-brand-secondary transition-all duration-300"
                  >
                    Get Your Free Quote
                  </Link>
                </div>

                {/* Contact Card */}
                <div className="bg-white border border-gray-200 rounded-sm p-8">
                  <h3 className="font-serif text-xl text-brand-primary mb-4">Questions?</h3>
                  <p className="text-gray-700 mb-4">
                    Our team is here to help with your event planning needs.
                  </p>
                  <a
                    href="tel:+15627161777"
                    className="block w-full px-6 py-3 border-2 border-brand-primary text-brand-primary font-semibold text-center uppercase tracking-wider rounded-sm hover:bg-brand-primary hover:text-white transition-all duration-300"
                  >
                    Call (562) 716-1777
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-brand-primary text-white py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl mb-6">Let&apos;s Create Something Perfect</h2>
            <p className="text-xl mb-8 text-gray-300">
              From corporate galas to dream weddings, we handle every detail so you can enjoy the moment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote"
                className="px-8 py-4 bg-brand-accent text-white font-semibold uppercase tracking-wider rounded-sm hover:bg-brand-secondary transition-all duration-300"
              >
                Start Planning Today
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 border-2 border-white text-white font-semibold uppercase tracking-wider rounded-sm hover:bg-white hover:text-brand-primary transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
