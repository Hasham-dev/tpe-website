import { NextResponse } from 'next/server'

// In-memory rate limiting (resets on server restart)
const failedAttempts = new Map<string, { count: number; lastAttempt: number }>()
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

// Folder name to password env variable mapping
const FOLDER_PASSWORD_MAP: Record<string, string> = {
  'USC LAW': 'LAW_USC_PASSWORD',
  'UCLA LAW': 'LAW_UCLA_PASSWORD',
  'LOYOLA LAW': 'LAW_LOYOLA_PASSWORD',
  'PEPPERDINE LAW': 'LAW_PEPPERDINE_PASSWORD',
  'UA': 'LAW_UA_PASSWORD',
  'CHAPMAN': 'LAW_CHAPMAN_PASSWORD',
  // Also support lowercase/variations
  'usc law': 'LAW_USC_PASSWORD',
  'usc': 'LAW_USC_PASSWORD',
  'ucla law': 'LAW_UCLA_PASSWORD',
  'ucla': 'LAW_UCLA_PASSWORD',
  'loyola law': 'LAW_LOYOLA_PASSWORD',
  'loyola': 'LAW_LOYOLA_PASSWORD',
  'pepperdine law': 'LAW_PEPPERDINE_PASSWORD',
  'pepperdine': 'LAW_PEPPERDINE_PASSWORD',
  'ua': 'LAW_UA_PASSWORD',
  'chapman': 'LAW_CHAPMAN_PASSWORD',
}

function getPasswordForFolder(folderName: string): string | null {
  // Try exact match first
  const envKey = FOLDER_PASSWORD_MAP[folderName]
  if (envKey) {
    return process.env[envKey] || null
  }

  // Try case-insensitive match
  const lowerName = folderName.toLowerCase()
  for (const [key, value] of Object.entries(FOLDER_PASSWORD_MAP)) {
    if (key.toLowerCase() === lowerName || lowerName.includes(key.toLowerCase())) {
      return process.env[value] || null
    }
  }

  return null
}

function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number } {
  const now = Date.now()
  const record = failedAttempts.get(ip)

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS }
  }

  // Reset if lockout period has passed
  if (now - record.lastAttempt > LOCKOUT_DURATION) {
    failedAttempts.delete(ip)
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS }
  }

  if (record.count >= MAX_ATTEMPTS) {
    return { allowed: false, remainingAttempts: 0 }
  }

  return { allowed: true, remainingAttempts: MAX_ATTEMPTS - record.count }
}

function recordFailedAttempt(ip: string): void {
  const now = Date.now()
  const record = failedAttempts.get(ip)

  if (record) {
    record.count++
    record.lastAttempt = now
  } else {
    failedAttempts.set(ip, { count: 1, lastAttempt: now })
  }
}

function clearFailedAttempts(ip: string): void {
  failedAttempts.delete(ip)
}

// Generate a simple session token
function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'

    // Check rate limit
    const rateLimitStatus = checkRateLimit(ip)
    if (!rateLimitStatus.allowed) {
      return NextResponse.json(
        {
          error: 'Too many failed attempts. Please try again later.',
          locked: true
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { folderName, password } = body

    if (!folderName || !password) {
      return NextResponse.json(
        { error: 'Folder name and password are required' },
        { status: 400 }
      )
    }

    // Get the expected password for this folder
    const expectedPassword = getPasswordForFolder(folderName)

    if (!expectedPassword) {
      return NextResponse.json(
        { error: 'Folder not found or not protected' },
        { status: 404 }
      )
    }

    // Verify password
    if (password !== expectedPassword) {
      recordFailedAttempt(ip)
      const newStatus = checkRateLimit(ip)

      return NextResponse.json(
        {
          error: 'Incorrect password',
          remainingAttempts: newStatus.remainingAttempts
        },
        { status: 401 }
      )
    }

    // Password correct - clear failed attempts and generate token
    clearFailedAttempts(ip)
    const token = generateToken()

    return NextResponse.json({
      success: true,
      token,
      folderName,
    })

  } catch (error) {
    console.error('Error verifying password:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
