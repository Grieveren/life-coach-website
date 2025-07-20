import { describe, it, expect, vi, beforeEach } from 'vitest';
import { lazyLoadComponent, useIntersectionObserver, performanceUtils } from '../lazyLoading';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
global.IntersectionObserver = mockIntersectionObserver;

// Mock React lazy
vi.mock('react', () => ({
  lazy: vi.fn((importFn) => importFn),
  ComponentType: {},
}));

describe('Lazy Loading Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('lazyLoadComponent', () => {
    it('should create a lazy component', async () => {
      const MockComponent = () => null;
      const importFn = vi.fn().mockResolvedValue({ default: MockComponent });
      
      const LazyComponent = lazyLoadComponent(importFn);
      
      expect(LazyComponent).toBeDefined();
    });

    it('should handle import errors gracefully', async () => {
      const importFn = vi.fn().mockRejectedValue(new Error('Import failed'));
      
      const LazyComponent = lazyLoadComponent(importFn);
      
      // The function should not throw, but return a fallback component
      expect(LazyComponent).toBeDefined();
    });
  });

  describe('useIntersectionObserver', () => {
    it('should create intersection observer with default options', () => {
      const callback = vi.fn();
      
      const observer = useIntersectionObserver(callback);
      
      expect(mockIntersectionObserver).toHaveBeenCalledWith(callback, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1,
      });
      expect(observer).toBeDefined();
    });

    it('should create intersection observer with custom options', () => {
      const callback = vi.fn();
      const customOptions = {
        root: null,
        rootMargin: '100px',
        threshold: 0.5,
      };
      
      useIntersectionObserver(callback, customOptions);
      
      expect(mockIntersectionObserver).toHaveBeenCalledWith(callback, customOptions);
    });
  });

  describe('performanceUtils', () => {
    beforeEach(() => {
      // Mock document.head
      Object.defineProperty(document, 'head', {
        value: {
          appendChild: vi.fn(),
        },
        writable: true,
      });
    });

    it('should preload resources', () => {
      const mockLink = {
        rel: '',
        href: '',
        as: '',
        type: '',
      };
      
      vi.spyOn(document, 'createElement').mockReturnValue(mockLink as HTMLLinkElement);
      
      performanceUtils.preloadResource('/test.css', 'style', 'text/css');
      
      expect(document.createElement).toHaveBeenCalledWith('link');
      expect(mockLink.rel).toBe('preload');
      expect(mockLink.href).toBe('/test.css');
      expect(mockLink.as).toBe('style');
      expect(mockLink.type).toBe('text/css');
      expect(document.head.appendChild).toHaveBeenCalledWith(mockLink);
    });

    it('should prefetch resources', () => {
      const mockLink = {
        rel: '',
        href: '',
      };
      
      vi.spyOn(document, 'createElement').mockReturnValue(mockLink as HTMLLinkElement);
      
      performanceUtils.prefetchResource('/next-page.js');
      
      expect(mockLink.rel).toBe('prefetch');
      expect(mockLink.href).toBe('/next-page.js');
      expect(document.head.appendChild).toHaveBeenCalledWith(mockLink);
    });

    it('should measure performance', () => {
      const mockPerformance = {
        now: vi.fn().mockReturnValueOnce(0).mockReturnValueOnce(100),
      };
      Object.defineProperty(global, 'performance', {
        value: mockPerformance,
        writable: true,
      });
      
      const duration = performanceUtils.measurePerformance('Test Operation', 0);
      
      expect(duration).toBe(100);
      expect(mockPerformance.now).toHaveBeenCalledTimes(1);
    });

    it('should debounce function calls', (done) => {
      const mockFn = vi.fn();
      const debouncedFn = performanceUtils.debounce(mockFn, 100);
      
      // Call multiple times quickly
      debouncedFn('arg1');
      debouncedFn('arg2');
      debouncedFn('arg3');
      
      // Should not be called immediately
      expect(mockFn).not.toHaveBeenCalled();
      
      // Should be called once after delay
      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith('arg3');
        done();
      }, 150);
    });

    it('should throttle function calls', (done) => {
      const mockFn = vi.fn();
      const throttledFn = performanceUtils.throttle(mockFn, 100);
      
      // Call multiple times quickly
      throttledFn('arg1');
      throttledFn('arg2');
      throttledFn('arg3');
      
      // Should be called immediately for first call
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('arg1');
      
      // Should not be called again until throttle period ends
      setTimeout(() => {
        throttledFn('arg4');
        expect(mockFn).toHaveBeenCalledTimes(2);
        expect(mockFn).toHaveBeenLastCalledWith('arg4');
        done();
      }, 150);
    });
  });
});