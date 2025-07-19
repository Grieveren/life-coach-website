import React from 'react';
import { BlogPost } from '../../types';
import BlogCard from './BlogCard';

interface BlogProps {
  className?: string;
}

const Blog: React.FC<BlogProps> = ({ className = '' }) => {
  // Sample blog posts data - in a real app, this would come from props or a data source
  const blogPosts: BlogPost[] = [
    {
      id: 'returning-to-work-after-maternity-leave',
      title: 'Returning to Work After Maternity Leave: A Complete Guide',
      excerpt: 'Navigate the transition back to work with confidence. Learn practical strategies for managing work-life balance, rebuilding professional relationships, and advancing your career after taking time off.',
      content: '',
      publishDate: new Date('2024-01-15'),
      category: 'career-transition',
      featured: true,
      author: 'Sarah Johnson',
      tags: ['maternity-leave', 'career-transition', 'work-life-balance', 'professional-development'],
      readTime: 8,
      status: 'published',
      featuredImage: 'https://picsum.photos/600/300?random=1'
    },
    {
      id: 'overcoming-imposter-syndrome',
      title: 'Overcoming Imposter Syndrome: Reclaiming Your Professional Confidence',
      excerpt: 'Discover proven techniques to overcome self-doubt and imposter syndrome. Build lasting confidence in your abilities and learn to celebrate your professional achievements.',
      content: '',
      publishDate: new Date('2024-01-10'),
      category: 'personal-development',
      author: 'Sarah Johnson',
      tags: ['confidence', 'imposter-syndrome', 'mindset', 'professional-growth'],
      readTime: 6,
      status: 'published',
      featuredImage: 'https://picsum.photos/600/300?random=2'
    },
    {
      id: 'networking-strategies-for-career-changers',
      title: 'Networking Strategies That Actually Work for Career Changers',
      excerpt: 'Build meaningful professional connections even when changing careers. Learn authentic networking approaches that lead to real opportunities and lasting relationships.',
      content: '',
      publishDate: new Date('2024-01-05'),
      category: 'tips-advice',
      author: 'Sarah Johnson',
      tags: ['networking', 'career-change', 'professional-relationships', 'job-search'],
      readTime: 7,
      status: 'published'
    },
    {
      id: 'success-story-marketing-executive',
      title: 'From Stay-at-Home Mom to Marketing Executive: Maria\'s Success Story',
      excerpt: 'Read how Maria successfully transitioned back into marketing after a 5-year career break. Her journey from uncertainty to landing a senior marketing role in just 4 months.',
      content: '',
      publishDate: new Date('2023-12-28'),
      category: 'success-stories',
      author: 'Sarah Johnson',
      tags: ['success-story', 'marketing', 'career-break', 'transformation'],
      readTime: 5,
      status: 'published',
      featuredImage: 'https://picsum.photos/600/300?random=3'
    },
    {
      id: 'work-life-balance-strategies',
      title: '5 Work-Life Balance Strategies That Actually Work for Working Mothers',
      excerpt: 'Practical, tested strategies for maintaining work-life balance as a working mother. Learn how to set boundaries, manage time effectively, and reduce overwhelm.',
      content: '',
      publishDate: new Date('2023-12-20'),
      category: 'work-life-balance',
      author: 'Sarah Johnson',
      tags: ['work-life-balance', 'time-management', 'boundaries', 'working-mothers'],
      readTime: 6,
      status: 'published'
    },
    {
      id: 'industry-trends-remote-work',
      title: 'Remote Work Trends: What It Means for Career Returners',
      excerpt: 'Explore how remote work trends are creating new opportunities for women returning to the workforce. Learn how to position yourself for remote and hybrid roles.',
      content: '',
      publishDate: new Date('2023-12-15'),
      category: 'industry-insights',
      author: 'Sarah Johnson',
      tags: ['remote-work', 'industry-trends', 'career-opportunities', 'future-of-work'],
      readTime: 9,
      status: 'published'
    }
  ];

  // Separate featured and regular posts
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section 
      id="blog" 
      className={`py-16 bg-gray-50 ${className}`}
      data-testid="blog-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4"
            data-testid="blog-title"
          >
            Career Insights & Resources
          </h2>
          <p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            data-testid="blog-subtitle"
          >
            Explore practical advice, success stories, and expert insights to support your career transition journey. 
            Get the guidance you need to confidently return to work and advance your professional goals.
          </p>
        </div>

        {/* Featured Articles Section */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h3 
              className="text-2xl font-semibold text-gray-900 mb-6"
              data-testid="featured-articles-title"
            >
              Featured Articles
            </h3>
            <div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              data-testid="featured-articles-grid"
            >
              {featuredPosts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post}
                  featured={true}
                  className="h-full"
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles Section */}
        {regularPosts.length > 0 ? (
          <div>
            <h3 
              className="text-2xl font-semibold text-gray-900 mb-6"
              data-testid="recent-articles-title"
            >
              Recent Articles
            </h3>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              data-testid="recent-articles-grid"
            >
              {regularPosts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post}
                  className="h-full"
                />
              ))}
            </div>
          </div>
        ) : featuredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Articles Coming Soon</h3>
            <p className="text-gray-600 mb-6">We're working on creating valuable content for your career journey. Check back soon for expert insights and practical advice.</p>
          </div>
        )}

        {/* Newsletter Signup CTA */}
        <div className="text-center mt-12 bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Stay Updated with Career Tips
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get weekly career insights, success stories, and practical tips delivered straight to your inbox. 
            Join hundreds of women successfully navigating their career transitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              data-testid="newsletter-email-input"
            />
            <button 
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
              data-testid="newsletter-subscribe-button"
              onClick={() => {
                // In a real app, this would handle newsletter subscription
                console.log('Newsletter subscription');
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;