import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { FiMail, FiGithub, FiLinkedin, FiYoutube, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useRef } from 'react';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(contactSchema) });

  const whatsappNumber = '51970429472';
  const whatsappMessage = 'Hola David! Vi tu portafolio y me gustaría contactarte.';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const onSubmit = async (data) => {
    try {
      const serviceId = 'TU_SERVICE_ID';
      const templateId = 'TU_TEMPLATE_ID';
      const publicKey = 'TU_PUBLIC_KEY';

      if (serviceId === 'TU_SERVICE_ID') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success('¡Mensaje enviado! (Configura EmailJS para envíos reales)');
      } else {
        await emailjs.send(serviceId, templateId, data, publicKey);
        toast.success('¡Mensaje enviado con éxito! Te responderé pronto.');
      }
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Hubo un error al enviar el mensaje. Intenta de nuevo.');
    }
  };

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center gap-4">
            <span className="text-cyan-400 font-mono text-xl">04.</span> Contacto
          </h2>

          <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente o quieres que forme parte de tu equipo? 
            Envíame un mensaje y te responderé lo antes posible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-xl p-8"
          >
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nombre</label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Tu nombre"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Mensaje</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                ></textarea>
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <FiSend /> Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 space-y-4"
          >
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">Contacto directo</h3>
              <div className="space-y-3">
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-green-400 transition-colors group">
                  <FaWhatsapp size={20} className="text-green-500 group-hover:scale-110 transition-transform" />
                  <span>+51 970 429 472</span>
                </a>
                <a href="mailto:dhuaman.2008@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group">
                  <FiMail size={20} className="text-cyan-500 group-hover:scale-110 transition-transform" />
                  <span className="break-all">dhuaman.2008@gmail.com</span>
                </a>
              </div>

              <div className="border-t border-slate-800 my-4"></div>

              <h3 className="text-white font-bold mb-4">Sígueme</h3>
              <div className="flex gap-4">
                <a href="https://github.com/davidhuaman-2008" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <FiGithub size={22} />
                </a>
                <a href="https://www.linkedin.com/in/dhuaman2008" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <FiLinkedin size={22} />
                </a>
                <a href="https://youtube.com/@davidhuaman" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-red-400 transition-colors">
                  <FiYoutube size={22} />
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm">
              <p className="text-slate-300 text-sm leading-relaxed">
                💡 <span className="text-cyan-400 font-medium">Respuesta rápida:</span> 
                Suelo responder en menos de 24 horas. Si es urgente, contáctame por WhatsApp.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;