import { useCallback } from 'react';
import { Zap } from 'lucide-react';
import { BRAND } from '../../brand';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const pills = [
  'Sits in your meetings',
  'Remembers everything',
  'Generates your documents',
  'Learns your standards',
  'Secures your IP',
  'Human-approved',
  'You control access',
];

export function ClosingScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="brand"]', 0.15);
    staggerIn(tl, root, '[data-animate="pill"]', 0.06);
    staggerIn(tl, root, '[data-animate="cta"]', 0.2);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref} className="fill" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="eyebrow" data-animate="brand"><Zap size={12} /> PRM Intelligence Platform</div>
      <h1
        data-animate="brand"
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg,#a5b4ff,#6d7dfc,#2dd4bf)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem',
        }}
      >
        {BRAND.name}
      </h1>
      <p data-animate="brand" style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)', maxWidth: 480, lineHeight: 1.55, marginBottom: '1.25rem', fontWeight: 300 }}>
        The first AI platform built for <strong style={{ color: 'var(--accent2)' }}>how your organisation actually works</strong>.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 640, marginBottom: '1.25rem' }}>
        {pills.map((p) => (
          <span key={p} data-animate="pill" className="chip" style={{ fontSize: '0.72rem' }}>{p}</span>
        ))}
      </div>
      <p data-animate="cta" style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
        Ready to deploy · <strong style={{ color: 'var(--accent2)' }}>Aura by PRM</strong>
      </p>
    </div>
  );
}
