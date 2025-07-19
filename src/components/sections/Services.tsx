import React from 'react';
import { Service } from '../../types';
import ServiceCard from './ServiceCard';

interface ServicesProps {
  className?: string;
}

const Services: React.FC<ServicesProps> = ({ className = '' }) => {
  // Sample services data - in a real app, this would come from props or a data source
  const services: Service[] = [
    {
      id: 'career-transition-coaching',
      title: 'Career Transition Coaching',
      description: 'Personalized one-on-one coaching to help you navigate your return to the workforce with confidence and clarity.',
      features: [
        'Resume and LinkedIn profile optimization',
        'Interview preparation and practice',
        'Career goal setting and planning',
        'Confidence building exercises',
        'Networking strategies',
        'Work-life balance planning'
      ],
      duration: '3 months',
      price: 'Starting at $297/month',
      category: 'individual',
      targetAudience: 'Women returning to work after childbirth',
      callToAction: 'Start Your Journey'
    },
    {
      id: 'group-coaching-program',
      title: 'Return to Work Group Program',
      description: 'Join a supportive community of women navigating similar career transitions in a structured group coaching environment.',
      features: [
        'Weekly group coaching sessions',
        'Peer support and networking',
        'Shared resources and templates',
        'Guest expert presentations',
        'Accountability partnerships',
        'Private online community access'
      ],
      duration: '8 weeks',
      price: '$197/month',
      category: 'group',
      targetAudience: 'Women ready to return to work',
      callToAction: 'Join the Community'
    },
    {
      id: 'confidence-building-workshop',
      title: 'Confidence Building Workshop',
      description: 'Intensive workshop focused on rebuilding professional confidence and overcoming imposter syndrome.',
      features: [
        'Interactive confidence-building exercises',
        'Mindset transformation techniques',
        'Public speaking practice',
        'Personal branding workshop',
        'Networking skills development',
        'Take-home action plan'
      ],
      duration: '1 day intensive',
      price: '$147',
      category: 'workshop',
      targetAudience: 'Women lacking professional confidence',
      callToAction: 'Book Workshop'
    },
    {
      id: 'complete-transformation-package',
      title: 'Complete Career Transformation',
      description: 'Comprehensive 6-month program combining individual coaching, group support, and specialized workshops.',
      features: [
        'Monthly 1-on-1 coaching sessions',
        'Access to all group programs',
        'Priority workshop enrollment',
        'Resume and LinkedIn makeover',
        'Interview coaching sessions',
        'Ongoing email support',
        '6-month success guarantee'
      ],
      duration: '6 months',
      price: '$1,497 (Save $500)',
      category: 'package',
      targetAudience: 'Women committed to career transformation',
      callToAction: 'Transform Your Career'
    }
  ];

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
          {services && services.length > 0 ? (
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