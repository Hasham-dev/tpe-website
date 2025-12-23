'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const COOKIE_CONSENT_KEY = 'tpe-cookie-consent'

type ConsentStatus = 'accepted' | 'declined' | null

export function CookieConsent() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (stored === 'accepted' || stored === 'declined') {
      setConsentStatus(stored)
    } else {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    setConsentStatus('accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
    setConsentStatus('declined')
    setIsVisible(false)
  }

  // Don't render if consent already given
  if (consentStatus !== null || !isVisible) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6',
        'transform transition-transform duration-500 ease-out',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-brand-primary mb-1">
                We value your privacy
              </h3>
              <p className="text-sm text-gray-600">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                By clicking &quot;Accept&quot;, you consent to our use of cookies. Read our{' '}
                <Link href="/privacy-policy" className="text-brand-accent hover:underline">
                  Privacy Policy
                </Link>{' '}
                for more information.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
