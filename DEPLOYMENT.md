# Deployment Checklist

This document outlines the external keys and configurations needed before deploying to production.

## Required External Keys & Configuration

### 1. Google Search Console Verification

**File:** `src/app/layout.tsx` (line 109)

```typescript
verification: {
  google: 'your-google-verification-code', // ← REPLACE THIS
},
```

**How to get:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (https://theperfectevent.com)
3. Choose "HTML tag" verification method
4. Copy the content value from the meta tag
5. Replace `'your-google-verification-code'` with the actual code

---

### 2. Environment Variables

Create a `.env.local` file (or configure in your hosting provider):

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://theperfectevent.com

# Google Drive API (for Gallery)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_FOLDER_ID=your-folder-id

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Form Submission (if using external service)
# Add any form submission API keys here
```

---

### 3. Google Analytics

**File:** `src/components/analytics/GoogleAnalytics.tsx`

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable with your GA4 measurement ID.

**How to get:**
1. Go to [Google Analytics](https://analytics.google.com)
2. Create or select your property
3. Go to Admin > Data Streams > Web
4. Copy the Measurement ID (starts with `G-`)

---

### 4. Google Drive API (for Gallery Feature)

Required for the gallery to pull images from Google Drive.

**Setup:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable the Google Drive API
4. Create a Service Account
5. Download the JSON key file
6. Extract `client_email` and `private_key` values
7. Share your Drive folder with the service account email

---

## Pre-Deployment Checklist

- [ ] Replace Google verification code in `layout.tsx`
- [ ] Set all environment variables
- [ ] Verify Google Drive folder is shared with service account
- [ ] Test Google Analytics is tracking
- [ ] Run `npm run build` to verify no build errors
- [ ] Test all forms are submitting correctly
- [ ] Verify sitemap is accessible at `/sitemap.xml`
- [ ] Verify robots.txt is accessible at `/robots.txt`
- [ ] Test OG images are loading correctly (use Facebook Debugger or Twitter Card Validator)

---

## SEO Verification After Deployment

1. **Submit Sitemap to Google:**
   - Go to Google Search Console
   - Navigate to Sitemaps
   - Submit: `https://theperfectevent.com/sitemap.xml`

2. **Request Indexing:**
   - In Search Console, go to URL Inspection
   - Enter your homepage URL
   - Click "Request Indexing"

3. **Validate Structured Data:**
   - Use [Google's Rich Results Test](https://search.google.com/test/rich-results)
   - Test homepage, service pages, blog posts, and location pages

4. **Check Social Sharing:**
   - [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## Optional: Additional Services

### Bing Webmaster Tools
- Similar to Google Search Console
- Submit at https://www.bing.com/webmasters

### Google Business Profile
- If not already set up, create at https://business.google.com
- Verify ownership
- Add photos, services, and business hours
- Respond to reviews regularly

---

## Support

If you need help with any of these steps, contact your development team or refer to the official documentation for each service.
