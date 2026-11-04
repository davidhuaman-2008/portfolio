import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiServer, FiCloud, FiBarChart2 } from 'react-icons/fi';

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.15 });

  const skills = [
    { icon: <FiCode size={24} />, title: 'Frontend', desc: 'React, Angular, Bootstrap, CSS' },
    { icon: <FiServer size={24} />, title: 'Backend', desc: 'PHP/Laravel, Java, C#, Python' },
    { icon: <FiCloud size={24} />, title: 'Cloud', desc: 'Google Cloud, Azure, Linux' },
    { icon: <FiBarChart2 size={24} />, title: 'Data', desc: 'SQL Server, MySQL, Análisis de Datos' },
  ];

  return (
    <section id="about" ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-4">
          <span className="text-cyan-400 font-mono text-xl">01.</span> Sobre mí
          <div className="h-px bg-slate-700 flex-grow ml-4"></div>
        </h2>

        <div className="space-y-4 text-slate-400 leading-relaxed mb-8">
          <p>
            ¡Hola! Soy David, un desarrollador de software apasionado por crear soluciones eficientes y escalables. 
            Mi interés por la tecnología comenzó cuando descubrí cómo el código podía resolver problemas complejos 
            de manera automática.
          </p>
          <p>
            Hoy en día, me especializo en el desarrollo Full Stack, con experiencia en <span className="text-cyan-400">Laravel, React y Python</span>. 
            He trabajado en proyectos empresariales optimizando bases de datos, creando microservicios y analizando datos 
            para la toma de decisiones.
          </p>
          <p>
            Mi objetivo es seguir creciendo como profesional, aportando valor a través de soluciones tecnológicas 
            que marquen la diferencia.
          </p>
        </div>

        {/* Badge de IA */}
        <div className="mb-8 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full px-4 py-2">
          <span className="text-cyan-400 text-sm">✨</span>
          <span className="text-cyan-300 text-sm font-medium">Potenciado por IA</span>
          <span className="text-slate-500 text-xs">ChatGPT · DeepSeek · Claude · Gemini</span>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-6 rounded-xl hover:border-cyan-500/50 transition-colors group cursor-default"
            >
              <div className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <h3 className="text-white font-bold mb-1">{skill.title}</h3>
              <p className="text-slate-500 text-sm">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;