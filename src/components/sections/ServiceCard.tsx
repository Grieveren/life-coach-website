import React from 'react';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, className = '' }) => {
  const {
    title,
    description,
    features,
    duration,
    price,
    category,
    callToAction = 'Learn More',
    targetAudience
  } = service;

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'individual':
        return 'bg-secondary-100 text-secondary-800';
      case 'group':
        return 'bg-success-100 text-success-800';
      case 'workshop':
        return 'bg-primary-100 text-primary-800';
      case 'package':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className={`card-interactive p-4 sm:p-6 ${className}`}
      data-testid="service-card"
    >
      {/* Category Badge */}
      {category && (
        <div className="mb-4">
          <span 
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(category)}`}
            data-testid="service-category"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </div>
      )}

      {/* Service Title */}
      <h3 
        className="text-xl font-semibold text-gray-900 mb-3"
        data-testid="service-title"
      >
        {title}
      </h3>

      {/* Target Audience */}
      {targetAudience && (
        <p 
          className="text-sm text-primary-600 mb-3 font-medium"
          data-testid="service-audience"
        >
          For: {targetAudience}
        </p>
      )}

      {/* Service Description */}
      <p 
        className="text-gray-600 mb-4 leading-relaxed"
        data-testid="service-description"
      >
        {description}
      </p>

      {/* Features List */}
      {features && features.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">What's Included:</h4>
          <ul 
            className="space-y-1"
            data-testid="service-features"
          >
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg 
                  className="w-4 h-4 text-success-500 mt-0.5 mr-2 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Duration and Price */}
      <div className="flex justify-between items-center mb-4 text-sm">
        {duration && (
          <span 
            className="text-gray-500"
            data-testid="service-duration"
          >
            Duration: {duration}
          </span>
        )}
        {price && (
          <span 
            className="text-lg font-semibold text-primary-600"
            data-testid="service-price"
          >
            {price}
          </span>
        )}
      </div>

      {/* Call to Action Button */}
      <button 
        className="btn-primary w-full focus-visible"
        data-testid="service-cta"
        onClick={() => {
          // Scroll to contact section
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        {callToAction}
      </button>
    </div>
  );
};

export default ServiceCard;