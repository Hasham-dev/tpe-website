# The Perfect Event - Website Audit & Redesign Roadmap

## Section A: Executive Summary

### Business Overview
**The Perfect Event** is a full-service event production company founded in 2007, headquartered in Long Beach, CA. They are a true "one-stop shop" owning all services in-house: event coordination, security, transportation (130+ vehicle fleet via American Transportation), A/V production, staging, photo/video, DJ services, and rentals. With ~200 employees and 600+ events annually, they're a powerhouse serving Southern California, Arizona, and Catalina Island.

**Key Differentiator**: Unlike competitors who subcontract, TPE owns everything - reducing coordination friction and ensuring quality control.

**Subsidiary Companies**: Extreme Greeks (largest college event company in the US), American Transportation.

### Competitive Insights
| Competitor | Strengths | Weaknesses vs TPE |
|------------|-----------|-------------------|
| **Bixel & Co** | Fortune 500 clients (Nike, Mercedes), DMC focus, 20+ years | Focuses on destination management, not full-service ownership |
| **Innovate Marketing Group** | TikTok/Google clients, strong brand activations, modern website | Corporate/experiential focus only, no weddings/college |
| **Sequoia Productions** | 25+ years, high-end galas | Limited to LA market, older website |

### Main Opportunities
1. **SEO Gap**: No dedicated service/event-type landing pages = missing long-tail traffic
2. **Trust Elements**: Missing client logos, case studies, video testimonials on live site
3. **Lead Capture**: No lead magnets, chat widget, or instant quote calculator
4. **Content Marketing**: No blog = zero organic content visibility
5. **Local SEO**: No location-specific pages for 8 service areas

### Biggest Weaknesses (Current Site)
1. Single-page WordPress site lacks SEO depth
2. Featured clients section shows placeholder image
3. No case studies or portfolio with metrics
4. No blog or educational content
5. Mobile experience needs optimization
6. Missing schema markup for events/local business

---

## Section B: Recommended Site Structure

### Primary Pages
| Page | Purpose | Priority |
|------|---------|----------|
| `/` | Homepage - conversion-focused landing | P0 |
| `/services` | Services overview hub | P0 |
| `/services/[service]` | 9 individual service pages | P1 |
| `/events/weddings` | Wedding planning landing | P0 |
| `/events/corporate` | Corporate events landing | P0 |
| `/events/festivals` | Festival production landing | P1 |
| `/events/university` | College events (tie to Extreme Greeks) | P1 |
| `/events/high-school` | Prom/school events | P2 |
| `/events/private` | Private parties | P2 |
| `/about` | Company story, mission, values | P1 |
| `/team` | Full team directory | P2 |
| `/portfolio` | Case studies & gallery | P1 |
| `/blog` | Content marketing hub | P1 |
| `/locations/[city]` | 8 location pages for local SEO | P1 |
| `/contact` | Dedicated contact page | P0 |
| `/quote` | Multi-step quote request wizard | P0 |
| `/faq` | Expanded FAQ page | P2 |
| `/catalina-wine-mixer` | Ticketed event landing | P1 |
| `/buccaneer-days` | Ticketed event landing | P1 |

### URL Structure
```
/services/coordination-design
/services/venue-booking
/services/entertainment
/services/media-production
/services/transportation
/services/lighting-effects
/services/sound-staging
/services/security
/services/finishing-touches

/events/weddings
/events/corporate
/events/festivals
/events/university
/events/high-school
/events/private-parties

/locations/los-angeles
/locations/orange-county
/locations/san-diego
/locations/inland-empire
/locations/santa-barbara
/locations/san-luis-obispo
/locations/catalina-island
/locations/arizona

/blog/[category]/[slug]
/portfolio/[case-study-slug]
```

---

## Section C: Design Improvements

### Hero Strategy
**Current**: Video background with stats overlay - GOOD foundation
**Recommendations**:
1. Add dynamic text rotation highlighting different event types
2. Include social proof badge ("Rated 4.9★ | 600+ Events/Year")
3. Two CTAs: "Get Free Quote" (primary) + "View Our Work" (secondary)
4. Mobile: Use optimized static image with gradient overlay (faster load)

### Visual Identity

#### Color Palette (Current - Retain)
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Dark | `#1a1a1a` | Backgrounds, text |
| Secondary Coral | `#ffb18b` | Accents, CTAs |
| Accent Gold | `#d4a574` | Highlights, icons |
| Cream | `#f5f2ed` | Light backgrounds |
| Dark | `#303030` | Alternate dark |

#### Typography (Current - Retain)
- **Headings**: Cormorant Garamond (elegant, serif)
- **Body**: Montserrat (clean, readable)
- **Accent**: Great Vibes (decorative, sparingly)

### UI Component Updates
1. **Buttons**: Add micro-interactions (scale on hover, ripple on click)
2. **Cards**: Add subtle shadows, consistent border-radius (12px)
3. **Forms**: Floating labels, inline validation, progress indicators
4. **Navigation**: Sticky header with scroll progress indicator
5. **Mobile Menu**: Full-screen overlay with animated transitions

### Trust & Credibility Elements to Add
- [ ] Real client logos (Google, Nike, UCLA, USC, YouTube, Lululemon)
- [ ] Video testimonials (2-3 short clips)
- [ ] Case study cards with metrics ("500-guest corporate gala, $50K budget")
- [ ] "As Seen In" media mentions section
- [ ] Awards/certifications badges
- [ ] Real-time stats ("X events this month")

---

## Section D: SEO Roadmap

### Primary Keywords
| Keyword | Monthly Volume | Difficulty | Target Page |
|---------|---------------|------------|-------------|
| event planner los angeles | 1,900 | Medium | /locations/los-angeles |
| wedding planner orange county | 1,300 | Medium | /events/weddings |
| corporate event planner san diego | 480 | Low | /events/corporate |
| event production company california | 320 | Low | Homepage |
| full service event planning | 260 | Low | /services |
| college event company | 170 | Low | /events/university |
| festival production services | 140 | Low | /events/festivals |

### Secondary/Long-tail Keywords
- "wedding DJ and lighting package"
- "corporate event transportation los angeles"
- "catalina island event planner"
- "university greek event company"
- "prom planning services southern california"
- "event security company los angeles"

### On-Page SEO Fixes
1. **Title Tags**: Include city + service in each page title
2. **Meta Descriptions**: Add CTAs and unique selling points
3. **H1 Tags**: One per page, keyword-optimized
4. **Internal Linking**: Service pages link to related event types
5. **Image Alt Text**: Descriptive, keyword-rich alts for all images
6. **Schema Markup**: LocalBusiness, Event, FAQPage, Review schemas

### Technical SEO Checklist
- [ ] XML sitemap generation
- [ ] robots.txt optimization
- [ ] Canonical URLs on all pages
- [ ] Core Web Vitals optimization (LCP < 2.5s, CLS < 0.1)
- [ ] Mobile-first indexing compliance
- [ ] Structured data implementation
- [ ] 301 redirects from old WordPress URLs
- [ ] Google Business Profile optimization for Long Beach HQ + service areas

### Content Gap: Blog Topics
1. "How to Plan a Corporate Event: Complete Checklist"
2. "Wedding Planning Timeline: 12-Month Guide"
3. "Festival Production 101: What Event Organizers Need to Know"
4. "College Event Ideas That Won't Break the Budget"
5. "Catalina Island Weddings: Ultimate Venue Guide"
6. "Event Lighting Trends for 2025"
7. "How to Choose an Event Security Company"
8. "Transportation Logistics for Large Events"

---

## Section E: Content & Messaging

### Homepage Copy Guidelines
**Hero Headline**: "One Company. Every Service. Your Perfect Event."
**Subheadline**: "Southern California's only full-service event production company that owns it all—coordination, entertainment, AV, transportation, and security under one roof."

### Value Proposition Messaging
| Section | Key Message |
|---------|-------------|
| Problem/Solution | "Stop juggling 10 vendors. We handle everything." |
| Services | "9 services, 1 team, 0 coordination headaches" |
| Why Choose Us | "200 employees. 600+ events/year. 17 years of perfection." |
| CTA | "Get your free custom quote in 24 hours" |

### Tone of Voice
- **Professional** but approachable
- **Confident** without being boastful
- **Action-oriented** with clear next steps
- **Specific** with numbers and proof points

### Service Page Template
1. Hero with service-specific image
2. What we provide (bulleted list)
3. Why choose TPE for this service
4. Pricing transparency (starting at X)
5. Related services cross-links
6. Mini case study or testimonial
7. CTA: Request quote for this service

---

## Section F: Conversion Strategy

### Primary Conversion Goals
1. **Quote Request Form** (main goal)
2. **Phone Call** (click-to-call)
3. **Email Inquiry**
4. **Ticket Purchase** (for public events)

### CTA Placement Strategy
| Section | CTA Type |
|---------|----------|
| Hero | "Get Free Quote" button |
| After Services | "Build Your Package" |
| After Testimonials | "Join 600+ Happy Clients" |
| Sticky Footer (mobile) | "Call Now" + "Get Quote" |
| Exit Intent | Popup with lead magnet offer |

### Lead Magnets
1. **"Event Planning Checklist"** - PDF download
2. **"Venue Selection Guide"** - Gated content
3. **"Budget Calculator"** - Interactive tool
4. **"2025 Event Trends Report"** - Email signup

### Quote Request Wizard (Multi-step Form)
```
Step 1: Event Type (Wedding/Corporate/Festival/University/Other)
Step 2: Estimated Guest Count (slider)
Step 3: Event Date (calendar picker)
Step 4: Services Needed (multi-select checkboxes)
Step 5: Budget Range (optional)
Step 6: Contact Info (name, email, phone)
→ Thank you page with "What happens next" timeline
```

### A/B Tests to Run
1. Hero CTA: "Get Quote" vs "Start Planning"
2. Form length: 6 fields vs 3 fields
3. Social proof: Stats vs testimonials in hero
4. Pricing: Show ranges vs "Contact for quote"

---

## Section G: Implementation Priorities

### Phase 1: Foundation (Weeks 1-2)
**Files to modify/create**:
- `src/app/quote/page.tsx` - Multi-step quote wizard
- `src/app/contact/page.tsx` - Dedicated contact page
- `src/components/sections/FeaturedClients.tsx` - Add real logos
- `src/components/ui/QuoteWizard.tsx` - New component
- `src/lib/schema.ts` - Structured data helpers

**Tasks**:
- [ ] Create dedicated `/contact` and `/quote` pages
- [ ] Implement multi-step quote request form
- [ ] Add real client logos to FeaturedClients section
- [ ] Implement LocalBusiness + Organization schema
- [ ] Set up Resend email integration for form submissions
- [ ] Add click-to-call tracking

### Phase 2: Service & Event Pages (Weeks 3-4)
**Files to create**:
- `src/app/services/page.tsx` - Services hub
- `src/app/services/[slug]/page.tsx` - Dynamic service pages
- `src/app/events/[type]/page.tsx` - Event type pages
- `src/lib/services.ts` - Service page data
- `src/lib/events.ts` - Event type page data

**Tasks**:
- [ ] Create 9 individual service landing pages
- [ ] Create 6 event type landing pages
- [ ] Implement breadcrumb navigation
- [ ] Add internal cross-linking
- [ ] Implement Service schema on each page

### Phase 3: Local SEO & Locations (Weeks 5-6)
**Files to create**:
- `src/app/locations/[city]/page.tsx` - Location pages
- `src/lib/locations.ts` - Location-specific data

**Tasks**:
- [ ] Create 8 location-specific landing pages
- [ ] Optimize Google Business Profile
- [ ] Implement LocalBusiness schema per location
- [ ] Add location selector to navigation
- [ ] Create location-specific testimonials

### Phase 4: Content & Blog (Weeks 7-8)
**Files to create**:
- `src/app/blog/page.tsx` - Blog listing
- `src/app/blog/[slug]/page.tsx` - Blog post template
- Sanity CMS schemas for blog posts

**Tasks**:
- [ ] Set up Sanity CMS for blog content
- [ ] Create blog listing and post pages
- [ ] Write and publish 4-6 initial blog posts
- [ ] Implement Article schema
- [ ] Add related posts component

### Phase 5: Portfolio & Case Studies (Weeks 9-10)
**Files to create**:
- `src/app/portfolio/page.tsx` - Portfolio gallery
- `src/app/portfolio/[slug]/page.tsx` - Case study pages

**Tasks**:
- [ ] Create portfolio/case study section
- [ ] Add 3-5 detailed case studies with metrics
- [ ] Implement filterable gallery
- [ ] Add video testimonial integration

### Phase 6: Optimization & Launch (Weeks 11-12)
**Tasks**:
- [ ] Performance audit (Core Web Vitals)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Cross-browser testing
- [ ] 301 redirect mapping from WordPress
- [ ] Final SEO review
- [ ] Analytics & conversion tracking setup
- [ ] Launch & monitor

---

## Critical Files to Modify

### Existing Files (Update)
| File | Changes |
|------|---------|
| `src/lib/constants.ts` | Add location data, expand service details |
| `src/app/layout.tsx` | Update metadata, add structured data |
| `src/components/sections/FeaturedClients.tsx` | Add real client logos |
| `src/components/sections/Testimonials.tsx` | Add video testimonials |
| `src/components/sections/Hero.tsx` | Add social proof badge |
| `src/components/sections/Contact.tsx` | Link to dedicated quote page |
| `src/app/api/contact/route.ts` | Implement Resend email |

### New Files (Create)
| File | Purpose |
|------|---------|
| `src/app/services/page.tsx` | Services hub |
| `src/app/services/[slug]/page.tsx` | Individual service pages |
| `src/app/events/[type]/page.tsx` | Event type pages |
| `src/app/locations/[city]/page.tsx` | Location pages |
| `src/app/quote/page.tsx` | Multi-step quote wizard |
| `src/app/blog/page.tsx` | Blog listing |
| `src/app/blog/[slug]/page.tsx` | Blog posts |
| `src/app/portfolio/page.tsx` | Case studies |
| `src/lib/schema.ts` | JSON-LD structured data |
| `src/components/ui/QuoteWizard.tsx` | Quote form component |

---

## Success Metrics

| Metric | Current | Target (6 months) |
|--------|---------|-------------------|
| Organic Traffic | Baseline | +150% |
| Keyword Rankings (Top 10) | ~5 | 25+ |
| Quote Form Submissions | Baseline | +100% |
| Bounce Rate | TBD | <40% |
| Page Load Time (LCP) | TBD | <2.5s |
| Mobile Usability Score | TBD | 100 |

---

## Sources
- [The Perfect Event - Official Site](https://theperfectevent.com)
- [The Knot Reviews](https://www.theknot.com/marketplace/the-perfect-event-inc-long-beach-ca-512322)
- [Yelp Reviews](https://www.yelp.com/biz/the-perfect-event-long-beach)
- [Bixel & Co](https://bixelco.com)
- [Innovate Marketing Group](https://innovatemkg.com)
- [Bizzabo - Event Website Design Trends 2025](https://www.bizzabo.com/blog/beautiful-event-websites-design)
- [SEO Strategies for Event Planners](https://hub.theeventplannerexpo.com/marketing-strategy/8-seo-strategies-for-top-event-planner-websites)
