import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ServiceCard from '../ServiceCard';
import { Service } from '../../../types';

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

describe('ServiceCard', () => {
  const mockService: Service = {
    id: 'test-service',
    title: 'Test Coaching Service',
    description: 'This is a test coaching service description.',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3'
    ],
    duration: '3 months',
    price: '$297/month',
    category: 'individual',
    targetAudience: 'Test audience',
    callToAction: 'Get Started'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders service card with all basic information', () => {
    render(<ServiceCard service={mockService} />);
    
    expect(screen.getByTestId('service-card')).toBeInTheDocument();
    expect(screen.getByTestId('service-title')).toHaveTextContent('Test Coaching Service');
    expect(screen.getByTestId('service-description')).toHaveTextContent('This is a test coaching service description.');
    expect(screen.getByTestId('service-duration')).toHaveTextContent('Duration: 3 months');
    expect(screen.getByTestId('service-price')).toHaveTextContent('$297/month');
  });

  it('renders category badge with correct styling', () => {
    render(<ServiceCard service={mockService} />);
    
    const categoryBadge = screen.getByTestId('service-category');
    expect(categoryBadge).toHaveTextContent('Individual');
    expect(categoryBadge).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('renders different category colors correctly', () => {
    const groupService = { ...mockService, category: 'group' as const };
    const { rerender } = render(<ServiceCard service={groupService} />);
    
    expect(screen.getByTestId('service-category')).toHaveClass('bg-green-100', 'text-green-800');
    
    const workshopService = { ...mockService, category: 'workshop' as const };
    rerender(<ServiceCard service={workshopService} />);
    expect(screen.getByTestId('service-category')).toHaveClass('bg-purple-100', 'text-purple-800');
    
    const packageService = { ...mockService, category: 'package' as const };
    rerender(<ServiceCard service={packageService} />);
    expect(screen.getByTestId('service-category')).toHaveClass('bg-orange-100', 'text-orange-800');
  });

  it('renders target audience when provided', () => {
    render(<ServiceCard service={mockService} />);
    
    const audience = screen.getByTestId('service-audience');
    expect(audience).toHaveTextContent('For: Test audience');
  });

  it('renders features list with checkmark icons', () => {
    render(<ServiceCard service={mockService} />);
    
    const featuresList = screen.getByTestId('service-features');
    expect(featuresList).toBeInTheDocument();
    
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
    
    // Check that checkmark icons are present
    const checkmarkIcons = featuresList.querySelectorAll('svg');
    expect(checkmarkIcons).toHaveLength(3);
  });

  it('renders custom call-to-action text', () => {
    render(<ServiceCard service={mockService} />);
    
    const ctaButton = screen.getByTestId('service-cta');
    expect(ctaButton).toHaveTextContent('Get Started');
  });

  it('uses default call-to-action when not provided', () => {
    const serviceWithoutCTA = { ...mockService };
    delete serviceWithoutCTA.callToAction;
    
    render(<ServiceCard service={serviceWithoutCTA} />);
    
    const ctaButton = screen.getByTestId('service-cta');
    expect(ctaButton).toHaveTextContent('Learn More');
  });

  it('handles click on call-to-action button', () => {
    const mockContactElement = document.createElement('div');
    mockGetElementById.mockReturnValue(mockContactElement);
    
    render(<ServiceCard service={mockService} />);
    
    const ctaButton = screen.getByTestId('service-cta');
    fireEvent.click(ctaButton);
    
    expect(mockGetElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('handles missing contact section gracefully', () => {
    mockGetElementById.mockReturnValue(null);
    
    render(<ServiceCard service={mockService} />);
    
    const ctaButton = screen.getByTestId('service-cta');
    fireEvent.click(ctaButton);
    
    expect(mockGetElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it('renders without optional fields', () => {
    const minimalService: Service = {
      id: 'minimal-service',
      title: 'Minimal Service',
      description: 'Basic description',
      features: []
    };
    
    render(<ServiceCard service={minimalService} />);
    
    expect(screen.getByTestId('service-title')).toHaveTextContent('Minimal Service');
    expect(screen.getByTestId('service-description')).toHaveTextContent('Basic description');
    expect(screen.queryByTestId('service-category')).not.toBeInTheDocument();
    expect(screen.queryByTestId('service-audience')).not.toBeInTheDocument();
    expect(screen.queryByTestId('service-duration')).not.toBeInTheDocument();
    expect(screen.queryByTestId('service-price')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ServiceCard service={mockService} className="custom-class" />);
    
    const serviceCard = screen.getByTestId('service-card');
    expect(serviceCard).toHaveClass('custom-class');
  });

  it('has proper hover effects and accessibility', () => {
    render(<ServiceCard service={mockService} />);
    
    const serviceCard = screen.getByTestId('service-card');
    expect(serviceCard).toHaveClass('hover:shadow-lg', 'transition-shadow');
    
    const ctaButton = screen.getByTestId('service-cta');
    expect(ctaButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');
  });

  it('renders empty features list when features array is empty', () => {
    const serviceWithoutFeatures = { ...mockService, features: [] };
    render(<ServiceCard service={serviceWithoutFeatures} />);
    
    expect(screen.queryByTestId('service-features')).not.toBeInTheDocument();
    expect(screen.queryByText('What\'s Included:')).not.toBeInTheDocument();
  });
});