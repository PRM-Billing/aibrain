import { useCallback } from 'react';
import gsap from 'gsap';
import {
  ArrowDown, Bot, Brain, CheckCircle2, FileText, GitBranch,
  Lightbulb, MessageSquare, PenLine, Send, Sparkles, User, Zap,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn, sequenceIn } from '../useSceneTimeline';

type Props = { active: boolean };

const flowSteps = [
  {
    icon: <MessageSquare size={16} strokeWidth={2.25} />,
    color: 'blue' as const,
    label: 'Chat interaction',
    desc: 'Edit a document or design a pipeline through conversation.',
    example: '“Always add a risk section with a source citation.”',
  },
  {
    icon: <Zap size={16} strokeWidth={2.25} />,
    color: 'gold' as const,
    label: 'Pattern detected',
    desc: 'Aura notices the same preference or correction more than once.',
    example: 'Same edit in doc chat and pipeline chat — worth saving.',
  },
  {
    icon: <Sparkles size={16} strokeWidth={2.25} />,
    color: 'purple' as const,
    label: 'Rule proposed',
    desc: 'Aura drafts a standing rule and waits for human approval.',
    example: 'Document standard or pipeline step — ready for your sign-off.',
  },
];

const docChat = [
  { id: 'd1', role: 'user' as const, text: 'Always add a risk section with a source citation.' },
  { id: 'd2', role: 'ai' as const, text: "I've seen this preference twice. Learning opportunity detected.", detect: true },
];

const pipelineChat = [
  { id: 'p1', role: 'user' as const, text: 'Budget meetings always need VP review before publish.' },
  { id: 'p2', role: 'ai' as const, text: 'Should I save this as a pipeline rule for future runs?', detect: true },
];

const futurePreview = [
  { label: 'Next business case', detail: 'Risk section + cited source included automatically' },
  { label: 'Next budget pipeline run', detail: 'VP review step inserted before publish' },
  { label: 'Org-wide standard', detail: 'Approved rule applies to every team\'s future documents' },
];

export function LearningOpportunitiesScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.08, 0);
    sequenceIn(
      tl, root, '[data-animate="context"]', 0.18, 0.1,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.38, ease: 'power3.out', clearProps: 'transform' },
    );
    sequenceIn(
      tl, root, '[data-animate="flow"]', 0.28, 0.12,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', clearProps: 'transform' },
    );
    fadeInChatHeader(tl, root);
    sequenceIn(
      tl, root, '[data-animate="chat"]', 0.55, 0.14,
      { opacity: 0, y: 12, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: 'power3.out', clearProps: 'transform' },
    );
    fadeInChatCompose(tl, root);

    const detectBadge = root.querySelector('[data-animate="detect"]');
    if (detectBadge) {
      tl.fromTo(
        detectBadge,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.4)', clearProps: 'transform' },
        1.15,
      );
      tl.to(detectBadge, {
        boxShadow: '0 0 14px rgba(52, 211, 153, 0.35)',
        duration: 0.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 1,
      }, 1.35);
    }

    sequenceIn(
      tl, root, '[data-animate="rule"]', 1.25, 0.12,
      { opacity: 0, x: 14 },
      { opacity: 1, x: 0, duration: 0.42, ease: 'power3.out', clearProps: 'transform' },
    );
    sequenceIn(
      tl, root, '[data-animate="preview"]', 1.55, 0.1,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out', clearProps: 'transform' },
    );
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        className="learning-opp-shell"
        hideMeta
        eyebrow={<><Lightbulb size={11} /> Learning Opportunities</>}
        headline="Every Chat Edit Can Teach Aura Something New."
        subline="While you edit documents or design pipelines, Aura spots patterns worth saving — and proposes rules for next time."
      >
        <div className="learning-opp-scene">
          <div className="learning-opp-body">
            <aside className="learning-opp-aside">
              <GlassCard accent="teal" className="learning-opp-context-panel">
                <div className="learning-opp-panel-title" data-animate="context">
                  <Brain size={13} /> Where learning happens
                </div>
                <div
                  data-animate="context"
                  className="learning-opp-context-card learning-opp-context-card--active"
                >
                  <IconBadge color="gold" size="md"><PenLine size={16} /></IconBadge>
                  <div className="learning-opp-context-text">
                    <div className="learning-opp-context-label">Document edit</div>
                    <div className="learning-opp-context-name">Q3 Budget BC.md</div>
                  </div>
                </div>
                <div data-animate="context" className="learning-opp-context-card">
                  <IconBadge color="purple" size="md"><GitBranch size={16} /></IconBadge>
                  <div className="learning-opp-context-text">
                    <div className="learning-opp-context-label">Pipeline design</div>
                    <div className="learning-opp-context-name">Business Case pipeline</div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard accent="purple" className="learning-opp-flow-panel">
                <div className="learning-opp-panel-title" data-animate="flow">
                  <Sparkles size={13} /> How it works
                </div>
                <div className="learning-opp-flow-steps">
                  {flowSteps.map((step, i) => (
                    <div key={step.label} className="learning-opp-flow-step-wrap">
                      <div data-animate="flow" className="learning-opp-flow-card">
                        <div className="learning-opp-flow-card-head">
                          <span className="learning-opp-flow-num">{i + 1}</span>
                          <IconBadge color={step.color} size="md">{step.icon}</IconBadge>
                          <div className="learning-opp-flow-label">{step.label}</div>
                        </div>
                        <div className="learning-opp-flow-desc">{step.desc}</div>
                        <div className="learning-opp-flow-example">{step.example}</div>
                      </div>
                      {i < flowSteps.length - 1 && (
                        <ArrowDown size={14} className="learning-opp-flow-arrow" aria-hidden />
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </aside>

            <GlassCard accent="blue" className="pipeline-chat-panel learning-opp-chat-panel">
              <div className="pipeline-chat-header" data-animate="chat-header">
                <div className="pipeline-chat-header-avatar" aria-hidden>
                  <Bot size={14} strokeWidth={2.25} />
                </div>
                <div className="pipeline-chat-header-text">
                  <div className="pipeline-chat-header-title">Learning from your chat</div>
                  <div className="pipeline-chat-header-status">
                    <span className="pipeline-chat-status-dot" aria-hidden /> Watching for patterns
                  </div>
                </div>
              </div>

              <div className="learning-opp-chat-groups">
                <div className="learning-opp-chat-group">
                  <div className="learning-opp-chat-group-label" data-animate="chat">
                    <FileText size={11} /> Document edit
                  </div>
                  <div className="pipeline-chat-thread learning-opp-thread">
                    {docChat.map((msg) => (
                      <div
                        key={msg.id}
                        data-animate="chat"
                        className={`pipeline-chat-msg pipeline-chat-msg--${msg.role}`}
                      >
                        <div className={`pipeline-chat-msg-avatar pipeline-chat-msg-avatar--${msg.role}`} aria-hidden>
                          {msg.role === 'ai' ? <Bot size={11} /> : <User size={11} />}
                        </div>
                        <div className="pipeline-chat-msg-content">
                          <div className="pipeline-chat-msg-name">
                            {msg.role === 'ai' ? 'Aura' : 'You'}
                          </div>
                          <div className={`pipeline-chat-msg-bubble pipeline-chat-msg-bubble--${msg.role}`}>
                            {msg.text}
                            {msg.detect && (
                              <span className="learning-opp-detect-badge" data-animate="detect">
                                <Lightbulb size={10} /> Learning opportunity
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="learning-opp-chat-group">
                  <div className="learning-opp-chat-group-label" data-animate="chat">
                    <GitBranch size={11} /> Pipeline design
                  </div>
                  <div className="pipeline-chat-thread learning-opp-thread">
                    {pipelineChat.map((msg) => (
                      <div
                        key={msg.id}
                        data-animate="chat"
                        className={`pipeline-chat-msg pipeline-chat-msg--${msg.role}`}
                      >
                        <div className={`pipeline-chat-msg-avatar pipeline-chat-msg-avatar--${msg.role}`} aria-hidden>
                          {msg.role === 'ai' ? <Bot size={11} /> : <User size={11} />}
                        </div>
                        <div className="pipeline-chat-msg-content">
                          <div className="pipeline-chat-msg-name">
                            {msg.role === 'ai' ? 'Aura' : 'You'}
                          </div>
                          <div className={`pipeline-chat-msg-bubble pipeline-chat-msg-bubble--${msg.role}`}>
                            {msg.text}
                            {msg.detect && (
                              <span className="learning-opp-detect-badge" data-animate="detect">
                                <Lightbulb size={10} /> Learning opportunity
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pipeline-chat-compose" data-animate="chat-compose">
                <div className="pipeline-chat-input-mock">Your correction or preference…</div>
                <button type="button" className="pipeline-chat-send" aria-label="Send" tabIndex={-1}>
                  <Send size={12} />
                </button>
              </div>
            </GlassCard>

            <aside className="learning-opp-rules-aside">
              <GlassCard accent="green" className="learning-opp-rule-panel">
                <div className="learning-opp-panel-title" data-animate="rule">
                  <Sparkles size={13} /> Proposed rules
                </div>
                <div className="learning-opp-rule-card" data-animate="rule">
                  <div className="learning-opp-rule-type">Document standard</div>
                  <div className="learning-opp-rule-text">
                    Include Risk &amp; Mitigation with cited source in every business case
                  </div>
                  <div className="learning-opp-rule-chips">
                    <span className="learning-opp-chip learning-opp-chip--wait">Awaiting approval</span>
                    <span className="learning-opp-chip">Future documents</span>
                  </div>
                </div>
                <div className="learning-opp-rule-card" data-animate="rule">
                  <div className="learning-opp-rule-type">Pipeline rule</div>
                  <div className="learning-opp-rule-text">
                    VP review step required before publish on budget pipelines
                  </div>
                  <div className="learning-opp-rule-chips">
                    <span className="learning-opp-chip learning-opp-chip--wait">Awaiting approval</span>
                    <span className="learning-opp-chip">Future pipeline runs</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard accent="gold" className="learning-opp-preview-panel">
                <div className="learning-opp-panel-title" data-animate="preview">
                  <CheckCircle2 size={13} /> After approval
                </div>
                {futurePreview.map((item) => (
                  <div key={item.label} className="learning-opp-preview-item" data-animate="preview">
                    <CheckCircle2 size={12} className="learning-opp-preview-check" />
                    <div>
                      <div className="learning-opp-preview-label">{item.label}</div>
                      <div className="learning-opp-preview-detail">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </GlassCard>
            </aside>
          </div>
        </div>
      </SceneShell>
    </div>
  );
}

function fadeInChatHeader(tl: gsap.core.Timeline, root: HTMLElement) {
  const header = root.querySelector('[data-animate="chat-header"]');
  if (!header) return;
  tl.fromTo(
    header,
    { opacity: 0, y: -8 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', clearProps: 'transform' },
    0.45,
  );
}

function fadeInChatCompose(tl: gsap.core.Timeline, root: HTMLElement) {
  const compose = root.querySelector('[data-animate="chat-compose"]');
  if (!compose) return;
  tl.fromTo(
    compose,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', clearProps: 'transform' },
    1.05,
  );
}
