import { useCallback } from 'react';
import {
  Video, Lock, Database, Sparkles, Brain, Shield, UserCheck, Eye,
  ArrowRight, Briefcase, FileText, Lightbulb,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn, sequenceIn, fadeIn } from '../useSceneTimeline';

type Props = { active: boolean };

const CARD_REVEAL_FROM = {
  opacity: 0,
  x: -28,
  y: 16,
  scale: 0.94,
} as const;

const CARD_REVEAL_TO = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  duration: 0.52,
  ease: 'power3.out',
  clearProps: 'transform',
} as const;

const ARROW_REVEAL_FROM = {
  opacity: 0,
  scale: 0.5,
} as const;

const ARROW_REVEAL_TO = {
  opacity: 1,
  scale: 1,
  duration: 0.35,
  ease: 'back.out(2)',
  clearProps: 'transform',
} as const;

const steps = [
  {
    n: 1,
    icon: <Video size={20} strokeWidth={2.25} />,
    color: 'blue' as const,
    label: 'Joins your meeting',
    sub: 'Listens to the full conversation — who said what, what was decided, what was left open.',
    example: 'Weekly ops review with Finance & IT',
  },
  {
    n: 2,
    icon: <Lock size={20} strokeWidth={2.25} />,
    color: 'purple' as const,
    label: 'Guides you privately',
    sub: 'Surfaces risks, missing data, and better questions — only visible to you, never the room.',
    example: '"Last time this scope slipped 6 weeks — pull the estimate?"',
  },
  {
    n: 3,
    icon: <Database size={20} strokeWidth={2.25} />,
    color: 'teal' as const,
    label: 'Saves to memory',
    sub: 'Every decision, owner, and rationale indexed — searchable and cited in future answers.',
    example: 'Budget approved · Owner: VP Ops · Due: Mar 28',
  },
  {
    n: 4,
    icon: <Sparkles size={20} strokeWidth={2.25} />,
    color: 'gold' as const,
    label: 'Generates artifacts',
    sub: 'Turns what was discussed into the documents your team actually produces — ready for review.',
    example: 'Business case · Action items · Requirements doc',
  },
  {
    n: 5,
    icon: <Brain size={20} strokeWidth={2.25} />,
    color: 'green' as const,
    label: 'Learns your standards',
    sub: 'Your edits and approvals become permanent rules — Aura improves for everyone next time.',
    example: 'You fixed the format → now every BC follows it',
  },
];

const walkthrough = [
  { icon: <Video size={16} />, color: 'blue' as const, label: 'Meeting ends', detail: 'Q3 infrastructure budget review — 45 min, 6 participants' },
  { icon: <Lightbulb size={16} />, color: 'purple' as const, label: 'You were guided', detail: 'Aura flagged a timeline risk you addressed before the team committed' },
  { icon: <Database size={16} />, color: 'teal' as const, label: 'Memory updated', detail: 'Decision, owners, and context saved — linked to prior quarter data' },
  { icon: <FileText size={16} />, color: 'gold' as const, label: 'Artifacts drafted', detail: 'Business case + 4 action items + requirements summary — sources attached' },
  { icon: <UserCheck size={16} />, color: 'green' as const, label: 'You approved', detail: 'One review, one sign-off — then saved and shared to the right people' },
];

const govPillars = [
  { icon: <Shield size={14} />, label: 'Encrypted & segmented', color: '#34d399' },
  { icon: <UserCheck size={14} />, label: 'Nothing final without you', color: '#fbbf24' },
  { icon: <Eye size={14} />, label: 'Role-based access', color: '#60a5fa' },
];

export function OperatingLoopScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);

    // Top row: each step card appears one after another, left → right
    sequenceIn(tl, root, '[data-animate="step"]', 0.2, 0.45, CARD_REVEAL_FROM, CARD_REVEAL_TO);

    // Example panel fades in, then its cards appear one by one
    fadeIn(tl, root, '[data-animate="walk-panel"]', 2.5);
    fadeIn(tl, root, '[data-animate="walk-head"]', 2.65);
    sequenceIn(tl, root, '[data-animate="walk-card"]', 2.85, 0.4, CARD_REVEAL_FROM, CARD_REVEAL_TO);
    sequenceIn(tl, root, '[data-animate="walk-arrow"]', 3.05, 0.4, ARROW_REVEAL_FROM, ARROW_REVEAL_TO);

    fadeIn(tl, root, '[data-animate="gov"]', 4.9);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<>How Aura Works</>}
        headline="Listen. Guide. Remember. Act. Learn."
        subline="Every meeting runs through the same loop — and each cycle makes Aura smarter for the next one."
      >
        <div className="loop-scene">
          <div className="loop-steps" data-loop-steps>
            {steps.map((s) => (
              <GlassCard
                key={s.n}
                accent={s.color}
                animate="step"
                className="loop-step-card"
              >
                <div className="loop-step-head">
                  <IconBadge color={s.color} size="lg">{s.icon}</IconBadge>
                  <span className="loop-step-num">{String(s.n).padStart(2, '0')}</span>
                </div>
                <div className="loop-step-title">{s.label}</div>
                <div className="loop-step-sub">{s.sub}</div>
                <span className="chip loop-step-example">e.g. {s.example}</span>
              </GlassCard>
            ))}
          </div>

          <GlassCard accent="blue" animate="walk-panel" className="loop-walkthrough">
            <div className="loop-walk-header" data-animate="walk-head">
              <IconBadge color="blue" size="lg"><Briefcase size={18} /></IconBadge>
              <div>
                <div className="loop-walk-kicker">Example: one meeting → full outcome</div>
                <div className="loop-walk-sub">From a 45-minute budget review to approved documents — in one loop</div>
              </div>
            </div>
            <div className="loop-walk-row">
              {walkthrough.map((w, i) => (
                <div key={w.label} className="loop-walk-item">
                  <div data-animate="walk-card" className="card loop-walk-card">
                    <div className="loop-walk-card-head">
                      <IconBadge color={w.color} size="md">{w.icon}</IconBadge>
                      <span className="loop-walk-card-title">{w.label}</span>
                    </div>
                    <span className="loop-walk-card-detail">{w.detail}</span>
                  </div>
                  {i < walkthrough.length - 1 && (
                    <div className="loop-walk-arrow" data-animate="walk-arrow" aria-hidden>
                      <ArrowRight size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard animate="gov" className="loop-gov">
            <span className="loop-gov-label">Every step governed by</span>
            {govPillars.map((g) => (
              <span key={g.label} className="loop-gov-pillar" style={{ color: g.color }}>
                {g.icon}{g.label}
              </span>
            ))}
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
