import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import BlogCard from '../BlogCard';
import { BlogPost } from '../../../types';

// Mock console.log to test button click
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});

const mockBlogPost: BlogPost = {
  id: 'test-post',
  title: 'Test Blog Post Title',
  excerpt: 'This is a test excerpt for the blog post that should be displayed in the card.',
  content: 'Full content here',
  publishDate: new Date('2024-01-15'),
  category: 'career-transition',
  author: 'Test Author',
  tags: ['test', 'blog', 'career'],
  readTime: 5,
  status: 'published',
  featuredImage: '/test-image.jpg'
};

const mockBlogPostMinimal: BlogPost = {
  id: 'minimal-post',
  title: 'Minimal Post',
  excerpt: 'Minimal excerpt',
  content: 'Content',
  publishDate: new Date('2024-01-10'),
  category: 'tips-advice',
  status: 'published'
};

describe('BlogCard', () => {
  afterEach(() => {
    mockConsoleLog.mockClear();
  });

  it('renders blog card with all content', () => {
    render(<BlogCard post={mockBlogPost} />);
    
    expect(screen.getByTestId('blog-card')).toBeInTheDocument();
    expect(screen.getByTestId('blog-post-title')).toHaveTextContent('Test Blog Post Title');
    expect(screen.getByTestId('blog-excerpt')).toHaveTextContent('This is a test excerpt for the blog post that should be displayed in the card.');
    expect(screen.getByTestId('blog-author')).toHaveTextContent('By Test Author');
    expect(screen.getByTestId('blog-date')).toHaveTextContent('January 15, 2024');
    expect(screen.getByTestId('blog-read-time')).toHaveTextContent('5 min read');
  });

  it('renders featured image when provided', () => {
    render(<BlogCard post={mockBlogPost} />);
    
    const image = screen.getByTestId('blog-featured-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Blog Post Title');
  });

  it('does not render featured image when not provided', () => {
    render(<BlogCard post={mockBlogPostMinimal} />);
    
    expect(screen.queryByTestId('blog-featured-image')).not.toBeInTheDocument();
  });

  it('renders category with proper formatting', () => {
    render(<BlogCard post={mockBlogPost} />);
    
    const category = screen.getByTestId('blog-category');
    expect(category).toHaveTextContent('Career Transition');
    expect(category).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('renders different category colors correctly', () => {
    const workLifeBalancePost = { ...mockBlogPost, category: 'work-life-balance' };
    render(<BlogCard post={workLifeBalancePost} />);
    
    const category = screen.getByTestId('blog-category');
    expect(category).toHaveTextContent('Work Life Balance');
    expect(category).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('renders tags when provided', () => {
    render(<BlogCard post={mockBlogPost} />);
    
    const tags = screen.getAllByTestId('blog-tag');
    expect(tags).toHaveLength(3);
    expect(tags[0]).toHaveTextContent('#test');
    expect(tags[1]).toHaveTextContent('#blog');
    expect(tags[2]).toHaveTextContent('#career');
  });

  it('limits tags display to 3 and shows more indicator', () => {
    const postWithManyTags = {
      ...mockBlogPost,
      tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']
    };
    render(<BlogCard post={postWithManyTags} />);
    
    const tags = screen.getAllByTestId('blog-tag');
    expect(tags).toHaveLength(3);
    expect(screen.getByText('+2 more')).toBeInTheDocument();
  });

  it('does not render tags section when no tags provided', () => {
    render(<BlogCard post={mockBlogPostMinimal} />);
    
    expect(screen.queryByTestId('blog-tag')).not.toBeInTheDocument();
  });

  it('renders featured badge when featured prop is true', () => {
    render(<BlogCard post={mockBlogPost} featured={true} />);
    
    const featuredBadge = screen.getByTestId('blog-featured-badge');
    expect(featuredBadge).toBeInTheDocument();
    expect(featuredBadge).toHaveTextContent('Featured Article');
  });

  it('does not render featured badge when featured prop is false', () => {
    render(<BlogCard post={mockBlogPost} featured={false} />);
    
    expect(screen.queryByTestId('blog-featured-badge')).not.toBeInTheDocument();
  });

  it('applies featured styling when featured prop is true', () => {
    render(<BlogCard post={mockBlogPost} featured={true} />);
    
    const card = screen.getByTestId('blog-card');
    expect(card).toHaveClass('border-2', 'border-blue-200');
    
    const title = screen.getByTestId('blog-post-title');
    expect(title).toHaveClass('text-2xl');
  });

  it('applies regular styling when featured prop is false', () => {
    render(<BlogCard post={mockBlogPost} featured={false} />);
    
    const card = screen.getByTestId('blog-card');
    expect(card).toHaveClass('border', 'border-gray-200');
    
    const title = screen.getByTestId('blog-post-title');
    expect(title).toHaveClass('text-xl');
  });

  it('handles read more button click', () => {
    render(<BlogCard post={mockBlogPost} />);
    
    const readMoreButton = screen.getByTestId('blog-read-more');
    expect(readMoreButton).toHaveTextContent('Read Full Article');
    
    fireEvent.click(readMoreButton);
    expect(mockConsoleLog).toHaveBeenCalledWith('Navigate to article: test-post');
  });

  it('uses default author when not provided', () => {
    render(<BlogCard post={mockBlogPostMinimal} />);
    
    expect(screen.getByTestId('blog-author')).toHaveTextContent('By Life Coach');
  });

  it('does not render read time when not provided', () => {
    render(<BlogCard post={mockBlogPostMinimal} />);
    
    expect(screen.queryByTestId('blog-read-time')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<BlogCard post={mockBlogPost} className="custom-class" />);
    
    const card = screen.getByTestId('blog-card');
    expect(card).toHaveClass('custom-class');
  });

  it('formats date correctly', () => {
    const postWithSpecificDate = {
      ...mockBlogPost,
      publishDate: new Date('2023-12-25')
    };
    render(<BlogCard post={postWithSpecificDate} />);
    
    expect(screen.getByTestId('blog-date')).toHaveTextContent('December 25, 2023');
  });

  it('handles all category types with correct colors', () => {
    const categories = [
      { category: 'personal-development', expectedClass: 'bg-purple-100 text-purple-800' },
      { category: 'success-stories', expectedClass: 'bg-orange-100 text-orange-800' },
      { category: 'tips-advice', expectedClass: 'bg-yellow-100 text-yellow-800' },
      { category: 'industry-insights', expectedClass: 'bg-indigo-100 text-indigo-800' },
      { category: 'unknown-category', expectedClass: 'bg-gray-100 text-gray-800' }
    ];

    categories.forEach(({ category, expectedClass }) => {
      const { unmount } = render(<BlogCard post={{ ...mockBlogPost, category }} />);
      
      const categoryElement = screen.getByTestId('blog-category');
      expect(categoryElement).toHaveClass(...expectedClass.split(' '));
      
      unmount();
    });
  });

  it('renders featured button styling correctly', () => {
    render(<BlogCard post={mockBlogPost} featured={true} />);
    
    const button = screen.getByTestId('blog-read-more');
    expect(button).toHaveClass('bg-blue-600', 'text-white');
  });

  it('renders regular button styling correctly', () => {
    render(<BlogCard post={mockBlogPost} featured={false} />);
    
    const button = screen.getByTestId('blog-read-more');
    expect(button).toHaveClass('bg-gray-100', 'text-gray-700');
  });
});