import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import Blog from '../Blog';
import { loadBlogPosts } from '../../../utils/contentManager';

// Mock loadBlogPosts function
vi.mock('../../../utils/contentManager', () => ({
  loadBlogPosts: vi.fn()
}));

// Mock console.log to test button clicks
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});

// Test data for blog posts
const mockBlogPosts = [
  {
    id: '1',
    title: 'Starting Fresh: Your Career Comeback Guide',
    excerpt: 'Learn how to navigate the challenges and opportunities of returning to work after a career break.',
    content: 'Full content here...',
    publishDate: new Date('2024-01-15'),
    category: 'Career Transition',
    featured: true,
    author: 'Sarah Mitchell',
    tags: ['career-break', 'return-to-work', 'planning'],
    readTime: 8,
    status: 'published'
  },
  {
    id: '2',
    title: 'Building Confidence for Your Return',
    excerpt: 'Practical strategies to rebuild professional confidence and overcome imposter syndrome.',
    content: 'Full content here...',
    publishDate: new Date('2024-01-10'),
    category: 'Personal Development',
    featured: false,
    author: 'Sarah Mitchell',
    tags: ['confidence', 'mindset', 'self-esteem'],
    readTime: 6,
    status: 'published'
  },
  {
    id: '3',
    title: 'Networking After a Career Break',
    excerpt: 'How to rebuild and expand your professional network when returning to work.',
    content: 'Full content here...',
    publishDate: new Date('2024-01-05'),
    category: 'Career Transition',
    featured: false,
    author: 'Sarah Mitchell',
    tags: ['networking', 'connections', 'linkedin'],
    readTime: 7,
    status: 'published'
  },
  {
    id: '4',
    title: 'Success Story: From Stay-at-Home Mom to Tech Leader',
    excerpt: 'Inspiring journey of career transformation and professional growth.',
    content: 'Full content here...',
    publishDate: new Date('2024-01-01'),
    category: 'Success Stories',
    featured: true,
    author: 'Sarah Mitchell',
    tags: ['success-story', 'inspiration', 'tech-career'],
    readTime: 10,
    status: 'published'
  }
];

describe('Blog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set default mock implementation
    (loadBlogPosts as any).mockResolvedValue(mockBlogPosts);
  });

  afterEach(() => {
    mockConsoleLog.mockClear();
  });

  it('renders blog section with correct structure', async () => {
    render(<Blog />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByTestId('blog-section')).toBeInTheDocument();
    expect(screen.getByTestId('blog-title')).toHaveTextContent('Career Insights & Resources');
    expect(screen.getByTestId('blog-subtitle')).toBeInTheDocument();
  });

  it('renders section header with correct content', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    const title = screen.getByTestId('blog-title');
    expect(title).toHaveTextContent('Career Insights & Resources');
    
    const subtitle = screen.getByTestId('blog-subtitle');
    expect(subtitle).toHaveTextContent(/Explore practical advice, success stories, and expert insights/);
  });

  it('renders featured articles section', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByTestId('featured-articles-title')).toHaveTextContent('Featured Articles');
    expect(screen.getByTestId('featured-articles-grid')).toBeInTheDocument();
  });

  it('renders recent articles section', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByTestId('recent-articles-title')).toHaveTextContent('Recent Articles');
    expect(screen.getByTestId('recent-articles-grid')).toBeInTheDocument();
  });

  it('renders featured blog posts correctly', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    // Should have at least one featured article
    const featuredGrid = screen.getByTestId('featured-articles-grid');
    expect(featuredGrid).toBeInTheDocument();
    
    // Check for featured badge on featured posts
    const featuredBadges = screen.getAllByTestId('blog-featured-badge');
    expect(featuredBadges).toHaveLength(2); // We have 2 featured posts in mock data
  });

  it('renders regular blog posts correctly', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    const recentGrid = screen.getByTestId('recent-articles-grid');
    expect(recentGrid).toBeInTheDocument();
    
    // Should have all blog cards (featured + regular)
    const blogCards = screen.getAllByTestId('blog-card');
    expect(blogCards).toHaveLength(4); // Total blog posts in mock data
  });

  it('displays blog posts with correct categories', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    // Check for different category types
    const categories = screen.getAllByTestId('blog-category');
    expect(categories).toHaveLength(4); // One category per post
    
    // Should have various categories represented
    const categoryTexts = categories.map(cat => cat.textContent);
    expect(categoryTexts).toContain('Career Transition');
    expect(categoryTexts).toContain('Personal Development');
    expect(categoryTexts).toContain('Success Stories');
  });

  it('displays blog posts with correct metadata', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    // Check for author information
    const authors = screen.getAllByTestId('blog-author');
    expect(authors).toHaveLength(4);
    expect(authors[0]).toHaveTextContent(/By Sarah Mitchell/);
    
    // Check for publish dates
    const dates = screen.getAllByTestId('blog-date');
    expect(dates).toHaveLength(4);
    
    // Check for read times
    const readTimes = screen.getAllByTestId('blog-read-time');
    expect(readTimes).toHaveLength(4);
    expect(readTimes[0]).toHaveTextContent('8 min read');
  });

  it('renders newsletter signup section', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Stay Updated with Career Tips')).toBeInTheDocument();
    expect(screen.getByText(/Get weekly career insights/)).toBeInTheDocument();
    expect(screen.getByTestId('newsletter-email-input')).toBeInTheDocument();
    expect(screen.getByTestId('newsletter-subscribe-button')).toBeInTheDocument();
  });

  it('handles newsletter subscription button click', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    const subscribeButton = screen.getByTestId('newsletter-subscribe-button');
    fireEvent.click(subscribeButton);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Newsletter subscription');
  });

  it('renders newsletter email input with correct attributes', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    const emailInput = screen.getByTestId('newsletter-email-input');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'Enter your email address');
  });

  it('applies custom className when provided', async () => {
    render(<Blog className="custom-blog-class" />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    const section = screen.getByTestId('blog-section');
    expect(section).toHaveClass('custom-blog-class');
  });

  it('has correct section id for navigation', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    const section = screen.getByTestId('blog-section');
    expect(section).toHaveAttribute('id', 'blog');
  });

  it('renders blog posts with tags', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    const tags = screen.getAllByTestId('blog-tag');
    expect(tags.length).toBeGreaterThan(0);
    
    // Check tag format and content
    expect(tags[0].textContent).toMatch(/^#/);
    const tagTexts = tags.map(tag => tag.textContent);
    expect(tagTexts).toContain('#career-break');
    expect(tagTexts).toContain('#confidence');
    expect(tagTexts).toContain('#networking');
  });

  it('renders read more buttons for all posts', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    const readMoreButtons = screen.getAllByTestId('blog-read-more');
    expect(readMoreButtons).toHaveLength(4); // One for each blog post
    
    readMoreButtons.forEach(button => {
      expect(button).toHaveTextContent('Read Full Article');
    });
  });

  it('handles read more button clicks', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    const readMoreButtons = screen.getAllByTestId('blog-read-more');
    fireEvent.click(readMoreButtons[0]);
    
    // Should log navigation attempt with post ID
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringMatching(/Navigate to article: 1/));
  });

  it('displays correct grid layouts', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    // Featured articles should use lg:grid-cols-2
    const featuredGrid = screen.getByTestId('featured-articles-grid');
    expect(featuredGrid).toHaveClass('grid-cols-1', 'lg:grid-cols-2');
    
    // Recent articles should use sm:grid-cols-2 lg:grid-cols-3
    const recentGrid = screen.getByTestId('recent-articles-grid');
    expect(recentGrid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });

  it('renders blog posts with excerpts', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    const excerpts = screen.getAllByTestId('blog-excerpt');
    expect(excerpts).toHaveLength(4);
    
    // Check specific excerpts
    expect(screen.getByText('Learn how to navigate the challenges and opportunities of returning to work after a career break.')).toBeInTheDocument();
    expect(screen.getByText('Practical strategies to rebuild professional confidence and overcome imposter syndrome.')).toBeInTheDocument();
  });

  it('renders blog posts with proper titles', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    // Check for blog post titles (not the section title)
    expect(screen.getByText('Starting Fresh: Your Career Comeback Guide')).toBeInTheDocument();
    expect(screen.getByText('Building Confidence for Your Return')).toBeInTheDocument();
    expect(screen.getByText('Networking After a Career Break')).toBeInTheDocument();
    expect(screen.getByText('Success Story: From Stay-at-Home Mom to Tech Leader')).toBeInTheDocument();
  });

  it('has proper semantic structure', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    // Should be a section element
    const section = screen.getByTestId('blog-section');
    expect(section.tagName).toBe('SECTION');
    
    // Should have proper heading hierarchy
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Career Insights & Resources');
    
    // Should have section headings (Featured Articles, Recent Articles, Stay Updated)
    expect(screen.getByText('Featured Articles')).toBeInTheDocument();
    expect(screen.getByText('Recent Articles')).toBeInTheDocument();
    expect(screen.getByText('Stay Updated with Career Tips')).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    // Mock delayed loading
    (loadBlogPosts as any).mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(mockBlogPosts), 100)));
    
    render(<Blog />);
    
    // Should show loading state initially
    expect(screen.getByText('Loading Articles...')).toBeInTheDocument();
    expect(screen.getByText('Please wait while we load our latest content.')).toBeInTheDocument();
  });

  it('handles error state when loading fails', async () => {
    // Mock error
    (loadBlogPosts as any).mockRejectedValue(new Error('Failed to load'));
    
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.getByText('Error Loading Articles')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Failed to load blog posts. Please try again later.')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('handles empty blog posts state', async () => {
    // Mock empty response
    (loadBlogPosts as any).mockResolvedValue([]);
    
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Articles Coming Soon')).toBeInTheDocument();
    expect(screen.getByText(/We're working on creating valuable content/)).toBeInTheDocument();
  });

  it('separates featured and regular posts correctly', async () => {
    render(<Blog />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Articles...')).not.toBeInTheDocument();
    });
    
    // Check featured section has only featured posts
    const featuredGrid = screen.getByTestId('featured-articles-grid');
    const featuredCards = featuredGrid.querySelectorAll('[data-testid="blog-card"]');
    expect(featuredCards).toHaveLength(2); // 2 featured posts
    
    // Check recent section has only non-featured posts
    const recentGrid = screen.getByTestId('recent-articles-grid');
    const recentCards = recentGrid.querySelectorAll('[data-testid="blog-card"]');
    expect(recentCards).toHaveLength(2); // 2 non-featured posts
  });
});
