import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import Contact from '../Contact';
import emailjs from '@emailjs/browser';

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(),
  },
}));

const mockEmailjs = emailjs as any;

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders contact section with all elements', () => {
    render(<Contact />);
    
    // Check main heading
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    
    // Check contact information
    expect(screen.getByText('Let\'s Connect')).toBeInTheDocument();
    expect(screen.getByText('hello@lifecoach.com')).toBeInTheDocument();
    expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('Within 24 hours')).toBeInTheDocument();
    
    // Check form elements
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('displays validation errors for required fields', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // Try to submit empty form
    await user.click(submitButton);
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  it('validates name field constraints', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    
    // Test minimum length
    await user.type(nameInput, 'A');
    await user.tab(); // Trigger validation
    
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    });
    
    // Test maximum length
    await user.clear(nameInput);
    await user.type(nameInput, 'A'.repeat(51));
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Name must be less than 50 characters')).toBeInTheDocument();
    });
  });

  it('validates email field format', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    
    // Test invalid email format
    await user.type(emailInput, 'invalid-email');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
    
    // Test valid email format
    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    });
  });

  it('validates phone field format', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const phoneInput = screen.getByLabelText(/phone number/i);
    
    // Test invalid phone format
    await user.type(phoneInput, 'invalid-phone');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
    });
    
    // Test valid phone format
    await user.clear(phoneInput);
    await user.type(phoneInput, '5551234567');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.queryByText('Please enter a valid phone number')).not.toBeInTheDocument();
    });
  });

  it('validates message field constraints', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const messageInput = screen.getByLabelText(/message/i);
    
    // Test minimum length
    await user.type(messageInput, 'Short');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
    });
    
    // Test maximum length
    await user.clear(messageInput);
    await user.type(messageInput, 'A'.repeat(1001));
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Message must be less than 1000 characters')).toBeInTheDocument();
    });
  });

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup();
    // Mock a delayed response to test loading state
    let resolvePromise: (value: any) => void;
    const delayedPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockEmailjs.send.mockReturnValueOnce(delayedPromise);
    
    render(<Contact />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '5551234567');
    await user.selectOptions(screen.getByLabelText(/service interest/i), 'career-transition');
    await user.type(screen.getByLabelText(/message/i), 'I would like to schedule a consultation.');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    // Check loading state
    expect(screen.getByText('Sending...')).toBeInTheDocument();
    
    // Resolve the promise to complete the submission
    resolvePromise!({ status: 200 });
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });
    
    // Verify EmailJS was called with correct parameters
    expect(mockEmailjs.send).toHaveBeenCalledWith(
      'your_service_id',
      'your_template_id',
      {
        from_name: 'John Doe',
        from_email: 'john@example.com',
        phone: '5551234567',
        message: 'I would like to schedule a consultation.',
        service_interest: 'career-transition',
      },
      'your_public_key'
    );
  });

  it('handles form submission with optional fields empty', async () => {
    const user = userEvent.setup();
    mockEmailjs.send.mockResolvedValueOnce({ status: 200 });
    
    render(<Contact />);
    
    // Fill out only required fields
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/message/i), 'I need help with my career.');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });
    
    // Verify EmailJS was called with correct parameters including defaults for optional fields
    expect(mockEmailjs.send).toHaveBeenCalledWith(
      'your_service_id',
      'your_template_id',
      {
        from_name: 'Jane Doe',
        from_email: 'jane@example.com',
        phone: 'Not provided',
        message: 'I need help with my career.',
        service_interest: 'Not specified',
      },
      'your_public_key'
    );
  });

  it('handles form submission error', async () => {
    const user = userEvent.setup();
    mockEmailjs.send.mockRejectedValueOnce(new Error('Network error'));
    
    render(<Contact />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'I would like to schedule a consultation.');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/sorry, there was an error sending your message/i)).toBeInTheDocument();
    });
    
    // Verify form is not reset on error
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
  });

  it('resets form after successful submission', async () => {
    const user = userEvent.setup();
    mockEmailjs.send.mockResolvedValueOnce({ status: 200 });
    
    render(<Contact />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'I would like to schedule a consultation.');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    // Wait for success and form reset
    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/full name/i)).toHaveValue('');
      expect(screen.getByLabelText(/email address/i)).toHaveValue('');
      expect(screen.getByLabelText(/message/i)).toHaveValue('');
    });
  });

  it('disables submit button during submission', async () => {
    const user = userEvent.setup();
    // Mock a delayed response
    mockEmailjs.send.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));
    
    render(<Contact />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'I would like to schedule a consultation.');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    // Check that button is disabled during submission
    expect(submitButton).toBeDisabled();
    expect(screen.getByText('Sending...')).toBeInTheDocument();
  });

  it('includes all service options in dropdown', () => {
    render(<Contact />);
    
    // Check all service options are present
    expect(screen.getByRole('option', { name: /select a service/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /career transition coaching/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /leadership development/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /work-life balance coaching/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /executive coaching/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /free consultation/i })).toBeInTheDocument();
  });

  it('applies correct CSS classes for validation states', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    
    // Initially should have normal border
    expect(nameInput).toHaveClass('border-gray-300');
    expect(emailInput).toHaveClass('border-gray-300');
    
    // Trigger validation errors
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(nameInput).toHaveClass('border-red-500');
      expect(emailInput).toHaveClass('border-red-500');
    });
  });

  it('has proper accessibility attributes', () => {
    render(<Contact />);
    
    // Check form labels are properly associated
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('id', 'name');
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText(/phone number/i)).toHaveAttribute('id', 'phone');
    expect(screen.getByLabelText(/service interest/i)).toHaveAttribute('id', 'serviceInterest');
    expect(screen.getByLabelText(/message/i)).toHaveAttribute('id', 'message');
    
    // Check required fields are marked
    const nameLabel = screen.getByText(/full name \*/i);
    const emailLabel = screen.getByText(/email address \*/i);
    const messageLabel = screen.getByText(/message \*/i);
    
    expect(nameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(messageLabel).toBeInTheDocument();
  });
});