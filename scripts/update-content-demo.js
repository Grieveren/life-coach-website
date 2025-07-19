#!/usr/bin/env node

/**
 * Content Management Demo Script
 * 
 * This script demonstrates how easy it is to update content using the JSON-based
 * content management system. Content managers can update services, testimonials,
 * blog posts, and site configuration without touching any code.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to read JSON file
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

// Helper function to write JSON file
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Successfully updated ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error writing ${filePath}:`, error.message);
    return false;
  }
}

// Demo functions
function addNewService() {
  const servicesPath = path.join(__dirname, '../src/data/services.json');
  const services = readJsonFile(servicesPath);
  
  if (!services) return;

  const newService = {
    id: 'demo-service',
    title: 'Demo Service - Leadership Coaching',
    description: 'Advanced leadership coaching for women transitioning into management roles.',
    features: [
      'Executive presence development',
      'Team management strategies',
      'Communication skills enhancement',
      'Conflict resolution techniques'
    ],
    duration: '4 months',
    price: '$497/month',
    category: 'individual',
    targetAudience: 'Women moving into leadership roles',
    callToAction: 'Become a Leader',
    availability: true
  };

  services.push(newService);
  writeJsonFile(servicesPath, services);
}

function addNewTestimonial() {
  const testimonialsPath = path.join(__dirname, '../src/data/testimonials.json');
  const testimonials = readJsonFile(testimonialsPath);
  
  if (!testimonials) return;

  const newTestimonial = {
    id: 'demo-testimonial',
    clientName: 'Demo Client - Lisa Thompson',
    content: 'The coaching program exceeded my expectations. I gained the confidence and skills needed to successfully transition into a leadership role.',
    outcome: 'Promoted to Senior Manager within 6 months',
    rating: 5,
    clientTitle: 'Senior Manager',
    location: 'Portland, OR',
    serviceUsed: 'Leadership Coaching',
    featured: true,
    dateGiven: new Date().toISOString()
  };

  testimonials.push(newTestimonial);
  writeJsonFile(testimonialsPath, testimonials);
}

function addNewBlogPost() {
  const blogPostsPath = path.join(__dirname, '../src/data/blog-posts.json');
  const blogPosts = readJsonFile(blogPostsPath);
  
  if (!blogPosts) return;

  const newBlogPost = {
    id: 'demo-blog-post',
    title: 'Demo Post - 5 Signs You\'re Ready for Leadership',
    excerpt: 'Discover the key indicators that show you\'re prepared to take on a leadership role in your organization.',
    content: '',
    publishDate: new Date().toISOString(),
    category: 'career-transition',
    featured: false,
    author: 'Andrea Gray',
    tags: ['leadership', 'career-growth', 'professional-development'],
    readTime: 5,
    status: 'published'
  };

  blogPosts.push(newBlogPost);
  writeJsonFile(blogPostsPath, blogPosts);
}

function updateSiteConfig() {
  const siteConfigPath = path.join(__dirname, '../src/data/site-config.json');
  const siteConfig = readJsonFile(siteConfigPath);
  
  if (!siteConfig) return;

  // Update tagline as an example
  siteConfig.tagline = 'Empowering Women to Return to Work with Confidence - Updated!';
  
  // Add a new navigation item
  siteConfig.navigation.push({
    id: 'demo-nav',
    label: 'Leadership',
    href: '#leadership'
  });

  writeJsonFile(siteConfigPath, siteConfig);
}

// Main demo function
function runDemo() {
  console.log('🚀 Content Management System Demo');
  console.log('=====================================\n');

  console.log('📝 Adding new service...');
  addNewService();

  console.log('\n💬 Adding new testimonial...');
  addNewTestimonial();

  console.log('\n📰 Adding new blog post...');
  addNewBlogPost();

  console.log('\n⚙️  Updating site configuration...');
  updateSiteConfig();

  console.log('\n✨ Demo completed! Content has been updated.');
  console.log('💡 To see changes, run: npm run dev');
  console.log('🔄 To revert changes, run: git checkout -- src/data/');
}

// Cleanup function to revert demo changes
function cleanup() {
  console.log('🧹 Cleaning up demo changes...');
  
  const files = [
    '../src/data/services.json',
    '../src/data/testimonials.json',
    '../src/data/blog-posts.json',
    '../src/data/site-config.json'
  ];

  files.forEach(file => {
    const filePath = path.join(__dirname, file);
    const data = readJsonFile(filePath);
    if (!data) return;

    // Remove demo items
    if (file.includes('services.json')) {
      const filtered = data.filter(item => item.id !== 'demo-service');
      writeJsonFile(filePath, filtered);
    } else if (file.includes('testimonials.json')) {
      const filtered = data.filter(item => item.id !== 'demo-testimonial');
      writeJsonFile(filePath, filtered);
    } else if (file.includes('blog-posts.json')) {
      const filtered = data.filter(item => item.id !== 'demo-blog-post');
      writeJsonFile(filePath, filtered);
    } else if (file.includes('site-config.json')) {
      data.tagline = 'Empowering Women to Return to Work with Confidence';
      data.navigation = data.navigation.filter(item => item.id !== 'demo-nav');
      writeJsonFile(filePath, data);
    }
  });

  console.log('✅ Demo cleanup completed!');
}

// Command line interface
const command = process.argv[2];

if (command === 'cleanup') {
  cleanup();
} else {
  runDemo();
}