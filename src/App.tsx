import Header from './components/common/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';

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
        <Testimonials />

        {/* Blog Section */}
        <Blog />

        {/* Contact Section */}
        <Contact />
      </main>
    </div>
  );
}

export default App;
