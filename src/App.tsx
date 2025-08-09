import { useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';
import { performanceMonitor, bundleOptimization } from './utils/performance';
import { usePerformanceMonitor } from './utils/performance';

function App() {
  const { logRenderTime } = usePerformanceMonitor('App');

  useEffect(() => {
    // Log initial render time
    logRenderTime();

    // Preload locally hosted Inter variable font
    bundleOptimization.preloadResource('/fonts/Inter-VariableFont_slnt,wght.woff2', 'font', 'font/woff2');

    // Log page load performance
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        performanceMonitor.logMetric('Page Load Complete', performance.now());
      });
    }

    // No API prefetch on static hosting
    
    return () => {
      // Cleanup performance monitoring
      performanceMonitor.cleanup();
    };
  }, [logRenderTime]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip link for screen readers */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <ErrorBoundary>
        <Header siteName="Andrea Gray Coaching" />
      </ErrorBoundary>
      
      {/* Main content with sections for navigation testing */}
      <main id="main-content" className="pt-16 md:pt-20">
        {/* Hero Section */}
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>

        {/* About Section */}
        <ErrorBoundary>
          <About />
        </ErrorBoundary>

        {/* Services Section */}
        <ErrorBoundary>
          <Services />
        </ErrorBoundary>

        {/* Testimonials Section */}
        <ErrorBoundary>
          <Testimonials />
        </ErrorBoundary>

        {/* Blog Section */}
        <ErrorBoundary>
          <Blog />
        </ErrorBoundary>

        {/* Contact Section */}
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <ErrorBoundary>
        <Footer siteName="Andrea Gray Coaching" />
      </ErrorBoundary>
    </div>
  );
}

export default App;
