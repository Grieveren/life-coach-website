import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ErrorBoundary>
        <Header siteName="Life Coach" />
      </ErrorBoundary>
      
      {/* Main content with sections for navigation testing */}
      <main className="pt-16 md:pt-20">
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
        <Footer siteName="Andrea Grey Coaching" />
      </ErrorBoundary>
    </div>
  );
}

export default App;
