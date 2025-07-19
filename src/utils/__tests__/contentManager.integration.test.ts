import { describe, it, expect } from 'vitest';
import { loadServices, loadTestimonials, loadBlogPosts, loadSiteConfig } from '../contentManager';

describe('Content Manager Integration Tests', () => {
  it('should load services from JSON file', async () => {
    const services = await loadServices();
    
    expect(services).toBeDefined();
    expect(Array.isArray(services)).toBe(true);
    expect(services.length).toBeGreaterThan(0);
    
    // Check first service structure
    const firstService = services[0];
    expect(firstService).toHaveProperty('id');
    expect(firstService).toHaveProperty('title');
    expect(firstService).toHaveProperty('description');
    expect(firstService).toHaveProperty('features');
    expect(Array.isArray(firstService.features)).toBe(true);
  });

  it('should load testimonials from JSON file', async () => {
    const testimonials = await loadTestimonials();
    
    expect(testimonials).toBeDefined();
    expect(Array.isArray(testimonials)).toBe(true);
    expect(testimonials.length).toBeGreaterThan(0);
    
    // Check first testimonial structure
    const firstTestimonial = testimonials[0];
    expect(firstTestimonial).toHaveProperty('id');
    expect(firstTestimonial).toHaveProperty('clientName');
    expect(firstTestimonial).toHaveProperty('content');
    expect(firstTestimonial.dateGiven).toBeInstanceOf(Date);
  });

  it('should load blog posts from JSON file', async () => {
    const blogPosts = await loadBlogPosts();
    
    expect(blogPosts).toBeDefined();
    expect(Array.isArray(blogPosts)).toBe(true);
    expect(blogPosts.length).toBeGreaterThan(0);
    
    // Check first blog post structure
    const firstPost = blogPosts[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('excerpt');
    expect(firstPost.publishDate).toBeInstanceOf(Date);
    expect(firstPost.status).toBe('published');
  });

  it('should load site config from JSON file', async () => {
    const siteConfig = await loadSiteConfig();
    
    expect(siteConfig).toBeDefined();
    expect(siteConfig).toHaveProperty('siteName');
    expect(siteConfig).toHaveProperty('author');
    expect(siteConfig).toHaveProperty('contact');
    expect(siteConfig).toHaveProperty('navigation');
    expect(Array.isArray(siteConfig.navigation)).toBe(true);
  });

  it('should validate content structure', async () => {
    const [services, testimonials, blogPosts, siteConfig] = await Promise.all([
      loadServices(),
      loadTestimonials(),
      loadBlogPosts(),
      loadSiteConfig()
    ]);

    // Validate services
    services.forEach(service => {
      expect(service.id).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.features.length).toBeGreaterThan(0);
    });

    // Validate testimonials
    testimonials.forEach(testimonial => {
      expect(testimonial.id).toBeTruthy();
      expect(testimonial.clientName).toBeTruthy();
      expect(testimonial.content).toBeTruthy();
      if (testimonial.rating) {
        expect(testimonial.rating).toBeGreaterThanOrEqual(1);
        expect(testimonial.rating).toBeLessThanOrEqual(5);
      }
    });

    // Validate blog posts
    blogPosts.forEach(post => {
      expect(post.id).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.publishDate).toBeInstanceOf(Date);
      expect(post.status).toBe('published');
    });

    // Validate site config
    expect(siteConfig.siteName).toBeTruthy();
    expect(siteConfig.author.name).toBeTruthy();
    expect(siteConfig.contact.email).toBeTruthy();
  });
});