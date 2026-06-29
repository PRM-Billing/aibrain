import { useCallback } from 'react';
import gsap from 'gsap';
import {
  Bot, BriefcaseBusiness, CheckCircle2, ClipboardCheck, Crown,
  FileText, GitBranch, Scale, ShieldCheck, Sparkles, Star, UserCheck,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, sequenceIn, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const builderRows = [
  { label: 'When', value: 'Business Case created', color: 'blue' as const, icon: <FileText size={11} /> },
  { label: 'Route to', value: 'CEO scoring', color: 'gold' as const, icon: <Crown size={11} /> },
  { label: 'If score ≥ 8', value: 'Send to BRD approval', color: 'purple' as const, icon: <Scale size={11} /> },
  { label: 'Then', value: 'Publish approved version', color: 'green' as const, icon: <CheckCircle2 size={11} /> },
];

const exampleChecks = [
  { label: 'BC → CEO score → BRD approval', color: 'gold' as const },
  { label: 'Contract → Legal review', color: 'purple' as const },
  { label: 'New hire plan → Budget sign-off', color: 'teal' as const },
];

const flow = [
  { icon: <FileText size={17} />, color: 'blue' as const, title: 'BC created', sub: 'Aura drafts the business case from meeting context' },
  { icon: <Bot size={17} />, color: 'teal' as const, title: 'AI pre-check', sub: 'Evidence, budget range, and risk sections verified' },
  { icon: <Crown size={17} />, color: 'gold' as const, title: 'CEO scoring', sub: 'Strategic fit and urgency scored before escalation', highlight: true },
  { icon: <UserCheck size={17} />, color: 'purple' as const, title: 'BRD approval', sub: 'Reviewers approve, edit, or return for changes' },
  { icon: <CheckCircle2 size={17} />, color: 'green' as const, title: 'Published', sub: 'Final artifact lands in the knowledge repository' },
];

const scoreItems = [
  { label: 'Strategic fit', score: 9.1 },
  { label: 'Revenue impact', score: 8.4 },
  { label: 'Execution risk', score: 7.6 },
];

export function CustomChecksScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.08, 0);
    sequenceIn(tl, root, '[data-animate="builder"]', 0.16, 0.08);
    staggerIn(tl, root, '[data-animate="gate"]', 0.1, 0.55);
    sequenceIn(tl, root, '[data-animate="score"]', 0.12, 0.95);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        className="custom-checks-shell"
        hideMeta
        eyebrow={<><ClipboardCheck size={11} /> Custom Checks</>}
        headline="Put Your Own Checkpoints on Every Artifact."
        subline="Create custom review logic: score, route, approve, and publish exactly the way your organisation works."
      >
        <div className="custom-checks-scene">
          <GlassCard accent="purple" className="custom-checks-builder">
            <div className="modern-panel-title" data-animate="builder">
              <GitBranch size={13} /> Check builder
            </div>
            <div className="custom-checks-builder-stack">
              {builderRows.map((row, i) => (
                <div key={row.label} className="custom-checks-builder-step" data-animate="builder">
                  <div className="custom-checks-builder-rail">
                    <IconBadge color={row.color} size="sm">{row.icon}</IconBadge>
                    {i < builderRows.length - 1 && <span className="custom-checks-builder-line" />}
                  </div>
                  <div className="custom-checks-builder-copy">
                    <span className="custom-checks-builder-label">{row.label}</span>
                    <span className="custom-checks-builder-value">{row.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="custom-checks-examples-block" data-animate="builder">
              <div className="custom-checks-examples-title">
                <ShieldCheck size={12} /> More examples
              </div>
              <div className="custom-checks-example-pills">
                {exampleChecks.map((item) => (
                  <span key={item.label} className={`custom-checks-example-pill custom-checks-example-pill--${item.color}`}>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard accent="gold" className="custom-checks-flow">
            <div className="custom-checks-flow-head" data-animate="gate">
              <IconBadge color="gold" size="lg"><BriefcaseBusiness size={18} /></IconBadge>
              <div>
                <div className="custom-checks-flow-kicker">Business case review path</div>
                <div className="custom-checks-flow-sub">Created → pre-checked → CEO scored → BRD approved → published</div>
              </div>
            </div>

            <div className="custom-checks-timeline">
              {flow.map((step, i) => (
                <div
                  key={step.title}
                  className={`custom-checks-timeline-step${step.highlight ? ' custom-checks-timeline-step--active' : ''}`}
                  data-animate="gate"
                >
                  <div className="custom-checks-timeline-rail">
                    <IconBadge color={step.color} size="lg">{step.icon}</IconBadge>
                    {i < flow.length - 1 && <span className="custom-checks-timeline-line" />}
                  </div>
                  <div className="custom-checks-timeline-card">
                    <div className="custom-checks-gate-title">{step.title}</div>
                    <div className="custom-checks-gate-sub">{step.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard accent="gold" className="custom-checks-scorecard">
            <div className="custom-checks-score-head" data-animate="score">
              <IconBadge color="gold" size="lg"><Star size={16} /></IconBadge>
              <div>
                <div className="custom-checks-score-title">CEO scorecard</div>
                <div className="custom-checks-score-sub">Ready for BRD if total ≥ 8.0</div>
              </div>
            </div>

            <div className="custom-checks-score-explainer" data-animate="score">
              <div className="custom-checks-score-explainer-title">
                <Scale size={12} /> How scoring works
              </div>
              <p>
                When a business case reaches this gate, Aura scores it against your custom weighted criteria — each dimension visible to the reviewer before they sign off.
              </p>
              <ul>
                <li><strong>&lt; 8.0</strong> — returned for revision</li>
                <li><strong>≥ 8.0</strong> — routes to BRD approval</li>
              </ul>
            </div>

            <div className="custom-checks-score-bars">
              {scoreItems.map((item) => (
                <div key={item.label} className="custom-checks-score-bar-row" data-animate="score">
                  <div className="custom-checks-score-bar-meta">
                    <span>{item.label}</span>
                    <strong>{item.score}</strong>
                  </div>
                  <div className="custom-checks-score-bar-track">
                    <span className="custom-checks-score-bar-fill" style={{ width: `${item.score * 10}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="custom-checks-score-total" data-animate="score">
              <div>
                <span className="custom-checks-score-total-label">Total score</span>
                <span className="custom-checks-score-total-hint">Passes threshold — routes to BRD</span>
              </div>
              <strong>8.4 / 10</strong>
            </div>

            <div className="custom-checks-score-footer" data-animate="score">
              <Sparkles size={12} />
              <span>Custom rules decide what happens next</span>
            </div>
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
