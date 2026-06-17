import { useEffect, useRef } from 'react';

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let raf = 0;

    const particles = Array.from({ length: 120 }, (_, i) => ({
      x: Math.random() * 2000,
      y: Math.random() * 1200,
      r: i % 9 === 0 ? Math.random() * 2.2 + 1.2 : Math.random() * 1.35 + 0.35,
      vx: (Math.random() - 0.5) * (i % 4 === 0 ? 0.12 : 0.28),
      vy: (Math.random() - 0.5) * (i % 4 === 0 ? 0.12 : 0.28),
      a: Math.random() * 0.5 + 0.07,
      hue: i % 5,
    }));

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const t = performance.now() * 0.00018;

      const aurora = ctx.createRadialGradient(
        W * (0.2 + Math.sin(t) * 0.05),
        H * (0.1 + Math.cos(t * 1.2) * 0.05),
        0,
        W * 0.2,
        H * 0.1,
        Math.max(W, H) * 0.65,
      );
      aurora.addColorStop(0, 'rgba(99,102,241,0.16)');
      aurora.addColorStop(0.45, 'rgba(20,184,166,0.06)');
      aurora.addColorStop(1, 'rgba(3,11,24,0)');
      ctx.fillStyle = aurora;
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        const colour =
          p.hue === 0 ? '99,102,241' :
          p.hue === 1 ? '20,184,166' :
          p.hue === 2 ? '96,165,250' :
          p.hue === 3 ? '168,85,247' :
          '251,191,36';

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colour},${p.a})`;
        ctx.fill();

        if (p.r > 1.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colour},${p.a * 0.08})`;
          ctx.fill();
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        opacity: 0.4,
        pointerEvents: 'none',
      }}
    />
  );
}
