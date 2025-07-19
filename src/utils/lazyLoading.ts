import React, { lazy, ComponentType } from 'react';

/**
 * Utility for lazy loading React components with error handling
 */
export const lazyLoadComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) => {
  return lazy(() =>
    importFunc().catch((error) => {
      console.error('Failed to load component:', error);
      // Return a fallback component in case of loading failure
      return {
        default: (() => {
          return React.createElement('div', 
            { className: 'p-4 text-center text-gray-500' },
            React.createElement('p', null, 'Failed to load component. Please refresh the page.')
          );
        }) as unknown as T,
      };
    })
  );
};

/**
 * Intersection Observer hook for lazy loading images
 */
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  const observer = new IntersectionObserver(callback, defaultOptions);
  
  return observer;
};

/**
 * Lazy image loading with placeholder support
 */
export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Performance optimization utilities
 */
export const performanceUtils = {
  /**
   * Preload critical resources
   */
  preloadResource: (href: string, as: string, type?: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  },

  /**
   * Prefetch resources for future navigation
   */
  prefetchResource: (href: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  },

  /**
   * Measure and log performance metrics
   */
  measurePerformance: (name: string, startTime: number) => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
    return duration;
  },

  /**
   * Debounce function for performance optimization
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  },

  /**
   * Throttle function for performance optimization
   */
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
};