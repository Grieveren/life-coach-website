import React, { useState, useEffect } from 'react';
import { Testimonial } from '../../types';
import { loadTestimonials } from '../../utils/contentManager';
import TestimonialCard from './TestimonialCard';

interface TestimonialsProps {
  testimonials?: Testimonial[];
  autoRotate?: boolean;
  rotationInterval?: number; // in milliseconds
  showNavigation?: boolean;
  className?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials: propTestimonials,
  autoRotate = true,
  rotationInterval = 5000,
  showNavigation = true,
  className = ''
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(propTestimonials || []);
  const [loading, setLoading] = useState(!propTestimonials);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);

  // Load testimonials if not provided as props
  useEffect(() => {
    if (!propTestimonials) {
      const fetchTestimonials = async () => {
        try {
          setLoading(true);
          const testimonialsData = await loadTestimonials();
          setTestimonials(testimonialsData);
          setError(null);
        } catch (err) {
          console.error('Failed to load testimonials:', err);
          setError('Failed to load testimonials. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchTestimonials();
    }
  }, [propTestimonials]);

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

  if (loading) {
    return (
      <section className={`py-16 bg-gray-50 ${className}`} id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our coaching has helped women successfully transition back into their careers
              with confidence and clarity.
            </p>
          </div>
          
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Success Stories...</h3>
            <p className="text-gray-600">Please wait while we load client testimonials.</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-16 bg-gray-50 ${className}`} id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our coaching has helped women successfully transition back into their careers
              with confidence and clarity.
            </p>
          </div>
          
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Testimonials</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className={`py-16 bg-gray-50 ${className}`} id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our coaching has helped women successfully transition back into their careers
              with confidence and clarity.
            </p>
          </div>
          
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Testimonials Coming Soon</h3>
            <p className="text-gray-600 mb-6">We're collecting success stories from our clients. Check back soon to see their inspiring journeys.</p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Be Our Next Success Story
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    );
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
                className="btn-touch absolute left-2 sm:left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl active:shadow-md transition-shadow duration-200 z-10 touch-manipulation"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="btn-touch absolute right-2 sm:right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl active:shadow-md transition-shadow duration-200 z-10 touch-manipulation"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`btn-touch w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 touch-manipulation ${
                      index === currentIndex
                        ? 'bg-blue-600'
                        : 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500'
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