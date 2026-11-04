import { useEffect, useRef } from 'react';

const Aurora = ({
  colorStops = ['#06b6d4', '#22d3ee', '#0891b2'],
  amplitude = 1.2,
  blend = 0.5,
  speed = 0.5,
  starCount = 200,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let time = 0;

    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      size: 0.8 + Math.random() * 2.5,
      twinkleSpeed: 0.5 + Math.random() * 3,
      twinkleOffset: Math.random() * Math.PI * 2,
      baseOpacity: 0.6 + Math.random() * 0.4,
      color: Math.random() > 0.7 ? '#ffffff' : '#67e8f9',
    }));

    const meteors = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 1.5 - 0.25,
      y: Math.random() * 0.6,
      length: 120 + Math.random() * 180,
      speed: 0.005 + Math.random() * 0.007,
      progress: Math.random(),
    }));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 6, g: 182, b: 212 };
    };

    const rgbColors = colorStops.map(hexToRgb);

    const draw = () => {
      time += 0.005 * speed;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // CAPA 1: Fondo base oscuro
      const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
      bgGradient.addColorStop(0, '#020617');
      bgGradient.addColorStop(0.5, '#0a0f1e');
      bgGradient.addColorStop(1, '#020617');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, w, h);

      // CAPA 2: Aurora
      rgbColors.forEach((color, layerIndex) => {
        const gradient = ctx.createLinearGradient(0, h * 0.3, 0, h);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        gradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.18 * blend})`);
        gradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.1 * blend})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        const offset = layerIndex * 1.5;
        const yBase = h * (0.3 + layerIndex * 0.15);

        for (let x = 0; x <= w; x += 8) {
          const y = yBase
            + Math.sin(x * 0.003 + time + offset) * 80 * amplitude
            + Math.sin(x * 0.007 + time * 1.3 + offset) * 40 * amplitude
            + Math.cos(x * 0.001 + time * 0.7 + offset) * 60 * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fill();
      });

      // CAPA 3: Meteoros
      meteors.forEach((meteor) => {
        meteor.progress += meteor.speed;
        if (meteor.progress > 1.5) {
          meteor.progress = -0.3;
          meteor.x = Math.random() * 1.5 - 0.25;
          meteor.y = Math.random() * 0.6;
          meteor.length = 120 + Math.random() * 180;
          meteor.speed = 0.005 + Math.random() * 0.007;
        }

        const startX = meteor.x * w;
        const startY = meteor.y * h;
        const currentX = startX + meteor.progress * 900;
        const currentY = startY + meteor.progress * 900;
        const tailX = currentX - meteor.length * 0.8;
        const tailY = currentY - meteor.length * 0.8;

        if (currentX > -300 && currentX < w + 300 && currentY > -300 && currentY < h + 300) {
          const opacity = Math.max(0, 1 - meteor.progress * 1.1);

          const gradient = ctx.createLinearGradient(tailX, tailY, currentX, currentY);
          gradient.addColorStop(0, `rgba(34, 211, 238, 0)`);
          gradient.addColorStop(0.5, `rgba(34, 211, 238, ${0.5 * opacity})`);
          gradient.addColorStop(0.9, `rgba(255, 255, 255, ${0.95 * opacity})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(currentX, currentY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(currentX, currentY, 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${opacity * 0.3})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      });

      // CAPA 4: Estrellas
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 3 + star.twinkleOffset) * 0.5 + 0.5;
        const opacity = star.baseOpacity * (0.3 + twinkle * 0.7);
        const size = star.size * (0.8 + twinkle * 0.6);
        const x = star.x * w;
        const y = star.y * h;

        ctx.beginPath();
        ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${opacity * 0.25})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [colorStops, amplitude, blend, speed, starCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default Aurora;