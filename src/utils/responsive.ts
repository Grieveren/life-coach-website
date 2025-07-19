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
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
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
};