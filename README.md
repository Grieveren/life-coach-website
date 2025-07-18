# Life Coach Website

A modern, responsive React website for a professional life coach, built with TypeScript, Vite, and Tailwind CSS. The site features a clean design focused on career transition coaching and professional development services.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern React**: Built with React 18 and TypeScript for type safety
- **Component Architecture**: Modular, reusable components with comprehensive testing
- **Blog System**: Dynamic blog section with featured articles and categories
- **Professional Sections**: Hero, About, Services, Testimonials, and Blog sections
- **Form Integration**: Contact forms with React Hook Form and EmailJS integration
- **Testing Suite**: Comprehensive unit tests with Vitest and Testing Library
- **Development Tools**: ESLint, Prettier, and modern development workflow

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Forms**: React Hook Form
- **Email**: EmailJS Browser
- **Testing**: Vitest, Testing Library, jsdom
- **Code Quality**: ESLint, Prettier
- **Build Tool**: Vite with TypeScript support

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Header.tsx           # Navigation header with responsive menu
│   │   ├── Footer.tsx           # Footer with business info and social links
│   │   └── __tests__/           # Header and Footer component tests
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
├── utils/                       # Utility functions
├── test/
│   └── setup.ts                 # Test configuration
├── App.tsx                      # Main application component
├── main.tsx                     # Application entry point
└── index.css                    # Global styles and Tailwind imports
```

## 🎨 Components Overview

### Core Sections
- **Header**: Responsive navigation with mobile menu and dynamic smooth scrolling with section-specific header offsets (40px default, 10px for home/about sections, 30px for contact)
- **Hero**: Professional introduction with call-to-action
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

The project includes comprehensive unit tests for all components using Vitest and Testing Library. Tests cover:

- Component rendering and structure
- User interactions and event handling
- Props validation and edge cases
- Accessibility and semantic HTML
- Responsive behavior

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

🚧 **In Progress**:
- Error handling and loading states
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

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Extended color palette for brand consistency
- Custom spacing and typography scales
- Responsive breakpoints optimized for the design

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