#!/usr/bin/env node

/**
 * Build and Deploy Automation Script
 * Handles building and deploying the life coach website to various platforms
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  buildDir: 'dist',
  platforms: ['netlify', 'vercel', 'github-pages'],
  environments: ['staging', 'production'],
};

// Utility functions
const log = (message, type = 'info') => {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m',   // Red
    reset: '\x1b[0m'     // Reset
  };
  
  const prefix = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };
  
  console.log(`${colors[type]}${prefix[type]} ${message}${colors.reset}`);
};

const execCommand = (command, options = {}) => {
  try {
    log(`Executing: ${command}`);
    const result = execSync(command, { 
      stdio: 'inherit', 
      encoding: 'utf8',
      ...options 
    });
    return result;
  } catch (error) {
    log(`Command failed: ${command}`, 'error');
    throw error;
  }
};

// Validation functions
const validateEnvironment = () => {
  log('Validating environment...');
  
  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion < 16) {
    throw new Error(`Node.js version ${nodeVersion} is not supported. Please use Node.js 16 or higher.`);
  }
  
  // Check if package.json exists
  if (!fs.existsSync('package.json')) {
    throw new Error('package.json not found. Please run this script from the project root.');
  }
  
  log('Environment validation passed', 'success');
};

const validatePlatformTools = (platform) => {
  const tools = {
    netlify: 'netlify',
    vercel: 'vercel',
    'github-pages': 'git'
  };
  
  const tool = tools[platform];
  if (!tool) return true;
  
  try {
    execCommand(`${tool} --version`, { stdio: 'pipe' });
    return true;
  } catch {
    log(`${tool} CLI not found. Please install it first.`, 'warning');
    return false;
  }
};

// Build functions
const runPreBuildChecks = () => {
  log('Running pre-build checks...');
  
  // Run linting
  try {
    execCommand('npm run lint');
  } catch {
    log('Linting failed. Please fix linting errors before deployment.', 'error');
    throw new Error('Pre-build checks failed');
  }
  
  // Run type checking
  try {
    execCommand('npm run type-check');
  } catch {
    log('Type checking failed. Please fix type errors before deployment.', 'error');
    throw new Error('Pre-build checks failed');
  }
  
  // Run tests
  try {
    execCommand('npm run test');
  } catch {
    log('Tests failed. Please fix failing tests before deployment.', 'error');
    throw new Error('Pre-build checks failed');
  }
  
  log('Pre-build checks passed', 'success');
};

const buildProject = (environment = 'production') => {
  log(`Building project for ${environment}...`);
  
  // Clean previous build
  if (fs.existsSync(CONFIG.buildDir)) {
    execCommand(`rm -rf ${CONFIG.buildDir}`);
  }
  
  // Set environment and build
  const buildCommand = environment === 'production' 
    ? 'npm run build:production' 
    : `npm run build:${environment}`;
  
  execCommand(buildCommand);
  
  // Verify build output
  if (!fs.existsSync(CONFIG.buildDir)) {
    throw new Error('Build failed - output directory not found');
  }
  
  if (!fs.existsSync(path.join(CONFIG.buildDir, 'index.html'))) {
    throw new Error('Build failed - index.html not found');
  }
  
  log('Build completed successfully', 'success');
};

// Deployment functions
const deployToNetlify = (isPreview = false) => {
  log(`Deploying to Netlify ${isPreview ? '(preview)' : '(production)'}...`);
  
  if (!validatePlatformTools('netlify')) {
    throw new Error('Netlify CLI not available');
  }
  
  const command = isPreview 
    ? `netlify deploy --dir=${CONFIG.buildDir}`
    : `netlify deploy --prod --dir=${CONFIG.buildDir}`;
  
  execCommand(command);
  log('Netlify deployment completed', 'success');
};

const deployToVercel = (isPreview = false) => {
  log(`Deploying to Vercel ${isPreview ? '(preview)' : '(production)'}...`);
  
  if (!validatePlatformTools('vercel')) {
    throw new Error('Vercel CLI not available');
  }
  
  const command = isPreview ? 'vercel' : 'vercel --prod';
  execCommand(command);
  log('Vercel deployment completed', 'success');
};

const deployToGitHubPages = () => {
  log('Deploying to GitHub Pages...');
  
  if (!validatePlatformTools('github-pages')) {
    throw new Error('Git not available');
  }
  
  if (!fs.existsSync('.git')) {
    throw new Error('Not a git repository');
  }
  
  // Use the existing deployment script
  execCommand('chmod +x scripts/deploy.sh');
  execCommand('./scripts/deploy.sh github-pages');
  log('GitHub Pages deployment completed', 'success');
};

// Main deployment function
const deploy = (platform, environment = 'production', isPreview = false) => {
  log(`Starting deployment to ${platform} (${environment})...`);
  
  switch (platform) {
    case 'netlify':
      deployToNetlify(isPreview);
      break;
    case 'vercel':
      deployToVercel(isPreview);
      break;
    case 'github-pages':
      deployToGitHubPages();
      break;
    default:
      throw new Error(`Unknown platform: ${platform}`);
  }
};

// CLI interface
const main = () => {
  const args = process.argv.slice(2);
  const platform = args[0] || 'netlify';
  const environment = args[1] || 'production';
  const isPreview = args.includes('--preview');
  
  try {
    log('🚀 Starting build and deployment process');
    log(`Platform: ${platform}`);
    log(`Environment: ${environment}`);
    log(`Preview: ${isPreview ? 'Yes' : 'No'}`);
    
    validateEnvironment();
    runPreBuildChecks();
    buildProject(environment);
    deploy(platform, environment, isPreview);
    
    log('🎉 Deployment completed successfully!', 'success');
  } catch (error) {
    log(`Deployment failed: ${error.message}`, 'error');
    process.exit(1);
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  validateEnvironment,
  runPreBuildChecks,
  buildProject,
  deploy
};