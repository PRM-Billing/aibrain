import { useCallback } from 'react';
import { Database, MessageSquare, FileText, Users, BarChart2, GitBranch, Clock, TrendingUp } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, FeatCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const captured = [
  { icon: <MessageSquare size={13} />, color: 'blue'   as const, label: 'Every meeting',       sub: 'Transcribed, summarised, searchable' },
  { icon: <FileText size={13} />,      color: 'teal'   as const, label: 'Every document',      sub: 'Uploaded, versioned, indexed' },
  { icon: <Users size={13} />,         color: 'purple' as const, label: 'Every person\'s context', sub: 'Roles, history, contributions' },
  { icon: <BarChart2 size={13} />,     color: 'gold'   as const, label: 'Every metric',        sub: 'KPIs, actuals, trends' },
  { icon: <GitBranch size={13} />,     color: 'rose'   as const, label: 'Every decision',      sub: 'Rationale, owner, outcome' },
  { icon: <Clock size={13} />,         color: 'sky'    as const, label: 'Every revision',      sub: 'Full version history, one-click revert' },
];

const timeline = [
  { when: 'Day 1',    what: 'Answers from your uploaded documents', color: 'var(--accent2)' },
  { when: 'Month 1',  what: 'Knows your projects, teams, and workflows', color: 'var(--teal2)' },
  { when: 'Month 6',  what: 'Predicts risks and surfaces patterns', color: 'var(--gold2)' },
  { when: 'Year 1+',  what: 'Irreplaceable institutional intelligence', color: 'var(--green2)' },
];

export function LivingMemoryScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="cap"]', 0.07);
    staggerIn(tl, root, '[data-animate="tl"]', 0.12);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><Database size={11} /> Living Memory</>}
        headline="It Never Forgets. So Your Organisation Never Loses Knowledge."
        subline="Every meeting, document, and decision becomes searchable, reusable memory that compounds over time."
      >
        <div className="grid-2 fill">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem', alignContent: 'start' }}>
            {captured.map((c) => (
              <FeatCard key={c.label} icon={c.icon} iconColor={c.color} title={c.label} body={c.sub} accent={c.color} animate="cap" />
            ))}
          </div>

          <GlassCard accent="teal" animate="tl" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <IconBadge color="teal" size="sm"><TrendingUp size={12} /></IconBadge>
              <span style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>The compounding effect</span>
            </div>
            {timeline.map((t) => (
              <div key={t.when} data-animate="tl" style={{ display: 'flex', gap: 10, padding: '0.55rem 0.65rem', background: 'rgba(14,25,41,.6)', borderRadius: '0.65rem', border: '1px solid var(--line)' }}>
                <span style={{ fontWeight: 900, color: t.color, minWidth: 56, fontSize: '0.7rem' }}>{t.when}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', lineHeight: 1.35 }}>{t.what}</span>
              </div>
            ))}
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
