// Contact form interface with validation types
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
  serviceInterest?: string;
}

// Validation error types for contact form
export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  serviceInterest?: string;
}

// Contact form validation rules
export interface ContactFormValidation {
  name: {
    required: boolean;
    minLength: number;
    maxLength: number;
  };
  email: {
    required: boolean;
    pattern: RegExp;
  };
  phone: {
    required: boolean;
    pattern?: RegExp;
  };
  message: {
    required: boolean;
    minLength: number;
    maxLength: number;
  };
  serviceInterest: {
    required: boolean;
  };
}

// Service interface for coaching offerings
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  duration?: string;
  price?: string;
  category?: 'individual' | 'group' | 'workshop' | 'package';
  availability?: boolean;
  callToAction?: string;
  targetAudience?: string;
}

// Service category type for filtering and organization
export type ServiceCategory = 'individual' | 'group' | 'workshop' | 'package';

// Service pricing structure
export interface ServicePricing {
  amount: number;
  currency: string;
  period?: 'session' | 'month' | 'package';
  discount?: {
    percentage: number;
    validUntil?: Date;
  };
}

// Testimonial interface for client feedback
export interface Testimonial {
  id: string;
  clientName: string;
  content: string;
  outcome?: string;
  clientPhoto?: string;
  rating?: number; // 1-5 star rating
  serviceUsed?: string;
  dateGiven?: Date;
  featured?: boolean;
  clientTitle?: string; // Professional title or role
  location?: string; // City/State for credibility
  beforeAfter?: {
    before: string;
    after: string;
  };
}

// Testimonial display options
export interface TestimonialDisplayOptions {
  showPhoto: boolean;
  showRating: boolean;
  showDate: boolean;
  showService: boolean;
  maxLength?: number;
}

// BlogPost interface for content management
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: Date;
  category: string;
  featured?: boolean;
  author?: string;
  tags?: string[];
  readTime?: number; // estimated read time in minutes
  status?: 'draft' | 'published' | 'archived';
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
  lastModified?: Date;
}

// Blog category types
export type BlogCategory = 
  | 'career-transition'
  | 'work-life-balance'
  | 'personal-development'
  | 'success-stories'
  | 'tips-advice'
  | 'industry-insights';

// Blog post status for content management
export type BlogPostStatus = 'draft' | 'published' | 'archived';

// Blog post metadata for SEO and social sharing
export interface BlogPostMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}
// Form submission states
export interface FormSubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
  successMessage?: string;
}

// Generic API response interface
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation menu item interface
export interface NavMenuItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

// Social media link interface
export interface SocialMediaLink {
  platform: 'linkedin' | 'facebook' | 'instagram' | 'twitter' | 'youtube';
  url: string;
  label: string;
}

// Contact information interface
export interface ContactInfo {
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  socialMedia?: SocialMediaLink[];
  businessHours?: {
    [key: string]: string; // day of week to hours string
  };
}

// Site configuration interface for easy content management
export interface SiteConfig {
  siteName: string;
  tagline: string;
  description: string;
  author: {
    name: string;
    title: string;
    bio: string;
    photo?: string;
    credentials?: string[];
  };
  contact: ContactInfo;
  navigation: NavMenuItem[];
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    siteUrl: string;
    ogImage?: string;
  };
}