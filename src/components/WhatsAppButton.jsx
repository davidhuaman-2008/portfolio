import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhatsAppButton = ({ isFloating = false, size = 24 }) => {
  const phoneNumber = '51970429472';
  const message = encodeURIComponent('Hola David! Vi tu portafolio y me gustaría contactarte.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  // Si es flotante, usamos el diseño grande de la esquina
  if (isFloating) {
    return (
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center transition-colors"
        title="Contactar por WhatsApp"
      >
        <FaWhatsapp size={30} />
      </motion.a>
    );
  }

  // Si no es flotante, es el icono simple para el Hero/Footer
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="hover:text-green-400 transition-colors hover:-translate-y-1 transform duration-300"
      title="Contactar por WhatsApp"
    >
      <FaWhatsapp size={size} />
    </a>
  );
};

export default WhatsAppButton;