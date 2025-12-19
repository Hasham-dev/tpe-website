import { NextRequest, NextResponse } from 'next/server'

// TODO: Add Resend integration later
// import { Resend } from 'resend'
// const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, eventType, eventDate, guestCount, budgetRange, message } = body

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

    // TODO: Uncomment when Resend is set up
    /*
    // Send email to the company
    await resend.emails.send({
      from: 'The Perfect Event <noreply@theperfectevent.com>',
      to: process.env.CONTACT_EMAIL || 'sales@theperfectevent.com',
      reply_to: email,
      subject: `New Inquiry: ${eventType} - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <h3>Event Details</h3>
        <p><strong>Event Type:</strong> ${eventType}</p>
        ${eventDate ? `<p><strong>Event Date:</strong> ${eventDate}</p>` : ''}
        ${guestCount ? `<p><strong>Guest Count:</strong> ${guestCount}</p>` : ''}
        ${budgetRange ? `<p><strong>Budget Range:</strong> ${budgetRange}</p>` : ''}
        <h3>Message</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'The Perfect Event <noreply@theperfectevent.com>',
      to: email,
      subject: 'Thank you for contacting The Perfect Event',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We've received your inquiry and will get back to you within 24 hours.</p>
        <p>Best regards,<br>The Perfect Event Team</p>
      `,
    })
    */

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
