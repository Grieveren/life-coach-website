// Environment configuration with validation
type Environment = 'development' | 'staging' | 'production';

interface EnvConfig {
  // EmailJS Configuration
  emailjs: {
    serviceId: string;
    templateId: string;
    publicKey: string;
  };
  
  // Site Configuration
  site: {
    url: string;
    name: string;
  };
  
  // Contact Information
  contact: {
    email: string;
    phone?: string;
  };
  
  // Social Media Links
  social: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  
  // Analytics
  analytics?: {
    gaTrackingId?: string;
  };
  
  // Environment
  environment: Environment;
  isDevelopment: boolean;
  isProduction: boolean;
  isStaging: boolean;
  
  // Build configuration
  build: {
    analyze: boolean;
    sourcemap: boolean;
    performanceMonitoring: boolean;
  };
}

// Get current environment
function getCurrentEnvironment(): Environment {
  const nodeEnv = import.meta.env.NODE_ENV || 'development';
  if (nodeEnv === 'production') return 'production';
  if (nodeEnv === 'staging') return 'staging';
  return 'development';
}

// Validate required environment variables
function validateEnv(): EnvConfig {
  const environment = getCurrentEnvironment();
  
  const requiredVars = [
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_TEMPLATE_ID',
    'VITE_EMAILJS_PUBLIC_KEY',
    'VITE_SITE_URL',
    'VITE_SITE_NAME',
    'VITE_CONTACT_EMAIL'
  ];
  
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing);
    // In development, provide fallback values
    if (environment === 'development') {
      console.warn('Using fallback values for development');
    }
  }
  
  return {
    emailjs: {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'demo_service',
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'demo_template',
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'demo_key',
    },
    site: {
      url: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
      name: import.meta.env.VITE_SITE_NAME || 'Life Coach Website',
    },
    contact: {
      email: import.meta.env.VITE_CONTACT_EMAIL || 'contact@example.com',
      phone: import.meta.env.VITE_CONTACT_PHONE,
    },
    social: {
      linkedin: import.meta.env.VITE_LINKEDIN_URL,
      facebook: import.meta.env.VITE_FACEBOOK_URL,
      instagram: import.meta.env.VITE_INSTAGRAM_URL,
    },
    analytics: {
      gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID,
    },
    environment,
    isDevelopment: environment === 'development',
    isProduction: environment === 'production',
    isStaging: environment === 'staging',
    build: {
      analyze: import.meta.env.VITE_BUILD_ANALYZE === 'true',
      sourcemap: import.meta.env.VITE_BUILD_SOURCEMAP === 'true',
      performanceMonitoring: import.meta.env.VITE_PERFORMANCE_MONITORING === 'true',
    },
  };
}

// Export validated configuration
export const env = validateEnv();

// Export individual configs for convenience
export const emailjsConfig = env.emailjs;
export const siteConfig = env.site;
export const contactConfig = env.contact;
export const socialConfig = env.social;
export const analyticsConfig = env.analytics;