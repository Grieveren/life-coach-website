import React, { useState, useEffect } from 'react';
import { Service } from '../../types';
import { loadServices } from '../../utils/contentManager';
import ServiceCard from './ServiceCard';

interface ServicesProps {
  className?: string;
}

const Services: React.FC<ServicesProps> = ({ className = '' }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const servicesData = await loadServices();
        setServices(servicesData);
        setError(null);
      } catch (err) {
        console.error('Failed to load services:', err);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section 
      id="services" 
      className={`py-16 bg-gray-50 ${className}`}
      data-testid="services-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4"
            data-testid="services-title"
          >
            Coaching Services
          </h2>
          <p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            data-testid="services-subtitle"
          >
            Tailored coaching programs designed specifically for women transitioning back into the workforce. 
            Choose the support level that's right for your journey.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8"
          data-testid="services-grid"
        >
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Services...</h3>
              <p className="text-gray-600">Please wait while we load our service offerings.</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Services</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          ) : services && services.length > 0 ? (
            services.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service}
                className="h-full"
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Services Coming Soon</h3>
              <p className="text-gray-600">We're currently updating our service offerings. Please check back soon or contact us for more information.</p>
            </div>
          )}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-12 bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Not sure which program is right for you?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Schedule a free 30-minute consultation to discuss your goals and find the perfect coaching solution for your unique situation.
          </p>
          <button 
            className="btn-touch bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation"
            data-testid="services-consultation-cta"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;