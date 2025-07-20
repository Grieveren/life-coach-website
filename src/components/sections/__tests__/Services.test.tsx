import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Services from '../Services';
import { loadServices } from '../../../utils/contentManager';

// Mock contentManager
vi.mock('../../../utils/contentManager', () => ({
  loadServices: vi.fn(),
  contentManager: {
    loadServices: vi.fn()
  }
}));

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

const mockServices = [
  {
    id: '1',
    title: 'Career Transition Coaching',
    description: 'Helping professionals transition into new careers.',
    features: ['Resume and LinkedIn profile optimization'],
    duration: '3 months',
    price: '$297/month',
    category: 'individual',
    availability: true,
    callToAction: 'Start Your Journey',
    targetAudience: 'For: Women returning to work after childbirth'
  },
  {
    id: '2',
    title: 'Return to Work Group Program',
    description: 'Support for women returning to the workforce.',
    features: ['Weekly group coaching sessions'],
    duration: '8 weeks',
    price: '$197/month',
    category: 'group',
    availability: true,
    callToAction: 'Join the Community',
    targetAudience: 'For: Women ready to return to work'
  },
  {
    id: '3',
    title: 'Confidence Building Workshop',
    description: 'Building confidence with practical exercises.',
    features: ['Interactive confidence-building exercises'],
    duration: '1 day intensive',
    price: '$147',
    category: 'workshop',
    availability: true,
    callToAction: 'Book Workshop',
    targetAudience: 'For: Women lacking professional confidence'
  },
  {
    id: '4',
    title: 'Complete Career Transformation',
    description: 'Comprehensive support for career change.',
    features: ['6-month success guarantee'],
    duration: '6 months',
    price: '$1,497 (Save $500)',
    category: 'package',
    availability: true,
    callToAction: 'Transform Your Career',
    targetAudience: 'For: Women committed to career transformation'
  }
];

describe('Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up the mock to return services
    vi.mocked(loadServices).mockResolvedValue(mockServices);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders services section with proper structure', async () => {
    await act(async () => {
      render(<Services />);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('services-section')).toBeInTheDocument();
    });
    
    expect(screen.getByTestId('services-title')).toHaveTextContent('Coaching Services');
    expect(screen.getByTestId('services-subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('services-grid')).toBeInTheDocument();
  });

  it('shows loading state while services are being fetched', async () => {
    // Mock the loadServices to be slow
    vi.mocked(loadServices).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockServices), 100))
    );
    
    const { rerender } = render(<Services />);
    
    // Should show loading state initially
    expect(screen.getByText('Loading Services...')).toBeInTheDocument();
    
    // Wait for services to load
    await waitFor(() => {
      expect(screen.queryByText('Loading Services...')).not.toBeInTheDocument();
      expect(screen.getByText('Career Transition Coaching')).toBeInTheDocument();
    });
  });

  it('handles error when loading services fails', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    vi.mocked(loadServices).mockRejectedValue(new Error('Failed to load services'));
    
    await act(async () => {
      render(<Services />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load services. Please try again later.')).toBeInTheDocument();
    });
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load services:', expect.any(Error));
    
    consoleErrorSpy.mockRestore();
  });
});
