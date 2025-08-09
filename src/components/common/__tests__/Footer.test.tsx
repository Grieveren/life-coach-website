import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../Footer';
import { SocialMediaLink, ContactInfo } from '../../../types';

describe('Footer Component', () => {
  const mockContactInfo: ContactInfo = {
    email: 'test@example.com',
    phone: '(555) 123-4567',
    address: {
      city: 'Test City',
      state: 'TC'
    }
  };

  const mockSocialLinks: SocialMediaLink[] = [
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/test',
      label: 'LinkedIn Test'
    },
    {
      platform: 'facebook',
      url: 'https://facebook.com/test',
      label: 'Facebook Test'
    }
  ];

  const mockCredentials = [
    'Test Certification 1',
    'Test Certification 2'
  ];

  const mockBusinessInfo = {
    name: 'Test Business LLC',
    license: 'Test License #12345',
    certifications: ['Test Cert']
  };

  it('renders with default props', () => {
    render(<Footer />);
    
    expect(screen.getByText('Andrea Gray Coaching')).toBeInTheDocument();
    expect(screen.getByText(/Empowering mothers to successfully transition/)).toBeInTheDocument();
    expect(screen.getByText('Professional Credentials')).toBeInTheDocument();
    expect(screen.getByText('Contact Info')).toBeInTheDocument();
    expect(screen.getByText('Connect With Me')).toBeInTheDocument();
  });

  it('renders custom site name', () => {
    render(<Footer siteName="Custom Coach Name" />);
    
    expect(screen.getByText('Custom Coach Name')).toBeInTheDocument();
  });

  it('displays contact information correctly', () => {
    render(<Footer contactInfo={mockContactInfo} />);
    
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('Test City, TC')).toBeInTheDocument();
  });

  it('renders email and phone as clickable links', () => {
    render(<Footer contactInfo={mockContactInfo} />);
    
    const emailLink = screen.getByRole('link', { name: 'test@example.com' });
    const phoneLink = screen.getByRole('link', { name: '(555) 123-4567' });
    
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
    expect(phoneLink).toHaveAttribute('href', 'tel:(555) 123-4567');
  });

  it('displays professional credentials', () => {
    render(<Footer credentials={mockCredentials} />);
    
    expect(screen.getByText('Test Certification 1')).toBeInTheDocument();
    expect(screen.getByText('Test Certification 2')).toBeInTheDocument();
  });

  it('renders social media links with correct attributes', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const linkedinLink = screen.getByLabelText('LinkedIn Test');
    const facebookLink = screen.getByLabelText('Facebook Test');
    
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/test');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/test');
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays business hours', () => {
    render(<Footer />);
    
    expect(screen.getByText('Business Hours')).toBeInTheDocument();
    expect(screen.getByText('Monday - Friday: 9:00 AM - 6:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Saturday: 10:00 AM - 2:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Sunday: Closed')).toBeInTheDocument();
  });

  it('displays copyright information with current year', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer businessInfo={mockBusinessInfo} />);
    
    expect(screen.getByText(`© ${currentYear} Test Business LLC. All rights reserved.`)).toBeInTheDocument();
  });

  it('displays custom copyright year', () => {
    render(<Footer copyrightYear={2023} businessInfo={mockBusinessInfo} />);
    
    expect(screen.getByText('© 2023 Test Business LLC. All rights reserved.')).toBeInTheDocument();
  });

  it('displays business license information', () => {
    render(<Footer businessInfo={mockBusinessInfo} />);
    
    expect(screen.getByText('Test License #12345')).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<Footer />);
    
    expect(screen.getByText(/Privacy Policy/)).toBeInTheDocument();
    expect(screen.getByText('Impressum')).toBeInTheDocument();
    expect(screen.getByText('Coaching Agreement')).toBeInTheDocument();
  });

  it('handles missing optional contact information gracefully', () => {
    const minimalContactInfo: ContactInfo = {
      email: 'minimal@example.com'
    };
    
    render(<Footer contactInfo={minimalContactInfo} />);
    
    expect(screen.getByText('minimal@example.com')).toBeInTheDocument();
    expect(screen.queryByText('(555) 123-4567')).not.toBeInTheDocument();
  });

  it('renders with empty social links array', () => {
    render(<Footer socialLinks={[]} />);
    
    expect(screen.getByText('Connect With Me')).toBeInTheDocument();
    // Should not crash and should still render the section header
  });

  it('renders with empty credentials array', () => {
    render(<Footer credentials={[]} />);
    
    expect(screen.getByText('Professional Credentials')).toBeInTheDocument();
    // Should not crash and should still render the section header
  });

  it('has proper accessibility attributes for social links', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const socialLinks = screen.getAllByRole('link', { name: /LinkedIn Test|Facebook Test/ });
    
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('aria-label');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders SVG icons for social media platforms', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const linkedinLink = screen.getByLabelText('LinkedIn Test');
    const facebookLink = screen.getByLabelText('Facebook Test');
    
    expect(linkedinLink.querySelector('svg')).toBeInTheDocument();
    expect(facebookLink.querySelector('svg')).toBeInTheDocument();
  });

  it('applies correct CSS classes for responsive design', () => {
    const { container } = render(<Footer />);
    
    const footer = container.querySelector('footer');
    const gridContainer = container.querySelector('.grid');
    
    expect(footer).toHaveClass('bg-gray-900', 'text-white');
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
  });

  it('renders contact icons with proper SVG structure', () => {
    render(<Footer contactInfo={mockContactInfo} />);
    
    const emailIcon = screen.getByText('test@example.com').previousElementSibling;
    const phoneIcon = screen.getByText('(555) 123-4567').previousElementSibling;
    const locationIcon = screen.getByText('Test City, TC').previousElementSibling;
    
    expect(emailIcon?.tagName).toBe('svg');
    expect(phoneIcon?.tagName).toBe('svg');
    expect(locationIcon?.tagName).toBe('svg');
  });
});