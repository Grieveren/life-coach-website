# Deployment Guide

This document outlines the deployment process and configuration for the Life Coach Website.

## Quick Start

### Production Build
```bash
npm run build:production
```

### Preview Build Locally
```bash
npm run build:preview
```

### Deploy to GoDaddy cPanel (static hosting)
1. Build locally:
```bash
npm ci
npm run build
cd dist && zip -r site.zip .
```
2. In cPanel → File Manager → `public_html` → Upload `site.zip` → Extract.
3. Ensure `index.html`, `assets/`, `.htaccess`, `robots.txt`, `sitemap.xml`, `fonts/` are directly in `public_html`.
4. SSL: enable AutoSSL, the provided `.htaccess` forces HTTPS.
5. Optional: remove placeholder files (`home.html`, `layout-styles.css`, `404.shtml`).

## Environment Configuration

### Environment Files
- `.env.example` - Template with all available variables
- `.env.production` - Production environment settings
- `.env.staging` - Staging environment settings
- `.env.local` - Local development overrides (not tracked)

### Required Environment Variables (for Contact form via EmailJS)
```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_SITE_URL=https://andreagray.de
VITE_SITE_NAME="Andrea Gray Coaching"
VITE_CONTACT_EMAIL=coaching@andreagray.de
```

### Optional Environment Variables
```bash
VITE_CONTACT_PHONE="+49 176 64022283"
VITE_LINKEDIN_URL=https://linkedin.com/in/profile
VITE_FACEBOOK_URL=https://facebook.com/page
VITE_INSTAGRAM_URL=https://instagram.com/profile
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

## Build Process

### Build Scripts
- `npm run build` - Standard build
- `npm run build:production` - Production build with optimizations
- `npm run build:staging` - Staging build with debugging enabled
- `npm run build:analyze` - Build with bundle analysis
- `npm run build:preview` - Build and preview locally

### Build Optimizations
- **Advanced Minification**: Terser with multi-pass compression and comment removal
- **Enhanced Tree Shaking**: Aggressive dead code elimination with module side-effects optimization
- **Asset Optimization**: Smart asset inlining (4KB threshold) and optimized file naming
- **Code Splitting**: Automatic chunk splitting with CSS code splitting
- **Browser Targeting**: Modern browser optimization (ES2015+, Chrome 58+, Firefox 57+, Safari 11+)
- **Caching**: Long-term caching with content hashes and compressed file size reporting
- **CSS Optimization**: Dedicated CSS minification and code splitting

## Platform Notes

- Netlify/Vercel/GitHub Pages are also supported via scripts, but this project currently uses GoDaddy cPanel static hosting.

### GitHub Pages
1. **Setup**: Ensure git repository is configured
2. **Deploy**: `npm run deploy:github`

**Process**:
- Builds project to `dist/`
- Creates/updates `gh-pages` branch
- Pushes build artifacts

## Deployment Automation

### Automated Deployment Script
```bash
node scripts/build-and-deploy.js [platform] [environment] [--preview]
```

**Examples**:
```bash
# Deploy to Netlify production
node scripts/build-and-deploy.js netlify production

# Deploy to Vercel staging
node scripts/build-and-deploy.js vercel staging

# Deploy preview to Netlify
node scripts/build-and-deploy.js netlify production --preview
```

### Pre-deployment Checks
The automation script runs:
1. Environment validation
2. Dependency checks
3. Linting (`npm run lint`)
4. Type checking (`npm run type-check`)
5. Tests (`npm run test`)
6. Build verification

### Manual Deployment
For manual deployment without pre-checks:
```bash
node scripts/deploy-simple.js
```

## Performance Optimization

### Build Performance
- **Bundle Size**: Highly optimized with multi-pass Terser compression
- **Compression**: Advanced Terser minification with console.log removal in production
- **Tree Shaking**: Enhanced dead code elimination with side-effects optimization
- **Asset Management**: Smart inlining for small assets (4KB threshold)
- **Browser Optimization**: Targeted builds for modern browsers (ES2015+)
- **Caching**: Aggressive caching for static assets with content hashes
- **Loading**: Lazy loading for images and components

### Runtime Performance
- **Core Web Vitals**: Optimized for good scores
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO**: Meta tags and structured data
- **Mobile**: Mobile-first responsive design

## Monitoring and Analytics

### Build Monitoring
- Bundle size tracking
- Build time optimization
- Dependency analysis

### Runtime Monitoring
- Performance metrics (optional)
- Error tracking (console errors)
- User analytics (Google Analytics - optional)

## Troubleshooting

### Common Issues

**Build Failures**:
- Check Node.js version (16+ required)
- Clear cache: `npm run clean`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**Deployment Failures**:
- Verify CLI tools are installed
- Check authentication status
- Validate environment variables

**Performance Issues**:
- Run bundle analysis: `npm run build:analyze`
- Check network tab in browser dev tools
- Verify asset caching headers

### Debug Commands
```bash
# Check build output
npm run build && ls -la dist/

# Test preview server
npm run preview

# Analyze bundle
npm run build:analyze

# Check environment config
node -e "console.log(process.env)" | grep VITE_
```

## Security Considerations

### Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Strict-Transport-Security: 1 year (set in `.htaccess`)
- Content-Security-Policy: baseline self-only policy (adjust if adding external services)

### Environment Variables
- Never commit `.env.local` or production secrets
- Use platform-specific environment variable management
- Validate all environment variables at build time

### Content Security
- All user inputs are validated
- Email forms use secure submission via EmailJS (requires `VITE_*` config)
- No sensitive data in client-side code
- Self-hosted Inter font to avoid third-party font requests (GDPR)

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Monitor build performance
- Review security headers
- Test deployment process

### Updates
- Follow semantic versioning
- Test in staging before production
- Document breaking changes
- Backup before major updates