export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
  serviceInterest?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  duration?: string;
  price?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  content: string;
  outcome?: string;
  clientPhoto?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: Date;
  category: string;
  featured?: boolean;
}