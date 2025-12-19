import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import { CaseStudy } from '@/lib/portfolio'
import { cn } from '@/lib/utils'

interface PortfolioCardProps {
  caseStudy: CaseStudy
  featured?: boolean
}

export function PortfolioCard({ caseStudy, featured = false }: PortfolioCardProps) {
  return (
    <Link
      href={`/portfolio/${caseStudy.slug}`}
      className={cn(
        'group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl',
        featured && 'md:col-span-2 md:row-span-2'
      )}
    >
      <div className={cn(
        'relative overflow-hidden',
        featured ? 'h-[400px] md:h-[600px]' : 'h-[300px]'
      )}>
        <Image
          src={caseStudy.images[0]}
          alt={caseStudy.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Event Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-brand-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
            {caseStudy.eventType}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className={cn(
          'font-serif font-bold mb-2 group-hover:text-brand-accent-light transition-colors',
          featured ? 'text-2xl md:text-3xl' : 'text-xl'
        )}>
          {caseStudy.title}
        </h3>

        <p className={cn(
          'text-gray-200 mb-4 line-clamp-2',
          featured ? 'text-base' : 'text-sm'
        )}>
          {caseStudy.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{caseStudy.guestCount} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{caseStudy.location.split(',')[0]}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-brand-accent-light font-semibold group-hover:gap-4 transition-all">
          <span>View Case Study</span>
          <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  )
}
