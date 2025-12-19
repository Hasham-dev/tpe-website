import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-sm', className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="text-gray-500 hover:text-brand-accent transition-colors"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-brand-accent transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-brand-primary font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
