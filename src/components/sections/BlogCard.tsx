import React from 'react';
import { BlogPost } from '../../types';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, className = '', featured = false }) => {
  const {
    title,
    excerpt,
    publishDate,
    category,
    author = 'Life Coach',
    tags = [],
    readTime,
    featuredImage
  } = post;

  const getCategoryColor = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      'career-transition': 'bg-blue-100 text-blue-800',
      'work-life-balance': 'bg-green-100 text-green-800',
      'personal-development': 'bg-purple-100 text-purple-800',
      'success-stories': 'bg-orange-100 text-orange-800',
      'tips-advice': 'bg-yellow-100 text-yellow-800',
      'industry-insights': 'bg-indigo-100 text-indigo-800'
    };
    return categoryColors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const cardClasses = featured 
    ? `bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-blue-200 ${className}`
    : `bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-300 ${className}`;

  return (
    <article 
      className={cardClasses}
      data-testid="blog-card"
    >
      {/* Featured Image */}
      {featuredImage && (
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
            data-testid="blog-featured-image"
          />
        </div>
      )}

      <div className="p-6">
        {/* Featured Badge */}
        {featured && (
          <div className="mb-3">
            <span 
              className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white"
              data-testid="blog-featured-badge"
            >
              Featured Article
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="mb-3">
          <span 
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(category)}`}
            data-testid="blog-category"
          >
            {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
        </div>

        {/* Article Title */}
        <h3 
          className={`font-semibold text-gray-900 mb-3 line-clamp-2 ${featured ? 'text-2xl' : 'text-xl'}`}
          data-testid="blog-post-title"
        >
          {title}
        </h3>

        {/* Article Excerpt */}
        <p 
          className="text-gray-600 mb-4 leading-relaxed line-clamp-3"
          data-testid="blog-excerpt"
        >
          {excerpt}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                  data-testid="blog-tag"
                >
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Article Meta */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span data-testid="blog-author">By {author}</span>
            <span data-testid="blog-date">{formatDate(publishDate)}</span>
          </div>
          {readTime && (
            <span data-testid="blog-read-time">
              {readTime} min read
            </span>
          )}
        </div>

        {/* Read More Button */}
        <button 
          className={`w-full py-2 px-4 rounded-md transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            featured 
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500'
          }`}
          data-testid="blog-read-more"
          onClick={() => {
            // In a real app, this would navigate to the full article
            console.log(`Navigate to article: ${post.id}`);
          }}
        >
          Read Full Article
        </button>
      </div>
    </article>
  );
};

export default BlogCard;