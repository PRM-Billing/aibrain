import { useCallback } from 'react';
import { CheckCircle, Edit3, UserCheck, XCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const flow = [
  { icon: <AlertCircle size={14} />, color: 'blue'   as const, label: 'Aura drafts',          sub: 'Content generated, sources attached automatically' },
  { icon: <UserCheck size={14} />,   color: 'gold'   as const, label: 'Human reviews',        sub: 'Named reviewer sees the full draft and evidence' },
  { icon: <Edit3 size={14} />,       color: 'purple' as const, label: 'Approve, edit, or reject', sub: 'Every option available — no pressure to accept' },
  { icon: <CheckCircle size={14} />, color: 'green'  as const, label: 'Only approved content saved', sub: 'Memory and documents updated only after sign-off' },
];

const guarantees = [
  { icon: <CheckCircle size={12} />, label: 'Zero silent changes',       color: 'var(--green2)' },
  { icon: <UserCheck size={12} />,   label: 'Named accountability',      color: 'var(--teal2)' },
  { icon: <XCircle size={12} />,     label: 'Reject always an option',   color: 'var(--accent2)' },
  { icon: <AlertCircle size={12} />, label: 'Full review trail',         color: 'var(--gold2)' },
];

export function HumanLoopScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="step"]', 0.12);
    staggerIn(tl, root, '[data-animate="guarantee"]', 0.1);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><CheckCircle size={11} /> Human in the Loop</>}
        headline="Aura Proposes. Humans Decide."
        subline="Every output passes through an approval gate — named accountability, zero silent writes."
      >
        <div className="fill" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {/* Approval flow */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.45rem' }}>
            {flow.map((f, i) => (
              <div key={f.label} style={{ display: 'flex', alignItems: 'stretch', gap: '0.4rem' }}>
                <GlassCard accent={f.color} animate="step" style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <IconBadge color={f.color} size="md">{f.icon}</IconBadge>
                    <span style={{ fontSize: '0.58rem', fontWeight: 800, color: 'var(--muted2)', letterSpacing: '0.06em' }}>{String(i + 1).padStart(2,'0')}</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, lineHeight: 1.2 }}>{f.label}</div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--muted)', lineHeight: 1.35, flex: 1 }}>{f.sub}</div>
                </GlassCard>
                {i < flow.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowRight size={12} color="var(--muted2)" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Guarantees */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {guarantees.map((g) => (
              <div key={g.label} data-animate="guarantee" className="card" style={{ padding: '0.55rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1, minWidth: 160 }}>
                <span style={{ color: g.color }}>{g.icon}</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 700 }}>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </SceneShell>
    </div>
  );
}
