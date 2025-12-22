'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Phone, Mail, MapPin, CheckCircle, Clock, Shield, User, Calendar, RotateCcw } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG, EVENT_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  eventType: z.string().min(1, 'Please select an event type'),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  budgetRange: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacy: z.boolean().refine((val) => val === true, 'You must agree to the privacy policy'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const handleReset = () => {
    reset()
    setSubmitError(null)
  }

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      trackEvent('form_submission', 'contact', data.eventType)
      setIsSubmitted(true)
      reset()
    } catch (error) {
      setSubmitError('Something went wrong. Please try again or contact us directly.')
    }
  }

  if (isSubmitted) {
    return (
      <Section id="contact" background="white">
        <Container size="sm">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-3xl font-serif text-brand-primary mb-4">
              Thank You!
            </h2>
            <p className="text-gray-600 mb-8">
              We&apos;ve received your message and will get back to you within 24 hours.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Send Another Message
            </Button>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section id="contact" background="white">
      <Container>
        <SectionHeader
          subtitle="Get In Touch"
          title="Contact Us"
          description="Ready to start planning your perfect event? Fill out the form below and we'll get back to you within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-xl font-serif text-brand-primary mb-6">
                Let&apos;s Talk
              </h3>
              <p className="text-gray-600 mb-8">
                Have questions? We&apos;re here to help. Reach out to us through any of these channels.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-start gap-4 group"
              >
                <div className="p-3 bg-brand-accent/10 rounded-lg group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Phone size={24} className="text-brand-accent group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-primary">Phone</h4>
                  <p className="text-gray-600">{SITE_CONFIG.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-start gap-4 group"
              >
                <div className="p-3 bg-brand-accent/10 rounded-lg group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Mail size={24} className="text-brand-accent group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-primary">Email</h4>
                  <p className="text-gray-600">{SITE_CONFIG.email}</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-accent/10 rounded-lg">
                  <MapPin size={24} className="text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-primary">Address</h4>
                  <p className="text-gray-600">{SITE_CONFIG.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 order-first lg:order-last">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-brand-cream rounded-xl p-5 sm:p-6">
              <div className="space-y-6">
                {/* Your Information Group */}
                <fieldset>
                  <legend className="text-sm font-semibold text-brand-primary mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-accent" />
                    Your Information
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="form-label">
                        Full Name <span className="text-brand-accent">*</span>
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        id="name"
                        aria-required="true"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={cn('form-input', errors.name && 'border-error')}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p id="name-error" className="form-error" role="alert">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email Address <span className="text-brand-accent">*</span>
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        id="email"
                        aria-required="true"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={cn('form-input', errors.email && 'border-error')}
                        placeholder="you@company.com"
                      />
                      {errors.email && (
                        <p id="email-error" className="form-error" role="alert">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="md:col-span-2 lg:col-span-1">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        id="phone"
                        className="form-input"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Event Details Group */}
                <fieldset>
                  <legend className="text-sm font-semibold text-brand-primary mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-accent" />
                    Event Details
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Event Type */}
                    <div>
                      <label htmlFor="eventType" className="form-label">
                        Event Type <span className="text-brand-accent">*</span>
                      </label>
                      <select
                        {...register('eventType')}
                        id="eventType"
                        aria-required="true"
                        aria-describedby={errors.eventType ? 'eventType-error' : undefined}
                        className={cn('form-input', errors.eventType && 'border-error')}
                      >
                        <option value="">Select an event type</option>
                        {EVENT_TYPES.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.title}
                          </option>
                        ))}
                        <option value="other">Other</option>
                      </select>
                      {errors.eventType && (
                        <p id="eventType-error" className="form-error" role="alert">{errors.eventType.message}</p>
                      )}
                    </div>

                    {/* Event Date */}
                    <div>
                      <label htmlFor="eventDate" className="form-label">
                        Event Date
                      </label>
                      <input
                        {...register('eventDate')}
                        type="date"
                        id="eventDate"
                        className="form-input"
                      />
                    </div>

                    {/* Guest Count */}
                    <div>
                      <label htmlFor="guestCount" className="form-label">
                        Expected Guest Count
                      </label>
                      <select
                        {...register('guestCount')}
                        id="guestCount"
                        className="form-input"
                      >
                        <option value="">Select range</option>
                        <option value="1-50">1-50 guests</option>
                        <option value="51-100">51-100 guests</option>
                        <option value="101-200">101-200 guests</option>
                        <option value="201-500">201-500 guests</option>
                        <option value="500+">500+ guests</option>
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label htmlFor="budgetRange" className="form-label">
                        Budget Range
                      </label>
                      <select
                        {...register('budgetRange')}
                        id="budgetRange"
                        className="form-input"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-15k">$5,000 - $15,000</option>
                        <option value="15k-30k">$15,000 - $30,000</option>
                        <option value="30k-50k">$30,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k-plus">$100,000+</option>
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="form-label">
                    Tell Us About Your Event <span className="text-brand-accent">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={cn('form-textarea', errors.message && 'border-error')}
                    placeholder="Share details about your event vision, specific services you're interested in, or any questions you have..."
                  />
                  {errors.message && (
                    <p id="message-error" className="form-error" role="alert">{errors.message.message}</p>
                  )}
                </div>

                {/* Privacy Checkbox */}
                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      {...register('privacy')}
                      type="checkbox"
                      className="mt-0.5 w-4 h-4 text-brand-accent focus:ring-brand-accent focus:ring-2 border-gray-300 rounded transition-colors flex-shrink-0"
                    />
                    <span className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors leading-relaxed">
                      I agree to the{' '}
                      <a href="/privacy-policy" className="text-brand-accent hover:underline font-medium">
                        Privacy Policy
                      </a>{' '}
                      and consent to being contacted regarding my inquiry.
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="form-error mt-1" role="alert">{errors.privacy.message}</p>
                  )}
                </div>
              </div>

              {submitError && (
                <div className="mt-4 p-3 bg-error/10 text-error text-sm rounded-lg" role="alert">
                  {submitError}
                </div>
              )}

              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" size="md" isLoading={isSubmitting} className="w-full sm:w-auto">
                    <Send size={16} className="mr-2" />
                    Get My Free Quote
                  </Button>
                  <Button
                    type="button"
                    onClick={handleReset}
                    variant="ghost"
                    size="md"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Clear Form
                  </Button>
                </div>

                {/* Trust Signals */}
                <div className="mt-4 flex flex-wrap items-center justify-start gap-x-4 gap-y-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-accent" />
                    Response within 24 hours
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-brand-accent" />
                    Your info is secure
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-accent" />
                    No obligation quote
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  )
}
