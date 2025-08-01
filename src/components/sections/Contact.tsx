import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { ContactForm, FormSubmissionState } from '../../types';
import Loading from '../common/Loading';

const Contact: React.FC = () => {
  const [submissionState, setSubmissionState] = useState<FormSubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactForm) => {
    setSubmissionState({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
    });

    try {
      // EmailJS configuration - these would typically come from environment variables
      const serviceId = 'your_service_id';
      const templateId = 'your_template_id';
      const publicKey = 'your_public_key';

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'Not provided',
        message: data.message,
        service_interest: data.serviceInterest || 'Not specified',
      };

      // Simulate network delay for testing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmissionState({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        successMessage: 'Thank you for your message! I\'ll get back to you within 24 hours.',
      });

      reset();
    } catch (error) {
      console.error('Email submission error:', error);
      
      // Determine error message based on error type
      let errorMessage = 'Sorry, there was an error sending your message. Please try again or contact me directly.';
      
      if (error instanceof Error) {
        if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error: Please check your internet connection and try again.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Request timeout: The server took too long to respond. Please try again.';
        }
      }
      
      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage,
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50" role="region" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to take the next step in your career journey? Let's discuss how I can help you achieve your goals.
          </p>
        </div>

        <div className="grid-responsive-2col">
          {/* Contact Information */}
          <div className="space-responsive-y">
            <div>
              <h3 className="text-responsive-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                Let's Connect
              </h3>
              <p className="text-responsive-base text-gray-600 mb-6 sm:mb-8">
                I'm here to support you on your career transformation journey. Whether you're looking to make a career change, 
                advance in your current role, or find better work-life balance, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Email</h4>
                  <p className="text-gray-600">hello@lifecoach.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Phone</h4>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Response Time</h4>
                  <p className="text-gray-600">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Name must be less than 50 characters',
                    },
                  })}
                  className={errors.name ? 'form-input-error' : 'form-input'}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  className={errors.email ? 'form-input-error' : 'form-input'}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', {
                    pattern: {
                      value: /^[+]?[1-9][\d]{0,15}$/,
                      message: 'Please enter a valid phone number',
                    },
                  })}
                  className={errors.phone ? 'form-input-error' : 'form-input'}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-error-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="serviceInterest" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Interest
                </label>
                <select
                  id="serviceInterest"
                  {...register('serviceInterest')}
                  className="form-input"
                >
                  <option value="">Select a service (optional)</option>
                  <option value="career-transition">Career Transition Coaching</option>
                  <option value="leadership-development">Leadership Development</option>
                  <option value="work-life-balance">Work-Life Balance Coaching</option>
                  <option value="executive-coaching">Executive Coaching</option>
                  <option value="consultation">Free Consultation</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters',
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Message must be less than 1000 characters',
                    },
                  })}
                  className={`${errors.message ? 'form-input-error' : 'form-input'} resize-none`}
                  placeholder="Tell me about your goals and how I can help you..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-error-600">{errors.message.message}</p>
                )}
              </div>

              {/* Success Message */}
              {submissionState.isSuccess && (
                <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-success-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-success-800">{submissionState.successMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submissionState.isError && (
                <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-error-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-error-800">{submissionState.errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submissionState.isSubmitting}
                className={`w-full focus-visible ${
                  submissionState.isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed text-white py-3 sm:py-4 px-6 rounded-lg font-medium transition-colors touch-manipulation btn-touch'
                    : 'btn-primary'
                }`}
              >
                {submissionState.isSubmitting ? (
                  <Loading size="sm" text="Sending..." className="text-white" />
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;