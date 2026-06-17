import { useCallback } from 'react';
import { TrendingUp } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const steps = ['Human edits output', 'Aura proposes a rule', 'You approve', 'Rule applied going forward', 'Outputs need less editing'];
const bars = [
  { label: 'Month 1', pct: 70 },
  { label: 'Month 3', pct: 88 },
  { label: 'Month 6', pct: 95 },
  { label: 'Year 1', pct: 100 },
];

export function LearningScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="step"]', 0.1);
    root.querySelectorAll('[data-animate="bar"]').forEach((el, i) => {
      const bar = el.querySelector('[data-bar-fill]') as HTMLElement;
      const pct = bars[i]?.pct ?? 0;
      if (bar) tl.to(bar, { width: `${pct}%`, duration: 0.8, ease: 'power2.out' }, 0.5 + i * 0.15);
    });
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><TrendingUp size={12} /> Gets Smarter</>}
        headline="The More You Use It, the Smarter It Gets."
        subline="Every correction becomes a lasting rule — approved by a human, applied forever."
      >
        <div className="grid-2 fill">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {steps.map((s, i) => (
              <GlassCard key={s} animate="step" style={{ padding: '0.55rem 0.75rem', fontSize: '0.72rem', fontWeight: 600 }}>
                <span style={{ color: 'var(--accent2)' }}>{i + 1}. </span>{s}
              </GlassCard>
            ))}
          </div>
          <GlassCard style={{ padding: '0.85rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>Editing needed over time</div>
            {bars.map((b) => (
              <div key={b.label} data-animate="bar" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: '0.68rem' }}>
                <span style={{ minWidth: 56, fontWeight: 700, color: 'var(--accent2)' }}>{b.label}</span>
                <div style={{ flex: 1, height: 8, background: 'var(--s3)', borderRadius: 999, overflow: 'hidden' }}>
                  <div data-bar-fill style={{ height: '100%', width: 0, background: 'linear-gradient(90deg,var(--accent),var(--teal))', borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
