import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiChevronDown } from 'react-icons/fi';
import profileImg from '../assets/images/profile.jpg';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-cyan-400 font-mono text-lg tracking-wider">Hola, mi nombre es</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            David Huaman.
          </h1>
          
          <div className="text-3xl md:text-4xl font-bold text-slate-400 h-24 md:h-16">
            <TypeAnimation
              sequence={[
                'Desarrollador Full Stack.',
                2000,
                'Experto en Laravel & React.',
                2000,
                'Analista de Datos.',
                2000,
                'Arquitecto Cloud.',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-cyan-300"
            />
          </div>

          <p className="text-slate-400 max-w-lg text-lg leading-relaxed">
            Especializado en crear soluciones escalables y eficientes. 
            Transformo datos en decisiones y código en experiencias digitales memorables.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projects" className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold rounded-lg transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
              Ver Proyectos
            </a>
            <a href="/CV_DAVID_HUAMAN_ROMERO.pdf" download className="px-8 py-3 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold rounded-lg transition-all flex items-center gap-2">
              <FiDownload size={20} /> Descargar CV
            </a>
          </div>

          <div className="flex gap-6 pt-8 text-slate-400">
            <a href="https://github.com/davidhuaman-2008" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors hover:-translate-y-1 transform duration-300"><FiGithub size={28} /></a>
            <a href="https://www.linkedin.com/in/dhuaman2008" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors hover:-translate-y-1 transform duration-300"><FiLinkedin size={28} /></a>
            <a href="mailto:dhuaman.2008@gmail.com" className="hover:text-cyan-400 transition-colors hover:-translate-y-1 transform duration-300"><FiMail size={28} /></a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center relative"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-cyan-500 rounded-full blur-3xl"
          ></motion.div>
          
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl z-10">
            <img 
              src={profileImg} 
              alt="David Huaman" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>

      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-cyan-400 cursor-pointer z-10"
      >
        <FiChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;