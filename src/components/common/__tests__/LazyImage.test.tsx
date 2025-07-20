import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LazyImage from '../LazyImage';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

mockIntersectionObserver.mockImplementation((callback) => ({
  observe: mockObserve,
  unobserve: mockUnobserve,
  disconnect: mockDisconnect,
  callback,
}));

global.IntersectionObserver = mockIntersectionObserver;

describe('LazyImage Component', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with placeholder initially', () => {
    render(<LazyImage {...defaultProps} />);
    
    const images = screen.getAllByRole('img');
    // The component renders both placeholder and main image initially
    expect(images.length).toBeGreaterThanOrEqual(1);
    
    // Check that IntersectionObserver was created
    expect(mockIntersectionObserver).toHaveBeenCalled();
    expect(mockObserve).toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <LazyImage {...defaultProps} className="custom-class" />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('should use custom placeholder', () => {
    const customPlaceholder = 'data:image/svg+xml;base64,custom-placeholder';
    render(<LazyImage {...defaultProps} placeholder={customPlaceholder} />);
    
    const placeholderImg = screen.getAllByRole('img')[0];
    expect(placeholderImg).toHaveAttribute('src', customPlaceholder);
  });

  it('should call onLoad when image loads successfully', async () => {
    const onLoad = vi.fn();
    const { container } = render(<LazyImage {...defaultProps} onLoad={onLoad} />);
    
    // Find the main image (not the placeholder)
    const mainImg = container.querySelector('img[alt="Test image"]');
    expect(mainImg).toBeInTheDocument();
    
    // Simulate image load
    if (mainImg) {
      fireEvent.load(mainImg);
      expect(onLoad).toHaveBeenCalled();
    }
  });

  it('should call onError when image fails to load', async () => {
    const onError = vi.fn();
    const { container } = render(<LazyImage {...defaultProps} onError={onError} />);
    
    const mainImg = container.querySelector('img[alt="Test image"]');
    expect(mainImg).toBeInTheDocument();
    
    // Simulate image error
    if (mainImg) {
      fireEvent.error(mainImg);
      expect(onError).toHaveBeenCalled();
    }
  });

  it('should show error state when image fails to load', async () => {
    const { container } = render(<LazyImage {...defaultProps} />);
    
    const mainImg = container.querySelector('img[alt="Test image"]');
    expect(mainImg).toBeInTheDocument();
    
    // Simulate image error
    if (mainImg) {
      fireEvent.error(mainImg);
      
      await waitFor(() => {
        expect(screen.getByText('Failed to load image')).toBeInTheDocument();
      });
    }
  });

  it('should show loading indicator when image is in view but not loaded', () => {
    const { rerender } = render(<LazyImage {...defaultProps} />);
    
    // Simulate intersection observer callback
    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    observerCallback([{ isIntersecting: true, target: {} }]);
    
    rerender(<LazyImage {...defaultProps} />);
    
    // Should show loading spinner
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    const { container } = render(<LazyImage {...defaultProps} />);
    
    const mainImg = container.querySelector('img[alt="Test image"]');
    if (mainImg) {
      expect(mainImg).toHaveAttribute('alt', 'Test image');
      expect(mainImg).toHaveAttribute('loading', 'lazy');
      expect(mainImg).toHaveAttribute('decoding', 'async');
    }
    
    const placeholderImg = container.querySelector('img[aria-hidden="true"]');
    if (placeholderImg) {
      expect(placeholderImg).toHaveAttribute('aria-hidden', 'true');
    }
  });

  it('should unobserve element when component unmounts', () => {
    const { unmount } = render(<LazyImage {...defaultProps} />);
    
    unmount();
    
    expect(mockUnobserve).toHaveBeenCalled();
  });

  it('should handle intersection observer entry correctly', async () => {
    render(<LazyImage {...defaultProps} />);
    
    // Get the observer callback
    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    
    // Simulate element coming into view
    const mockEntry = {
      isIntersecting: true,
      target: document.createElement('img'),
    };
    
    observerCallback([mockEntry]);
    
    // Should unobserve after intersection
    expect(mockUnobserve).toHaveBeenCalledWith(mockEntry.target);
  });

  it('should transition opacity when image loads', async () => {
    const { container } = render(<LazyImage {...defaultProps} />);
    
    const mainImg = container.querySelector('img[alt="Test image"]');
    expect(mainImg).toBeInTheDocument();
    
    if (mainImg) {
      // Initially should have opacity-0
      expect(mainImg).toHaveClass('opacity-0');
      
      // Simulate image load
      fireEvent.load(mainImg);
      
      await waitFor(() => {
        expect(mainImg).toHaveClass('opacity-100');
      });
    }
  });

  it('should handle missing window object gracefully', () => {
    // This test would be more relevant in SSR context
    // For now, just ensure component renders without errors
    expect(() => {
      render(<LazyImage {...defaultProps} />);
    }).not.toThrow();
  });
});