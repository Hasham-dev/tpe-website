import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { PROCESS_STEPS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function HowItWorks() {
  return (
    <Section id="process" background="white">
      <Container>
        <SectionHeader
          subtitle="Our Process"
          title="How It Works"
          description="From your first inquiry to event day, we make the process simple and stress-free."
        />

        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-brand-accent/30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} total={PROCESS_STEPS.length} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

interface ProcessStepProps {
  step: typeof PROCESS_STEPS[0]
  index: number
  total: number
}

function ProcessStep({ step, index, total }: ProcessStepProps) {
  return (
    <div className="relative text-center">
      {/* Step Number Circle */}
      <div className="relative inline-flex items-center justify-center w-[120px] h-[120px] mb-6">
        <div className="absolute inset-0 bg-brand-accent/10 rounded-full" />
        <div className="absolute inset-3 bg-white rounded-full shadow-lg flex items-center justify-center">
          <span className="text-3xl font-bold text-brand-accent">{step.number}</span>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-serif text-brand-primary mb-2">
        {step.title}
      </h3>
      <p className="text-gray-600 text-sm">
        {step.description}
      </p>
    </div>
  )
}
