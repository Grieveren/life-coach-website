import Header from './components/common/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header siteName="Life Coach" />
      
      {/* Main content with sections for navigation testing */}
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Services Section */}
        <Services />

        {/* Testimonials Section */}
        <section id="testimonials" className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read success stories and feedback from clients who have transformed their careers.
            </p>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Blog</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore articles about career transitions, work-life balance, and professional development.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get in touch to schedule a consultation and take the next step in your career journey.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
