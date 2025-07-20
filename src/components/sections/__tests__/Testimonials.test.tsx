import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Testimonials from '../Testimonials';
import { Testimonial } from '../../../types';
import { loadTestimonials } from '../../../utils/contentManager';

// Mock contentManager
vi.mock('../../../utils/contentManager', () => ({
  loadTestimonials: vi.fn()
}));

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    content: 'Amazing coaching experience that transformed my career.',
    outcome: 'Landed dream job in 3 months',
    rating: 5,
    clientTitle: 'Marketing Manager',
    location: 'Austin, TX'
  },
  {
    id: '2',
    clientName: 'Maria Rodriguez',
    content: 'Gained confidence and clarity about my career path.',
    outcome: 'Started successful consulting business',
    rating: 5,
    clientTitle: 'Business Consultant',
    location: 'Denver, CO'
  },
  {
    id: '3',
    clientName: 'Jennifer Chen',
    content: 'The support and guidance were exactly what I needed.',
    outcome: 'Transitioned to tech industry successfully',
    rating: 4,
    clientTitle: 'Software Developer',
    location: 'Seattle, WA'
  }
];

// Mock timers for auto-rotation testing
beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
  // Default mock implementation
  vi.mocked(loadTestimonials).mockResolvedValue(mockTestimonials);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('Testimonials', () => {
  it('renders section header correctly', () => {
    render(<Testimonials testimonials={mockTestimonials} />);
    
    expect(screen.getByText('Client Success Stories')).toBeInTheDocument();
    expect(screen.getByText(/See how our coaching has helped women successfully transition/)).toBeInTheDocument();
  });

  it('renders first testimonial by default', () => {
    render(<Testimonials testimonials={mockTestimonials} />);
    
    expect(screen.getByText('"Amazing coaching experience that transformed my career."')).toBeInTheDocument();
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
  });

  it('displays navigation controls when multiple testimonials exist', () => {
    render(<Testimonials testimonials={mockTestimonials} />);
    
    expect(screen.getByLabelText('Previous testimonial')).toBeInTheDocument();
    expect(screen.getByLabelText('Next testimonial')).toBeInTheDocument();
    
    // Should have 3 dot indicators
    const dots = screen.getAllByLabelText(/Go to testimonial/);
    expect(dots).toHaveLength(3);
  });

  it('hides navigation when showNavigation is false', () => {
    render(<Testimonials testimonials={mockTestimonials} showNavigation={false} />);
    
    expect(screen.queryByLabelText('Previous testimonial')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next testimonial')).not.toBeInTheDocument();
  });

  it('navigates to next testimonial when next button is clicked', () => {
    render(<Testimonials testimonials={mockTestimonials} autoRotate={false} />);
    
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('"Gained confidence and clarity about my career path."')).toBeInTheDocument();
    expect(screen.getByText('Maria Rodriguez')).toBeInTheDocument();
  });

  it('navigates to previous testimonial when previous button is clicked', () => {
    render(<Testimonials testimonials={mockTestimonials} autoRotate={false} />);
    
    // First go to next testimonial
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);
    
    // Then go back to previous
    const prevButton = screen.getByLabelText('Previous testimonial');
    fireEvent.click(prevButton);
    
    expect(screen.getByText('"Amazing coaching experience that transformed my career."')).toBeInTheDocument();
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
  });

  it('wraps around when navigating past the last testimonial', () => {
    render(<Testimonials testimonials={mockTestimonials} autoRotate={false} />);
    
    const nextButton = screen.getByLabelText('Next testimonial');
    
    // Click next 3 times to wrap around
    fireEvent.click(nextButton); // Go to testimonial 2
    fireEvent.click(nextButton); // Go to testimonial 3
    fireEvent.click(nextButton); // Should wrap to testimonial 1
    
    expect(screen.getByText('"Amazing coaching experience that transformed my career."')).toBeInTheDocument();
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
  });

  it('wraps around when navigating before the first testimonial', () => {
    render(<Testimonials testimonials={mockTestimonials} autoRotate={false} />);
    
    const prevButton = screen.getByLabelText('Previous testimonial');
    fireEvent.click(prevButton); // Should wrap to last testimonial
    
    expect(screen.getByText('"The support and guidance were exactly what I needed."')).toBeInTheDocument();
    expect(screen.getByText('Jennifer Chen')).toBeInTheDocument();
  });

  it('navigates to specific testimonial when dot indicator is clicked', () => {
    render(<Testimonials testimonials={mockTestimonials} autoRotate={false} />);
    
    const thirdDot = screen.getByLabelText('Go to testimonial 3');
    fireEvent.click(thirdDot);
    
    expect(screen.getByText('"The support and guidance were exactly what I needed."')).toBeInTheDocument();
    expect(screen.getByText('Jennifer Chen')).toBeInTheDocument();
  });

  it('auto-rotates testimonials when autoRotate is enabled', async () => {
    const { unmount } = render(<Testimonials testimonials={mockTestimonials} autoRotate={true} rotationInterval={100} />);
    
    // Initially shows first testimonial
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    
    // Verify that setInterval was called
    expect(vi.getTimerCount()).toBeGreaterThan(0);
    
    // Clean up
    unmount();
  });

  it('stops auto-rotation when user manually navigates', async () => {
    render(<Testimonials testimonials={mockTestimonials} autoRotate={true} rotationInterval={1000} />);
    
    // Click next button to manually navigate
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('Maria Rodriguez')).toBeInTheDocument();
    
    // Fast-forward time - should not auto-rotate anymore
    vi.advanceTimersByTime(2000);
    
    // Should still be on the same testimonial
    expect(screen.getByText('Maria Rodriguez')).toBeInTheDocument();
  });

  it('toggles auto-rotation when pause/resume button is clicked', () => {
    render(<Testimonials testimonials={mockTestimonials} autoRotate={true} />);
    
    const toggleButton = screen.getByText('Pause auto-rotation');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('Resume auto-rotation')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Resume auto-rotation'));
    expect(screen.getByText('Pause auto-rotation')).toBeInTheDocument();
  });

  it('renders call-to-action section', () => {
    render(<Testimonials testimonials={mockTestimonials} />);
    
    expect(screen.getByText('Ready to write your own success story?')).toBeInTheDocument();
    expect(screen.getByText('Start Your Journey')).toBeInTheDocument();
    
    const ctaLink = screen.getByRole('link', { name: /Start Your Journey/ });
    expect(ctaLink).toHaveAttribute('href', '#contact');
  });

  it('renders fallback UI when no testimonials are provided', () => {
    render(<Testimonials testimonials={[]} />);
    expect(screen.getByText('Testimonials Coming Soon')).toBeInTheDocument();
    expect(screen.getByText(/We're collecting success stories from our clients/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /be our next success story/i })).toBeInTheDocument();
  });

  it('hides navigation controls when only one testimonial exists', () => {
    const singleTestimonial = [mockTestimonials[0]];
    render(<Testimonials testimonials={singleTestimonial} />);
    
    expect(screen.queryByLabelText('Previous testimonial')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next testimonial')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Go to testimonial/)).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Testimonials testimonials={mockTestimonials} className="custom-testimonials" />
    );
    
    expect(container.firstChild).toHaveClass('custom-testimonials');
  });

  it('uses default testimonials when none provided', async () => {
    // Use real timers for this test since it involves async loading
    vi.useRealTimers();
    
    render(<Testimonials />);
    
    // Should render with default testimonials
    expect(screen.getByText('Client Success Stories')).toBeInTheDocument();
    
    // Wait for testimonials to load
    await waitFor(() => {
      // Check that at least one of the default testimonials is visible (only one is shown at a time)
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    });
    
    // Restore fake timers for other tests
    vi.useFakeTimers();
  });
});