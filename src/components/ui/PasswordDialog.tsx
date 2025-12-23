'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Lock, AlertCircle } from 'lucide-react'
import { Button } from './Button'

interface PasswordDialogProps {
  isOpen: boolean
  folderName: string
  onSubmit: (password: string) => Promise<{ success: boolean; error?: string; remainingAttempts?: number }>
  onClose: () => void
}

export function PasswordDialog({ isOpen, folderName, onSubmit, onClose }: PasswordDialogProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setPassword('')
      setError(null)
      setRemainingAttempts(null)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password.trim()) {
      setError('Please enter a password')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await onSubmit(password)

      if (!result.success) {
        setError(result.error || 'Incorrect password')
        if (result.remainingAttempts !== undefined) {
          setRemainingAttempts(result.remainingAttempts)
        }
        setPassword('')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="password-dialog-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close dialog"
        >
          <X size={24} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-brand-primary" />
          </div>
        </div>

        {/* Title */}
        <h2
          id="password-dialog-title"
          className="text-2xl font-serif font-bold text-center text-brand-primary mb-2"
        >
          Protected Gallery
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter the password to access <span className="font-semibold">{folderName}</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              ref={inputRef}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter password"
              autoComplete="off"
              disabled={isLoading}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 text-sm">{error}</p>
                {remainingAttempts !== null && remainingAttempts > 0 && (
                  <p className="text-red-600 text-xs mt-1">
                    {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining
                  </p>
                )}
                {remainingAttempts === 0 && (
                  <p className="text-red-600 text-xs mt-1">
                    Too many attempts. Please try again later.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
            disabled={remainingAttempts === 0}
          >
            Access Gallery
          </Button>
        </form>

        {/* Help text */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Contact us if you need access credentials.
        </p>
      </div>
    </div>
  )
}
