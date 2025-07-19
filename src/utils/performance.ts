/**
 * Performance monitoring and optimization utilities
 */

export interface PerformanceMetrics {
  name: string;
  duration: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Observe navigation timing
    if ('PerformanceObserver' in window) {
      try {
        const navObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              this.logMetric('Page Load', navEntry.loadEventEnd - navEntry.fetchStart);
              this.logMetric('DOM Content Loaded', navEntry.domContentLoadedEventEnd - navEntry.fetchStart);
              this.logMetric('First Paint', navEntry.responseEnd - navEntry.fetchStart);
            }
          });
        });
        navObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navObserver);
      } catch (error) {
        console.warn('Navigation timing observer not supported:', error);
      }

      // Observe resource timing
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.duration > 100) { // Only log slow resources
              this.logMetric(`Resource: ${entry.name}`, entry.duration);
            }
          });
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.push(resourceObserver);
      } catch (error) {
        console.warn('Resource timing observer not supported:', error);
      }

      // Observe largest contentful paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.logMetric('Largest Contentful Paint', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (error) {
        console.warn('LCP observer not supported:', error);
      }

      // Observe first input delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fidEntry = entry as any; // PerformanceEventTiming not fully supported in types
            this.logMetric('First Input Delay', fidEntry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (error) {
        console.warn('FID observer not supported:', error);
      }
    }
  }

  /**
   * Log a performance metric
   */
  logMetric(name: string, duration: number) {
    const metric: PerformanceMetrics = {
      name,
      duration,
      timestamp: Date.now(),
    };
    this.metrics.push(metric);
    
    // Log to console in development
    if (import.meta.env?.DEV) {
      console.log(`Performance: ${name} - ${duration.toFixed(2)}ms`);
    }
  }

  /**
   * Measure function execution time
   */
  measure<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    this.logMetric(name, end - start);
    return result;
  }

  /**
   * Measure async function execution time
   */
  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    this.logMetric(name, end - start);
    return result;
  }

  /**
   * Get all recorded metrics
   */
  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  /**
   * Get metrics by name pattern
   */
  getMetricsByName(pattern: string): PerformanceMetrics[] {
    return this.metrics.filter(metric => 
      metric.name.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  /**
   * Clear all metrics
   */
  clearMetrics() {
    this.metrics = [];
  }

  /**
   * Get performance summary
   */
  getSummary() {
    const summary = {
      totalMetrics: this.metrics.length,
      averageDuration: 0,
      slowestOperation: null as PerformanceMetrics | null,
      fastestOperation: null as PerformanceMetrics | null,
    };

    if (this.metrics.length > 0) {
      const durations = this.metrics.map(m => m.duration);
      summary.averageDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
      summary.slowestOperation = this.metrics.reduce((prev, current) => 
        prev.duration > current.duration ? prev : current
      );
      summary.fastestOperation = this.metrics.reduce((prev, current) => 
        prev.duration < current.duration ? prev : current
      );
    }

    return summary;
  }

  /**
   * Cleanup observers
   */
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * React hook for measuring component render time
 */
export const usePerformanceMonitor = (componentName: string) => {
  const startTime = performance.now();

  return {
    logRenderTime: () => {
      const endTime = performance.now();
      performanceMonitor.logMetric(`${componentName} Render`, endTime - startTime);
    },
  };
};

/**
 * Bundle size optimization utilities
 */
export const bundleOptimization = {
  /**
   * Dynamically import modules for code splitting
   */
  dynamicImport: async <T>(importFn: () => Promise<T>): Promise<T> => {
    return performanceMonitor.measureAsync('Dynamic Import', importFn);
  },

  /**
   * Preload critical resources
   */
  preloadResource: (href: string, as: string, type?: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    link.onload = () => performanceMonitor.logMetric(`Preload: ${href}`, 0);
    link.onerror = () => console.warn(`Failed to preload: ${href}`);
    document.head.appendChild(link);
  },

  /**
   * Prefetch resources for future use
   */
  prefetchResource: (href: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.onload = () => performanceMonitor.logMetric(`Prefetch: ${href}`, 0);
    document.head.appendChild(link);
  },
};

/**
 * Image optimization utilities
 */
export const imageOptimization = {
  /**
   * Generate responsive image srcset
   */
  generateSrcSet: (baseUrl: string, sizes: number[]): string => {
    return sizes.map(size => `${baseUrl}?w=${size} ${size}w`).join(', ');
  },

  /**
   * Get optimal image size based on container width
   */
  getOptimalSize: (containerWidth: number, devicePixelRatio = window.devicePixelRatio): number => {
    const targetWidth = containerWidth * devicePixelRatio;
    const sizes = [320, 640, 768, 1024, 1280, 1536, 1920];
    return sizes.find(size => size >= targetWidth) || sizes[sizes.length - 1];
  },

  /**
   * Preload critical images
   */
  preloadImage: (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        performanceMonitor.logMetric(`Image Preload: ${src}`, 0);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  },
};

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    performanceMonitor.cleanup();
  });
}