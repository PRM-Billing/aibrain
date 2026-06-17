import { useCallback } from 'react';
import { Boxes } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const blocks = [
  { title: 'Specialist nodes', desc: 'Each step does one job well' },
  { title: 'Smart tools', desc: 'The right capability at the right moment' },
  { title: 'Shared memory', desc: 'One knowledge core every workflow draws from' },
  { title: 'Continuous learning', desc: 'Every correction makes the system smarter' },
];

export function ArchitectureScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="block"]', 0.12);
    staggerIn(tl, root, '[data-animate="strip"]', 0.2);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><Boxes size={12} /> Built to Be Trusted</>}
        headline="Intelligent Building Blocks, Working Together."
        subline="Specialist nodes use the right tools, draw on one shared memory, and improve continuously."
      >
        <div className="fill" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'center' }}>
          <div className="grid-2">
            {blocks.map((b) => (
              <GlassCard key={b.title} animate="block" style={{ padding: '0.85rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent2)', marginBottom: 4 }}>{b.title}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{b.desc}</div>
              </GlassCard>
            ))}
          </div>
          <GlassCard animate="strip" style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.85rem', fontWeight: 800, borderColor: 'rgba(45,212,191,.35)', color: 'var(--teal)' }}>
            Every workflow is memory-based and learning-based
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
