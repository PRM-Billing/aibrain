import { useCallback } from 'react';
import { Database } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const captured = ['Every meeting', 'Every document', 'Every decision', "Every person's context", 'Every metric', 'Every revision'];
const timeline = [
  ['Day 1', 'Answers from uploaded documents'],
  ['Month 1', 'Knows your projects and people'],
  ['Month 6', 'Predicts risks from patterns'],
  ['Year 1', 'Irreplaceable institutional intelligence'],
];

export function LivingMemoryScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="cap"]', 0.08);
    staggerIn(tl, root, '[data-animate="tl"]', 0.12);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><Database size={12} /> Living Memory</>}
        headline="It Never Forgets. So Your Organisation Never Loses Knowledge."
        subline="Every meeting, document, and decision becomes searchable, reusable memory that compounds over time."
      >
        <div className="grid-2 fill">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'auto' }}>
            {captured.map((c) => (
              <GlassCard key={c} animate="cap" style={{ padding: '0.55rem 0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>{c}</GlassCard>
            ))}
          </div>
          <GlassCard animate="tl" style={{ padding: '0.85rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>The compounding effect</div>
            {timeline.map(([when, what]) => (
              <div key={when} data-animate="tl" style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: '0.72rem' }}>
                <span style={{ fontWeight: 800, color: 'var(--accent2)', minWidth: 52 }}>{when}</span>
                <span style={{ color: 'var(--muted)' }}>{what}</span>
              </div>
            ))}
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
