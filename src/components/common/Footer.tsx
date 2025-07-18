import React from 'react';
import { SocialMediaLink, ContactInfo } from '../../types';

interface FooterProps {
  siteName?: string;
  contactInfo?: ContactInfo;
  socialLinks?: SocialMediaLink[];
  credentials?: string[];
  copyrightYear?: number;
  businessInfo?: {
    name: string;
    license?: string;
    certifications?: string[];
  };
}

const defaultSocialLinks: SocialMediaLink[] = [
  {
    platform: 'linkedin',
    url: 'https://linkedin.com/in/andrea-gray-coach',
    label: 'LinkedIn Profile'
  },
  {
    platform: 'facebook',
    url: 'https://facebook.com/andreagreycoaching',
    label: 'Facebook Page'
  },
  {
    platform: 'instagram',
    url: 'https://instagram.com/andreagreycoach',
    label: 'Instagram'
  }
];

const defaultContactInfo: ContactInfo = {
  email: 'hello@andreagreycoaching.com',
  phone: '(555) 123-4567',
  address: {
    city: 'San Francisco',
    state: 'CA'
  }
};

const defaultCredentials = [
  'Certified Professional Coach (CPC)',
  'International Coach Federation (ICF) Member',
  'Career Transition Specialist'
];

const Footer: React.FC<FooterProps> = ({
  siteName = 'Andrea Grey Coaching',
  contactInfo = defaultContactInfo,
  socialLinks = defaultSocialLinks,
  credentials = defaultCredentials,
  copyrightYear = new Date().getFullYear(),
  businessInfo = {
    name: 'Andrea Grey Coaching LLC',
    license: 'Licensed Life Coach - CA #LC12345',
    certifications: ['CPC', 'ICF Member']
  }
}) => {
  // Social media icon components
  const getSocialIcon = (platform: string) => {
    const iconClass = "w-5 h-5 fill-current";
    
    switch (platform) {
      case 'linkedin':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.405c-.315 0-.595-.122-.807-.315-.21-.21-.315-.49-.315-.807 0-.315.105-.595.315-.807.21-.21.49-.315.807-.315.315 0 .595.105.807.315.21.21.315.49.315.807 0 .315-.105.595-.315.807-.21.193-.49.315-.807.315zm-.122 1.715c-.928-.875-2.026-1.297-3.323-1.297s-2.448.49-3.323 1.297c-.928.875-1.418 2.026-1.418 3.323s.49 2.448 1.418 3.244c.875.807 2.026 1.297 3.323 1.297s2.448-.49 3.323-1.297c.928-.796 1.418-1.947 1.418-3.244s-.49-2.448-1.418-3.323z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">{siteName}</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering mothers to successfully transition back into the workforce with confidence, 
              clarity, and purpose. Your career comeback starts here.
            </p>
            
            {/* Professional Credentials */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Professional Credentials</h4>
              <ul className="space-y-2">
                {credentials.map((credential, index) => (
                  <li key={index} className="text-gray-300 text-sm flex items-center">
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 flex-shrink-0"></span>
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-teal-400 transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
              
              {contactInfo.phone && (
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="hover:text-teal-400 transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              )}
              
              {contactInfo.address && (
                <div className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span>
                    {contactInfo.address.city && contactInfo.address.state && 
                      `${contactInfo.address.city}, ${contactInfo.address.state}`
                    }
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-teal-400 transition-colors p-2 hover:bg-gray-800 rounded-lg"
                  aria-label={link.label}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
            
            {/* Business Hours */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-white mb-2">Business Hours</h5>
              <div className="text-gray-300 text-sm space-y-1">
                <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                <div>Saturday: 10:00 AM - 2:00 PM</div>
                <div>Sunday: Closed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>© {copyrightYear} {businessInfo.name}. All rights reserved.</p>
              {businessInfo.license && (
                <p className="mt-1">{businessInfo.license}</p>
              )}
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <button className="text-gray-400 hover:text-teal-400 transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-teal-400 transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-teal-400 transition-colors">
                Coaching Agreement
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;