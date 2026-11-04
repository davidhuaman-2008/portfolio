import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { 
  FiExternalLink, FiGithub, FiUsers, FiShoppingCart, FiFileText, 
  FiZap, FiChevronLeft, FiChevronRight, FiHome 
} from 'react-icons/fi';

import { 
  SiDotnet, SiBlazor, SiPython, SiDjango, SiSqlite, SiJavascript, 
  SiNodedotjs, SiExpress, SiHtml5, SiLaravel, SiPhp, SiReact, 
  SiMysql, SiTypescript, SiTailwindcss 
} from 'react-icons/si';

// Imports de imágenes
import aula1 from '../assets/images/Aula/aula1.png';
import aula2 from '../assets/images/Aula/aula2.png';
import aula3 from '../assets/images/Aula/aula3.png';
import aula4 from '../assets/images/Aula/aula4.png';
import aula5 from '../assets/images/Aula/aula5.png';

import venta1 from '../assets/images/ventas/venta1.png';
import venta2 from '../assets/images/ventas/venta2.png';
import venta3 from '../assets/images/ventas/venta3.png';
import venta4 from '../assets/images/ventas/venta4.png';
import venta5 from '../assets/images/ventas/venta5.png';
import venta6 from '../assets/images/ventas/venta6.png';

import sistema1 from '../assets/images/sistema/sistema1.png';
import sistema2 from '../assets/images/sistema/sistema2.png';
import sistema3 from '../assets/images/sistema/sistema3.png';
import sistema4 from '../assets/images/sistema/sistema4.png';
import sistema5 from '../assets/images/sistema/sistema5.png';

import hospedaje1 from '../assets/images/Hospedaje/hospedaje1.png';
import hospedaje2 from '../assets/images/Hospedaje/hospedaje2.png';
import hospedaje3 from '../assets/images/Hospedaje/hospedaje3.png';
import hospedaje4 from '../assets/images/Hospedaje/hospedaje4.png';
import hospedaje5 from '../assets/images/Hospedaje/hospedaje5.png';
import valergy from '../assets/images/valergy.png';

const SqlServerIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 4v16h20V4H2zm2 2h16v12H4V6zm2 2v8h2V8H6zm4 0v8h2V8h-2zm4 0v8h2V8h-2zm4 0v8h2V8h-2z"/>
  </svg>
);

const CssIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 2l1.5 18L12 22l5.5-2L19 2H5zm11.5 5l-.5 5.5-4 1.1-4-1.1L7.5 7h9z"/>
  </svg>
);

const CoverflowCarousel = ({ images, title }) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length, isPaused]);

  const getOffset = (i) => {
    let diff = i - index;
    if (diff > images.length / 2) diff -= images.length;
    if (diff < -images.length / 2) diff += images.length;
    return diff;
  };

  const handlePrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <div 
      className="h-[400px] bg-slate-950/60 relative overflow-hidden group/carousel rounded-2xl border border-slate-800/50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_70%)]"></div>

      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1500px' }}>
        {images.map((img, i) => {
          const offset = getOffset(i);
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          return (
            <motion.div
              key={i}
              className="absolute w-full h-full flex items-center justify-center"
              initial={false}
              animate={{
                x: `${offset * 50}%`,
                scale: isActive ? 1 : 0.7,
                rotateY: offset * -30,
                opacity: isActive ? 1 : Math.abs(offset) === 1 ? 0.4 : 0.15,
                zIndex: isActive ? 10 : 5 - Math.abs(offset),
                filter: isActive ? 'brightness(1)' : 'brightness(0.4)',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.8 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={img}
                alt={`${title} - ${i + 1}`}
                className={`w-[85%] h-[85%] object-cover rounded-xl shadow-2xl ${
                  isActive ? 'ring-2 ring-cyan-400/50 shadow-[0_0_40px_rgba(6,182,212,0.3)]' : ''
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-cyan-500 text-white p-2.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-30 backdrop-blur-sm hover:scale-110"
          >
            <FiChevronLeft size={22} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-cyan-500 text-white p-2.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-30 backdrop-blur-sm hover:scale-110"
          >
            <FiChevronRight size={22} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'bg-cyan-400 w-8 shadow-[0_0_12px_rgba(34,211,238,0.8)]' : 'bg-slate-500/50 hover:bg-slate-400 w-2'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 0;
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
      className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? '' : 'lg:direction-rtl'}`}
      style={{ direction: isEven ? 'ltr' : 'rtl' }}
    >
      <motion.div 
        className="lg:col-span-7"
        style={{ direction: 'ltr' }}
        initial={{ opacity: 0, x: isEven ? -80 : 80 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -80 : 80 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <CoverflowCarousel images={project.images} title={project.title} />
      </motion.div>

      <motion.div 
        className="lg:col-span-5 space-y-5"
        style={{ direction: 'ltr' }}
        initial={{ opacity: 0, x: isEven ? 80 : -80 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 80 : -80 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-3">
          <div className="text-cyan-400 p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
            {project.icon}
          </div>
          <span className="text-cyan-400 font-mono text-sm">Proyecto {String(index + 1).padStart(2, '0')}</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
          {project.title}
        </h3>

        <p className="text-slate-400 leading-relaxed">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t, i) => (
            <div 
              key={i} 
              title={t.name}
              className="flex items-center gap-2 text-slate-300 bg-slate-800/60 hover:bg-cyan-500/10 hover:text-cyan-400 border border-slate-700/50 px-3 py-2 rounded-lg transition-colors cursor-help"
            >
              <span className="text-lg">{t.icon}</span>
              <span className="text-xs font-mono">{t.name}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          {project.repo && (
            <a 
              href={project.repo} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-all hover:border-cyan-500/50"
            >
              <FiGithub size={18} /> Ver Código
            </a>
          )}
          {project.demo && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            >
              <FiExternalLink size={18} /> Ver Sitio en Vivo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

  const projects = [
    {
      title: 'Sistema de Gestión de Aula',
      desc: 'Sistema web completo para gestión de calificaciones escolares. Permite visualizar el estado académico de cada alumno, consultar libretas con 4 parciales y obtener resúmenes estadísticos por materia.',
      tech: [
        { icon: <SiDotnet />, name: '.NET 10' },
        { icon: <SiBlazor />, name: 'Blazor' },
        { icon: <SqlServerIcon />, name: 'SQL Server' },
      ],
      icon: <FiUsers size={32} />,
      repo: 'https://github.com/davidhuaman-2008/GestionAula',
      demo: null,
      images: [aula1, aula2, aula3, aula4, aula5],
    },
    {
      title: 'Sistema de Gestión de Ventas y Stock',
      desc: 'Sistema web completo para gestión de ventas, control de inventario y registro de clientes. Incluye autenticación, roles y permisos, cálculo automático de IGV (18%), gestión de stock en tiempo real y exportación a Excel/PDF.',
      tech: [
        { icon: <SiPython />, name: 'Python' },
        { icon: <SiDjango />, name: 'Django' },
        { icon: <SiSqlite />, name: 'SQLite' },
        { icon: <SiJavascript />, name: 'JavaScript' },
      ],
      icon: <FiShoppingCart size={32} />,
      repo: 'https://github.com/davidhuaman-2008/sistema-gestion-ventas',
      demo: null,
      images: [venta1, venta2, venta3, venta4, venta5, venta6],
    },
    {
      title: 'Sistema de Registro con Excel como BD',
      desc: 'Sistema CRUD que utiliza un archivo Excel (.xlsx) como base de datos. Construido con Node.js, Express y JavaScript modular. Incluye filtros en tiempo real, validación de DNI duplicado y cálculo automático de edad.',
      tech: [
        { icon: <SiNodedotjs />, name: 'Node.js' },
        { icon: <SiExpress />, name: 'Express' },
        { icon: <SiJavascript />, name: 'JavaScript' },
      ],
      icon: <FiFileText size={32} />,
      repo: 'https://github.com/davidhuaman-2008/sistema-de-registro',
      demo: null,
      images: [sistema1, sistema2, sistema3, sistema4, sistema5],
    },
        {
      title: 'Sistema de Gestión de Hospedaje',
      desc: 'Sistema web integral para la administración de hoteles y hospedajes. Arquitectura desacoplada con un Backend en Laravel (API REST) y un Frontend SPA en React + TypeScript. Incluye módulo de recepción con mapa interactivo en tiempo real, control de caja, gestión de usuarios con roles, sistema de auditoría visual (comparador antes/después) y dashboard con KPIs.',
      tech: [
        { icon: <SiLaravel />, name: 'Laravel' },
        { icon: <SiPhp />, name: 'PHP' },
        { icon: <SiReact />, name: 'React' },
        { icon: <SiTypescript />, name: 'TypeScript' },
        { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
        { icon: <SiMysql />, name: 'MySQL' },
      ],
      icon: <FiHome size={32} />, 
      repo: 'https://github.com/davidhuaman-2008/SistemaHospedaje',
      demo: null, 
      images: [hospedaje1, hospedaje2, hospedaje3, hospedaje4, hospedaje5],
    },
    {
      title: 'Valergy - Soluciones Eléctricas',
      desc: 'Sitio web corporativo para empresa de ingeniería eléctrica, desarrollado desde cero con HTML, CSS y JavaScript puro. Diseño responsive, optimizado para SEO y con animaciones personalizadas. Proyecto real en producción.',
      tech: [
        { icon: <SiHtml5 />, name: 'HTML5' },
        { icon: <CssIcon />, name: 'CSS3' },
        { icon: <SiJavascript />, name: 'JavaScript' },
      ],
      icon: <FiZap size={32} />,
      repo: null,
      demo: 'https://valergy.com.pe',
      images: [valergy],
    },
  ];

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-4">
            <span className="text-cyan-400 font-mono text-xl">03.</span> Proyectos
            <div className="h-px bg-slate-700 flex-grow ml-4"></div>
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Una selección de los proyectos que he desarrollado. Cada uno representa un desafío diferente 
            y me ha permitido crecer como desarrollador Full Stack.
          </p>
        </motion.div>

        <div className="space-y-24 lg:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;