import { useCallback } from 'react';
import {
  Database, MessageSquare, FileText, Users, BarChart2, GitBranch, Clock,
  TrendingUp, ArrowRight, ArrowDown,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn, sequenceIn, fadeIn } from '../useSceneTimeline';

type Props = { active: boolean };

const flowSteps = [
  { n: 1, label: 'Capture', desc: 'Meetings, docs, decisions' },
  { n: 2, label: 'Store', desc: 'Searchable forever' },
  { n: 3, label: 'Compound', desc: 'Smarter every month' },
];

const captured = [
  { icon: <MessageSquare size={18} strokeWidth={2.25} />, color: 'blue'   as const, label: 'Every meeting',       sub: 'Transcribed, summarised, searchable' },
  { icon: <FileText size={18} strokeWidth={2.25} />,      color: 'teal'   as const, label: 'Every document',      sub: 'Uploaded, versioned, indexed' },
  { icon: <Users size={18} strokeWidth={2.25} />,         color: 'purple' as const, label: 'Every person\'s context', sub: 'Roles, history, contributions' },
  { icon: <BarChart2 size={18} strokeWidth={2.25} />,     color: 'gold'   as const, label: 'Every metric',        sub: 'KPIs, actuals, trends' },
  { icon: <GitBranch size={18} strokeWidth={2.25} />,     color: 'rose'   as const, label: 'Every decision',      sub: 'Rationale, owner, outcome' },
  { icon: <Clock size={18} strokeWidth={2.25} />,         color: 'sky'    as const, label: 'Every revision',      sub: 'Full version history, one-click revert' },
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
    fadeIn(tl, root, '[data-animate="flow-banner"]', 0.25);
    staggerIn(tl, root, '[data-animate="flow-step"]', 0.22, 0.35);
    fadeIn(tl, root, '[data-animate="phase-label"]', 0.9);

    // One capture card at a time, left → right
    sequenceIn(tl, root, '[data-animate="cap"]', 1.15, 0.42);
    sequenceIn(tl, root, '[data-animate="cap-arrow"]', 1.35, 0.42);

    fadeIn(tl, root, '[data-animate="bridge"]', 4.0);
    fadeIn(tl, root, '[data-animate="compound-head"]', 4.35);
    sequenceIn(tl, root, '[data-animate="compound"]', 4.65, 0.45);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><Database size={11} /> Living Memory</>}
        headline="Nothing Walks Out the Door."
        subline="Aura captures everything your organisation knows — stores it forever — then compounds it into intelligence that grows over time."
      >
        <div className="memory-scene">
          {/* Top: 3-step flow explainer */}
          <div className="memory-flow-banner" data-animate="flow-banner">
            {flowSteps.map((f, i) => (
              <div key={f.n} className="memory-flow-step-wrap">
                <div className="memory-flow-step" data-animate="flow-step">
                  <span className="memory-flow-num">{f.n}</span>
                  <div>
                    <div className="memory-flow-label">{f.label}</div>
                    <div className="memory-flow-desc">{f.desc}</div>
                  </div>
                </div>
                {i < flowSteps.length - 1 && (
                  <ArrowRight size={16} className="memory-flow-arrow" aria-hidden />
                )}
              </div>
            ))}
          </div>

          {/* Phase 1: what gets captured — cards appear one by one → */}
          <div className="memory-phase">
            <div className="memory-phase-label" data-animate="phase-label">
              <span className="memory-phase-badge">Step 1</span>
              Everything Aura captures — one piece at a time
            </div>
            <div className="memory-capture-row">
              {captured.map((c, i) => (
                <div key={c.label} className="memory-capture-item">
                  <GlassCard accent={c.color} animate="cap" className="memory-capture-card">
                    <IconBadge color={c.color} size="lg">{c.icon}</IconBadge>
                    <div className="memory-capture-title">{c.label}</div>
                    <div className="memory-capture-sub">{c.sub}</div>
                  </GlassCard>
                  {i < captured.length - 1 && (
                    <div className="memory-capture-arrow" data-animate="cap-arrow" aria-hidden>
                      <ArrowRight size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bridge between phases */}
          <div className="memory-bridge" data-animate="bridge">
            <ArrowDown size={18} />
            <span>Stored forever — then memory compounds</span>
            <ArrowDown size={18} />
          </div>

          {/* Phase 2: compounding timeline — milestones one by one */}
          <div className="memory-phase memory-phase--compound">
            <GlassCard accent="teal" className="memory-compound-panel">
              <div className="memory-compound-head" data-animate="compound-head">
                <IconBadge color="teal" size="lg"><TrendingUp size={18} /></IconBadge>
                <div>
                  <div className="memory-phase-badge memory-phase-badge--teal">Step 2</div>
                  <div className="memory-compound-title">The compounding effect</div>
                  <div className="memory-compound-sub">Each month, Aura knows more — and answers get sharper</div>
                </div>
              </div>
              <div className="memory-compound-timeline">
                {timeline.map((t, i) => (
                  <div key={t.when} className="memory-compound-milestone" data-animate="compound">
                    <div className="memory-milestone-marker">
                      <span className="memory-milestone-dot" style={{ background: t.color, boxShadow: `0 0 10px ${t.color}` }} />
                      {i < timeline.length - 1 && <span className="memory-milestone-line" aria-hidden />}
                    </div>
                    <div className="memory-milestone-body">
                      <span className="memory-milestone-when" style={{ color: t.color }}>{t.when}</span>
                      <span className="memory-milestone-what">{t.what}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </SceneShell>
    </div>
  );
}
