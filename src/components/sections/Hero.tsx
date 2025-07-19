import React from 'react';

interface HeroProps {
  name?: string;
  tagline?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  name = "Andrea Gray",
  tagline = "Empowering Women to Reclaim Their Careers",
  description = "Specialized life coaching for mothers ready to transition back into the workforce with confidence and purpose.",
  ctaText = "Start Your Journey",
  onCtaClick
}) => {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      // Default scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        // Use the same offset logic as in Header component
        const headerHeight = 20; // Same offset as in Header for contact section
        const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section 
      id="home" 
      role="region"
      aria-label="Hero section"
      className="min-h-screen min-h-screen-small flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Content Column */}
          <div className="text-center lg:text-left order-2 lg:order-1 space-y-4 sm:space-y-6">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 block xs:inline">
                {name}
              </span>
            </h1>
            
            <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700">
              {tagline}
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {description}
            </p>
            
            <div className="pt-2 sm:pt-4">
              <button
                onClick={handleCtaClick}
                className="btn-touch inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-blue-600 rounded-full hover:from-teal-700 hover:to-blue-700 active:scale-95 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-offset-2 touch-manipulation"
                aria-label={`${ctaText} - Navigate to contact section`}
              >
                {ctaText}
                <svg 
                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Image Column */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              {/* Professional headshot placeholder */}
              <div className="w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 lg:w-[28rem] lg:h-[28rem] rounded-full bg-gradient-to-br from-teal-200 to-blue-200 flex items-center justify-center shadow-2xl">
                <div className="w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 lg:w-[26rem] lg:h-[26rem] rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg 
                    className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 lg:w-48 lg:h-48 text-gray-400" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              
              {/* Decorative elements - hidden on very small screens */}
              <div className="hidden xs:block absolute -top-4 -right-4 w-6 h-6 sm:w-8 sm:h-8 bg-teal-400 rounded-full opacity-70 animate-pulse"></div>
              <div className="hidden xs:block absolute -bottom-6 -left-6 w-8 h-8 sm:w-12 sm:h-12 bg-blue-400 rounded-full opacity-50 animate-pulse delay-1000"></div>
              <div className="hidden sm:block absolute top-1/4 -left-8 w-6 h-6 bg-teal-300 rounded-full opacity-60 animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;