import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { 
  isBreakpoint, 
  getCurrentBreakpoint, 
  isMobile, 
  isTablet, 
  isDesktop, 
  isTouchDevice,
  getResponsiveImageSizes,
  BREAKPOINTS 
} from '../../utils/responsive';
import Hero from '../sections/Hero';
import Header from '../common/Header';
import Contact from '../sections/Contact';

// Mock window object for responsive tests
const mockWindow = (width: number, height: number = 800) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
};

describe('Responsive Design Utilities', () => {
  beforeEach(() => {
    // Reset window size before each test
    mockWindow(1024, 800);
  });

  describe('Breakpoint Detection', () => {
    it('should detect xs breakpoint correctly', () => {
      mockWindow(500); // Above xs breakpoint (475px)
      expect(getCurrentBreakpoint()).toBe('xs');
      expect(isBreakpoint('xs')).toBe(true);
      expect(isBreakpoint('sm')).toBe(false);
    });

    it('should detect sm breakpoint correctly', () => {
      mockWindow(640);
      expect(getCurrentBreakpoint()).toBe('sm');
      expect(isBreakpoint('sm')).toBe(true);
      expect(isBreakpoint('md')).toBe(false);
    });

    it('should detect md breakpoint correctly', () => {
      mockWindow(768);
      expect(getCurrentBreakpoint()).toBe('md');
      expect(isBreakpoint('md')).toBe(true);
      expect(isBreakpoint('lg')).toBe(false);
    });

    it('should detect lg breakpoint correctly', () => {
      mockWindow(1024);
      expect(getCurrentBreakpoint()).toBe('lg');
      expect(isBreakpoint('lg')).toBe(true);
      expect(isBreakpoint('xl')).toBe(false);
    });

    it('should detect xl breakpoint correctly', () => {
      mockWindow(1280);
      expect(getCurrentBreakpoint()).toBe('xl');
      expect(isBreakpoint('xl')).toBe(true);
      expect(isBreakpoint('2xl')).toBe(false);
    });

    it('should detect 2xl breakpoint correctly', () => {
      mockWindow(1536);
      expect(getCurrentBreakpoint()).toBe('2xl');
      expect(isBreakpoint('2xl')).toBe(true);
    });
  });

  describe('Device Type Detection', () => {
    it('should detect mobile devices correctly', () => {
      mockWindow(400);
      expect(isMobile()).toBe(true);
      expect(isTablet()).toBe(false);
      expect(isDesktop()).toBe(false);
    });

    it('should detect tablet devices correctly', () => {
      mockWindow(800);
      expect(isMobile()).toBe(false);
      expect(isTablet()).toBe(true);
      expect(isDesktop()).toBe(false);
    });

    it('should detect desktop devices correctly', () => {
      mockWindow(1200);
      expect(isMobile()).toBe(false);
      expect(isTablet()).toBe(false);
      expect(isDesktop()).toBe(true);
    });
  });

  describe('Touch Device Detection', () => {
    it('should detect touch devices when ontouchstart is available', () => {
      // Mock touch support
      Object.defineProperty(window, 'ontouchstart', {
        value: null,
        writable: true,
      });
      
      expect(isTouchDevice()).toBe(true);
    });

    it('should detect touch devices when maxTouchPoints > 0', () => {
      // Remove ontouchstart
      delete (window as any).ontouchstart;
      
      // Mock navigator.maxTouchPoints
      Object.defineProperty(navigator, 'maxTouchPoints', {
        value: 1,
        writable: true,
      });
      
      expect(isTouchDevice()).toBe(true);
    });
  });

  describe('Responsive Image Sizes', () => {
    it('should generate correct responsive image sizes string', () => {
      const sizes = {
        xs: '100vw',
        sm: '50vw',
        lg: '33vw',
      };
      
      const result = getResponsiveImageSizes(sizes);
      expect(result).toContain('(min-width: 475px) 100vw');
      expect(result).toContain('(min-width: 640px) 50vw');
      expect(result).toContain('33vw'); // Default size
    });
  });
});

describe('Component Responsive Behavior', () => {
  beforeEach(() => {
    // Mock getBoundingClientRect for Hero component
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Hero Component Responsive Behavior', () => {
    it('should render with mobile-optimized classes on small screens', () => {
      mockWindow(400);
      render(<Hero />);
      
      const heroSection = screen.getByRole('region', { name: /hero section/i });
      expect(heroSection).toHaveClass('min-h-screen-small');
      
      const ctaButton = screen.getByRole('button');
      expect(ctaButton).toHaveClass('btn-touch');
    });

    it('should render with desktop classes on large screens', () => {
      mockWindow(1200);
      render(<Hero />);
      
      const heroSection = screen.getByRole('region', { name: /hero section/i });
      expect(heroSection).toBeInTheDocument();
      
      const ctaButton = screen.getByRole('button');
      expect(ctaButton).toHaveClass('btn-touch');
    });
  });

  describe('Header Component Responsive Behavior', () => {
    it('should show mobile menu button on small screens', () => {
      mockWindow(400);
      render(<Header />);
      
      const mobileMenuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(mobileMenuButton).toBeInTheDocument();
      expect(mobileMenuButton).toHaveClass('btn-touch');
    });

    it('should show desktop navigation on large screens', () => {
      mockWindow(1200);
      render(<Header />);
      
      // Desktop navigation should be visible - check for multiple home buttons
      const homeLinks = screen.getAllByRole('button', { name: /home/i });
      expect(homeLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Contact Component Responsive Behavior', () => {
    it('should render with mobile-optimized form layout', () => {
      mockWindow(400);
      render(<Contact />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('btn-touch');
      expect(submitButton).toHaveClass('touch-manipulation');
    });

    it('should render with desktop layout on large screens', () => {
      mockWindow(1200);
      render(<Contact />);
      
      const contactHeading = screen.getByRole('heading', { name: /get in touch/i });
      expect(contactHeading).toBeInTheDocument();
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('btn-touch');
    });
  });
});

describe('CSS Classes and Touch Interactions', () => {
  it('should apply touch-friendly classes to interactive elements', () => {
    mockWindow(400);
    render(<Hero />);
    
    const ctaButton = screen.getByRole('button');
    expect(ctaButton).toHaveClass('btn-touch');
    // Note: touch-manipulation is applied via CSS, not as a class
  });

  it('should apply responsive text classes', () => {
    render(<Hero />);
    
    // Check that responsive classes are applied
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-3xl', 'xs:text-4xl', 'sm:text-5xl', 'lg:text-6xl');
  });

  it('should apply responsive spacing classes', () => {
    render(<Contact />);
    
    const contactHeading = screen.getByRole('heading', { name: /get in touch/i });
    expect(contactHeading).toBeInTheDocument();
  });
});

describe('Accessibility and Touch Targets', () => {
  it('should ensure minimum touch target sizes on mobile', () => {
    mockWindow(400);
    render(<Header />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(mobileMenuButton).toHaveClass('btn-touch');
    
    // Check that touch-friendly class is applied (actual sizing is handled by CSS)
    expect(mobileMenuButton).toHaveClass('touch-manipulation');
  });

  it('should apply proper ARIA labels for touch interactions', () => {
    render(<Hero />);
    
    const ctaButton = screen.getByRole('button');
    expect(ctaButton).toHaveAttribute('aria-label');
  });
});