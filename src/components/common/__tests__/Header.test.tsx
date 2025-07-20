import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import Header from '../Header';
import { NavMenuItem } from '../../../types';

// Mock smooth scrolling
const mockScrollTo = vi.fn();
const mockGetBoundingClientRect = vi.fn().mockReturnValue({ top: 100 });

Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
});

const mockNavigation: NavMenuItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
];

describe('Header Component', () => {
  beforeEach(() => {
    mockScrollTo.mockClear();
    mockGetBoundingClientRect.mockClear();
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    
    // Reset document.querySelector mock
    vi.restoreAllMocks();
  });

  afterEach(() => {
    // Clean up any remaining mocks and timers
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Header />);
      
      expect(screen.getByText('Life Coach')).toBeInTheDocument();
      expect(screen.getAllByText('Home')).toHaveLength(2); // Desktop and mobile
      expect(screen.getAllByText('About')).toHaveLength(2);
      expect(screen.getAllByText('Services')).toHaveLength(2);
      expect(screen.getAllByText('Testimonials')).toHaveLength(2);
      expect(screen.getAllByText('Blog')).toHaveLength(2);
      expect(screen.getAllByText('Contact')).toHaveLength(2);
    });

    it('renders with custom site name', () => {
      render(<Header siteName="Custom Coach" />);
      
      expect(screen.getByText('Custom Coach')).toBeInTheDocument();
    });

    it('renders with custom navigation', () => {
      render(<Header navigation={mockNavigation} />);
      
      expect(screen.getAllByText('Home')).toHaveLength(2); // Desktop and mobile
      expect(screen.getAllByText('About')).toHaveLength(2);
      expect(screen.getAllByText('Services')).toHaveLength(2);
      expect(screen.queryByText('Testimonials')).not.toBeInTheDocument();
    });

    it('renders logo when provided', () => {
      render(<Header logo="/test-logo.png" siteName="Test Coach" />);
      
      const logo = screen.getByAltText('Test Coach logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/test-logo.png');
    });
  });

  describe('Desktop Navigation', () => {
    it('shows desktop navigation on larger screens', () => {
      render(<Header navigation={mockNavigation} />);
      
      const desktopNav = screen.getAllByRole('navigation')[0]; // First nav is desktop
      expect(desktopNav).toHaveClass('hidden', 'md:flex');
    });

    it('handles navigation click with smooth scroll', async () => {
      // Create a mock element with getBoundingClientRect method
      const mockElement = {
        getBoundingClientRect: () => ({ top: 100 })
      };
      
      // Mock document.querySelector to return our mock element
      vi.spyOn(document, 'querySelector').mockReturnValue(mockElement as HTMLElement);

      render(<Header navigation={mockNavigation} />);
      
      const desktopNav = screen.getAllByRole('navigation')[0]; // First nav is desktop
      const homeButton = desktopNav.querySelector('button') as HTMLButtonElement;
      
      await userEvent.click(homeButton);
      
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 90, // 100 (element top) + 0 (scrollY) - 10 (headerHeight for home)
        behavior: 'smooth'
      });
    });

    it('applies hover effects to navigation items', () => {
      render(<Header navigation={mockNavigation} />);
      
      const desktopNav = screen.getAllByRole('navigation')[0]; // First nav is desktop
      const homeButton = desktopNav.querySelector('button') as HTMLButtonElement;
      expect(homeButton).toHaveClass('hover:text-blue-600');
    });
  });

  describe('Mobile Navigation', () => {
    it('shows hamburger menu button on mobile', () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveClass('md:hidden');
    });

    it('toggles mobile menu when hamburger button is clicked', async () => {
      render(<Header navigation={mockNavigation} />);
      
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      const mobileMenu = screen.getAllByRole('navigation')[1]; // Second nav is mobile
      
      // Initially closed
      expect(mobileMenu.parentElement).toHaveClass('max-h-0', 'opacity-0', 'invisible');
      
      // Open menu
      await userEvent.click(menuButton);
      expect(mobileMenu.parentElement).toHaveClass('max-h-96', 'opacity-100', 'visible');
      
      // Close menu
      await userEvent.click(menuButton);
      expect(mobileMenu.parentElement).toHaveClass('max-h-0', 'opacity-0', 'invisible');
    });

    it('closes mobile menu when navigation item is clicked', async () => {
      // Create a mock element with getBoundingClientRect method
      const mockElement = {
        getBoundingClientRect: () => ({ top: 100 })
      };
      
      // Mock document.querySelector to return our mock element
      vi.spyOn(document, 'querySelector').mockReturnValue(mockElement as HTMLElement);

      render(<Header navigation={mockNavigation} />);
      
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      await userEvent.click(menuButton);
      
      const mobileMenu = screen.getAllByRole('navigation')[1]; // Second nav is mobile
      expect(mobileMenu.parentElement).toHaveClass('max-h-96', 'opacity-100', 'visible');
      
      // Click on a navigation item in mobile menu
      const mobileHomeButton = mobileMenu.querySelector('button') as HTMLButtonElement;
      await userEvent.click(mobileHomeButton);
      
      // Wait for the menu to close
      await waitFor(() => {
        expect(mobileMenu.parentElement).toHaveClass('max-h-0', 'opacity-0', 'invisible');
      }, { timeout: 1000 });
    });

    it('updates hamburger icon animation when menu is open', async () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      const hamburgerLines = menuButton.querySelectorAll('span');
      
      // Initially closed state
      expect(hamburgerLines[0]).toHaveClass('-translate-y-1');
      expect(hamburgerLines[1]).toHaveClass('opacity-100');
      expect(hamburgerLines[2]).toHaveClass('translate-y-1');
      
      // Open menu
      await userEvent.click(menuButton);
      
      expect(hamburgerLines[0]).toHaveClass('rotate-45', 'translate-y-1');
      expect(hamburgerLines[1]).toHaveClass('opacity-0');
      expect(hamburgerLines[2]).toHaveClass('-rotate-45', '-translate-y-1');
    });
  });

  describe('Scroll Effects', () => {
    it('applies scroll effect when page is scrolled', async () => {
      render(<Header />);
      
      const header = screen.getByRole('banner');
      
      // Initially not scrolled
      expect(header).toHaveClass('bg-white/95');
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
      fireEvent.scroll(window);
      
      await waitFor(() => {
        expect(header).toHaveClass('bg-white', 'shadow-md');
      });
    });

    it('removes scroll effect when back at top', async () => {
      render(<Header />);
      
      const header = screen.getByRole('banner');
      
      // Simulate scroll down
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
      fireEvent.scroll(window);
      
      await waitFor(() => {
        expect(header).toHaveClass('bg-white', 'shadow-md');
      });
      
      // Simulate scroll back to top
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      fireEvent.scroll(window);
      
      await waitFor(() => {
        expect(header).toHaveClass('bg-white/95');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes for mobile menu button', () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded when mobile menu is toggled', async () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      
      await userEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      
      await userEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('has proper alt text for logo', () => {
      render(<Header logo="/test-logo.png" siteName="Test Coach" />);
      
      const logo = screen.getByAltText('Test Coach logo');
      expect(logo).toBeInTheDocument();
    });
  });

  describe('Click Outside Behavior', () => {
    it('closes mobile menu when clicking outside', async () => {
      render(
        <div>
          <Header navigation={mockNavigation} />
          <div data-testid="outside-element">Outside content</div>
        </div>
      );
      
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      const outsideElement = screen.getByTestId('outside-element');
      
      // Open menu
      await userEvent.click(menuButton);
      const mobileMenu = screen.getAllByRole('navigation')[1]; // Second nav is mobile
      expect(mobileMenu.parentElement).toHaveClass('max-h-96', 'opacity-100', 'visible');
      
      // Click outside
      await userEvent.click(outsideElement);
      expect(mobileMenu.parentElement).toHaveClass('max-h-0', 'opacity-0', 'invisible');
    });

    it('does not close menu when clicking on menu itself', async () => {
      render(<Header navigation={mockNavigation} />);
      
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      
      // Open menu
      await userEvent.click(menuButton);
      const mobileMenu = screen.getAllByRole('navigation')[1]; // Second nav is mobile
      expect(mobileMenu.parentElement).toHaveClass('max-h-96', 'opacity-100', 'visible');
      
      // Click on menu container
      await userEvent.click(mobileMenu.parentElement!);
      expect(mobileMenu.parentElement).toHaveClass('max-h-96', 'opacity-100', 'visible');
    });
  });

  describe('Error Handling', () => {
    it('handles missing scroll target gracefully', async () => {
      vi.spyOn(document, 'querySelector').mockReturnValue(null);
      
      render(<Header navigation={mockNavigation} />);
      
      const desktopNav = screen.getAllByRole('navigation')[0]; // First nav is desktop
      const homeButton = desktopNav.querySelector('button') as HTMLButtonElement;
      
      // Should not throw error when element is not found
      expect(() => userEvent.click(homeButton)).not.toThrow();
    });
  });
});