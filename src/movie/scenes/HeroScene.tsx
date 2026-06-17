import { useCallback } from 'react';
import gsap from 'gsap';
import { Brain, Zap } from 'lucide-react';
import { BRAND } from '../../brand';
import { useSceneTimeline, staggerIn, countUp } from '../useSceneTimeline';

type Props = { active: boolean };

const stats = [
  { n: 9, label: 'AI Assistants', suffix: '' },
  { n: 1, label: 'Shared Memory', suffix: '' },
  { n: 100, label: 'Human-Approved', suffix: '%' },
];

export function HeroScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.15);
    staggerIn(tl, root, '[data-animate="stat"]', 0.1);
    const n0 = root.querySelector('[data-count="0"]');
    const n1 = root.querySelector('[data-count="1"]');
    const n2 = root.querySelector('[data-count="2"]');
    countUp(tl, n0, 9, '', 0.4);
    countUp(tl, n1, 1, '', 0.5);
    countUp(tl, n2, 100, '%', 0.6);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref} className="fill" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', width: 420, height: 420, border: '1px solid rgba(109,125,252,.08)', borderRadius: '50%', animation: 'spin 40s linear infinite' }} aria-hidden />
      <div className="eyebrow" data-animate="header"><Zap size={12} /> Intelligence Platform · PRM</div>
      <h1
        data-animate="header"
        style={{
          fontSize: 'clamp(3rem, 10vw, 6.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          background: 'linear-gradient(135deg,#a5b4ff,#6d7dfc,#2dd4bf,#a5b4ff)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shimmer 4s linear infinite',
          marginBottom: '0.25rem',
        }}
      >
        {BRAND.name}
      </h1>
      <p data-animate="header" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>{BRAND.by}</p>
      <p data-animate="header" style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.15rem)', maxWidth: 560, lineHeight: 1.55, marginBottom: '1.5rem', fontWeight: 300 }}>
        Your organisation's <strong style={{ color: 'var(--accent2)' }}>collective intelligence</strong> — every decision captured, validated, and compounding.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {stats.map((s, i) => (
          <div key={s.label} data-animate="stat" className="glass" style={{ padding: '0.75rem 1.25rem', minWidth: 100, textAlign: 'center' }}>
            <div data-count={i} style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--accent2)' }}>0{s.suffix}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--muted)', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
        <div data-animate="stat" className="glass" style={{ padding: '0.75rem 1.25rem', minWidth: 100, textAlign: 'center' }}>
          <Brain size={28} color="var(--accent2)" style={{ margin: '0 auto 4px' }} />
          <div style={{ fontSize: '0.65rem', color: 'var(--muted)', fontWeight: 600 }}>Compounding</div>
        </div>
      </div>
      <style>{`
        @keyframes shimmer { from { background-position: 0% center; } to { background-position: 200% center; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
