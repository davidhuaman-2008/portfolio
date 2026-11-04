import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiUser, FiCpu } from 'react-icons/fi';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Qué gusto que estés revisando mi portafolio. Soy David. ¿Tienes alguna duda sobre mi experiencia, mis proyectos o las tecnologías que manejo? Pregúntame lo que quieras.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => { scrollToBottom(); }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.slice(1) }) 
      });

      const data = await response.json();
      
      // RETRASO HUMANO: Simulamos que está escribiendo (entre 1.5 y 2.5 segundos)
      // Esto es clave para que no se sienta como una IA instantánea.
      const delay = Math.floor(Math.random() * 1000) + 1500; 
      
      setTimeout(() => {
        if (data.reply) {
          setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
        } else {
          throw new Error('Respuesta vacía');
        }
        setIsLoading(false);
      }, delay);

    } catch (error) {
      // Si falla, también esperamos un poco para que no sea un error instantáneo feo
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Uy, parece que se me cayó la conexión por un segundo. ¿Me repites la pregunta o me escribes a dhuaman.2008@gmail.com?' }]);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[340px] md:w-[380px] bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="bg-slate-950/90 p-4 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                {/* Foto de perfil (puedes poner tu foto real aquí si quieres) */}
                <div className="w-10 h-10 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center border border-cyan-500/30">
                  <span className="font-bold text-lg">DH</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">David Huaman</h3>
                  <p className="text-cyan-400 text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> En línea
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1">
                <FiX size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  
                  {/* Avatar del chat */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-cyan-500 text-slate-900'}`}>
                    {msg.role === 'user' ? <FiUser size={14} /> : <span className="font-bold text-xs">DH</span>}
                  </div>

                  {/* Burbuja del mensaje */}
                  <div className={`p-3 rounded-2xl text-[13px] max-w-[82%] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-tr-sm' : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700/50'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {/* Indicador de "Escribiendo..." */}
              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-900 flex items-center justify-center shrink-0">
                    <span className="font-bold text-xs">DH</span>
                  </div>
                  <div className="p-3.5 bg-slate-800 rounded-2xl rounded-tl-sm border border-slate-700/50 flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-slate-950/80 border-t border-slate-800">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta aquí..."
                  className="w-full bg-slate-800 text-white text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 placeholder-slate-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-2.5 bg-cyan-500 text-slate-900 rounded-full hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Flotante */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center relative group"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
        <span className="absolute inset-0 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity"></span>
        
        {/* Notificación roja simulada para llamar la atención */}
        {!isOpen && (
           <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-slate-900 rounded-full"></span>
        )}
      </motion.button>
    </div>
  );
};

export default ChatBot;