import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { performanceMonitor, bundleOptimization, imageOptimization, usePerformanceMonitor } from '../performance';

// Mock performance API
const mockPerformance = {
  now: vi.fn(() => Date.now()),
  mark: vi.fn(),
  measure: vi.fn(),
};

Object.defineProperty(global, 'performance', {
  value: mockPerformance,
  writable: true,
});

// Mock PerformanceObserver
global.PerformanceObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
}));

describe('Performance Monitor', () => {
  beforeEach(() => {
    performanceMonitor.clearMetrics();
    vi.clearAllMocks();
  });

  afterEach(() => {
    performanceMonitor.clearMetrics();
  });

  it('should log performance metrics', () => {
    performanceMonitor.logMetric('Test Metric', 100);
    
    const metrics = performanceMonitor.getMetrics();
    expect(metrics).toHaveLength(1);
    expect(metrics[0].name).toBe('Test Metric');
    expect(metrics[0].duration).toBe(100);
  });

  it('should measure function execution time', () => {
    const testFunction = vi.fn(() => 'result');
    mockPerformance.now.mockReturnValueOnce(0).mockReturnValueOnce(100);
    
    const result = performanceMonitor.measure('Test Function', testFunction);
    
    expect(result).toBe('result');
    expect(testFunction).toHaveBeenCalled();
    
    const metrics = performanceMonitor.getMetrics();
    expect(metrics).toHaveLength(1);
    expect(metrics[0].name).toBe('Test Function');
    expect(metrics[0].duration).toBe(100);
  });

  it('should measure async function execution time', async () => {
    const asyncFunction = vi.fn(async () => 'async result');
    mockPerformance.now.mockReturnValueOnce(0).mockReturnValueOnce(150);
    
    const result = await performanceMonitor.measureAsync('Async Function', asyncFunction);
    
    expect(result).toBe('async result');
    expect(asyncFunction).toHaveBeenCalled();
    
    const metrics = performanceMonitor.getMetrics();
    expect(metrics).toHaveLength(1);
    expect(metrics[0].name).toBe('Async Function');
    expect(metrics[0].duration).toBe(150);
  });

  it('should get metrics by name pattern', () => {
    performanceMonitor.logMetric('Component Render', 50);
    performanceMonitor.logMetric('API Call', 200);
    performanceMonitor.logMetric('Component Mount', 30);
    
    const componentMetrics = performanceMonitor.getMetricsByName('component');
    expect(componentMetrics).toHaveLength(2);
    expect(componentMetrics.map(m => m.name)).toEqual(['Component Render', 'Component Mount']);
  });

  it('should generate performance summary', () => {
    performanceMonitor.logMetric('Fast Operation', 10);
    performanceMonitor.logMetric('Slow Operation', 100);
    performanceMonitor.logMetric('Medium Operation', 50);
    
    const summary = performanceMonitor.getSummary();
    
    expect(summary.totalMetrics).toBe(3);
    expect(summary.averageDuration).toBeCloseTo(53.33, 2);
    expect(summary.slowestOperation?.name).toBe('Slow Operation');
    expect(summary.fastestOperation?.name).toBe('Fast Operation');
  });

  it('should clear all metrics', () => {
    performanceMonitor.logMetric('Test Metric', 100);
    expect(performanceMonitor.getMetrics()).toHaveLength(1);
    
    performanceMonitor.clearMetrics();
    expect(performanceMonitor.getMetrics()).toHaveLength(0);
  });
});

describe('Bundle Optimization', () => {
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
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
    };
    
    vi.spyOn(document, 'createElement').mockReturnValue(mockLink as HTMLLinkElement);
    
    bundleOptimization.preloadResource('/test.css', 'style', 'text/css');
    
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
      onload: null as (() => void) | null,
    };
    
    vi.spyOn(document, 'createElement').mockReturnValue(mockLink as HTMLLinkElement);
    
    bundleOptimization.prefetchResource('/next-page.js');
    
    expect(mockLink.rel).toBe('prefetch');
    expect(mockLink.href).toBe('/next-page.js');
    expect(document.head.appendChild).toHaveBeenCalledWith(mockLink);
  });

  it('should handle dynamic imports with performance measurement', async () => {
    const mockModule = { default: 'test module' };
    const importFn = vi.fn().mockResolvedValue(mockModule);
    
    mockPerformance.now.mockReturnValueOnce(0).mockReturnValueOnce(50);
    
    const result = await bundleOptimization.dynamicImport(importFn);
    
    expect(result).toBe(mockModule);
    expect(importFn).toHaveBeenCalled();
    
    const metrics = performanceMonitor.getMetrics();
    expect(metrics).toHaveLength(1);
    expect(metrics[0].name).toBe('Dynamic Import');
    expect(metrics[0].duration).toBe(50);
  });
});

describe('Image Optimization', () => {
  it('should generate responsive srcset', () => {
    const srcSet = imageOptimization.generateSrcSet('/image.jpg', [320, 640, 1024]);
    
    expect(srcSet).toBe('/image.jpg?w=320 320w, /image.jpg?w=640 640w, /image.jpg?w=1024 1024w');
  });

  it('should get optimal image size', () => {
    const size1 = imageOptimization.getOptimalSize(300, 1);
    expect(size1).toBe(320);
    
    const size2 = imageOptimization.getOptimalSize(500, 2);
    expect(size2).toBe(1024);
    
    const size3 = imageOptimization.getOptimalSize(2000, 1);
    expect(size3).toBe(1920);
  });

  it('should preload images', async () => {
    const mockImage = {
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
      src: '',
    };
    
    // Mock Image constructor
    global.Image = vi.fn().mockImplementation(() => mockImage);
    
    const preloadPromise = imageOptimization.preloadImage('/test-image.jpg');
    
    // Simulate successful load
    mockImage.onload?.();
    
    await expect(preloadPromise).resolves.toBeUndefined();
    expect(mockImage.src).toBe('/test-image.jpg');
  });

  it('should handle image preload errors', async () => {
    const mockImage = {
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
      src: '',
    };
    
    global.Image = vi.fn().mockImplementation(() => mockImage);
    
    const preloadPromise = imageOptimization.preloadImage('/broken-image.jpg');
    
    // Simulate error
    mockImage.onerror?.();
    
    await expect(preloadPromise).rejects.toBeUndefined();
  });
});

describe('Performance Hook', () => {
  it('should track component render time', () => {
    performanceMonitor.clearMetrics(); // Clear any existing metrics
    mockPerformance.now.mockReturnValueOnce(0);
    
    const { logRenderTime } = usePerformanceMonitor('TestComponent');
    
    mockPerformance.now.mockReturnValueOnce(25);
    logRenderTime();
    
    const metrics = performanceMonitor.getMetrics();
    expect(metrics).toHaveLength(1);
    expect(metrics[0].name).toBe('TestComponent Render');
    expect(metrics[0].duration).toBe(25);
  });
});