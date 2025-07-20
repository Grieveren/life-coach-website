import { Service, Testimonial, BlogPost, SiteConfig } from '../types';

// Content validation schemas
export interface ContentValidationResult {
  isValid: boolean;
  errors: string[];
}

// Content loading utilities
export class ContentManager {
  private static instance: ContentManager;
  private servicesCache: Service[] | null = null;
  private testimonialsCache: Testimonial[] | null = null;
  private blogPostsCache: BlogPost[] | null = null;
  private siteConfigCache: SiteConfig | null = null;

  private constructor() {}

  public static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  // Clear all caches
  public clearCache(): void {
    this.servicesCache = null;
    this.testimonialsCache = null;
    this.blogPostsCache = null;
    this.siteConfigCache = null;
  }

  // Services management
  public async loadServices(): Promise<Service[]> {
    if (this.servicesCache) {
      return this.servicesCache;
    }

    try {
      const response = await import('../data/services.json');
      const services = response.default as Service[];
      
      const validationResult = this.validateServices(services);
      if (!validationResult.isValid) {
        console.warn('Services validation warnings:', validationResult.errors);
      }

      this.servicesCache = services;
      return services;
    } catch (error) {
      console.error('Failed to load services:', error);
      return [];
    }
  }

  public validateServices(services: Service[]): ContentValidationResult {
    const errors: string[] = [];

    if (!Array.isArray(services)) {
      errors.push('Services must be an array');
      return { isValid: false, errors };
    }

    services.forEach((service, index) => {
      if (!service.id) {
        errors.push(`Service at index ${index} is missing required field: id`);
      }
      if (!service.title) {
        errors.push(`Service at index ${index} is missing required field: title`);
      }
      if (!service.description) {
        errors.push(`Service at index ${index} is missing required field: description`);
      }
      if (!Array.isArray(service.features)) {
        errors.push(`Service at index ${index} features must be an array`);
      }
      if (service.category && !['individual', 'group', 'workshop', 'package'].includes(service.category)) {
        errors.push(`Service at index ${index} has invalid category: ${service.category}`);
      }
    });

    return { isValid: errors.length === 0, errors };
  }

  // Testimonials management
  public async loadTestimonials(): Promise<Testimonial[]> {
    if (this.testimonialsCache) {
      return this.testimonialsCache;
    }

    try {
      const response = await import('../data/testimonials.json');
      const rawTestimonials = response.default as Array<Omit<Testimonial, 'dateGiven'> & { dateGiven?: string }>;
      
      // Convert date strings to Date objects
      const testimonials: Testimonial[] = rawTestimonials.map(testimonial => ({
        ...testimonial,
        dateGiven: testimonial.dateGiven ? new Date(testimonial.dateGiven) : undefined
      }));
      
      const validationResult = this.validateTestimonials(testimonials);
      if (!validationResult.isValid) {
        console.warn('Testimonials validation warnings:', validationResult.errors);
      }

      this.testimonialsCache = testimonials;
      return testimonials;
    } catch (error) {
      console.error('Failed to load testimonials:', error);
      return [];
    }
  }

  public validateTestimonials(testimonials: Testimonial[]): ContentValidationResult {
    const errors: string[] = [];

    if (!Array.isArray(testimonials)) {
      errors.push('Testimonials must be an array');
      return { isValid: false, errors };
    }

    testimonials.forEach((testimonial, index) => {
      if (!testimonial.id) {
        errors.push(`Testimonial at index ${index} is missing required field: id`);
      }
      if (!testimonial.clientName) {
        errors.push(`Testimonial at index ${index} is missing required field: clientName`);
      }
      if (!testimonial.content) {
        errors.push(`Testimonial at index ${index} is missing required field: content`);
      }
      if (testimonial.rating && (testimonial.rating < 1 || testimonial.rating > 5)) {
        errors.push(`Testimonial at index ${index} has invalid rating: ${testimonial.rating} (must be 1-5)`);
      }
    });

    return { isValid: errors.length === 0, errors };
  }

  // Blog posts management
  public async loadBlogPosts(): Promise<BlogPost[]> {
    if (this.blogPostsCache) {
      return this.blogPostsCache;
    }

    try {
      const response = await import('../data/blog-posts.json');
      const rawBlogPosts = response.default as Array<Omit<BlogPost, 'publishDate'> & { publishDate: string }>;
      
      // Convert date strings to Date objects and filter published posts
      const blogPosts: BlogPost[] = rawBlogPosts
        .map(post => ({
          ...post,
          publishDate: new Date(post.publishDate),
          lastModified: post.lastModified ? new Date(post.lastModified) : undefined
        }))
        .filter(post => post.status === 'published')
        .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
      
      const validationResult = this.validateBlogPosts(blogPosts);
      if (!validationResult.isValid) {
        console.warn('Blog posts validation warnings:', validationResult.errors);
      }

      this.blogPostsCache = blogPosts;
      return blogPosts;
    } catch (error) {
      console.error('Failed to load blog posts:', error);
      return [];
    }
  }

  public validateBlogPosts(blogPosts: BlogPost[]): ContentValidationResult {
    const errors: string[] = [];

    if (!Array.isArray(blogPosts)) {
      errors.push('Blog posts must be an array');
      return { isValid: false, errors };
    }

    blogPosts.forEach((post, index) => {
      if (!post.id) {
        errors.push(`Blog post at index ${index} is missing required field: id`);
      }
      if (!post.title) {
        errors.push(`Blog post at index ${index} is missing required field: title`);
      }
      if (!post.excerpt) {
        errors.push(`Blog post at index ${index} is missing required field: excerpt`);
      }
      if (!post.publishDate) {
        errors.push(`Blog post at index ${index} is missing required field: publishDate`);
      }
      if (!post.category) {
        errors.push(`Blog post at index ${index} is missing required field: category`);
      }
      if (post.status && !['draft', 'published', 'archived'].includes(post.status)) {
        errors.push(`Blog post at index ${index} has invalid status: ${post.status}`);
      }
    });

    return { isValid: errors.length === 0, errors };
  }

  // Site configuration management
  public async loadSiteConfig(): Promise<SiteConfig> {
    if (this.siteConfigCache) {
      return this.siteConfigCache;
    }

    try {
      const response = await import('../data/site-config.json');
      const siteConfig = response.default as SiteConfig;
      
      const validationResult = this.validateSiteConfig(siteConfig);
      if (!validationResult.isValid) {
        console.warn('Site config validation warnings:', validationResult.errors);
      }

      this.siteConfigCache = siteConfig;
      return siteConfig;
    } catch (error) {
      console.error('Failed to load site config:', error);
      // Return default config if loading fails
      return this.getDefaultSiteConfig();
    }
  }

  public validateSiteConfig(siteConfig: SiteConfig): ContentValidationResult {
    const errors: string[] = [];

    if (!siteConfig.siteName) {
      errors.push('Site config is missing required field: siteName');
    }
    if (!siteConfig.author?.name) {
      errors.push('Site config is missing required field: author.name');
    }
    if (!siteConfig.contact?.email) {
      errors.push('Site config is missing required field: contact.email');
    }
    if (!Array.isArray(siteConfig.navigation)) {
      errors.push('Site config navigation must be an array');
    }

    return { isValid: errors.length === 0, errors };
  }

  private getDefaultSiteConfig(): SiteConfig {
    return {
      siteName: 'Life Coaching Website',
      tagline: 'Professional Life Coaching Services',
      description: 'Transform your life with professional coaching services.',
      author: {
        name: 'Life Coach',
        title: 'Certified Life Coach',
        bio: 'Professional life coach helping clients achieve their goals.',
        credentials: []
      },
      contact: {
        email: 'hello@lifecoach.com',
        socialMedia: []
      },
      navigation: [
        { id: 'home', label: 'Home', href: '#hero' },
        { id: 'about', label: 'About', href: '#about' },
        { id: 'services', label: 'Services', href: '#services' },
        { id: 'contact', label: 'Contact', href: '#contact' }
      ],
      seo: {
        defaultTitle: 'Life Coaching Website',
        titleTemplate: '%s | Life Coaching',
        defaultDescription: 'Professional life coaching services.',
        siteUrl: 'https://lifecoach.com'
      }
    };
  }

  // Utility methods for filtering and searching
  public filterServicesByCategory(services: Service[], category: string): Service[] {
    return services.filter(service => service.category === category);
  }

  public getAvailableServices(services: Service[]): Service[] {
    return services.filter(service => service.availability !== false);
  }

  public getFeaturedTestimonials(testimonials: Testimonial[]): Testimonial[] {
    return testimonials.filter(testimonial => testimonial.featured === true);
  }

  public getFeaturedBlogPosts(blogPosts: BlogPost[]): BlogPost[] {
    return blogPosts.filter(post => post.featured === true);
  }

  public searchBlogPosts(blogPosts: BlogPost[], query: string): BlogPost[] {
    const lowercaseQuery = query.toLowerCase();
    return blogPosts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  public getBlogPostsByCategory(blogPosts: BlogPost[], category: string): BlogPost[] {
    return blogPosts.filter(post => post.category === category);
  }
}

// Export singleton instance
export const contentManager = ContentManager.getInstance();

// Export convenience functions
export const loadServices = () => contentManager.loadServices();
export const loadTestimonials = () => contentManager.loadTestimonials();
export const loadBlogPosts = () => contentManager.loadBlogPosts();
export const loadSiteConfig = () => contentManager.loadSiteConfig();