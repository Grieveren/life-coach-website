/**
 * Responsive design utilities for the life coach website
 */

// Breakpoint values matching Tailwind config
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Check if current viewport matches a breakpoint
 */
export const isBreakpoint = (breakpoint: Breakpoint): boolean => {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= BREAKPOINTS[breakpoint];
};

/**
 * Get current breakpoint
 */
export const getCurrentBreakpoint = (): Breakpoint => {
  if (typeof window === 'undefined') return 'sm';
  
  const width = window.innerWidth;
  
  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  if (width >= BREAKPOINTS.xs) return 'xs';
  return 'xs'; // Default fallback
};

/**
 * Check if device is mobile (below md breakpoint)
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < BREAKPOINTS.md;
};

/**
 * Check if device is tablet (md to lg breakpoint)
 */
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
};

/**
 * Check if device is desktop (lg breakpoint and above)
 */
export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS.lg;
};

/**
 * Check if device supports touch
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Get responsive image sizes based on breakpoints
 */
export const getResponsiveImageSizes = (
  sizes: Partial<Record<Breakpoint, string>>
): string => {
  const sizeEntries = Object.entries(sizes) as [Breakpoint, string][];
  
  return sizeEntries
    .sort(([a], [b]) => BREAKPOINTS[a] - BREAKPOINTS[b])
    .map(([breakpoint, size], index, array) => {
      if (index === array.length - 1) {
        return size; // Default size for largest breakpoint
      }
      return `(min-width: ${BREAKPOINTS[breakpoint]}px) ${size}`;
    })
    .join(', ');
};

/**
 * Debounce function for resize events
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Hook for responsive behavior (React hook)
 */
export const useResponsive = () => {
  if (typeof window === 'undefined') {
    return {
      breakpoint: 'sm' as Breakpoint,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouchDevice: false,
    };
  }

  return {
    breakpoint: getCurrentBreakpoint(),
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    isTouchDevice: isTouchDevice(),
  };
};/**
 * Per
formance-optimized responsive utilities
 */

/**
 * Performance-optimized media query hook
 */
export const useMediaQuery = (query: string): boolean => {
  if (typeof window === 'undefined') return false;

  const mediaQuery = window.matchMedia(query);
  return mediaQuery.matches;
};

/**
 * Optimized viewport detection with performance monitoring
 */
export const getViewportInfo = () => {
  if (typeof window === 'undefined') {
    return {
      width: 1024,
      height: 768,
      devicePixelRatio: 1,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const devicePixelRatio = window.devicePixelRatio || 1;

  return {
    width,
    height,
    devicePixelRatio,
    isMobile: width < BREAKPOINTS.md,
    isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
    isDesktop: width >= BREAKPOINTS.lg,
  };
};

/**
 * Performance-optimized resize observer
 */
export class ResponsiveObserver {
  private callbacks: Set<() => void> = new Set();
  private isObserving = false;

  addCallback(callback: () => void) {
    this.callbacks.add(callback);
    this.startObserving();
  }

  removeCallback(callback: () => void) {
    this.callbacks.delete(callback);
    if (this.callbacks.size === 0) {
      this.stopObserving();
    }
  }

  private startObserving() {
    if (this.isObserving || typeof window === 'undefined') return;

    this.isObserving = true;
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);
  }

  private stopObserving() {
    if (!this.isObserving || typeof window === 'undefined') return;

    this.isObserving = false;
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.handleResize);
  }

  private handleResize = () => {
    const debouncedCallback = debounce(() => {
      this.callbacks.forEach(callback => callback());
    }, 150);
    debouncedCallback();
  };

  cleanup() {
    this.callbacks.clear();
    this.stopObserving();
  }
}

// Singleton instance
export const responsiveObserver = new ResponsiveObserver();

/**
 * Cleanup on page unload
 */
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    responsiveObserver.cleanup();
  });
}