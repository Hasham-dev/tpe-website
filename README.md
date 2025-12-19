# The Perfect Event - Next.js Website

A modern, high-converting landing page for The Perfect Event, Southern California's premier full-service event production company.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Sanity (headless)
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend
- **Analytics**: Google Analytics 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account (for CMS)
- Resend account (for emails)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Fill in your environment variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   RESEND_API_KEY=your_resend_api_key
   CONTACT_EMAIL=sales@theperfectevent.com
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-4DYQHVR9DG
   NEXT_PUBLIC_SITE_URL=https://theperfectevent.com
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts      # Contact form API
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/
│   ├── analytics/
│   │   └── GoogleAnalytics.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── EventTypes.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── CTA.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Gallery.tsx
│   │   ├── Team.tsx
│   │   ├── FAQ.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Container.tsx
│       └── Section.tsx
└── lib/
    ├── constants.ts          # Site config & data
    ├── utils.ts              # Utility functions
    └── sanity/
        ├── client.ts         # Sanity client
        ├── queries.ts        # GROQ queries
        └── schemas/          # Sanity schemas
```

## Features

- **Hero Section**: Video background (desktop), static image (mobile)
- **Services Grid**: 9 service categories with hover effects
- **About Section**: Company story with stats
- **Event Types**: 6 event categories
- **How It Works**: 5-step process visualization
- **Testimonials**: Carousel with reviews
- **Gallery**: Filterable image grid with lightbox
- **Team**: Key team members
- **FAQ**: Accordion with 8 common questions
- **Contact Form**: Validated form with email notifications
- **SEO Optimized**: Meta tags, Open Graph, structured data
- **Mobile-First**: Fully responsive design
- **Performance**: Optimized images, lazy loading, code splitting

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

```bash
npm run build
npm run start
```

## Setting Up Sanity CMS

1. Create a Sanity project at [sanity.io](https://sanity.io)
2. Install Sanity CLI: `npm install -g @sanity/cli`
3. Initialize Sanity in a separate folder:
   ```bash
   sanity init
   ```
4. Use the schemas from `src/lib/sanity/schemas/`
5. Add your project ID to `.env.local`

## Customization

### Colors

Edit `tailwind.config.ts` to change brand colors:

```ts
colors: {
  brand: {
    primary: '#1a1a1a',
    secondary: '#ffb18b',
    accent: '#d4a574',
    cream: '#f5f2ed',
    dark: '#303030',
  },
}
```

### Content

Edit `src/lib/constants.ts` for static content, or manage through Sanity CMS.

## License

Private - The Perfect Event, Inc.
