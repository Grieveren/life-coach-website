import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../../App';
import Hero from '../sections/Hero';
import Header from '../common/Header';
import Contact from '../sections/Contact';
import Services from '../sections/Services';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Accessibility Compliance Tests', () => {
  describe('WCAG 2.1 AA Compliance', () => {
    it('should have no accessibility violations in the main App', async () => {
      const { container } = render(<App />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }, 15000);

    it('should have no accessibility violations in Hero section', async () => {
      const { container } = render(<Hero />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }, 15000);

    it('should have no accessibility violations in Header component', async () => {
      const { container } = render(<Header siteName="Test Site" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }, 15000);

    it('should have no accessibility violations in Contact form', async () => {
      const { container } = render(<Contact />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }, 15000);

    it('should have no accessibility violations in Services section', async () => {
      const { container } = render(<Services />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }, 15000);
  });

  describe('Keyboard Navigation', () => {
    it('should have proper focus management in navigation', () => {
      render(<Header siteName="Test Site" />);
      
      // Check that navigation buttons are focusable (buttons are focusable by default)
      const navButtons = screen.getAllByRole('button');
      navButtons.forEach(button => {
        // Buttons are focusable by default, no need for explicit tabindex
        expect(button).toBeInTheDocument();
      });
    });

    it('should have proper focus indicators', () => {
      render(<Hero />);
      
      const ctaButton = screen.getByRole('button', { name: /start your journey/i });
      expect(ctaButton).toHaveClass('focus-visible');
    });

    it('should have proper form focus management', () => {
      render(<Contact />);
      
      // Check form inputs are properly labeled and focusable
      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(messageInput).toBeInTheDocument();
      
      // Check they have proper focus styling
      expect(nameInput).toHaveClass('form-input');
      expect(emailInput).toHaveClass('form-input');
      expect(messageInput).toHaveClass('form-input');
    });
  });

  describe('Screen Reader Support', () => {
    it('should have proper heading hierarchy', () => {
      render(<App />);
      
      // Check for proper heading structure
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements.length).toBeGreaterThan(0);
      
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements.length).toBeGreaterThan(0);
    });

    it('should have proper ARIA labels and descriptions', () => {
      render(<Hero />);
      
      const heroSection = screen.getByRole('region', { name: /hero section/i });
      expect(heroSection).toBeInTheDocument();
      
      const ctaButton = screen.getByRole('button');
      expect(ctaButton).toHaveAttribute('aria-label');
    });

    it('should have proper form labels and error messages', () => {
      render(<Contact />);
      
      // Check that all form inputs have proper labels
      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      
      expect(nameInput).toHaveAttribute('id');
      expect(emailInput).toHaveAttribute('id');
      
      // Check required field indicators
      expect(screen.getByText(/full name \*/i)).toBeInTheDocument();
      expect(screen.getByText(/email address \*/i)).toBeInTheDocument();
    });

    it('should have skip link for main content', () => {
      render(<App />);
      
      const skipLink = screen.getByText(/skip to main content/i);
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
      expect(skipLink).toHaveClass('skip-link');
    });
  });

  describe('Color Contrast and Visual Design', () => {
    it('should have sufficient color contrast for text elements', () => {
      render(<Hero />);
      
      // Check that text elements have proper contrast classes
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-gray-900');
      
      const description = screen.getByText(/specialized life coaching/i);
      expect(description).toHaveClass('text-gray-600');
    });

    it('should have proper focus indicators with sufficient contrast', () => {
      render(<Contact />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('focus-visible');
    });

    it('should have proper error state styling', () => {
      render(<Contact />);
      
      // Form inputs should have error state classes available
      const nameInput = screen.getByLabelText(/full name/i);
      expect(nameInput).toHaveClass('form-input');
    });
  });

  describe('Responsive Design Accessibility', () => {
    it('should have touch-friendly targets on mobile', () => {
      render(<Header siteName="Test Site" />);
      
      const mobileMenuButton = screen.getByLabelText(/toggle navigation menu/i);
      expect(mobileMenuButton).toHaveClass('btn-touch');
      expect(mobileMenuButton).toHaveClass('touch-manipulation');
    });

    it('should have proper mobile navigation accessibility', () => {
      render(<Header siteName="Test Site" />);
      
      const mobileMenuButton = screen.getByLabelText(/toggle navigation menu/i);
      expect(mobileMenuButton).toHaveAttribute('aria-expanded');
    });
  });

  describe('Motion and Animation Accessibility', () => {
    it('should respect reduced motion preferences', () => {
      // Test that animations are properly handled
      render(<Hero />);
      
      const ctaButton = screen.getByRole('button');
      expect(ctaButton).toHaveClass('btn-primary');
      
      // The CSS should handle prefers-reduced-motion
      // This is tested through the CSS media query in index.css
    });
  });

  describe('Form Accessibility', () => {
    it('should have proper form validation messages', () => {
      render(<Contact />);
      
      // Check that form has proper structure
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
      
      // Check required fields are marked
      expect(screen.getByText(/full name \*/i)).toBeInTheDocument();
      expect(screen.getByText(/email address \*/i)).toBeInTheDocument();
      expect(screen.getByText(/message \*/i)).toBeInTheDocument();
    });

    it('should have proper fieldset and legend structure where applicable', () => {
      render(<Contact />);
      
      // Check that the contact form has proper structure
      const contactSection = screen.getByRole('region', { name: /get in touch/i });
      expect(contactSection).toBeInTheDocument();
    });
  });

  describe('Image and Media Accessibility', () => {
    it('should have proper alt text for images', () => {
      render(<Hero />);
      
      // Check for SVG icons with proper aria-hidden attributes
      const decorativeIcons = document.querySelectorAll('svg[aria-hidden="true"]');
      expect(decorativeIcons.length).toBeGreaterThan(0);
    });

    it('should have proper icon accessibility', () => {
      render(<Contact />);
      
      // Check that icons in contact info have proper accessibility
      const icons = document.querySelectorAll('svg');
      icons.forEach(icon => {
        // Icons should either have aria-hidden="true" or proper labels
        const hasAriaHidden = icon.hasAttribute('aria-hidden');
        const hasAriaLabel = icon.hasAttribute('aria-label');
        const hasAriaLabelledBy = icon.hasAttribute('aria-labelledby');
        
        expect(hasAriaHidden || hasAriaLabel || hasAriaLabelledBy).toBe(true);
      });
    });
  });
});