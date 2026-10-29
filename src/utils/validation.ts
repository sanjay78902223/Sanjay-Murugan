/**
 * Validation utility for the Saan Code n Convert contact form
 */

export interface ContactFormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  enquiry: string;
  selectedService?: string;
}

export interface ValidationErrors {
  name?: string;
  businessName?: string;
  email?: string;
  phone?: string;
  enquiry?: string;
}

export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your name (at least 2 characters).';
  }

  // Business Name validation
  if (!data.businessName || data.businessName.trim().length < 2) {
    errors.businessName = 'Please enter your business or institute name.';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  // Phone validation (accepts international and standard formats)
  const phoneDigits = data.phone.replace(/[\s\-\(\)\+]/g, '');
  if (!data.phone || phoneDigits.length < 8 || phoneDigits.length > 15) {
    errors.phone = 'Please provide a valid contact phone number (8-15 digits).';
  }

  // Enquiry message validation
  if (!data.enquiry || data.enquiry.trim().length < 10) {
    errors.enquiry = 'Please describe your process or enquiry requirements (min 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
