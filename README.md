# Life Coach Website

A modern, responsive React website for a professional life coach, built with TypeScript, Vite, and Tailwind CSS. The site features a clean design focused on career transition coaching and professional development services.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with custom breakpoints and touch-optimized interactions
- **Modern React**: Built with React 18 and TypeScript for type safety
- **Component Architecture**: Modular, reusable components with comprehensive testing
- **Performance Optimization**: Lazy loading utilities, image optimization, and performance monitoring
- **Blog System**: Dynamic blog section with featured articles and categories
- **Professional Sections**: Hero, About, Services, Testimonials, and Blog sections
- **Form Integration**: Contact forms with React Hook Form and EmailJS integration
- **Testing Suite**: Comprehensive unit tests with Vitest and Testing Library, including responsive behavior tests
- **Development Tools**: ESLint, Prettier, and modern development workflow

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Forms**: React Hook Form
- **Email**: EmailJS Browser
- **Testing**: Vitest, Testing Library, jsdom
- **Code Quality**: ESLint, Prettier
- **Build Tool**: Vite with advanced optimization and Terser compression

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Header.tsx           # Navigation header with responsive menu
│   │   ├── Footer.tsx           # Footer with business info and social links
│   │   ├── ErrorBoundary.tsx    # Error boundary for graceful error handling
│   │   ├── Loading.tsx          # Loading component for async operations
│   │   └── __tests__/           # Component tests for common components
│   └── sections/
│       ├── About.tsx            # About section with bio and credentials
│       ├── Blog.tsx             # Blog section with articles and newsletter
│       ├── BlogCard.tsx         # Individual blog post card component
│       ├── Hero.tsx             # Hero section with CTA
│       ├── ServiceCard.tsx      # Individual service card component
│       ├── Services.tsx         # Services section with offerings
│       ├── TestimonialCard.tsx  # Individual testimonial component
│       ├── Testimonials.tsx     # Client testimonials section
│       └── __tests__/           # Component tests
├── types/
│   └── index.ts                 # TypeScript interfaces and types
├── assets/
│   └── images/                  # Image assets
├── utils/
│   ├── lazyLoading.ts           # Lazy loading utilities and performance optimization
│   ├── performance.ts           # Performance monitoring and optimization utilities
│   ├── responsive.ts            # Responsive design utilities and breakpoint detection
│   └── __tests__/               # Utility function tests
├── test/
│   └── setup.ts                 # Test configuration
├── App.tsx                      # Main application component
├── main.tsx                     # Application entry point
└── index.css                    # Global styles and Tailwind imports
```

## 🎨 Design System

### Color Palette
The website uses a professional, accessible color system designed for coaching and professional services:

- **Primary Teal** (`primary-*`): Used for main CTAs, navigation highlights, and brand elements
- **Secondary Blue** (`secondary-*`): Supporting buttons, links, and secondary actions  
- **Success Green** (`success-*`): Form success states, positive feedback, and confirmations
- **Error Red** (`error-*`): Form validation errors, error messages, and critical alerts
- **Warning Yellow** (`warning-*`): Caution states, pending actions, and attention-grabbing elements

Each color includes a full scale from 50 (lightest) to 900 (darkest) for flexible usage across components and states.

### Usage Guidelines
- Use `primary-600` for main action buttons and key interactive elements
- Apply `secondary-500` for supporting actions and informational elements
- Implement `success-500` for positive feedback and successful form submissions
- Use `error-500` for form validation errors and critical messaging
- Apply `warning-500` for cautionary states and pending actions

## 🎨 Components Overview

### Core Sections
- **Header**: Responsive navigation with mobile menu and dynamic smooth scrolling with section-specific header offsets (40px default, 10px for home/about sections, 20px for contact)
- **Hero**: Professional introduction with call-to-action and consistent scroll behavior aligned with Header component
- **About**: Personal story, credentials, and professional background
- **Services**: Coaching offerings with detailed service cards
- **Testimonials**: Client success stories and feedback
- **Blog**: Career insights, resources, and newsletter signup

- **Contact**: Professional contact form with validation and EmailJS integration
  - Real-time form validation with React Hook Form
  - Comprehensive field validation (name, email, phone, message)
  - Service interest selection dropdown
  - Loading states and success/error feedback
  - Professional contact information display
  - Responsive two-column layout
  - Extensive test coverage including form validation, submission workflows, error handling, and accessibility
- **Footer**: Comprehensive footer with business information and social links
  - Professional credentials and certifications display
  - Contact information with clickable email and phone links
  - Social media integration with custom SVG icons (LinkedIn, Facebook, Instagram, Twitter)
  - Business hours and location information
  - Legal links and copyright information
  - Responsive multi-column layout (1 column mobile, 2 columns tablet, 4 columns desktop)


### Blog System
- **Featured Articles**: Highlighted blog posts with enhanced styling
- **Category System**: Organized content by career topics
- **Newsletter Integration**: Email subscription for career tips
- **Responsive Grid**: Adaptive layouts for different screen sizes
- **Placeholder Images**: Uses Picsum Photos for development/demo purposes

### Blog Categories
- Career Transition
- Work-Life Balance
- Personal Development
- Success Stories
- Tips & Advice
- Industry Insights

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd life-coach-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🧪 Testing

The project includes comprehensive unit and integration tests using Vitest and Testing Library. Tests cover:

- Component rendering and structure
- User interactions and event handling
- Props validation and edge cases
- Form validation and submission workflows
- Error boundary functionality and fallback UI
- Accessibility and semantic HTML
- Responsive behavior across breakpoints
- EmailJS integration and error handling
- Loading states and user feedback
- **Content Management Integration**: Full integration tests for JSON-based content loading and validation

### Test Coverage Highlights

**Contact Component Testing**:
- Form rendering and accessibility validation
- Real-time field validation (name, email, phone, message)
- Form submission workflows with EmailJS integration
- Loading states and user feedback during submission
- Error handling for network issues, timeouts, and generic errors
- Success/error message display with proper styling
- Form reset behavior after successful submission
- Service interest dropdown functionality
- CSS class application for validation states
- Proper ARIA attributes and semantic HTML

**Responsive Design Testing**:
- Breakpoint detection utilities
- Device type identification (mobile, tablet, desktop)
- Touch device detection
- Component responsive behavior across screen sizes
- Touch-friendly interaction validation

**Content Management Integration Testing**:
- JSON content file loading and parsing
- Data structure validation for services, testimonials, blog posts, and site config
- Content integrity checks and error handling
- Asynchronous content loading workflows
- Type safety validation for all content models

Run tests with:
```bash
npm run test        # Run once
npm run test:watch  # Watch mode
```

## 🎯 Development Status

The project follows a structured implementation plan with the following completed features:

✅ **Completed**:
- Project setup and development environment
- Core TypeScript interfaces and data models
- Responsive header and navigation
- Hero section with professional presentation
- About section for credibility building
- Services section with detailed offerings
- Testimonials section for social proof
- Blog section for content marketing

✅ **Completed**:
- Contact form with validation and email integration
- Footer with additional information and links
- Error handling and loading states with ErrorBoundary component
- Comprehensive test suite for Contact component with form validation, submission handling, and error scenarios
- Mobile optimization enhancements

📋 **Planned**:
- SEO optimization and performance enhancements
- Content management system
- Final styling and design system
- Build process and deployment configuration

## 🖼️ Image Assets

The project currently uses placeholder images from [Picsum Photos](https://picsum.photos/) for development and demonstration purposes. In production, these should be replaced with:

- Professional headshots
- Service-related imagery
- Blog post featured images
- Testimonial photos (with permission)

## 📚 Documentation

- **[Design System Guide](docs/DESIGN_SYSTEM.md)** - Comprehensive color palette, component classes, and usage guidelines
- **[Content Management](docs/CONTENT_MANAGEMENT.md)** - JSON-based content management system documentation

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- **Extended Breakpoints**: Custom `xs` breakpoint (475px) plus standard responsive breakpoints
- **Professional Color System**: 
  - **Primary Teal** (`primary`): Main brand color for actions and accents (#14b8a6)
  - **Secondary Blue** (`secondary`): Supporting elements and highlights (#3b82f6)
  - **Success Green** (`success`): Positive feedback and confirmations (#22c55e)
  - **Error Red** (`error`): Error states and warnings (#ef4444)
  - **Warning Yellow** (`warning`): Caution and attention states (#f59e0b)
- **Custom Typography**: Extended font sizes with optimized line heights
- **Custom Spacing**: Additional spacing utilities (18, 88) and `screen-small` min-height
- **Inter Font Family**: Professional typography with system fallbacks

### Vite Build Configuration
Advanced build optimization with:
- **Multi-pass Terser compression** with console.log removal in production
- **Enhanced tree shaking** with module side-effects optimization
- **Smart asset management** with 4KB inlining threshold
- **Modern browser targeting** (ES2015+, Chrome 58+, Firefox 57+, Safari 11+)
- **CSS code splitting** and dedicated minification
- **Compressed file size reporting** for build analysis

### TypeScript
Strict TypeScript configuration with:
- Type checking for all components
- Interface definitions for data models
- Proper typing for props and state

### Testing
Vitest configuration with:
- jsdom environment for DOM testing
- Testing Library utilities
- Custom test setup and matchers

## ⚡ Performance & Build Optimization

The project features advanced build optimizations for production:

### Build Features
- **Multi-pass Terser compression** removes console.log statements and comments in production
- **Enhanced tree shaking** eliminates dead code with module side-effects optimization
- **Smart asset inlining** for files under 4KB to reduce HTTP requests
- **Modern browser targeting** (ES2015+) for optimal code generation
- **CSS code splitting** and dedicated minification for faster loading
- **Compressed file size reporting** for build analysis and optimization

### Performance Benefits
- Significantly reduced bundle sizes through aggressive optimization
- Faster loading times with optimized asset management
- Better caching with content-based file hashing
- Improved runtime performance with modern JavaScript targeting

## 🚀 Deployment

The project is configured for static site deployment and can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Build the project for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🤝 Contributing

1. Follow the existing code style and conventions
2. Write tests for new components and features
3. Use TypeScript for type safety
4. Follow the component structure patterns
5. Update documentation for significant changes

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS