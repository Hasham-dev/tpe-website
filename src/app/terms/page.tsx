import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for The Perfect Event. Read our terms and conditions for using our website and services.',
}

export default function TermsOfServicePage() {
  return (
    <>
      <Section background="dark" spacing="md">
        <Container size="md">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-300">
              Last updated: December 2024
            </p>
          </div>
        </Container>
      </Section>

      <Section background="white" spacing="lg">
        <Container size="md">
          <div className="prose prose-lg max-w-none">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using The Perfect Event website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
            </p>

            <h2>Services Description</h2>
            <p>
              The Perfect Event provides full-service event planning and production services including, but not limited to, event coordination, entertainment, audio-visual production, transportation, and related services throughout Southern California.
            </p>

            <h2>Use of Website</h2>
            <p>You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul>
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any portion of the website</li>
              <li>Interfere with or disrupt the website or servers</li>
              <li>Transmit any viruses, malware, or other malicious code</li>
              <li>Collect or harvest any information from the website without authorization</li>
            </ul>

            <h2>Quote Requests and Bookings</h2>
            <p>
              When you submit a quote request through our website, you are requesting information about our services. A quote is not a binding contract until both parties have signed a formal agreement.
            </p>
            <p>
              All bookings are subject to:
            </p>
            <ul>
              <li>Availability of services and personnel</li>
              <li>Execution of a formal service agreement</li>
              <li>Payment of required deposits</li>
              <li>Agreement on event details and specifications</li>
            </ul>

            <h2>Pricing and Payment</h2>
            <p>
              All prices quoted are estimates and may vary based on final event requirements. Final pricing will be confirmed in writing before services are rendered. Payment terms will be outlined in individual service agreements.
            </p>

            <h2>Cancellation Policy</h2>
            <p>
              Cancellation policies vary depending on the type of service and timing. Specific cancellation terms will be outlined in your service agreement. Generally:
            </p>
            <ul>
              <li>Cancellations made 30+ days before the event may receive a partial refund</li>
              <li>Cancellations made within 30 days of the event may forfeit deposits</li>
              <li>No-shows or same-day cancellations are non-refundable</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              All content on this website, including text, images, logos, and designs, is the property of The Perfect Event or its licensors and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>

            <h2>User Content</h2>
            <p>
              By submitting content to our website (such as reviews, testimonials, or photos), you grant us a non-exclusive, royalty-free license to use, reproduce, and display such content for marketing and promotional purposes.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, The Perfect Event shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.
            </p>
            <p>
              Our total liability for any claims arising from our services shall not exceed the amount you paid for those services.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless The Perfect Event, its officers, employees, and agents from any claims, damages, losses, or expenses arising from your use of our website or violation of these Terms.
            </p>

            <h2>Force Majeure</h2>
            <p>
              The Perfect Event shall not be liable for any failure to perform due to circumstances beyond our reasonable control, including natural disasters, acts of terrorism, government actions, pandemics, or other force majeure events.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
            </p>

            <h2>Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms or our services shall first be attempted to be resolved through good faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration in Los Angeles County, California.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the modified Terms.
            </p>

            <h2>Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <p>
              <strong>The Perfect Event</strong><br />
              Email: sales@theperfectevent.com<br />
              Phone: 877-345-7500
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
