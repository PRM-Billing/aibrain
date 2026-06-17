import { useCallback } from 'react';
import { FileText } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const pipeline = ['Meeting', 'Summary & Tasks', 'Business Case', 'Requirements Doc', 'Human Review', 'Saved'];
const examples = ['Business Cases', 'Requirements Documents', 'Meeting Tasks', 'Backlog Items'];

export function ArtifactsScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="step"]', 0.1);
    staggerIn(tl, root, '[data-animate="ex"]', 0.12);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><FileText size={12} /> From Conversation to Document</>}
        headline="Talk Through It Once. Get the Document That Matters."
        subline="From a single conversation, Aura drafts the artifacts your team actually produces."
      >
        <div className="fill" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 4 }}>
            {pipeline.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <GlassCard animate="step" style={{ padding: '0.45rem 0.65rem', fontSize: '0.65rem', fontWeight: 700, textAlign: 'center' }}>
                  <span style={{ color: 'var(--accent2)' }}>{i + 1}. </span>{s}
                </GlassCard>
                {i < pipeline.length - 1 && <span style={{ color: 'var(--muted)' }}>→</span>}
              </div>
            ))}
          </div>
          <div className="grid-4">
            {examples.map((e) => (
              <GlassCard key={e} animate="ex" style={{ padding: '0.85rem', textAlign: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', margin: '0 auto 6px', boxShadow: '0 0 8px var(--green)' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>{e}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </SceneShell>
    </div>
  );
}
