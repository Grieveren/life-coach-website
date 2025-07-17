import React from 'react';

interface AboutProps {
  name?: string;
  title?: string;
  bio?: string;
  personalStory?: string;
  certifications?: string[];
  experience?: string;
  profileImage?: string;
  credentials?: string[];
}

const About: React.FC<AboutProps> = ({
  name = "Andrea Gray",
  title = "Certified Life Coach & Career Transition Specialist",
  bio = "With over 8 years of experience in human resources and career development, I understand the unique challenges women face when returning to work after starting a family. My passion lies in empowering mothers to rediscover their professional identity and successfully navigate their career transitions.",
  personalStory = "After taking time off to raise my own child, I experienced firsthand the anxiety and uncertainty that comes with re-entering the workforce. This personal journey inspired me to become a certified life coach, specializing in helping other women overcome similar challenges and build fulfilling careers that align with their values and family priorities.",
  certifications = [
    "Certified Professional Coach (CPC) - International Coach Federation",
    "Career Transition Specialist Certification",
    "Women's Leadership Development Certificate",
    "Master's Degree in Human Resources Management"
  ],
  experience = "8+ years in HR and Career Development",
  profileImage,
  credentials = ["ICF Certified", "HR Professional", "Proud Mother"]
}) => {
  return (
    <section 
      id="about" 
      role="region"
      aria-label="About section"
      className="py-16 lg:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
            <div className="relative">
              {/* Professional headshot */}
              <div className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[35rem] rounded-2xl bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center shadow-2xl overflow-hidden">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt={`Professional headshot of ${name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <svg 
                      className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 text-gray-400" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Credentials Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600 mb-1">{experience.split('+')[0]}+</div>
                  <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal-400 rounded-full opacity-70"></div>
              <div className="absolute top-1/4 -right-8 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Content Column */}
          <div className="order-2 lg:order-2">
            {/* Name and Title */}
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                {name}
              </h3>
              <p className="text-lg lg:text-xl text-teal-600 font-semibold mb-4">
                {title}
              </p>
              
              {/* Credentials Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {credentials.map((credential, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-teal-50 text-teal-700 text-sm font-medium rounded-full border border-teal-200"
                  >
                    {credential}
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Background */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                Professional Background
              </h4>
              <p className="text-gray-600 leading-relaxed text-lg">
                {bio}
              </p>
            </div>

            {/* Personal Story */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                My Story
              </h4>
              <p className="text-gray-600 leading-relaxed text-lg">
                {personalStory}
              </p>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-16 lg:mt-20">
          <h4 className="text-2xl font-semibold text-gray-800 mb-8 text-center flex items-center justify-center">
            <svg className="w-6 h-6 text-teal-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Certifications & Qualifications
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((certification, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border border-teal-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {certification}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;