'use client'

import { useEffect, useState, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

const stats = [
  { value: 600, suffix: '+', label: 'Events Per Year' },
  { value: 200, suffix: '+', label: 'Team Members' },
  { value: 17, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [end, duration, start])

  return count
}

function StatItem({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCountUp(value, 2000, inView)

  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
        {count}
        <span className="text-brand-secondary">{suffix}</span>
      </div>
      <div className="text-gray-300 text-lg">{label}</div>
    </div>
  )
}

export function StatsCounter() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-brand-primary py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} inView={inView} />
          ))}
        </div>
      </Container>
    </section>
  )
}
