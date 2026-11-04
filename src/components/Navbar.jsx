import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre mí', to: 'about' },
    { name: 'Experiencia', to: 'experience' },
    { name: 'Proyectos', to: 'projects' },
    { name: 'Certificados', to: 'certificates' }, // <-- NUEVO ENLACE AGREGADO
    { name: 'Contacto', to: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="hero" smooth={true} duration={500} className="text-2xl font-bold text-cyan-400 cursor-pointer">
          DH<span className="text-white">.</span>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              smooth={true}
              duration={500}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 cursor-pointer transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a href="/CV_DAVID_HUAMAN_ROMERO.pdf" target="_blank" rel="noreferrer" className="text-sm font-medium text-cyan-400 border border-cyan-400 px-4 py-2 rounded hover:bg-cyan-400/10 transition-colors ml-2">
            CV
          </a>
        </div>

        <button className="md:hidden text-slate-300 text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-slate-900 border-t border-slate-800"
        >
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                smooth={true}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-cyan-400 cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
            <a href="/CV_DAVID_HUAMAN_ROMERO.pdf" target="_blank" rel="noreferrer" className="text-cyan-400 border border-cyan-400 px-4 py-2 rounded text-center mt-2">
              Descargar CV
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;