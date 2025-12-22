'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronLeft, ChevronRight, Calendar, Users, DollarSign, RotateCcw } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/lib/utils'
import { EVENT_TYPES, SERVICES } from '@/lib/constants'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

// Validation schema
const quoteSchema = z.object({
  eventType: z.string().min(1, 'Please select an event type'),
  guestCount: z.number().min(10, 'Minimum 10 guests').max(10000, 'Maximum 10,000 guests'),
  eventDate: z.string().min(1, 'Please select an event date'),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  budget: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().optional(),
})

type QuoteFormData = z.infer<typeof quoteSchema>

const BUDGET_RANGES = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: 'over-100k', label: 'Over $100,000' },
  { value: 'flexible', label: 'Flexible / Not Sure' },
]

const STEPS = [
  { number: 1, title: 'Event Type', description: 'What are you planning?' },
  { number: 2, title: 'Guest Count', description: 'How many guests?' },
  { number: 3, title: 'Event Date', description: 'When is your event?' },
  { number: 4, title: 'Services', description: 'What do you need?' },
  { number: 5, title: 'Budget', description: 'What\'s your budget?' },
  { number: 6, title: 'Contact Info', description: 'How can we reach you?' },
]

export function QuoteWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      guestCount: 50,
      services: [],
    },
  })

  const watchedValues = watch()

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          message: `Quote Request:\n\nEvent Type: ${data.eventType}\nGuest Count: ${data.guestCount}\nEvent Date: ${data.eventDate}\nServices: ${data.services.join(', ')}\nBudget: ${data.budget || 'Not specified'}\n\nAdditional Details:\n${data.message || 'None'}`,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit quote request')
      }

      trackEvent('form_submission', 'quote', data.eventType)
      setIsSubmitted(true)
      reset()
    } catch (error) {
      setSubmitError('Something went wrong. Please try again or contact us directly.')
    }
  }

  const handleNext = async () => {
    const fieldsToValidate = {
      1: ['eventType'],
      2: ['guestCount'],
      3: ['eventDate'],
      4: ['services'],
      5: [], // Budget is optional
      6: ['name', 'email', 'phone'],
    }

    const fields = fieldsToValidate[currentStep as keyof typeof fieldsToValidate] as Array<keyof QuoteFormData>
    const isValid = await trigger(fields)

    if (isValid && currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    reset()
    setCurrentStep(1)
    setSubmitError(null)
  }

  const toggleService = (serviceId: string) => {
    const currentServices = watchedValues.services || []
    const newServices = currentServices.includes(serviceId)
      ? currentServices.filter((s) => s !== serviceId)
      : [...currentServices, serviceId]
    setValue('services', newServices)
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </motion.div>
        <h2 className="text-3xl font-serif text-brand-primary mb-4">
          Thank You!
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We have received your quote request and will get back to you within 24 hours with a detailed proposal.
        </p>
        <Button onClick={() => { setIsSubmitted(false); setCurrentStep(1); }} variant="outline">
          Submit Another Request
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex-1 flex items-center">
              <div className="flex flex-col items-center relative">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    currentStep >= step.number
                      ? 'bg-brand-accent text-white'
                      : 'bg-gray-200 text-gray-400'
                  )}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="hidden md:block absolute top-12 whitespace-nowrap">
                  <p
                    className={cn(
                      'text-xs font-medium',
                      currentStep >= step.number ? 'text-brand-accent' : 'text-gray-400'
                    )}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2 transition-all',
                    currentStep > step.number ? 'bg-brand-accent' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="md:hidden text-center mt-4">
          <p className="text-sm font-medium text-brand-accent">
            {STEPS[currentStep - 1].title}
          </p>
          <p className="text-xs text-gray-500">{STEPS[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Form Steps */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* Step 1: Event Type */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-serif text-brand-primary mb-2 text-center">
                What type of event are you planning?
              </h3>
              <p className="text-gray-600 mb-8 text-center">
                Select the category that best fits your event
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {EVENT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setValue('eventType', type.id)}
                    className={cn(
                      'relative p-6 rounded-lg border-2 transition-all text-left overflow-hidden group',
                      watchedValues.eventType === type.id
                        ? 'border-brand-accent bg-brand-accent/10'
                        : 'border-gray-200 hover:border-brand-accent/50'
                    )}
                  >
                    <div className="relative z-10">
                      <h4 className="font-semibold text-brand-primary mb-2">{type.title}</h4>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                    {watchedValues.eventType === type.id && (
                      <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-brand-accent" />
                    )}
                  </button>
                ))}
              </div>
              {errors.eventType && (
                <p className="form-error text-center mb-4">{errors.eventType.message}</p>
              )}
            </motion.div>
          )}

          {/* Step 2: Guest Count */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-serif text-brand-primary mb-2 text-center">
                How many guests are you expecting?
              </h3>
              <p className="text-gray-600 mb-8 text-center">
                Slide to select your expected guest count
              </p>
              <div className="max-w-xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Users className="w-8 h-8 text-brand-accent" />
                  <div className="text-center">
                    <p className="text-5xl font-bold text-brand-accent">{watchedValues.guestCount || 50}</p>
                    <p className="text-sm text-gray-600">guests</p>
                  </div>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  {...register('guestCount', { valueAsNumber: true })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>10</span>
                  <span>500</span>
                  <span>1000+</span>
                </div>
              </div>
              {errors.guestCount && (
                <p className="form-error text-center mt-4">{errors.guestCount.message}</p>
              )}
            </motion.div>
          )}

          {/* Step 3: Event Date */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-serif text-brand-primary mb-2 text-center">
                When is your event?
              </h3>
              <p className="text-gray-600 mb-8 text-center">
                Select your preferred event date
              </p>
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-accent" />
                  <input
                    type="date"
                    {...register('eventDate')}
                    min={new Date().toISOString().split('T')[0]}
                    className={cn(
                      'form-input pl-12 text-lg text-center',
                      errors.eventDate && 'border-red-500'
                    )}
                  />
                </div>
                {errors.eventDate && (
                  <p className="form-error text-center mt-4">{errors.eventDate.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Not sure yet? You can provide an approximate date.
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 4: Services */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-serif text-brand-primary mb-2 text-center">
                What services do you need?
              </h3>
              <p className="text-gray-600 mb-8 text-center">
                Select all services you are interested in
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={cn(
                      'relative p-6 rounded-lg border-2 transition-all text-left',
                      (watchedValues.services || []).includes(service.id)
                        ? 'border-brand-accent bg-brand-accent/10'
                        : 'border-gray-200 hover:border-brand-accent/50'
                    )}
                  >
                    <h4 className="font-semibold text-brand-primary mb-2">{service.title}</h4>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    {(watchedValues.services || []).includes(service.id) && (
                      <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-brand-accent" />
                    )}
                  </button>
                ))}
              </div>
              {errors.services && (
                <p className="form-error text-center mb-4">{errors.services.message}</p>
              )}
            </motion.div>
          )}

          {/* Step 5: Budget */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-serif text-brand-primary mb-2 text-center">
                What is your budget range?
              </h3>
              <p className="text-gray-600 mb-8 text-center">
                This helps us provide the most accurate proposal (optional)
              </p>
              <div className="max-w-md mx-auto space-y-3">
                {BUDGET_RANGES.map((range) => (
                  <button
                    key={range.value}
                    type="button"
                    onClick={() => setValue('budget', range.value)}
                    className={cn(
                      'w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between',
                      watchedValues.budget === range.value
                        ? 'border-brand-accent bg-brand-accent/10'
                        : 'border-gray-200 hover:border-brand-accent/50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-brand-accent" />
                      <span className="font-medium text-brand-primary">{range.label}</span>
                    </div>
                    {watchedValues.budget === range.value && (
                      <CheckCircle className="w-5 h-5 text-brand-accent" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-6 text-center">
                Don&apos;t worry - we work with all budgets and will create the perfect package for you
              </p>
            </motion.div>
          )}

          {/* Step 6: Contact Info */}
          {currentStep === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-serif text-brand-primary mb-2 text-center">
                How can we reach you?
              </h3>
              <p className="text-gray-600 mb-8 text-center">
                We will send your personalized quote within 24 hours
              </p>
              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className={cn('form-input', errors.name && 'border-red-500')}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="form-error">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={cn('form-input', errors.email && 'border-red-500')}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number *
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className={cn('form-input', errors.phone && 'border-red-500')}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="form-error">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="form-label">
                    Additional Details (Optional)
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    className="form-textarea"
                    rows={4}
                    placeholder="Tell us more about your vision, special requirements, or questions..."
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {submitError && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-center">
            {submitError}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={handleBack}
              variant="outline"
              disabled={currentStep === 1}
              className={cn(currentStep === 1 && 'invisible')}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </Button>
            {currentStep > 1 && (
              <Button
                type="button"
                onClick={handleReset}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Start Over
              </Button>
            )}
          </div>

          <div className="text-sm text-gray-500">
            Step {currentStep} of {STEPS.length}
          </div>

          {currentStep < 6 ? (
            <Button type="button" onClick={handleNext}>
              Next
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          ) : (
            <Button type="submit" isLoading={isSubmitting}>
              Submit Request
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
