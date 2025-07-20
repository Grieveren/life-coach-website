#!/bin/bash

# Deployment script for life-coach-website
# Usage: ./scripts/deploy.sh [platform]
# Platforms: netlify, vercel, github-pages

set -e  # Exit on any error

PLATFORM=${1:-netlify}
BUILD_DIR="dist"

echo "🚀 Starting deployment process for platform: $PLATFORM"

# Check if required tools are installed
check_dependencies() {
    echo "📋 Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed"
        exit 1
    fi
    
    echo "✅ Dependencies check passed"
}

# Run pre-deployment checks
pre_deployment_checks() {
    echo "🔍 Running pre-deployment checks..."
    
    # Check if .env file exists (optional)
    if [ ! -f ".env.local" ] && [ ! -f ".env" ]; then
        echo "⚠️  No environment file found. Using default values."
        echo "   Consider copying .env.example to .env.local and configuring it."
    fi
    
    # Run linting
    echo "🔧 Running linter..."
    npm run lint
    
    # Run type checking
    echo "📝 Running type check..."
    npm run type-check
    
    # Run tests
    echo "🧪 Running tests..."
    npm run test
    
    echo "✅ Pre-deployment checks passed"
}

# Build the project
build_project() {
    echo "🏗️  Building project..."
    
    # Clean previous build
    if [ -d "$BUILD_DIR" ]; then
        rm -rf "$BUILD_DIR"
    fi
    
    # Build project
    npm run build
    
    # Verify build output
    if [ ! -d "$BUILD_DIR" ]; then
        echo "❌ Build failed - output directory not found"
        exit 1
    fi
    
    if [ ! -f "$BUILD_DIR/index.html" ]; then
        echo "❌ Build failed - index.html not found"
        exit 1
    fi
    
    echo "✅ Build completed successfully"
}

# Deploy to specific platform
deploy_to_platform() {
    case $PLATFORM in
        netlify)
            echo "🌐 Deploying to Netlify..."
            if command -v netlify &> /dev/null; then
                netlify deploy --prod --dir="$BUILD_DIR"
            else
                echo "❌ Netlify CLI not installed. Install with: npm install -g netlify-cli"
                exit 1
            fi
            ;;
        vercel)
            echo "▲ Deploying to Vercel..."
            if command -v vercel &> /dev/null; then
                vercel --prod
            else
                echo "❌ Vercel CLI not installed. Install with: npm install -g vercel"
                exit 1
            fi
            ;;
        github-pages)
            echo "📄 Deploying to GitHub Pages..."
            if [ ! -d ".git" ]; then
                echo "❌ Not a git repository"
                exit 1
            fi
            
            # Create gh-pages branch if it doesn't exist
            if ! git show-ref --verify --quiet refs/heads/gh-pages; then
                git checkout --orphan gh-pages
                git rm -rf .
                git commit --allow-empty -m "Initial gh-pages commit"
                git checkout main
            fi
            
            # Deploy to gh-pages
            git subtree push --prefix="$BUILD_DIR" origin gh-pages
            ;;
        *)
            echo "❌ Unknown platform: $PLATFORM"
            echo "Available platforms: netlify, vercel, github-pages"
            exit 1
            ;;
    esac
}

# Main deployment flow
main() {
    echo "🎯 Life Coach Website Deployment"
    echo "================================"
    
    check_dependencies
    pre_deployment_checks
    build_project
    deploy_to_platform
    
    echo ""
    echo "🎉 Deployment completed successfully!"
    echo "Platform: $PLATFORM"
    echo "Build directory: $BUILD_DIR"
}

# Run main function
main