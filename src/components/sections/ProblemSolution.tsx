'use client'

import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

const problems = [
  'Coordinating 5-10 different vendors is stressful and time-consuming',
  'If one vendor fails, your entire event suffers',
  'Hidden costs and markups from multiple vendors',
  'No single point of accountability when things go wrong',
  'Endless phone calls, emails, and coordination headaches',
]

const solutions = [
  'One company owns and operates ALL services in-house',
  'Single point of contact for complete accountability',
  'Transparent pricing with no middleman markups',
  'Nearly 200 professional staff ensuring flawless execution',
  'Relax and enjoy your event while we handle everything',
]

export function ProblemSolution() {
  return (
    <Section id="why-us" background="white">
      <Container>
        <div className="text-center mb-16">
          <span className="section-subtitle block">The TPE Difference</span>
          <h2 className="section-title">Why One Company Changes Everything</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Problem Side */}
          <div className="bg-red-50 rounded-xl p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-serif text-red-900">The Traditional Way</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-200 text-red-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    ✕
                  </span>
                  <span className="text-red-800">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Side */}
          <div className="bg-green-50 rounded-xl p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-serif text-green-900">The Perfect Event Way</h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-green-800">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button href="/#contact" size="lg">
            Get Your Free Quote
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </Container>
    </Section>
  )
}
