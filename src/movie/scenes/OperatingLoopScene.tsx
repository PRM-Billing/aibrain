import { useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const nodes = [
  'Sits in your meeting',
  'Privately guides you',
  'Saves to memory',
  'Acts & generates artifacts',
  'Learns from every decision',
];

export function OperatingLoopScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="node"]', 0.15);
    const dot = root.querySelector('[data-animate="dot"]');
    if (dot) {
      tl.fromTo(dot, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4 }, 0.3);
      tl.to(dot, { x: 280, duration: 1.2, ease: 'power1.inOut' }, 0.5);
      tl.to(dot, { y: 80, x: 280, duration: 0.8 }, 1.7);
      tl.to(dot, { x: 0, y: 80, duration: 0.8 }, 2.5);
      tl.to(dot, { x: -280, y: 80, duration: 0.8 }, 3.3);
      tl.to(dot, { x: -280, y: 0, duration: 0.8 }, 4.1);
      tl.to(dot, { x: 0, y: 0, duration: 0.8 }, 4.9);
    }
    staggerIn(tl, root, '[data-animate="gov"]', 0.1);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><RefreshCw size={12} /> How Aura Works</>}
        headline="One Continuous Loop of Intelligence."
        subline="Aura sits in, thinks, remembers, acts, and learns — over and over, getting smarter each cycle."
      >
        <div className="fill" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 720, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
            {nodes.map((n, i) => (
              <GlassCard key={n} animate="node" style={{ padding: '0.65rem 0.9rem', fontSize: '0.72rem', fontWeight: 700, flex: '1 1 120px', maxWidth: 140, textAlign: 'center' }}>
                <span style={{ color: 'var(--accent2)', marginRight: 4 }}>{i + 1}.</span>{n}
              </GlassCard>
            ))}
            <div
              data-animate="dot"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 12,
                height: 12,
                margin: -6,
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 16px rgba(109,125,252,.8)',
                pointerEvents: 'none',
              }}
            />
          </div>
          <GlassCard animate="gov" style={{ padding: '0.65rem 1rem', fontSize: '0.72rem', fontWeight: 600, color: 'var(--muted)', textAlign: 'center' }}>
            Governed by: <span style={{ color: 'var(--green)' }}>Secure</span> · <span style={{ color: 'var(--gold)' }}>Human-Approved</span> · <span style={{ color: 'var(--sky)' }}>Access-Controlled</span>
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
