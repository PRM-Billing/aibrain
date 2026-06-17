import { useCallback } from 'react';
import { FileText, Briefcase, ClipboardList, CheckSquare, ArrowRight, UserCheck } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const pipeline = [
  { icon: <FileText size={13} />,      color: 'blue'   as const, label: 'Meeting' },
  { icon: <ClipboardList size={13} />, color: 'teal'   as const, label: 'Summary & Tasks' },
  { icon: <Briefcase size={13} />,     color: 'gold'   as const, label: 'Business Case' },
  { icon: <FileText size={13} />,      color: 'purple' as const, label: 'Requirements Doc' },
  { icon: <UserCheck size={13} />,     color: 'green'  as const, label: 'Human Review' },
  { icon: <CheckSquare size={13} />,   color: 'sky'    as const, label: 'Published' },
];

const examples = [
  { icon: <Briefcase size={15} />,     color: 'gold'   as const, label: 'Business Case',         sub: 'Executive summary, financials, recommendation' },
  { icon: <FileText size={15} />,      color: 'blue'   as const, label: 'Requirements Document', sub: 'Scope, user stories, acceptance criteria' },
  { icon: <ClipboardList size={15} />, color: 'teal'   as const, label: 'Meeting Tasks',         sub: 'Owners, deadlines, priorities — auto-assigned' },
  { icon: <CheckSquare size={15} />,   color: 'green'  as const, label: 'Backlog Items',         sub: 'Structured, prioritised, and ready to import' },
];

export function ArtifactsScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="step"]', 0.1);
    staggerIn(tl, root, '[data-animate="ex"]', 0.1);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><FileText size={11} /> From Conversation to Document</>}
        headline="One Conversation. The Document You Need."
        subline="Business cases, requirements, tasks, and backlog — drafted with sources, ready for one human review."
      >
        <div className="fill" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {/* Pipeline */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.35rem' }}>
            {pipeline.map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <div data-animate="step" className="card" style={{ padding: '0.45rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <IconBadge color={s.color} size="sm">{s.icon}</IconBadge>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700 }}>{s.label}</span>
                </div>
                {i < pipeline.length - 1 && <ArrowRight size={12} color="var(--muted2)" />}
              </div>
            ))}
          </div>

          {/* Example cards */}
          <div className="grid-4" style={{ flex: 1 }}>
            {examples.map((e) => (
              <GlassCard key={e.label} accent={e.color} animate="ex" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <IconBadge color={e.color}>{e.icon}</IconBadge>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, lineHeight: 1.2 }}>{e.label}</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--muted)', lineHeight: 1.4, flex: 1 }}>{e.sub}</div>
                <span className="chip" style={{ color: 'var(--green2)', borderColor: 'rgba(52,211,153,.25)', width: 'fit-content', fontSize: '0.58rem' }}>Draft ready</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </SceneShell>
    </div>
  );
}
