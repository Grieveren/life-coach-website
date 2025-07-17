import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Hero from '../Hero';

// Mock scrollIntoView
const mockScrollIntoView = vi.fn();
Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
  writable: true,
  value: mockScrollIntoView,
});

// Mock getElementById
const mockGetElementById = vi.fn();
Object.defineProperty(document, 'getElementById', {
  writable: true,
  value: mockGetElementById,
});

describe('Hero Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Hero />);
      
      expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument();
      expect(screen.getByText('Andrea Gray')).toBeInTheDocument();
      expect(screen.getByText('Empowering Women to Reclaim Their Careers')).toBeInTheDocument();
      expect(screen.getByText(/Specialized life coaching for mothers/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Start Your Journey/i })).toBeInTheDocument();
    });

    it('renders with custom props', () => {
      const customProps = {
        name: 'Jane Doe',
        tagline: 'Custom Tagline',
        description: 'Custom description text',
        ctaText: 'Custom CTA'
      };

      render(<Hero {...customProps} />);
      
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('Custom Tagline')).toBeInTheDocument();
      expect(screen.getByText('Custom description text')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Custom CTA/i })).toBeInTheDocument();
    });

    it('has proper semantic structure', () => {
      render(<Hero />);
      
      const section = screen.getByRole('region');
      expect(section).toHaveAttribute('id', 'home');
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
      
      const subHeading = screen.getByRole('heading', { level: 2 });
      expect(subHeading).toBeInTheDocument();
    });

    it('has proper accessibility attributes', () => {
      render(<Hero />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Start Your Journey - Navigate to contact section');
      
      const section = screen.getByRole('region');
      expect(section).toHaveAttribute('aria-label', 'Hero section');
      
      // Check that SVG elements have aria-hidden
      const container = screen.getByRole('region');
      const svgElements = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(svgElements.length).toBeGreaterThan(0);
    });
  });

  describe('CTA Button Interactions', () => {
    it('calls custom onCtaClick when provided', () => {
      const mockOnCtaClick = vi.fn();
      render(<Hero onCtaClick={mockOnCtaClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockOnCtaClick).toHaveBeenCalledTimes(1);
    });

    it('scrolls to contact section when no custom handler provided', () => {
      const mockContactElement = { scrollIntoView: mockScrollIntoView };
      mockGetElementById.mockReturnValue(mockContactElement);
      
      render(<Hero />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockGetElementById).toHaveBeenCalledWith('contact');
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    it('handles missing contact section gracefully', () => {
      mockGetElementById.mockReturnValue(null);
      
      render(<Hero />);
      
      const button = screen.getByRole('button');
      
      // Should not throw error when contact section doesn't exist
      expect(() => fireEvent.click(button)).not.toThrow();
      expect(mockGetElementById).toHaveBeenCalledWith('contact');
      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });
  });

  describe('Responsive Design', () => {
    it('has responsive classes for different screen sizes', () => {
      render(<Hero />);
      
      const section = screen.getByRole('region');
      expect(section).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveClass('text-4xl', 'sm:text-5xl', 'lg:text-6xl');
      
      const subHeading = screen.getByRole('heading', { level: 2 });
      expect(subHeading).toHaveClass('text-xl', 'sm:text-2xl', 'lg:text-3xl');
    });

    it('has proper grid layout classes', () => {
      render(<Hero />);
      
      const gridContainer = screen.getByRole('region').querySelector('.grid');
      expect(gridContainer).toHaveClass('grid-cols-1', 'lg:grid-cols-2');
    });
  });

  describe('Visual Elements', () => {
    it('renders professional headshot placeholder', () => {
      render(<Hero />);
      
      // Check for the SVG icon representing the headshot placeholder
      const container = screen.getByRole('region');
      const headshotIcon = container.querySelector('svg.text-gray-400[aria-hidden="true"]');
      expect(headshotIcon).toBeInTheDocument();
      expect(headshotIcon).toHaveClass('w-32', 'h-32', 'sm:w-40', 'sm:h-40', 'lg:w-48', 'lg:h-48');
    });

    it('has gradient backgrounds', () => {
      render(<Hero />);
      
      const section = screen.getByRole('region');
      expect(section).toHaveClass('bg-gradient-to-br', 'from-blue-50', 'via-teal-50', 'to-blue-100');
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gradient-to-r', 'from-teal-600', 'to-blue-600');
    });

    it('has hover and focus states', () => {
      render(<Hero />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'hover:from-teal-700',
        'hover:to-blue-700',
        'hover:scale-105',
        'focus:outline-none',
        'focus:ring-4',
        'focus:ring-teal-300'
      );
    });
  });

  describe('Content Customization', () => {
    it('handles empty string props gracefully', () => {
      render(<Hero name="" tagline="" description="" ctaText="" />);
      
      // Component should still render without crashing
      const section = screen.getByRole('region');
      expect(section).toBeInTheDocument();
    });

    it('handles long content appropriately', () => {
      const longContent = {
        name: 'Very Long Name That Might Wrap To Multiple Lines',
        tagline: 'This is a very long tagline that should test how the component handles extended text content',
        description: 'This is an extremely long description that tests how the component handles lengthy text content and ensures it maintains proper spacing and readability across different screen sizes and devices.',
        ctaText: 'Very Long Call To Action Button Text'
      };

      render(<Hero {...longContent} />);
      
      expect(screen.getByText(longContent.name)).toBeInTheDocument();
      expect(screen.getByText(longContent.tagline)).toBeInTheDocument();
      expect(screen.getByText(longContent.description)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: new RegExp(longContent.ctaText, 'i') })).toBeInTheDocument();
    });
  });
});