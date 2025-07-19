import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types';
import { loadBlogPosts } from '../../utils/contentManager';
import BlogCard from './BlogCard';

interface BlogProps {
  className?: string;
}

const Blog: React.FC<BlogProps> = ({ className = '' }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const blogPostsData = await loadBlogPosts();
        setBlogPosts(blogPostsData);
        setError(null);
      } catch (err) {
        console.error('Failed to load blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

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

        {/* Content Display */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Articles...</h3>
            <p className="text-gray-600">Please wait while we load our latest content.</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Articles</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
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
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
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
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
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
          </>
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
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              data-testid="newsletter-email-input"
            />
            <button 
              className="btn-touch bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap touch-manipulation"
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