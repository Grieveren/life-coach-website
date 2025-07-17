import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TestimonialCard from '../TestimonialCard';
import { Testimonial } from '../../../types';

const mockTestimonial: Testimonial = {
  id: '1',
  clientName: 'Jane Doe',
  content: 'This coaching program changed my life completely. I gained confidence and clarity.',
  outcome: 'Successfully transitioned to a new career in tech',
  rating: 5,
  clientTitle: 'Software Developer',
  location: 'San Francisco, CA',
  serviceUsed: 'Career Transition Package',
  clientPhoto: 'https://example.com/photo.jpg'
};

describe('TestimonialCard', () => {
  it('renders testimonial content correctly', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    expect(screen.getByText('"This coaching program changed my life completely. I gained confidence and clarity."')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
  });

  it('displays star rating when showRating is true', () => {
    render(<TestimonialCard testimonial={mockTestimonial} showRating={true} />);
    
    expect(screen.getByText('5/5')).toBeInTheDocument();
    // Check for star rating container
    const ratingContainer = screen.getByText('5/5').closest('div');
    expect(ratingContainer).toBeInTheDocument();
  });

  it('hides star rating when showRating is false', () => {
    render(<TestimonialCard testimonial={mockTestimonial} showRating={false} />);
    
    expect(screen.queryByText('5/5')).not.toBeInTheDocument();
  });

  it('displays client photo when showPhoto is true and photo exists', () => {
    render(<TestimonialCard testimonial={mockTestimonial} showPhoto={true} />);
    
    const photo = screen.getByAltText('Jane Doe');
    expect(photo).toBeInTheDocument();
    expect(photo).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('hides client photo when showPhoto is false', () => {
    render(<TestimonialCard testimonial={mockTestimonial} showPhoto={false} />);
    
    expect(screen.queryByAltText('Jane Doe')).not.toBeInTheDocument();
  });

  it('displays outcome when provided', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    expect(screen.getByText('Result:')).toBeInTheDocument();
    expect(screen.getByText('Successfully transitioned to a new career in tech')).toBeInTheDocument();
  });

  it('displays service used when provided', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    expect(screen.getByText('Service:')).toBeInTheDocument();
    expect(screen.getByText('Career Transition Package')).toBeInTheDocument();
  });

  it('handles testimonial without optional fields', () => {
    const minimalTestimonial: Testimonial = {
      id: '2',
      clientName: 'John Smith',
      content: 'Great experience overall.'
    };

    render(<TestimonialCard testimonial={minimalTestimonial} />);
    
    expect(screen.getByText('"Great experience overall."')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.queryByText('Result:')).not.toBeInTheDocument();
    expect(screen.queryByText('Service:')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <TestimonialCard testimonial={mockTestimonial} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders testimonial without rating when rating is not provided', () => {
    const testimonialWithoutRating: Testimonial = {
      ...mockTestimonial,
      rating: undefined
    };

    render(<TestimonialCard testimonial={testimonialWithoutRating} />);
    
    expect(screen.queryByText('/5')).not.toBeInTheDocument();
  });

  it('renders correct number of filled and empty stars', () => {
    const testimonialWith3Stars: Testimonial = {
      ...mockTestimonial,
      rating: 3
    };

    render(<TestimonialCard testimonial={testimonialWith3Stars} />);
    
    expect(screen.getByText('3/5')).toBeInTheDocument();
  });
});