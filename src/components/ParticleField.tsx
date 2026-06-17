import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  hue: number;
  twinkle: number;
};

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

    const particles: Particle[] = Array.from({ length: 160 }, (_, i) => ({
      x: Math.random() * 2000,
      y: Math.random() * 1200,
      r: i % 11 === 0 ? Math.random() * 2.4 + 1.4 : Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * (i % 4 === 0 ? 0.14 : 0.32),
      vy: (Math.random() - 0.5) * (i % 4 === 0 ? 0.14 : 0.32),
      a: Math.random() * 0.55 + 0.12,
      hue: i % 5,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const colourFor = (hue: number) =>
      hue === 0 ? '99,102,241' :
      hue === 1 ? '20,184,166' :
      hue === 2 ? '96,165,250' :
      hue === 3 ? '168,85,247' :
      '251,191,36';

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const drawAurora = (t: number) => {
      const blobs = [
        { cx: 0.18 + Math.sin(t) * 0.06, cy: 0.08 + Math.cos(t * 1.1) * 0.04, r: 0.72, c1: 'rgba(99,102,241,0.28)', c2: 'rgba(99,102,241,0)' },
        { cx: 0.82 + Math.cos(t * 0.85) * 0.05, cy: 0.12 + Math.sin(t * 1.3) * 0.04, r: 0.58, c1: 'rgba(20,184,166,0.22)', c2: 'rgba(20,184,166,0)' },
        { cx: 0.5 + Math.sin(t * 0.7) * 0.08, cy: 0.72 + Math.cos(t * 0.9) * 0.05, r: 0.55, c1: 'rgba(168,85,247,0.18)', c2: 'rgba(168,85,247,0)' },
        { cx: 0.35 + Math.cos(t * 1.15) * 0.06, cy: 0.45 + Math.sin(t * 0.65) * 0.05, r: 0.42, c1: 'rgba(59,130,246,0.14)', c2: 'rgba(59,130,246,0)' },
      ];

      for (const b of blobs) {
        const g = ctx.createRadialGradient(
          W * b.cx, H * b.cy, 0,
          W * b.cx, H * b.cy, Math.max(W, H) * b.r,
        );
        g.addColorStop(0, b.c1);
        g.addColorStop(0.55, b.c2);
        g.addColorStop(1, 'rgba(3,11,24,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
    };

    const drawConnections = () => {
      const maxDist = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > maxDist) continue;
          const alpha = (1 - dist / maxDist) * 0.07;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(129,140,248,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const t = performance.now() * 0.00022;

      drawAurora(t);
      drawConnections();

      for (const p of particles) {
        const colour = colourFor(p.hue);
        const twinkle = 0.65 + Math.sin(t * 3 + p.twinkle) * 0.35;
        const alpha = p.a * twinkle;

        if (p.r > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colour},${alpha * 0.1})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colour},${alpha})`;
        ctx.fill();

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
      className="deck-particles"
    />
  );
}
