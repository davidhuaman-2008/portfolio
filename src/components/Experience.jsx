import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.15 });

  const experiences = [
    {
      title: 'IT Application Analyst',
      company: 'NTT DATA Perú S.A.C.',
      date: '08/2025 - Presente',
      description: [
        'Monitoreo y soporte de infraestructura en máquinas virtuales.',
        'Análisis de logs y datos para detección de incidencias.',
        'Gestión de sistemas de punto de venta (TPV) y plataforma Everilion.',
        'Ejecución de consultas SQL para validación de información.',
      ],
    },
    {
      title: 'Desarrollo de Software',
      company: 'SLIN S.A.C.',
      date: '02/2025 - 04/2025',
      description: [
        'Desarrollo de dashboard interactivo utilizando Flutter.',
        'Creación y mantenimiento de un ERP para gestión empresarial.',
        'Integración de módulos para mejorar la eficiencia operativa.',
      ],
    },
    {
      title: 'Desarrollador de Software',
      company: 'HOSPEDAJE "SAFARI SUITE" DAMIBEN E.I.R.L',
      date: '06/2023 - 12/2024',
      description: [
        'Desarrollé un sistema de gestión de ventas, stock y ganancias.',
        'Creé microservicios y APIs en PHP optimizando la base de datos.',
        'Implementé reportes y análisis de datos en tiempo real.',
      ],
    },
  ];

  return (
    <section id="experience" ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-4">
          <span className="text-cyan-400 font-mono text-xl">02.</span> Experiencia
          <div className="h-px bg-slate-700 flex-grow ml-4"></div>
        </h2>

        <div className="relative border-l border-slate-700 ml-4 space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
              className="relative pl-8"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                className="absolute -left-[9px] top-1 w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-950"
              >
                <motion.div 
                  animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 bg-cyan-500 rounded-full"
                />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-5 rounded-xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300"
              >
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                  <p className="text-cyan-400 font-medium flex items-center gap-2 text-sm">
                    <FiBriefcase size={14} /> {exp.company}
                  </p>
                  <span className="text-slate-500 text-xs flex items-center gap-1.5 mt-2 bg-slate-800/70 px-2.5 py-1 rounded-full w-fit">
                    <FiCalendar size={12} /> {exp.date}
                  </span>
                </div>
                <ul className="space-y-1.5 text-slate-400 text-sm">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;