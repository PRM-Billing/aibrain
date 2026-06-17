import { useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const types = [
  'SOPs', 'Onboarding Docs', 'Project Briefs', 'Proposals', 'Contracts', 'Audit Reports',
  'Policy Documents', 'Decision Memos', 'Runbooks', 'Status Reports', 'Executive Summaries',
  'Meeting Briefs', 'Risk Registers', 'Training Guides', 'RFP Responses', 'Vendor Comparisons',
];

export function ManyMoreScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.08);
    staggerIn(tl, root, '[data-animate="card"]', 0.04);
    staggerIn(tl, root, '[data-animate="rule"]', 0.2);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><Sparkles size={12} /> Endless Possibilities</>}
        headline="Define the Rules — Get Any Document."
        subline="Anything your organisation writes repeatedly, Aura can produce once you set the template and rules."
      >
        <div className="fill" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, overflowY: 'auto', flex: 1 }}>
            {types.map((t) => (
              <GlassCard key={t} animate="card" style={{ padding: '0.5rem 0.6rem', fontSize: '0.68rem', fontWeight: 700 }}>{t}</GlassCard>
            ))}
            <GlassCard animate="card" style={{ padding: '0.5rem', fontSize: '0.68rem', fontWeight: 700, borderColor: 'rgba(109,125,252,.4)', color: 'var(--accent2)' }}>+ Your custom artifact</GlassCard>
          </div>
          <GlassCard animate="rule" style={{ padding: '0.65rem', textAlign: 'center', fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent2)' }}>
            Define the rules → Aura produces it
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
