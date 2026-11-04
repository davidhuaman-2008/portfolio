import { FiGithub, FiLinkedin, FiMail, FiYoutube } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const whatsappNumber = '51970429472';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="py-12 text-center text-slate-500 text-sm border-t border-slate-800">
      <div className="container mx-auto px-6">
        {/* Redes sociales */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://github.com/davidhuaman-2008" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors" title="GitHub">
            <FiGithub size={22} />
          </a>
          <a href="https://www.linkedin.com/in/dhuaman2008" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors" title="LinkedIn">
            <FiLinkedin size={22} />
          </a>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors" title="WhatsApp">
            <FaWhatsapp size={22} />
          </a>
          <a href="mailto:dhuaman.2008@gmail.com" className="hover:text-cyan-400 transition-colors" title="Email">
            <FiMail size={22} />
          </a>
          <a href="https://youtube.com/@davidhuaman" target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors" title="YouTube">
            <FiYoutube size={22} />
          </a>
        </div>

        <p>Diseñado y construido por <span className="text-cyan-400 font-medium">David Huaman</span></p>
        <p className="mt-2">© {new Date().getFullYear()} - Todos los derechos reservados</p>
        <p className="mt-2 text-xs text-slate-600">Hecho con React + Vite + Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;