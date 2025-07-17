import React, { useState, useEffect } from 'react';
import { Testimonial } from '../../types';
import TestimonialCard from './TestimonialCard';

interface TestimonialsProps {
  testimonials?: Testimonial[];
  autoRotate?: boolean;
  rotationInterval?: number; // in milliseconds
  showNavigation?: boolean;
  className?: string;
}

// Sample testimonials data
const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    content: 'Working with this coach completely transformed my approach to returning to work. I felt confident and prepared for my career transition after taking time off for my children.',
    outcome: 'Successfully landed a senior marketing role within 3 months',
    rating: 5,
    clientTitle: 'Marketing Manager',
    location: 'Austin, TX',
    serviceUsed: 'Career Transition Coaching Package',
    featured: true
  },
  {
    id: '2',
    clientName: 'Maria Rodriguez',
    content: 'The personalized coaching sessions helped me identify my strengths and build a strategy for re-entering the workforce. I never thought I could feel this empowered about my career.',
    outcome: 'Increased confidence and secured flexible remote position',
    rating: 5,
    clientTitle: 'Project Coordinator',
    location: 'Denver, CO',
    serviceUsed: 'Individual Coaching Sessions'
  },
  {
    id: '3',
    clientName: 'Jennifer Chen',
    content: 'After 5 years away from my career, I was overwhelmed about where to start. The coaching program gave me a clear roadmap and the support I needed to take action.',
    outcome: 'Launched successful freelance consulting business',
    rating: 5,
    clientTitle: 'Business Consultant',
    location: 'Seattle, WA',
    serviceUsed: 'Entrepreneurship Coaching'
  }
];

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials = defaultTestimonials,
  autoRotate = true,
  rotationInterval = 5000,
  showNavigation = true,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [isAutoRotating, testimonials.length, rotationInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoRotating(false); // Stop auto-rotation when user manually navigates
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setIsAutoRotating(false);
  };

  const goToNext = () => {
    const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setIsAutoRotating(false);
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`} id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our coaching has helped women successfully transition back into their careers
            with confidence and clarity.
          </p>
        </div>

        {/* Testimonials Display */}
        <div className="relative">
          {/* Main Testimonial Display */}
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <TestimonialCard 
                      testimonial={testimonial}
                      className="mx-auto max-w-2xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {showNavigation && testimonials.length > 1 && (
            <>
              {/* Previous/Next Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200 z-10"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200 z-10"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentIndex
                        ? 'bg-blue-600'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Auto-rotation Control */}
        {testimonials.length > 1 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              {isAutoRotating ? 'Pause' : 'Resume'} auto-rotation
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-6">
            Ready to write your own success story?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Start Your Journey
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;