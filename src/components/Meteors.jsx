import { useEffect, useState } from 'react';

export const Meteors = ({ number = 25 }) => {
  const [meteorStyles, setMeteorStyles] = useState([]);

  useEffect(() => {
    const styles = Array.from({ length: number }).map(() => ({
      top: `${Math.floor(Math.random() * 60)}%`,
      left: `${Math.floor(Math.random() * 120) - 10}%`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${3 + Math.random() * 5}s`,
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className="pointer-events-none absolute h-0.5 w-0.5 rotate-[215deg] rounded-full bg-cyan-400 shadow-[0_0_0_1px_#22d3ee33] before:absolute before:top-1/2 before:h-px before:w-[80px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-cyan-400 before:to-transparent before:content-['']"
          style={{
            top: style.top,
            left: style.left,
            animation: `meteor ${style.animationDuration} linear infinite`,
            animationDelay: style.animationDelay,
          }}
        />
      ))}
    </div>
  );
};