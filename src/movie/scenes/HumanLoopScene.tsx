import { useCallback } from 'react';
import gsap from 'gsap';
import {
  AlertCircle, ArrowRight, CheckCircle, Clock, Edit3, FileText,
  History, ShieldCheck, UserCheck, XCircle,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, sequenceIn, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const flow = [
  { icon: <AlertCircle size={14} />, color: 'blue' as const, label: 'Aura drafts', sub: 'Content generated, sources attached automatically' },
  { icon: <UserCheck size={14} />, color: 'gold' as const, label: 'Human reviews', sub: 'Named reviewer sees the full draft and evidence' },
  { icon: <Edit3 size={14} />, color: 'purple' as const, label: 'Approve, edit, or reject', sub: 'Every option available — no pressure to accept' },
  { icon: <CheckCircle size={14} />, color: 'green' as const, label: 'Only approved content saved', sub: 'Memory and documents updated only after sign-off' },
];

const draftSections = [
  {
    title: 'Executive summary',
    body: 'Q2 infrastructure upgrade requires $1.2M contingency. Scope slipped 6 weeks — recommend phased rollout.',
  },
  {
    title: 'Risk & mitigation',
    body: 'Vendor delay risk rated High. Mitigation: weekly checkpoint with IT and Finance leads.',
  },
  {
    title: 'Recommendation',
    body: 'Approve with contingency buffer. Escalate to CEO scoring if budget exceeds $1.5M.',
  },
];

const guarantees = [
  { icon: <CheckCircle size={13} />, label: 'Zero silent changes', sub: 'Nothing writes to memory without explicit approval', color: 'green' as const },
  { icon: <UserCheck size={13} />, label: 'Named accountability', sub: 'Every gate has a named owner on record', color: 'teal' as const },
  { icon: <XCircle size={13} />, label: 'Reject always an option', sub: 'Return to draft with comments — no forced accept', color: 'purple' as const },
  { icon: <History size={13} />, label: 'Full review trail', sub: 'Who saw what, when, and what they decided', color: 'gold' as const },
];

const auditEvents = [
  { time: '09:14', actor: 'Aura', action: 'Draft generated from Q2 Infrastructure Review' },
  { time: '09:15', actor: 'System', action: 'Routed to Maria Chen · VP Ops' },
  { time: '09:16', actor: 'Maria Chen', action: 'Opened review — pending decision' },
];

const sources = [
  'Q2 Infrastructure Review',
  'Budget Actuals FY26',
  'Vendor SLA Addendum',
];

export function HumanLoopScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.08, 0);
    sequenceIn(tl, root, '[data-animate="step"]', 0.22, 0.1, { opacity: 0, y: 12, scale: 0.97 });
    sequenceIn(tl, root, '[data-animate="approval"]', 0.55, 0.1, { opacity: 0, x: 14 });
    staggerIn(tl, root, '[data-animate="guarantee"]', 0.07, 0.95);
    staggerIn(tl, root, '[data-animate="audit"]', 0.06, 1.15);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        className="human-loop-modern-shell"
        hideMeta
        eyebrow={<><CheckCircle size={11} /> Human in the Loop</>}
        headline="Aura Proposes. Humans Decide."
        subline="Every output passes through an approval gate — named accountability, zero silent writes."
      >
        <div className="human-loop-modern-scene">
          <div className="human-loop-flow">
            {flow.map((f, i) => (
              <div key={f.label} className="human-loop-flow-item">
                <GlassCard accent={f.color} animate="step" className="human-loop-step-card">
                  <div className="human-loop-step-head">
                    <IconBadge color={f.color} size="md">{f.icon}</IconBadge>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="human-loop-step-title">{f.label}</div>
                  <div className="human-loop-step-sub">{f.sub}</div>
                </GlassCard>
                {i < flow.length - 1 && <ArrowRight className="human-loop-arrow" size={14} data-animate="step" />}
              </div>
            ))}
          </div>

          <div className="human-loop-main">
            <GlassCard accent="gold" className="human-loop-approval-card">
              <div className="human-loop-approval-head" data-animate="approval">
                <IconBadge color="gold" size="lg"><FileText size={18} /></IconBadge>
                <div className="human-loop-approval-meta">
                  <div className="human-loop-approval-title">Business Case Draft</div>
                  <div className="human-loop-approval-sub">Reviewer: Maria Chen · VP Ops</div>
                </div>
                <span className="human-loop-status-badge">Pending review</span>
              </div>

              <div className="human-loop-draft-meta" data-animate="approval">
                <span><Clock size={10} /> Generated 09:14 · 3 sections</span>
                <span><ShieldCheck size={10} /> Aura draft · not yet in memory</span>
              </div>

              <div className="human-loop-draft-sections" data-animate="approval">
                {draftSections.map((section) => (
                  <div key={section.title} className="human-loop-draft-block">
                    <strong>{section.title}</strong>
                    <span>{section.body}</span>
                  </div>
                ))}
              </div>

              <div className="human-loop-evidence" data-animate="approval">
                <span>Sources attached</span>
                <div className="human-loop-source-chips">
                  {sources.map((source) => (
                    <span key={source} className="human-loop-source-chip">{source}</span>
                  ))}
                </div>
              </div>

              <div className="human-loop-actions" data-animate="approval">
                <button type="button" tabIndex={-1} className="human-loop-action--approve">
                  <CheckCircle size={13} /> Approve
                </button>
                <button type="button" tabIndex={-1} className="human-loop-action--edit">
                  <Edit3 size={13} /> Edit
                </button>
                <button type="button" tabIndex={-1} className="human-loop-action--reject">
                  <XCircle size={13} /> Reject
                </button>
              </div>
            </GlassCard>

            <div className="human-loop-sidebar">
              <GlassCard accent="teal" className="human-loop-protections-card">
                <div className="modern-panel-title" data-animate="guarantee">
                  <ShieldCheck size={13} /> Reviewer protections
                </div>
                <div className="human-loop-guarantees">
                  {guarantees.map((g) => (
                    <div key={g.label} data-animate="guarantee" className="human-loop-guarantee">
                      <IconBadge color={g.color} size="sm">{g.icon}</IconBadge>
                      <div>
                        <div className="human-loop-guarantee-label">{g.label}</div>
                        <div className="human-loop-guarantee-sub">{g.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard accent="purple" className="human-loop-audit-card">
                <div className="modern-panel-title" data-animate="audit">
                  <History size={13} /> Live audit trail
                </div>
                <div className="human-loop-audit-list">
                  {auditEvents.map((event) => (
                    <div key={`${event.time}-${event.action}`} className="human-loop-audit-row" data-animate="audit">
                      <span className="human-loop-audit-time">{event.time}</span>
                      <div className="human-loop-audit-copy">
                        <strong>{event.actor}</strong>
                        <span>{event.action}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </SceneShell>
    </div>
  );
}
