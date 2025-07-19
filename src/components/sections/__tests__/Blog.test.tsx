import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Blog from '../Blog';

// Mock console.log to test button clicks
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('Blog', () => {
  afterEach(() => {
    mockConsoleLog.mockClear();
  });

  it('renders blog section with correct structure', () => {
    render(<Blog />);
    
    expect(screen.getByTestId('blog-section')).toBeInTheDocument();
    expect(screen.getByTestId('blog-title')).toHaveTextContent('Career Insights & Resources');
    expect(screen.getByTestId('blog-subtitle')).toBeInTheDocument();
  });

  it('renders section header with correct content', () => {
    render(<Blog />);
    
    const title = screen.getByTestId('blog-title');
    expect(title).toHaveTextContent('Career Insights & Resources');
    
    const subtitle = screen.getByTestId('blog-subtitle');
    expect(subtitle).toHaveTextContent(/Explore practical advice, success stories, and expert insights/);
  });

  it('renders featured articles section', () => {
    render(<Blog />);
    
    expect(screen.getByTestId('featured-articles-title')).toHaveTextContent('Featured Articles');
    expect(screen.getByTestId('featured-articles-grid')).toBeInTheDocument();
  });

  it('renders recent articles section', () => {
    render(<Blog />);
    
    expect(screen.getByTestId('recent-articles-title')).toHaveTextContent('Recent Articles');
    expect(screen.getByTestId('recent-articles-grid')).toBeInTheDocument();
  });

  it('renders featured blog posts correctly', () => {
    render(<Blog />);
    
    // Should have at least one featured article
    const featuredGrid = screen.getByTestId('featured-articles-grid');
    expect(featuredGrid).toBeInTheDocument();
    
    // Check for featured badge
    expect(screen.getByTestId('blog-featured-badge')).toBeInTheDocument();
  });

  it('renders regular blog posts correctly', () => {
    render(<Blog />);
    
    const recentGrid = screen.getByTestId('recent-articles-grid');
    expect(recentGrid).toBeInTheDocument();
    
    // Should have multiple blog cards
    const blogCards = screen.getAllByTestId('blog-card');
    expect(blogCards.length).toBeGreaterThan(1);
  });

  it('displays blog posts with correct categories', () => {
    render(<Blog />);
    
    // Check for different category types
    const categories = screen.getAllByTestId('blog-category');
    expect(categories.length).toBeGreaterThan(0);
    
    // Should have various categories represented
    const categoryTexts = categories.map(cat => cat.textContent);
    expect(categoryTexts).toContain('Career Transition');
  });

  it('displays blog posts with correct metadata', () => {
    render(<Blog />);
    
    // Check for author information
    const authors = screen.getAllByTestId('blog-author');
    expect(authors.length).toBeGreaterThan(0);
    expect(authors[0]).toHaveTextContent(/By/);
    
    // Check for publish dates
    const dates = screen.getAllByTestId('blog-date');
    expect(dates.length).toBeGreaterThan(0);
    
    // Check for read times
    const readTimes = screen.getAllByTestId('blog-read-time');
    expect(readTimes.length).toBeGreaterThan(0);
  });

  it('renders newsletter signup section', () => {
    render(<Blog />);
    
    expect(screen.getByText('Stay Updated with Career Tips')).toBeInTheDocument();
    expect(screen.getByText(/Get weekly career insights/)).toBeInTheDocument();
    expect(screen.getByTestId('newsletter-email-input')).toBeInTheDocument();
    expect(screen.getByTestId('newsletter-subscribe-button')).toBeInTheDocument();
  });

  it('handles newsletter subscription button click', () => {
    render(<Blog />);
    
    const subscribeButton = screen.getByTestId('newsletter-subscribe-button');
    fireEvent.click(subscribeButton);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Newsletter subscription');
  });

  it('renders newsletter email input with correct attributes', () => {
    render(<Blog />);
    
    const emailInput = screen.getByTestId('newsletter-email-input');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'Enter your email address');
  });

  it('applies custom className when provided', () => {
    render(<Blog className="custom-blog-class" />);
    
    const section = screen.getByTestId('blog-section');
    expect(section).toHaveClass('custom-blog-class');
  });

  it('has correct section id for navigation', () => {
    render(<Blog />);
    
    const section = screen.getByTestId('blog-section');
    expect(section).toHaveAttribute('id', 'blog');
  });

  it('renders blog posts with tags', () => {
    render(<Blog />);
    
    const tags = screen.getAllByTestId('blog-tag');
    expect(tags.length).toBeGreaterThan(0);
    
    // Check tag format
    expect(tags[0].textContent).toMatch(/^#/);
  });

  it('renders read more buttons for all posts', () => {
    render(<Blog />);
    
    const readMoreButtons = screen.getAllByTestId('blog-read-more');
    expect(readMoreButtons.length).toBeGreaterThan(0);
    
    readMoreButtons.forEach(button => {
      expect(button).toHaveTextContent('Read Full Article');
    });
  });

  it('handles read more button clicks', () => {
    render(<Blog />);
    
    const readMoreButtons = screen.getAllByTestId('blog-read-more');
    fireEvent.click(readMoreButtons[0]);
    
    // Should log navigation attempt
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringMatching(/Navigate to article:/));
  });

  it('displays correct grid layouts', () => {
    render(<Blog />);
    
    // Featured articles should use lg:grid-cols-2
    const featuredGrid = screen.getByTestId('featured-articles-grid');
    expect(featuredGrid).toHaveClass('grid-cols-1', 'lg:grid-cols-2');
    
    // Recent articles should use sm:grid-cols-2 lg:grid-cols-3 (updated for mobile-first)
    const recentGrid = screen.getByTestId('recent-articles-grid');
    expect(recentGrid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });

  it('renders blog posts with excerpts', () => {
    render(<Blog />);
    
    const excerpts = screen.getAllByTestId('blog-excerpt');
    expect(excerpts.length).toBeGreaterThan(0);
    
    excerpts.forEach(excerpt => {
      expect(excerpt.textContent).toBeTruthy();
      expect(excerpt.textContent!.length).toBeGreaterThan(10);
    });
  });

  it('renders blog posts with proper titles', () => {
    render(<Blog />);
    
    const titles = screen.getAllByTestId('blog-title');
    expect(titles.length).toBeGreaterThan(0);
    
    titles.forEach(title => {
      expect(title.textContent).toBeTruthy();
      expect(title.textContent!.length).toBeGreaterThan(5);
    });
  });

  it('has proper semantic structure', () => {
    render(<Blog />);
    
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
});