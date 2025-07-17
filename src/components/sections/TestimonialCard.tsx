import React from 'react';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  showPhoto?: boolean;
  showRating?: boolean;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  showPhoto = true,
  showRating = true,
  className = ''
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 h-full flex flex-col ${className}`}>
      {/* Rating */}
      {showRating && testimonial.rating && (
        <div className="flex items-center mb-4">
          <div className="flex">{renderStars(testimonial.rating)}</div>
          <span className="ml-2 text-sm text-gray-600">
            {testimonial.rating}/5
          </span>
        </div>
      )}

      {/* Content */}
      <blockquote className="text-gray-700 mb-6 flex-grow">
        <p className="text-lg leading-relaxed">"{testimonial.content}"</p>
      </blockquote>

      {/* Outcome */}
      {testimonial.outcome && (
        <div className="mb-4 p-3 bg-green-50 rounded-md border-l-4 border-green-400">
          <p className="text-sm text-green-800 font-medium">
            <span className="font-semibold">Result: </span>
            {testimonial.outcome}
          </p>
        </div>
      )}

      {/* Client Info */}
      <div className="flex items-center">
        {showPhoto && testimonial.clientPhoto && (
          <img
            src={testimonial.clientPhoto}
            alt={testimonial.clientName}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        )}
        <div className="flex-grow">
          <h4 className="font-semibold text-gray-900">
            {testimonial.clientName}
          </h4>
          {testimonial.clientTitle && (
            <p className="text-sm text-gray-600">{testimonial.clientTitle}</p>
          )}
          {testimonial.location && (
            <p className="text-xs text-gray-500">{testimonial.location}</p>
          )}
        </div>
      </div>

      {/* Service Used */}
      {testimonial.serviceUsed && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Service: <span className="font-medium">{testimonial.serviceUsed}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;