import { NextRequest, NextResponse } from 'next/server'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

// Initialize SES client
const ses = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
  ? new SESClient({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })
  : null

// Brand colors
const BRAND_COLORS = {
  primary: '#1a1a2e',
  accent: '#c9a227',
  cream: '#faf9f6',
  text: '#333333',
  textLight: '#666666',
}

// Company info
const COMPANY = {
  name: 'The Perfect Event',
  phone: '877-345-7500',
  email: 'info@theperfectevent.com',
  address: '3133 E South St, Long Beach, CA 90805',
  website: process.env.NEXT_PUBLIC_SITE_URL || 'https://theperfectevent.com',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theperfectevent.com'}/images/logo.png`,
}

const FROM_EMAIL = process.env.FROM_EMAIL || 'leads@theperfectevent.com'
const FROM_NAME = process.env.FROM_NAME || 'The Perfect Event'

// Email wrapper template with branding
function emailWrapper(content: string, preheader: string = '') {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${COMPANY.name}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    table { border-spacing: 0; }
    td { padding: 0; }
    img { border: 0; display: block; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #f5f5f5; padding: 40px 0; }
    .main { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    @media screen and (max-width: 600px) {
      .main { width: 100% !important; border-radius: 0 !important; }
      .content { padding: 24px !important; }
    }
  </style>
</head>
<body>
  <!-- Preheader text (hidden) -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${preheader}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <div class="wrapper">
    <table class="main" align="center" width="600" cellpadding="0" cellspacing="0" role="presentation">
      <!-- Header with Logo -->
      <tr>
        <td style="background-color: ${BRAND_COLORS.primary}; padding: 32px; text-align: center;">
          <img src="${COMPANY.logo}" alt="${COMPANY.name}" width="200" style="max-width: 200px; height: auto; margin: 0 auto;" />
        </td>
      </tr>

      <!-- Gold Accent Bar -->
      <tr>
        <td style="background-color: ${BRAND_COLORS.accent}; height: 4px;"></td>
      </tr>

      <!-- Content -->
      <tr>
        <td class="content" style="padding: 40px;">
          ${content}
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background-color: ${BRAND_COLORS.cream}; padding: 32px; text-align: center; border-top: 1px solid #e5e5e5;">
          <p style="margin: 0 0 12px 0; color: ${BRAND_COLORS.text}; font-size: 14px; font-weight: 600;">
            ${COMPANY.name}
          </p>
          <p style="margin: 0 0 8px 0; color: ${BRAND_COLORS.textLight}; font-size: 13px;">
            ${COMPANY.address}
          </p>
          <p style="margin: 0 0 16px 0; color: ${BRAND_COLORS.textLight}; font-size: 13px;">
            <a href="tel:${COMPANY.phone}" style="color: ${BRAND_COLORS.accent}; text-decoration: none;">${COMPANY.phone}</a>
            &nbsp;|&nbsp;
            <a href="mailto:${COMPANY.email}" style="color: ${BRAND_COLORS.accent}; text-decoration: none;">${COMPANY.email}</a>
          </p>
          <p style="margin: 0; color: ${BRAND_COLORS.textLight}; font-size: 12px;">
            © ${new Date().getFullYear()} ${COMPANY.name}. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
  `.trim()
}

// Internal notification email template
function notificationEmailTemplate(data: {
  name: string
  email: string
  phone?: string
  eventType: string
  eventDate?: string
  guestCount?: string
  budgetRange?: string
  message: string
}) {
  const content = `
    <h1 style="margin: 0 0 24px 0; color: ${BRAND_COLORS.primary}; font-size: 24px; font-weight: 600;">
      New Inquiry Received
    </h1>

    <p style="margin: 0 0 24px 0; color: ${BRAND_COLORS.textLight}; font-size: 15px; line-height: 1.6;">
      You have received a new inquiry from your website contact form.
    </p>

    <!-- Contact Information -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: ${BRAND_COLORS.cream}; border-radius: 8px; overflow: hidden;">
      <tr>
        <td style="padding: 20px;">
          <h2 style="margin: 0 0 16px 0; color: ${BRAND_COLORS.primary}; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
            Contact Information
          </h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.textLight}; font-size: 14px; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.text}; font-size: 14px; font-weight: 500;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.textLight}; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.text}; font-size: 14px;">
                <a href="mailto:${data.email}" style="color: ${BRAND_COLORS.accent}; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.textLight}; font-size: 14px;">Phone:</td>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.text}; font-size: 14px;">
                <a href="tel:${data.phone}" style="color: ${BRAND_COLORS.accent}; text-decoration: none;">${data.phone}</a>
              </td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>
    </table>

    <!-- Event Details -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: ${BRAND_COLORS.cream}; border-radius: 8px; overflow: hidden;">
      <tr>
        <td style="padding: 20px;">
          <h2 style="margin: 0 0 16px 0; color: ${BRAND_COLORS.primary}; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
            Event Details
          </h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.textLight}; font-size: 14px; width: 120px;">Event Type:</td>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.text}; font-size: 14px; font-weight: 500;">${data.eventType}</td>
            </tr>
            ${data.eventDate ? `
            <tr>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.textLight}; font-size: 14px;">Event Date:</td>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.text}; font-size: 14px;">${data.eventDate}</td>
            </tr>
            ` : ''}
            ${data.guestCount ? `
            <tr>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.textLight}; font-size: 14px;">Guest Count:</td>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.text}; font-size: 14px;">${data.guestCount}</td>
            </tr>
            ` : ''}
            ${data.budgetRange ? `
            <tr>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.textLight}; font-size: 14px;">Budget Range:</td>
              <td style="padding: 8px 0; color: ${BRAND_COLORS.text}; font-size: 14px;">${data.budgetRange}</td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>
    </table>

    <!-- Message -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: ${BRAND_COLORS.cream}; border-radius: 8px; overflow: hidden;">
      <tr>
        <td style="padding: 20px;">
          <h2 style="margin: 0 0 16px 0; color: ${BRAND_COLORS.primary}; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
            Message
          </h2>
          <p style="margin: 0; color: ${BRAND_COLORS.text}; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
        </td>
      </tr>
    </table>

    <!-- Quick Actions -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding-top: 8px;">
          <a href="mailto:${data.email}?subject=Re: Your ${data.eventType} Inquiry - The Perfect Event"
             style="display: inline-block; padding: 14px 32px; background-color: ${BRAND_COLORS.accent}; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px;">
            Reply to ${data.name.split(' ')[0]}
          </a>
        </td>
      </tr>
    </table>
  `

  return emailWrapper(content, `New inquiry from ${data.name} for ${data.eventType}`)
}

// Customer confirmation email template
function confirmationEmailTemplate(name: string, eventType: string) {
  const firstName = name.split(' ')[0]

  const content = `
    <h1 style="margin: 0 0 24px 0; color: ${BRAND_COLORS.primary}; font-size: 28px; font-weight: 600; text-align: center;">
      Thank You, ${firstName}!
    </h1>

    <p style="margin: 0 0 20px 0; color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.7; text-align: center;">
      We've received your inquiry about your <strong>${eventType}</strong> and are excited to help bring your vision to life!
    </p>

    <div style="text-align: center; margin: 32px 0;">
      <div style="display: inline-block; background-color: ${BRAND_COLORS.cream}; border-radius: 8px; padding: 24px 40px;">
        <p style="margin: 0 0 8px 0; color: ${BRAND_COLORS.textLight}; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
          What's Next?
        </p>
        <p style="margin: 0; color: ${BRAND_COLORS.accent}; font-size: 24px; font-weight: 600;">
          We'll respond within 24 hours
        </p>
      </div>
    </div>

    <p style="margin: 0 0 24px 0; color: ${BRAND_COLORS.text}; font-size: 15px; line-height: 1.7;">
      One of our experienced event specialists will review your requirements and reach out to discuss how we can make your event truly unforgettable.
    </p>

    <!-- What We Offer -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0; background-color: ${BRAND_COLORS.cream}; border-radius: 8px; overflow: hidden;">
      <tr>
        <td style="padding: 24px;">
          <h2 style="margin: 0 0 20px 0; color: ${BRAND_COLORS.primary}; font-size: 18px; font-weight: 600; text-align: center;">
            Why Choose The Perfect Event?
          </h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width: 40px; vertical-align: top;">
                      <div style="width: 24px; height: 24px; background-color: ${BRAND_COLORS.accent}; border-radius: 50%; text-align: center; line-height: 24px; color: white; font-size: 12px;">✓</div>
                    </td>
                    <td style="color: ${BRAND_COLORS.text}; font-size: 14px; line-height: 1.5;">
                      <strong>25+ Years of Excellence</strong> - Trusted by thousands of clients
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width: 40px; vertical-align: top;">
                      <div style="width: 24px; height: 24px; background-color: ${BRAND_COLORS.accent}; border-radius: 50%; text-align: center; line-height: 24px; color: white; font-size: 12px;">✓</div>
                    </td>
                    <td style="color: ${BRAND_COLORS.text}; font-size: 14px; line-height: 1.5;">
                      <strong>Full-Service Production</strong> - From concept to execution
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width: 40px; vertical-align: top;">
                      <div style="width: 24px; height: 24px; background-color: ${BRAND_COLORS.accent}; border-radius: 50%; text-align: center; line-height: 24px; color: white; font-size: 12px;">✓</div>
                    </td>
                    <td style="color: ${BRAND_COLORS.text}; font-size: 14px; line-height: 1.5;">
                      <strong>Customized Solutions</strong> - Tailored to your unique vision
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="margin: 0 0 24px 0; color: ${BRAND_COLORS.textLight}; font-size: 14px; line-height: 1.7; text-align: center;">
      Have an urgent question? Call us directly at
      <a href="tel:${COMPANY.phone}" style="color: ${BRAND_COLORS.accent}; text-decoration: none; font-weight: 600;">${COMPANY.phone}</a>
    </p>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="${COMPANY.website}/portfolio"
             style="display: inline-block; padding: 14px 32px; background-color: ${BRAND_COLORS.primary}; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px;">
            View Our Portfolio
          </a>
        </td>
      </tr>
    </table>
  `

  return emailWrapper(content, `Thank you for contacting The Perfect Event! We'll be in touch within 24 hours.`)
}

// Send email via SES
async function sendViaSES(params: {
  to: string[]
  replyTo?: string
  subject: string
  html: string
}) {
  if (!ses) throw new Error('SES not configured')

  const command = new SendEmailCommand({
    Source: `${FROM_NAME} <${FROM_EMAIL}>`,
    Destination: {
      ToAddresses: params.to,
    },
    ReplyToAddresses: params.replyTo ? [params.replyTo] : undefined,
    Message: {
      Subject: {
        Data: params.subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: params.html,
          Charset: 'UTF-8',
        },
      },
    },
  })

  return ses.send(command)
}

// Send email via SES
async function sendEmail(params: {
  to: string[]
  replyTo?: string
  subject: string
  html: string
}) {
  if (!ses) {
    throw new Error('SES not configured - missing AWS credentials')
  }

  try {
    await sendViaSES(params)
    console.log('Email sent via SES to:', params.to.join(', '))
    return { provider: 'ses' }
  } catch (error) {
    console.error('SES email failed:', error)
    throw error
  }
}

// Minimum time (in ms) a human would take to fill out the form
const MIN_FORM_TIME_MS = 3000

// Spam/malware detection patterns
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|lottery|winner|congratulations.*won|click here|act now|limited time|free money)\b/i,
  /\b(SEO|backlink|link building|guest post|sponsored post|buy followers|increase traffic)\b/i,
  /\b(crypto|bitcoin|investment opportunity|make money fast|work from home.*\$)\b/i,
]

const SUSPICIOUS_URL_PATTERNS = [
  /\.(ru|cn|tk|ml|ga|cf|gq|xyz|top|click|loan|work)\b/i, // Suspicious TLDs
  /bit\.ly|tinyurl|goo\.gl|t\.co|shorturl/i, // URL shorteners (often used to hide malicious links)
  /(\.exe|\.zip|\.rar|\.js|\.vbs|\.bat|\.cmd|\.scr|\.msi)\b/i, // Executable file extensions
]

// Check for excessive URLs (spam indicator)
const URL_REGEX = /https?:\/\/[^\s]+/gi

function detectSpam(text: string): { isSpam: boolean; reason?: string } {
  // Check for spam patterns
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(text)) {
      return { isSpam: true, reason: 'spam keywords detected' }
    }
  }

  // Check for suspicious URLs
  for (const pattern of SUSPICIOUS_URL_PATTERNS) {
    if (pattern.test(text)) {
      return { isSpam: true, reason: 'suspicious URL detected' }
    }
  }

  // Check for excessive URLs (more than 3 URLs is suspicious for a contact form)
  const urls = text.match(URL_REGEX)
  if (urls && urls.length > 3) {
    return { isSpam: true, reason: `excessive URLs (${urls.length})` }
  }

  return { isSpam: false }
}

// Disposable email domains (common ones used by spammers)
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com',
  '10minutemail.com', 'temp-mail.org', 'fakeinbox.com', 'trashmail.com',
  'yopmail.com', 'getnada.com', 'maildrop.cc', 'dispostable.com',
]

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  return DISPOSABLE_EMAIL_DOMAINS.some(d => domain?.includes(d))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, eventType, eventDate, guestCount, budgetRange, message, website, formLoadedAt } = body

    // Bot protection: Honeypot field check
    // If 'website' field is filled, it's likely a bot (field is hidden from humans)
    if (website) {
      console.warn('Bot detected: honeypot field filled')
      // Return success to not alert the bot, but don't process
      return NextResponse.json(
        { success: true, message: 'Message received successfully!' },
        { status: 200 }
      )
    }

    // Bot protection: Time-based check
    // If form was submitted too quickly, it's likely a bot
    if (formLoadedAt) {
      const timeSpent = Date.now() - formLoadedAt
      if (timeSpent < MIN_FORM_TIME_MS) {
        console.warn(`Bot detected: form submitted too fast (${timeSpent}ms)`)
        return NextResponse.json(
          { success: true, message: 'Message received successfully!' },
          { status: 200 }
        )
      }
    }

    // Spam/malware detection: Check message content
    const spamCheck = detectSpam(message || '')
    if (spamCheck.isSpam) {
      console.warn(`Spam detected: ${spamCheck.reason}`)
      return NextResponse.json(
        { success: true, message: 'Message received successfully!' },
        { status: 200 }
      )
    }

    // Also check name field for spam (some bots put links there)
    const nameSpamCheck = detectSpam(name || '')
    if (nameSpamCheck.isSpam) {
      console.warn(`Spam in name field: ${nameSpamCheck.reason}`)
      return NextResponse.json(
        { success: true, message: 'Message received successfully!' },
        { status: 200 }
      )
    }

    // Check for disposable email addresses
    if (email && isDisposableEmail(email)) {
      console.warn(`Disposable email detected: ${email}`)
      return NextResponse.json(
        { error: 'Please use a valid business or personal email address' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!name || !email || !eventType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Log the submission (for development)
    console.log('=== New Contact Form Submission ===')
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Phone:', phone || 'Not provided')
    console.log('Event Type:', eventType)
    console.log('Event Date:', eventDate || 'Not provided')
    console.log('Guest Count:', guestCount || 'Not provided')
    console.log('Budget Range:', budgetRange || 'Not provided')
    console.log('Message:', message)
    console.log('===================================')

    // Only send emails if SES is configured
    if (ses) {
      // Parse multiple contact emails (comma-separated)
      const contactEmails = (process.env.CONTACT_EMAIL || 'sales@theperfectevent.com')
        .split(',')
        .map(e => e.trim())
        .filter(e => e.length > 0)

      // Send notification email to all contact emails
      await sendEmail({
        to: contactEmails,
        replyTo: email,
        subject: `New Inquiry: ${eventType} - ${name}`,
        html: notificationEmailTemplate({
          name,
          email,
          phone,
          eventType,
          eventDate,
          guestCount,
          budgetRange,
          message,
        }),
      })

      // Send confirmation email to the customer
      await sendEmail({
        to: [email],
        subject: `Thank you for contacting The Perfect Event!`,
        html: confirmationEmailTemplate(name, eventType),
      })

      console.log('Emails sent successfully to:', contactEmails.join(', '))
    } else {
      console.error('SES not configured - AWS credentials missing. Emails not sent.')
    }

    return NextResponse.json(
      { success: true, message: 'Message received successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    )
  }
}
