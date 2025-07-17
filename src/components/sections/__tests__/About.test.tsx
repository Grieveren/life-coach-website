import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../About';

describe('About Component', () => {
  it('renders with default props', () => {
    render(<About />);
    
    // Check for main heading
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument();
    
    // Check for default name and title
    expect(screen.getByText('Andrea Gray')).toBeInTheDocument();
    expect(screen.getByText('Certified Life Coach & Career Transition Specialist')).toBeInTheDocument();
    
    // Check for section headings
    expect(screen.getByText('Professional Background')).toBeInTheDocument();
    expect(screen.getByText('My Story')).toBeInTheDocument();
    expect(screen.getByText('Certifications & Qualifications')).toBeInTheDocument();
  });

  it('renders custom props correctly', () => {
    const customProps = {
      name: 'Jane Smith',
      title: 'Senior Life Coach',
      bio: 'Custom bio text for testing',
      personalStory: 'Custom personal story for testing',
      certifications: ['Test Certification 1', 'Test Certification 2'],
      experience: '10+ years in Coaching',
      credentials: ['Test Credential 1', 'Test Credential 2']
    };

    render(<About {...customProps} />);
    
    // Check custom name and title
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Senior Life Coach')).toBeInTheDocument();
    
    // Check custom bio and story
    expect(screen.getByText('Custom bio text for testing')).toBeInTheDocument();
    expect(screen.getByText('Custom personal story for testing')).toBeInTheDocument();
    
    // Check custom certifications
    expect(screen.getByText('Test Certification 1')).toBeInTheDocument();
    expect(screen.getByText('Test Certification 2')).toBeInTheDocument();
    
    // Check custom credentials
    expect(screen.getByText('Test Credential 1')).toBeInTheDocument();
    expect(screen.getByText('Test Credential 2')).toBeInTheDocument();
    
    // Check experience badge
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
  });

  it('renders default certifications when none provided', () => {
    render(<About />);
    
    // Check for default certifications
    expect(screen.getByText(/Certified Professional Coach \(CPC\) - International Coach Federation/)).toBeInTheDocument();
    expect(screen.getByText(/Career Transition Specialist Certification/)).toBeInTheDocument();
    expect(screen.getByText(/Women's Leadership Development Certificate/)).toBeInTheDocument();
    expect(screen.getByText(/Master's Degree in Human Resources Management/)).toBeInTheDocument();
  });

  it('renders default credentials when none provided', () => {
    render(<About />);
    
    // Check for default credentials
    expect(screen.getByText('ICF Certified')).toBeInTheDocument();
    expect(screen.getByText('HR Professional')).toBeInTheDocument();
    expect(screen.getByText('Proud Mother')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<About />);
    
    // Check for section role and aria-label
    const section = screen.getByRole('region', { name: /about section/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'about');
  });

  it('renders professional headshot placeholder when no image provided', () => {
    const { container } = render(<About />);
    
    // Check for SVG placeholder using querySelector since it has aria-hidden
    const svgElement = container.querySelector('svg[aria-hidden="true"]');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders actual image when profileImage prop is provided', () => {
    const imageUrl = 'https://example.com/profile.jpg';
    render(<About profileImage={imageUrl} />);
    
    // Check for actual image
    const image = screen.getByAltText('Professional headshot of Andrea Gray');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageUrl);
  });

  it('renders custom image alt text with custom name', () => {
    const customName = 'Jane Smith';
    const imageUrl = 'https://example.com/profile.jpg';
    render(<About name={customName} profileImage={imageUrl} />);
    
    // Check for custom alt text
    const image = screen.getByAltText(`Professional headshot of ${customName}`);
    expect(image).toBeInTheDocument();
  });

  it('displays experience years correctly', () => {
    render(<About experience="15+ years in Career Development" />);
    
    // Check experience badge shows correct number
    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
  });

  it('renders all certification items with proper styling', () => {
    const certifications = ['Cert 1', 'Cert 2', 'Cert 3'];
    render(<About certifications={certifications} />);
    
    // Check that all certifications are rendered
    certifications.forEach(cert => {
      expect(screen.getByText(cert)).toBeInTheDocument();
    });
    
    // Check that certification items have proper container structure
    const certificationSection = screen.getByText('Certifications & Qualifications').closest('div');
    expect(certificationSection).toBeInTheDocument();
  });

  it('renders with proper responsive classes', () => {
    render(<About />);
    
    // Check main section has responsive padding
    const section = screen.getByRole('region', { name: /about section/i });
    expect(section).toHaveClass('py-16', 'lg:py-24');
    
    // Check grid layout classes are present
    const gridContainer = section.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid-cols-1', 'lg:grid-cols-2');
  });

  it('renders icons for each section', () => {
    const { container } = render(<About />);
    
    // Check that SVG icons are present for each section using querySelector
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });
});