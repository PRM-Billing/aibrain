import { useCallback } from 'react';
import { CheckCircle } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const flow = ['Aura drafts', 'Sources attached', 'Human reviews', 'Approve / Edit / Reject', 'Only approved content saved'];

export function HumanLoopScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="flow"]', 0.12);
    staggerIn(tl, root, '[data-animate="pill"]', 0.08);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><CheckCircle size={12} /> Always Approved</>}
        headline="Aura Drafts. A Human Decides. Always."
        subline="Nothing becomes final — or enters memory — without a person signing off."
      >
        <div className="fill" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}>
            {flow.map((f, i) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <GlassCard animate="flow" style={{ padding: '0.5rem 0.75rem', fontSize: '0.7rem', fontWeight: 700 }}>{f}</GlassCard>
                {i < flow.length - 1 && <span style={{ color: 'var(--muted)' }}>→</span>}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {['Zero silent changes', 'Named accountability', 'Full review trail'].map((p) => (
              <span key={p} data-animate="pill" className="chip" style={{ color: 'var(--green)', borderColor: 'rgba(52,211,153,.35)' }}>{p}</span>
            ))}
          </div>
        </div>
      </SceneShell>
    </div>
  );
}
