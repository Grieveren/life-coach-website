import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ContentManager, contentManager } from '../contentManager';
import { Service, Testimonial, BlogPost, SiteConfig } from '../../types';

// Mock data for testing
const mockServices: Service[] = [
  {
    id: 'test-service-1',
    title: 'Test Service 1',
    description: 'Test description',
    features: ['Feature 1', 'Feature 2'],
    category: 'individual',
    availability: true
  },
  {
    id: 'test-service-2',
    title: 'Test Service 2',
    description: 'Test description 2',
    features: ['Feature 3', 'Feature 4'],
    category: 'group',
    availability: false
  }
];

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'Test Client 1',
    content: 'Great service!',
    rating: 5,
    featured: true,
    dateGiven: '2024-01-15T00:00:00.000Z'
  },
  {
    id: '2',
    clientName: 'Test Client 2',
    content: 'Excellent coaching!',
    rating: 4,
    featured: false,
    dateGiven: '2024-01-10T00:00:00.000Z'
  }
];

const mockBlogPosts: BlogPost[] = [
  {
    id: 'test-post-1',
    title: 'Test Post 1',
    excerpt: 'Test excerpt 1',
    content: 'Test content 1',
    publishDate: '2024-01-15T00:00:00.000Z',
    category: 'career-transition',
    status: 'published',
    featured: true,
    tags: ['test', 'career']
  },
  {
    id: 'test-post-2',
    title: 'Test Post 2',
    excerpt: 'Test excerpt 2',
    content: 'Test content 2',
    publishDate: '2024-01-10T00:00:00.000Z',
    category: 'personal-development',
    status: 'draft',
    featured: false,
    tags: ['test', 'development']
  }
];

const mockSiteConfig: SiteConfig = {
  siteName: 'Test Site',
  tagline: 'Test Tagline',
  description: 'Test Description',
  author: {
    name: 'Test Author',
    title: 'Test Title',
    bio: 'Test Bio',
    credentials: ['Test Credential']
  },
  contact: {
    email: 'test@example.com',
    socialMedia: []
  },
  navigation: [
    { id: 'home', label: 'Home', href: '#home' }
  ],
  seo: {
    defaultTitle: 'Test Site',
    titleTemplate: '%s | Test',
    defaultDescription: 'Test Description',
    siteUrl: 'https://test.com'
  }
};

// Mock dynamic imports
vi.mock('../../data/services.json', () => ({
  default: mockServices
}));

vi.mock('../../data/testimonials.json', () => ({
  default: mockTestimonials
}));

vi.mock('../../data/blog-posts.json', () => ({
  default: mockBlogPosts
}));

vi.mock('../../data/site-config.json', () => ({
  default: mockSiteConfig
}));

describe('ContentManager', () => {
  let manager: ContentManager;

  beforeEach(() => {
    manager = ContentManager.getInstance();
    manager.clearCache();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = ContentManager.getInstance();
      const instance2 = ContentManager.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Services Management', () => {
    it('should load services successfully', async () => {
      const services = await manager.loadServices();
      expect(services).toHaveLength(2);
      expect(services[0].id).toBe('test-service-1');
      expect(services[1].id).toBe('test-service-2');
    });

    it('should cache services after first load', async () => {
      const services1 = await manager.loadServices();
      const services2 = await manager.loadServices();
      expect(services1).toBe(services2); // Same reference due to caching
    });

    it('should validate services correctly', () => {
      const validServices = mockServices;
      const result = manager.validateServices(validServices);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid services', () => {
      const invalidServices = [
        { id: '', title: '', description: '', features: 'not-array' } as any
      ];
      const result = manager.validateServices(invalidServices);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should filter services by category', async () => {
      const services = await manager.loadServices();
      const individualServices = manager.filterServicesByCategory(services, 'individual');
      expect(individualServices).toHaveLength(1);
      expect(individualServices[0].category).toBe('individual');
    });

    it('should filter available services', async () => {
      const services = await manager.loadServices();
      const availableServices = manager.getAvailableServices(services);
      expect(availableServices).toHaveLength(1);
      expect(availableServices[0].availability).toBe(true);
    });
  });

  describe('Testimonials Management', () => {
    it('should load testimonials successfully', async () => {
      const testimonials = await manager.loadTestimonials();
      expect(testimonials).toHaveLength(2);
      expect(testimonials[0].id).toBe('1');
      expect(testimonials[0].dateGiven).toBeInstanceOf(Date);
    });

    it('should validate testimonials correctly', () => {
      const validTestimonials = mockTestimonials;
      const result = manager.validateTestimonials(validTestimonials);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid testimonials', () => {
      const invalidTestimonials = [
        { id: '', clientName: '', content: '', rating: 10 } as any
      ];
      const result = manager.validateTestimonials(invalidTestimonials);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should get featured testimonials', async () => {
      const testimonials = await manager.loadTestimonials();
      const featured = manager.getFeaturedTestimonials(testimonials);
      expect(featured).toHaveLength(1);
      expect(featured[0].featured).toBe(true);
    });
  });

  describe('Blog Posts Management', () => {
    it('should load blog posts successfully', async () => {
      const blogPosts = await manager.loadBlogPosts();
      // Should only load published posts
      expect(blogPosts).toHaveLength(1);
      expect(blogPosts[0].status).toBe('published');
      expect(blogPosts[0].publishDate).toBeInstanceOf(Date);
    });

    it('should sort blog posts by publish date (newest first)', async () => {
      const mockPublishedPosts = [
        {
          ...mockBlogPosts[0],
          publishDate: '2024-01-10T00:00:00.000Z',
          status: 'published' as const
        },
        {
          ...mockBlogPosts[1],
          publishDate: '2024-01-15T00:00:00.000Z',
          status: 'published' as const
        }
      ];

      // Mock the import to return published posts
      vi.doMock('../../data/blog-posts.json', () => ({
        default: mockPublishedPosts
      }));

      manager.clearCache();
      const blogPosts = await manager.loadBlogPosts();
      expect(blogPosts[0].publishDate.getTime()).toBeGreaterThan(
        blogPosts[1]?.publishDate.getTime() || 0
      );
    });

    it('should validate blog posts correctly', () => {
      const validBlogPosts = mockBlogPosts;
      const result = manager.validateBlogPosts(validBlogPosts);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid blog posts', () => {
      const invalidBlogPosts = [
        { id: '', title: '', excerpt: '', status: 'invalid' } as any
      ];
      const result = manager.validateBlogPosts(invalidBlogPosts);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should get featured blog posts', async () => {
      const blogPosts = await manager.loadBlogPosts();
      const featured = manager.getFeaturedBlogPosts(blogPosts);
      expect(featured).toHaveLength(1);
      expect(featured[0].featured).toBe(true);
    });

    it('should search blog posts', async () => {
      const blogPosts = await manager.loadBlogPosts();
      const searchResults = manager.searchBlogPosts(blogPosts, 'career');
      expect(searchResults).toHaveLength(1);
      expect(searchResults[0].tags).toContain('career');
    });

    it('should filter blog posts by category', async () => {
      const blogPosts = await manager.loadBlogPosts();
      const categoryPosts = manager.getBlogPostsByCategory(blogPosts, 'career-transition');
      expect(categoryPosts).toHaveLength(1);
      expect(categoryPosts[0].category).toBe('career-transition');
    });
  });

  describe('Site Configuration Management', () => {
    it('should load site config successfully', async () => {
      const siteConfig = await manager.loadSiteConfig();
      expect(siteConfig.siteName).toBe('Test Site');
      expect(siteConfig.author.name).toBe('Test Author');
    });

    it('should validate site config correctly', () => {
      const validSiteConfig = mockSiteConfig;
      const result = manager.validateSiteConfig(validSiteConfig);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid site config', () => {
      const invalidSiteConfig = {
        siteName: '',
        author: { name: '' },
        contact: { email: '' }
      } as any;
      const result = manager.validateSiteConfig(invalidSiteConfig);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should return default config on load failure', async () => {
      // Mock import failure
      vi.doMock('../../data/site-config.json', () => {
        throw new Error('Failed to load');
      });

      manager.clearCache();
      const siteConfig = await manager.loadSiteConfig();
      expect(siteConfig.siteName).toBe('Life Coaching Website');
    });
  });

  describe('Error Handling', () => {
    it('should handle services loading errors gracefully', async () => {
      // Mock import failure
      vi.doMock('../../data/services.json', () => {
        throw new Error('Failed to load services');
      });

      manager.clearCache();
      const services = await manager.loadServices();
      expect(services).toEqual([]);
    });

    it('should handle testimonials loading errors gracefully', async () => {
      // Mock import failure
      vi.doMock('../../data/testimonials.json', () => {
        throw new Error('Failed to load testimonials');
      });

      manager.clearCache();
      const testimonials = await manager.loadTestimonials();
      expect(testimonials).toEqual([]);
    });

    it('should handle blog posts loading errors gracefully', async () => {
      // Mock import failure
      vi.doMock('../../data/blog-posts.json', () => {
        throw new Error('Failed to load blog posts');
      });

      manager.clearCache();
      const blogPosts = await manager.loadBlogPosts();
      expect(blogPosts).toEqual([]);
    });
  });

  describe('Cache Management', () => {
    it('should clear all caches', async () => {
      // Load data to populate caches
      await manager.loadServices();
      await manager.loadTestimonials();
      await manager.loadBlogPosts();
      await manager.loadSiteConfig();

      // Clear caches
      manager.clearCache();

      // Verify caches are cleared by checking if data is reloaded
      const services = await manager.loadServices();
      expect(services).toBeDefined();
    });
  });
});

describe('Convenience Functions', () => {
  beforeEach(() => {
    contentManager.clearCache();
  });

  it('should export convenience functions', async () => {
    const { loadServices, loadTestimonials, loadBlogPosts, loadSiteConfig } = await import('../contentManager');
    
    expect(typeof loadServices).toBe('function');
    expect(typeof loadTestimonials).toBe('function');
    expect(typeof loadBlogPosts).toBe('function');
    expect(typeof loadSiteConfig).toBe('function');
  });

  it('should load services using convenience function', async () => {
    const { loadServices } = await import('../contentManager');
    const services = await loadServices();
    expect(Array.isArray(services)).toBe(true);
  });
});