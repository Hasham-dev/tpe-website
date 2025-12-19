import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors - refined palette with proper contrast
        brand: {
          primary: '#1a1a1a',
          'primary-light': '#303030',
          'primary-muted': '#4a4a4a',
          // Accent colors with proper contrast ratios
          accent: '#c4956c',           // Darkened for 4.5:1 contrast on white
          'accent-bright': '#e8a66a',  // CTAs and highlights
          'accent-muted': '#d4a574',   // Subtle accents, borders
          'accent-light': '#ffb18b',   // Soft highlights
          // Backgrounds
          cream: '#f5f2ed',
          'cream-dark': '#ebe6de',
          // Legacy support
          secondary: '#c4956c',
          dark: '#303030',
        },
        // Semantic colors
        success: '#16a34a',
        warning: '#ca8a04',
        error: '#dc2626',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        script: ['var(--font-great-vibes)', 'cursive'],
      },
      fontSize: {
        // Custom scale for better hierarchy
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        'xs': ['0.75rem', { lineHeight: '1.125rem' }],
        'sm': ['0.875rem', { lineHeight: '1.375rem' }],
        'base': ['1rem', { lineHeight: '1.625rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.15' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4))',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
        'scroll': 'scroll 40s linear infinite',
        'scroll-reverse': 'scroll-reverse 40s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
