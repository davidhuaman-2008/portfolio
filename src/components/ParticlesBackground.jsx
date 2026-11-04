const ParticlesBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradiente base */}
      <div className="absolute inset-0 bg-slate-950"></div>
      
      {/* Aurora cyan animada */}
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-30 animate-aurora">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500 blur-[150px]"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500 blur-[150px]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] rounded-full bg-cyan-600 blur-[180px]"></div>
      </div>

      {/* Grid sutil */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      ></div>

      {/* Estrellas parpadeantes */}
      <div className="absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.6,
            }}
          />
        ))}
      </div>

      {/* Vignette oscuro */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#020617_100%)]"></div>
    </div>
  );
};

export default ParticlesBackground;