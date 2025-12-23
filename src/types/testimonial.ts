/**
 * Centralized types for testimonials
 */

export interface Testimonial {
  id?: string | number
  name: string
  initials: string
  text: string
  rating: number
  event: string
  location: string
  color: string
}
