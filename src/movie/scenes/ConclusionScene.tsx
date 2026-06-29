import { useCallback } from 'react';
import gsap from 'gsap';
import {
  ArrowRight, Bot, Brain, CheckCircle2, FileText, GitBranch,
  Languages, MessageSquare, RefreshCw, ShieldCheck, Sparkles, Video,
} from 'lucide-react';
import { BRAND } from '../../brand';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, sequenceIn, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const capabilities = [
  {
    icon: <Video size={15} />,
    color: 'blue' as const,
    label: 'Meetings',
    sub: 'Private live guidance',
    detail: 'Real-time coaching, decisions, and artifact triggers in every call',
  },
  {
    icon: <Brain size={15} />,
    color: 'teal' as const,
    label: 'Memory',
    sub: 'Compounding knowledge',
    detail: 'Meetings, approvals, and rules build one searchable org brain',
  },
  {
    icon: <FileText size={15} />,
    color: 'gold' as const,
    label: 'Artifacts',
    sub: 'Documents from decisions',
    detail: 'BCs, BRDs, SOPs, and tasks born from conversation — not blank pages',
  },
  {
    icon: <CheckCircle2 size={15} />,
    color: 'green' as const,
    label: 'Checks',
    sub: 'Custom gates & scoring',
    detail: 'Your review logic: score, route, approve, and publish on your terms',
  },
  {
    icon: <MessageSquare size={15} />,
    color: 'purple' as const,
    label: 'Chat',
    sub: 'Intelligent cited answers',
    detail: 'Ask in plain English — every answer links back to approved sources',
  },
  {
    icon: <GitBranch size={15} />,
    color: 'sky' as const,
    label: 'Agentic',
    sub: 'Nodes, tools, memory',
    detail: 'Orchestrator, specialist nodes, and pluggable tools working together',
  },
  {
    icon: <Languages size={15} />,
    color: 'orange' as const,
    label: 'Modern',
    sub: 'Multilingual platform',
    detail: 'Voice, mobile, integrations, and accessibility built in from day one',
  },
];

const loopSteps = [
  {
    icon: <Bot size={14} />,
    label: 'Aura proposes',
    sub: 'Drafts artifacts, routes work, and surfaces what needs attention',
    color: 'purple' as const,
  },
  {
    icon: <CheckCircle2 size={14} />,
    label: 'Humans decide',
    sub: 'Named reviewers approve, edit, or reject — zero silent writes',
    color: 'gold' as const,
  },
  {
    icon: <RefreshCw size={14} />,
    label: 'Aura learns',
    sub: 'Approved edits and sign-offs become standards for the next run',
    color: 'teal' as const,
  },
];

const governancePoints = [
  'Segmented by team',
  'Encrypted end-to-end',
  'Human-approved outputs',
  'Role-based access',
];

export function ConclusionScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.08, 0);
    sequenceIn(tl, root, '[data-animate="explainer"]', 0.16, 0.06);
    sequenceIn(tl, root, '[data-animate="capability"]', 0.22, 0.05, { opacity: 0, y: 12, scale: 0.96 });
    staggerIn(tl, root, '[data-animate="loop"]', 0.1, 0.85);
    sequenceIn(tl, root, '[data-animate="bridge"]', 0.18, 0.08);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        className="conclusion-shell"
        hideMeta
        eyebrow={<><Sparkles size={11} /> What Aura Becomes</>}
        headline={`${BRAND.name} Is the Operating Layer for Organisational Intelligence.`}
        subline="Meetings, memory, artifacts, checks, chat, agentic workflows, and modern collaboration — connected in one loop."
      >
        <div className="conclusion-scene">
          <GlassCard accent="purple" animate="explainer" className="conclusion-explainer">
            <IconBadge color="purple" size="md"><Sparkles size={14} /></IconBadge>
            <div>
              <div className="conclusion-explainer-title">Seven capabilities. One continuous loop.</div>
              <div className="conclusion-explainer-sub">
                Every meeting feeds memory. Memory powers artifacts, checks, and chat. Agentic workflows coordinate it all — and humans stay in control at every step.
              </div>
            </div>
          </GlassCard>

          <div className="conclusion-capability-grid">
            {capabilities.map((cap) => (
              <GlassCard key={cap.label} accent={cap.color} animate="capability" className="conclusion-capability-card">
                <IconBadge color={cap.color} size="lg">{cap.icon}</IconBadge>
                <div className="conclusion-capability-label">{cap.label}</div>
                <div className="conclusion-capability-sub">{cap.sub}</div>
                <div className="conclusion-capability-detail">{cap.detail}</div>
              </GlassCard>
            ))}
          </div>

          <div className="conclusion-loop-grid">
            {loopSteps.map((step, i) => (
              <GlassCard key={step.label} accent={step.color} animate="loop" className="conclusion-loop-card">
                <div className="conclusion-loop-card-head">
                  <IconBadge color={step.color} size="md">{step.icon}</IconBadge>
                  <div className="conclusion-loop-card-title">{step.label}</div>
                  {i < loopSteps.length - 1 && <ArrowRight size={12} className="conclusion-loop-card-arrow" />}
                </div>
                <div className="conclusion-loop-card-sub">{step.sub}</div>
              </GlassCard>
            ))}
          </div>

          <GlassCard accent="green" animate="bridge" className="conclusion-bridge">
            <IconBadge color="green" size="xl"><ShieldCheck size={24} /></IconBadge>
            <div className="conclusion-bridge-copy">
              <div className="conclusion-bridge-kicker">Next: governance by design</div>
              <div className="conclusion-bridge-title">All of it stays secure, human-approved, and access-controlled.</div>
              <div className="conclusion-governance-row">
                {governancePoints.map((point) => (
                  <span key={point} className="conclusion-governance-pill">{point}</span>
                ))}
              </div>
            </div>
            <ArrowRight size={20} className="conclusion-bridge-arrow" />
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
