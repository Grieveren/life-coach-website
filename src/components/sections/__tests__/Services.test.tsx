import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Services from '../Services';

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

describe('Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders services section with proper structure', () => {
    render(<Services />);
    
    expect(screen.getByTestId('services-section')).toBeInTheDocument();
    expect(screen.getByTestId('services-title')).toHaveTextContent('Coaching Services');
    expect(screen.getByTestId('services-subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('services-grid')).toBeInTheDocument();
  });

  it('renders all service cards', () => {
    render(<Services />);
    
    const serviceCards = screen.getAllByTestId('service-card');
    expect(serviceCards).toHaveLength(4);
    
    // Check that all expected services are rendered
    expect(screen.getByText('Career Transition Coaching')).toBeInTheDocument();
    expect(screen.getByText('Return to Work Group Program')).toBeInTheDocument();
    expect(screen.getByText('Confidence Building Workshop')).toBeInTheDocument();
    expect(screen.getByText('Complete Career Transformation')).toBeInTheDocument();
  });

  it('renders service cards with correct categories', () => {
    render(<Services />);
    
    expect(screen.getByText('Individual')).toBeInTheDocument();
    expect(screen.getByText('Group')).toBeInTheDocument();
    expect(screen.getByText('Workshop')).toBeInTheDocument();
    expect(screen.getByText('Package')).toBeInTheDocument();
  });

  it('renders service cards with pricing information', () => {
    render(<Services />);
    
    expect(screen.getByText('Starting at $297/month')).toBeInTheDocument();
    expect(screen.getByText('$197/month')).toBeInTheDocument();
    expect(screen.getByText('$147')).toBeInTheDocument();
    expect(screen.getByText('$1,497 (Save $500)')).toBeInTheDocument();
  });

  it('renders service cards with duration information', () => {
    render(<Services />);
    
    expect(screen.getByText('Duration: 3 months')).toBeInTheDocument();
    expect(screen.getByText('Duration: 8 weeks')).toBeInTheDocument();
    expect(screen.getByText('Duration: 1 day intensive')).toBeInTheDocument();
    expect(screen.getByText('Duration: 6 months')).toBeInTheDocument();
  });

  it('renders target audience information for each service', () => {
    render(<Services />);
    
    expect(screen.getByText('For: Women returning to work after childbirth')).toBeInTheDocument();
    expect(screen.getByText('For: Women ready to return to work')).toBeInTheDocument();
    expect(screen.getByText('For: Women lacking professional confidence')).toBeInTheDocument();
    expect(screen.getByText('For: Women committed to career transformation')).toBeInTheDocument();
  });

  it('renders custom call-to-action buttons for each service', () => {
    render(<Services />);
    
    expect(screen.getByText('Start Your Journey')).toBeInTheDocument();
    expect(screen.getByText('Join the Community')).toBeInTheDocument();
    expect(screen.getByText('Book Workshop')).toBeInTheDocument();
    expect(screen.getByText('Transform Your Career')).toBeInTheDocument();
  });

  it('renders consultation CTA section', () => {
    render(<Services />);
    
    expect(screen.getByText('Not sure which program is right for you?')).toBeInTheDocument();
    expect(screen.getByTestId('services-consultation-cta')).toHaveTextContent('Schedule Free Consultation');
  });

  it('handles consultation CTA button click', () => {
    const mockContactElement = document.createElement('div');
    mockGetElementById.mockReturnValue(mockContactElement);
    
    render(<Services />);
    
    const consultationButton = screen.getByTestId('services-consultation-cta');
    fireEvent.click(consultationButton);
    
    expect(mockGetElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('handles missing contact section gracefully for consultation CTA', () => {
    mockGetElementById.mockReturnValue(null);
    
    render(<Services />);
    
    const consultationButton = screen.getByTestId('services-consultation-cta');
    fireEvent.click(consultationButton);
    
    expect(mockGetElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it('has proper section ID for navigation', () => {
    render(<Services />);
    
    const servicesSection = screen.getByTestId('services-section');
    expect(servicesSection).toHaveAttribute('id', 'services');
  });

  it('applies custom className when provided', () => {
    render(<Services className="custom-services-class" />);
    
    const servicesSection = screen.getByTestId('services-section');
    expect(servicesSection).toHaveClass('custom-services-class');
  });

  it('has responsive grid layout classes', () => {
    render(<Services />);
    
    const servicesGrid = screen.getByTestId('services-grid');
    expect(servicesGrid).toHaveClass(
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-2',
      'xl:grid-cols-2',
      'gap-8'
    );
  });

  it('renders service features correctly', () => {
    render(<Services />);
    
    // Check some key features from different services
    expect(screen.getByText('Resume and LinkedIn profile optimization')).toBeInTheDocument();
    expect(screen.getByText('Weekly group coaching sessions')).toBeInTheDocument();
    expect(screen.getByText('Interactive confidence-building exercises')).toBeInTheDocument();
    expect(screen.getByText('6-month success guarantee')).toBeInTheDocument();
  });

  it('has proper background styling', () => {
    render(<Services />);
    
    const servicesSection = screen.getByTestId('services-section');
    expect(servicesSection).toHaveClass('bg-gray-50');
  });

  it('service cards have equal height styling', () => {
    render(<Services />);
    
    const serviceCards = screen.getAllByTestId('service-card');
    serviceCards.forEach(card => {
      expect(card).toHaveClass('h-full');
    });
  });
});