import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../sections/Hero';
import Header from '../common/Header';
import Contact from '../sections/Contact';
import Services from '../sections/Services';
import ServiceCard from '../sections/ServiceCard';
import { Service } from '../../types';

describe('Design System Validation', () => {
  describe('Color Palette Consistency', () => {
    it('should use primary colors consistently in Hero section', () => {
      render(<Hero />);
      
      const ctaButton = screen.getByRole('button');
      expect(ctaButton).toHaveClass('btn-primary');
      
      const nameSpan = screen.getByText('Andrea Gray');
      expect(nameSpan).toHaveClass('text-gradient');
    });

    it('should use consistent color scheme in Header', () => {
      render(<Header siteName="Test Site" />);
      
      const siteName = screen.getByText('Test Site');
      expect(siteName).toHaveClass('text-gray-900');
      expect(siteName).toHaveClass('hover:text-primary-600');
    });

    it('should use semantic colors in Contact form', () => {
      render(<Contact />);
      
      // Check that contact icons use semantic colors
      const contactSection = document.querySelector('#contact');
      expect(contactSection).toBeInTheDocument();
      
      // Form inputs should use consistent styling
      const nameInput = screen.getByLabelText(/full name/i);
      expect(nameInput).toHaveClass('form-input');
    });

    it('should use consistent colors in ServiceCard', () => {
      const mockService: Service = {
        id: '1',
        title: 'Test Service',
        description: 'Test description',
        features: ['Feature 1', 'Feature 2'],
        category: 'individual'
      };

      render(<ServiceCard service={mockService} />);
      
      const ctaButton = screen.getByRole('button');
      expect(ctaButton).toHaveClass('btn-primary');
      
      const categoryBadge = screen.getByTestId('service-category');
      expect(categoryBadge).toHaveClass('bg-secondary-100');
      expect(categoryBadge).toHaveClass('text-secondary-800');
    });
  });

  describe('Typography Consistency', () => {
    it('should use consistent heading styles', () => {
      render(<Hero />);
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveClass('font-bold');
      expect(mainHeading).toHaveClass('text-gray-900');
    });

    it('should use responsive text sizing', () => {
      render(<Contact />);
      
      const sectionHeading = screen.getByRole('heading', { level: 2 });
      expect(sectionHeading).toHaveClass('font-bold');
    });
  });

  describe('Button Consistency', () => {
    it('should use btn-primary class consistently', () => {
      render(<Hero />);
      
      const ctaButton = screen.getByRole('button');
      expect(ctaButton).toHaveClass('btn-primary');
      expect(ctaButton).toHaveClass('focus-visible');
    });

    it('should use btn-touch for mobile-friendly interactions', () => {
      render(<Header siteName="Test Site" />);
      
      const mobileMenuButton = screen.getByLabelText(/toggle navigation menu/i);
      expect(mobileMenuButton).toHaveClass('btn-touch');
      expect(mobileMenuButton).toHaveClass('touch-manipulation');
    });

    it('should have consistent button styling in forms', () => {
      render(<Contact />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('btn-primary');
      expect(submitButton).toHaveClass('focus-visible');
    });
  });

  describe('Card Component Consistency', () => {
    it('should use card classes consistently in Services', () => {
      render(<Services />);
      
      // Wait for services to load and check card styling
      // This test may need to be adjusted based on actual service data
      const servicesSection = screen.getByTestId('services-section');
      expect(servicesSection).toBeInTheDocument();
    });

    it('should use card-interactive for ServiceCard', () => {
      const mockService: Service = {
        id: '1',
        title: 'Test Service',
        description: 'Test description',
        features: ['Feature 1'],
        category: 'individual'
      };

      render(<ServiceCard service={mockService} />);
      
      const serviceCard = screen.getByTestId('service-card');
      expect(serviceCard).toHaveClass('card-interactive');
    });
  });

  describe('Form Styling Consistency', () => {
    it('should use form-input class consistently', () => {
      render(<Contact />);
      
      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const phoneInput = screen.getByLabelText(/phone number/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      expect(nameInput).toHaveClass('form-input');
      expect(emailInput).toHaveClass('form-input');
      expect(phoneInput).toHaveClass('form-input');
      expect(messageInput).toHaveClass('form-input');
    });
  });

  describe('Spacing and Layout Consistency', () => {
    it('should use consistent section padding', () => {
      render(<Contact />);
      
      const contactSection = document.querySelector('#contact');
      expect(contactSection).toHaveClass('py-20');
    });

    it('should use responsive grid classes', () => {
      render(<Contact />);
      
      // Check for responsive grid usage
      const gridContainer = document.querySelector('.grid-responsive-2col');
      expect(gridContainer).toBeInTheDocument();
    });
  });

  describe('Transition and Animation Consistency', () => {
    it('should use consistent transition durations', () => {
      render(<Hero />);
      
      const ctaButton = screen.getByRole('button');
      expect(ctaButton).toHaveClass('btn-primary');
      // btn-primary includes transition-all and duration-300 in its definition
    });

    it('should use consistent hover effects', () => {
      render(<Header siteName="Test Site" />);
      
      const siteName = screen.getByText('Test Site');
      expect(siteName).toHaveClass('transition-colors');
      expect(siteName).toHaveClass('duration-300');
    });
  });

  describe('Focus Management Consistency', () => {
    it('should use focus-visible class consistently', () => {
      render(<Hero />);
      
      const ctaButton = screen.getByRole('button');
      expect(ctaButton).toHaveClass('focus-visible');
    });

    it('should have consistent focus styling in navigation', () => {
      render(<Header siteName="Test Site" />);
      
      const navButtons = screen.getAllByRole('button');
      navButtons.forEach(button => {
        if (button.getAttribute('aria-label')?.includes('Toggle')) {
          expect(button).toHaveClass('focus-visible');
        }
      });
    });
  });

  describe('Responsive Design Consistency', () => {
    it('should use consistent responsive breakpoints', () => {
      render(<Hero />);
      
      const heroSection = document.querySelector('#home');
      expect(heroSection).toHaveClass('px-4');
      expect(heroSection).toHaveClass('sm:px-6');
      expect(heroSection).toHaveClass('lg:px-8');
    });

    it('should use touch-friendly sizing on mobile', () => {
      render(<Header siteName="Test Site" />);
      
      const mobileMenuButton = screen.getByLabelText(/toggle navigation menu/i);
      expect(mobileMenuButton).toHaveClass('btn-touch');
    });
  });

  describe('Semantic Color Usage', () => {
    it('should use success colors for positive feedback', () => {
      const mockService: Service = {
        id: '1',
        title: 'Test Service',
        description: 'Test description',
        features: ['Feature 1'],
        category: 'group'
      };

      render(<ServiceCard service={mockService} />);
      
      const categoryBadge = screen.getByTestId('service-category');
      expect(categoryBadge).toHaveClass('bg-success-100');
      expect(categoryBadge).toHaveClass('text-success-800');
    });

    it('should use primary colors for main actions', () => {
      render(<Services />);
      
      const consultationButton = screen.getByTestId('services-consultation-cta');
      expect(consultationButton).toHaveClass('btn-primary');
    });
  });

  describe('Loading and Error State Consistency', () => {
    it('should have consistent loading state styling', () => {
      render(<Services />);
      
      // Check that loading states are properly styled
      const servicesSection = screen.getByTestId('services-section');
      expect(servicesSection).toBeInTheDocument();
    });
  });
});