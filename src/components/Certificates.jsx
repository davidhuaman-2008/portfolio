import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiFileText, FiExternalLink, FiBookOpen } from 'react-icons/fi';
import { useMemo } from 'react';

// Vite importa automáticamente todos los PDFs de esta carpeta de forma dinámica
const pdfFiles = import.meta.glob('../assets/certificados/*.pdf', { eager: true, query: '?url', import: 'default' });

const Certificates = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.15 });

  // Procesamos los archivos importados para crear el arreglo
  const certificates = useMemo(() => {
    const list = [];
    for (const path in pdfFiles) {
      const fileName = path.split('/').pop(); // Ej: "CERTIFICADO_JAVA.pdf"
      
      // Si es el título, lo saltamos de la lista normal (irá destacado arriba)
      if (fileName.toLowerCase().includes('titulo')) continue; 

      // Limpiamos el nombre para mostrarlo bonito (quitamos .pdf y guiones bajos)
      const cleanName = fileName
        .replace('.pdf', '')
        .replace(/_/g, ' ')
        .replace(/CERTIFICADO/gi, 'Certificado')
        .trim();

      list.push({
        title: cleanName,
        file: pdfFiles[path],
        originalName: fileName
      });
    }
    return list.sort((a, b) => a.title.localeCompare(b.title)); // Orden alfabético
  }, []);

  // Buscamos específicamente el archivo del título para el botón destacado
  const tituloFile = Object.values(pdfFiles).find(url => 
    url.toLowerCase().includes('titulo') || url.toLowerCase().includes('título')
  );

  return (
    <section id="certificates" ref={ref} className="py-24 relative w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-4">
            <span className="text-cyan-400 font-mono text-xl">04.</span> Certificados y Títulos
            <div className="h-px bg-slate-700 flex-grow ml-4"></div>
          </h2>

          {/* TARJETA DESTACADA: TÍTULO PROFESIONAL */}
          {tituloFile && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Brillo decorativo */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex items-center gap-5 relative z-10">
                <div className="p-4 bg-cyan-500/20 text-cyan-400 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <FiBookOpen size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Título Profesional Universitario</h3>
                  <p className="text-slate-400 text-sm mt-1">Ingeniería de Software / Grado Académico Oficial</p>
                </div>
              </div>
              
              <a 
                href={tituloFile} 
                target="_blank" 
                rel="noreferrer"
                className="relative z-10 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold rounded-lg transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] whitespace-nowrap w-full md:w-auto justify-center"
              >
                <FiExternalLink size={18} /> Ver Título
              </a>
            </motion.div>
          )}

          {/* GRID DE CERTIFICADOS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, index) => (
              <motion.a
                key={index}
                href={cert.file}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-5 rounded-xl hover:border-cyan-500/50 transition-all group cursor-pointer flex items-start gap-4"
              >
                <div className="text-cyan-400 mt-1 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <FiAward size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-sm leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {cert.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="bg-slate-800/80 text-slate-400 text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border border-slate-700/50">
                      PDF Oficial
                    </span>
                    <span className="text-cyan-500 text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiFileText size={12} /> Abrir
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;