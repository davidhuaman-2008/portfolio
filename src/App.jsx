import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Aurora from './components/Aurora';
import WhatsAppButton from './components/WhatsAppButton'; // <-- Importamos el componente

// Carga diferida (Lazy Loading) para el ChatBot
const ChatBot = lazy(() => import('./components/ChatBot'));

function App() {
  return (
    <div className="relative min-h-screen text-slate-200 selection:bg-cyan-500 selection:text-slate-900">
      <Helmet>
        <title>David Huaman | Desarrollador Full Stack + IA</title>
        <meta name="description" content="Portafolio profesional de David Huaman. Desarrollador Full Stack especializado en React, Laravel, Python, IA y Arquitectura Cloud." />
        <meta name="author" content="David Huaman" />
        <meta property="og:title" content="David Huaman | Desarrollador Full Stack + IA" />
        <meta property="og:description" content="Portafolio profesional. Transformo datos en decisiones y código en experiencias digitales con el poder de la IA." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/src/assets/images/profile.jpg" />
      </Helmet>

      {/* Fondo Aurora (Canvas) */}
      <Aurora />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          
          {/* Sección Sobre mí y Experiencia */}
          <section className="container mx-auto px-6 py-24 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <About />
              <Experience />
            </div>
          </section>
          
          <Projects />
          
          <Certificates />
          
          <Contact />
        </main>
        
        <Footer />
      </div>

      {/* ChatBot Flotante con Lazy Loading */}
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>

      {/* Botón Flotante de WhatsApp (Reutilizando el componente) */}
      <WhatsAppButton isFloating={true} />
    </div>
  );
}

export default App;