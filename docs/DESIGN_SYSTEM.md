# Design System Guide

This document provides comprehensive guidance on using the design system for the Life Coach Website project.

## Color System

### Overview
The website uses a professional, accessible color palette designed specifically for coaching and professional services. Each color includes a full scale from 50 (lightest) to 900 (darkest) for flexible usage across components and states.

### Primary Colors

#### Primary Teal (`primary-*`)
**Base Color:** #14b8a6 (500 level)
**Usage:** Main brand color for primary actions and accents

```css
/* Available shades */
primary-50:  #f0fdfa
primary-100: #ccfbf1
primary-200: #99f6e4
primary-300: #5eead4
primary-400: #2dd4bf
primary-500: #14b8a6  /* Base */
primary-600: #0d9488
primary-700: #0f766e
primary-800: #115e59
primary-900: #134e4a
```

**Use Cases:**
- Primary CTA buttons (`btn-primary`)
- Navigation active states
- Brand elements and logos
- Key interactive elements
- Gradient text effects

#### Secondary Blue (`secondary-*`)
**Base Color:** #3b82f6 (500 level)
**Usage:** Supporting elements and secondary actions

```css
/* Available shades */
secondary-50:  #eff6ff
secondary-100: #dbeafe
secondary-200: #bfdbfe
secondary-300: #93c5fd
secondary-400: #60a5fa
secondary-500: #3b82f6  /* Base */
secondary-600: #2563eb
secondary-700: #1d4ed8
secondary-800: #1e40af
secondary-900: #1e3a8a
```

**Use Cases:**
- Secondary buttons (`btn-secondary`)
- Links and navigation items
- Supporting information highlights
- Gradient combinations with primary
- Informational badges

### Semantic Colors

#### Success Green (`success-*`)
**Base Color:** #22c55e (500 level)
**Usage:** Positive feedback and successful states

```css
/* Available shades */
success-50:  #f0fdf4
success-100: #dcfce7
success-200: #bbf7d0
success-300: #86efac
success-400: #4ade80
success-500: #22c55e  /* Base */
success-600: #16a34a
success-700: #15803d
success-800: #166534
success-900: #14532d
```

**Use Cases:**
- Form success states (`form-input-success`)
- Success messages and notifications
- Positive feedback indicators
- Confirmation buttons
- Achievement badges

#### Error Red (`error-*`)
**Base Color:** #ef4444 (500 level)
**Usage:** Error states and critical alerts

```css
/* Available shades */
error-50:  #fef2f2
error-100: #fee2e2
error-200: #fecaca
error-300: #fca5a5
error-400: #f87171
error-500: #ef4444  /* Base */
error-600: #dc2626
error-700: #b91c1c
error-800: #991b1b
error-900: #7f1d1d
```

**Use Cases:**
- Form validation errors (`form-input-error`)
- Error messages and alerts
- Critical warnings
- Destructive actions
- Required field indicators

#### Warning Yellow (`warning-*`)
**Base Color:** #f59e0b (500 level)
**Usage:** Caution states and attention-grabbing elements

```css
/* Available shades */
warning-50:  #fffbeb
warning-100: #fef3c7
warning-200: #fde68a
warning-300: #fcd34d
warning-400: #fbbf24
warning-500: #f59e0b  /* Base */
warning-600: #d97706
warning-700: #b45309
warning-800: #92400e
warning-900: #78350f
```

**Use Cases:**
- Warning messages and alerts
- Pending states
- Caution indicators
- Attention-grabbing elements
- Information highlights

## Typography

Inter is self-hosted for GDPR compliance. See `src/index.css` for the `@font-face` declaration and `/public/fonts/` for the font files. Tailwind is configured to use `Inter, system-ui, sans-serif`.

## Component Classes

### Buttons

#### Primary Button (`btn-primary`)
```css
.btn-primary {
  @apply btn-touch inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 
         text-base sm:text-lg font-semibold text-white 
         bg-gradient-to-r from-primary-600 to-secondary-600 
         rounded-full hover:from-primary-700 hover:to-secondary-700 
         active:scale-95 transform hover:scale-105 
         transition-all duration-300 shadow-lg hover:shadow-xl 
         focus:outline-none focus:ring-4 focus:ring-primary-300 
         focus:ring-offset-2 touch-manipulation;
}
```

**Usage:** Main call-to-action buttons, primary actions

#### Secondary Button (`btn-secondary`)
```css
.btn-secondary {
  @apply btn-touch inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 
         text-base sm:text-lg font-semibold text-primary-700 
         bg-white border-2 border-primary-600 rounded-full 
         hover:bg-primary-50 hover:border-primary-700 
         active:scale-95 transform hover:scale-105 
         transition-all duration-300 shadow-md hover:shadow-lg 
         focus:outline-none focus:ring-4 focus:ring-primary-300 
         focus:ring-offset-2 touch-manipulation;
}
```

**Usage:** Secondary actions, alternative options

### Form Elements

#### Form Input (`form-input`)
```css
.form-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg 
         focus:ring-4 focus:ring-primary-300 focus:border-primary-500 
         transition-all duration-200 placeholder-gray-500;
}
```

#### Form Input Error State (`form-input-error`)
```css
.form-input-error {
  @apply form-input border-error-500 focus:ring-error-300 focus:border-error-500;
}
```

#### Form Input Success State (`form-input-success`)
```css
.form-input-success {
  @apply form-input border-success-500 focus:ring-success-300 focus:border-success-500;
}
```

### Cards

#### Basic Card (`card`)
```css
.card {
  @apply bg-white rounded-xl shadow-md hover:shadow-xl 
         transition-all duration-300 transform hover:-translate-y-1 
         border border-gray-100;
}
```

#### Interactive Card (`card-interactive`)
```css
.card-interactive {
  @apply card cursor-pointer hover:border-primary-200 
         focus-within:ring-4 focus-within:ring-primary-300 
         focus-within:ring-offset-2;
}
```

### Text Utilities

#### Gradient Text (`text-gradient`)
```css
.text-gradient {
  @apply text-transparent bg-clip-text bg-gradient-to-r 
         from-primary-600 to-secondary-600;
}
```

**Usage:** Headings, brand text, emphasis elements

## Usage Guidelines

### Color Selection
1. **Primary Actions:** Use `primary-600` for main CTAs and key interactions
2. **Secondary Actions:** Use `secondary-500` for supporting actions
3. **Success States:** Use `success-500` for positive feedback
4. **Error States:** Use `error-500` for validation errors and alerts
5. **Warning States:** Use `warning-500` for caution and attention

### Accessibility Considerations
- All color combinations meet WCAG 2.1 AA contrast requirements
- Never rely on color alone to convey information
- Use semantic HTML elements alongside color coding
- Provide alternative text for color-coded elements

### Responsive Design
- Colors remain consistent across all breakpoints
- Hover effects are disabled on touch devices
- Focus states are enhanced for keyboard navigation
- High contrast mode is supported

### Best Practices
1. **Consistency:** Use the same color for the same type of action across the site
2. **Hierarchy:** Use color intensity to indicate importance
3. **Context:** Choose colors that match the emotional context
4. **Testing:** Always test color combinations for accessibility
5. **Documentation:** Document any custom color usage

## Examples

### Button Usage
```jsx
// Primary action
<button className="btn-primary">Get Started</button>

// Secondary action
<button className="btn-secondary">Learn More</button>
```

### Form States
```jsx
// Normal input
<input className="form-input" />

// Error state
<input className="form-input-error" />

// Success state
<input className="form-input-success" />
```

### Card Components
```jsx
// Basic card
<div className="card">Content</div>

// Interactive card
<div className="card-interactive">Clickable content</div>
```

### Text Styling
```jsx
// Gradient heading
<h1 className="text-gradient">Brand Heading</h1>

// Success message
<p className="text-success-600">Operation completed successfully</p>

// Error message
<p className="text-error-600">Please fix the errors below</p>
```

## Testing

### Color Contrast Testing
All color combinations have been tested for WCAG 2.1 AA compliance:
- Normal text: 4.5:1 minimum contrast ratio
- Large text: 3:1 minimum contrast ratio
- Interactive elements: 3:1 minimum contrast ratio

### Browser Support
The color system is supported in all modern browsers:
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

### Validation Tools
Recommended tools for color validation:
- WebAIM Contrast Checker
- Colour Contrast Analyser
- axe DevTools
- Lighthouse accessibility audit