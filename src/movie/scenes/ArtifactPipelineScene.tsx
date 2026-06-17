import { useCallback } from 'react';
import gsap from 'gsap';
import {
  MessageSquare, GitBranch, Sparkles, Video, FileText, Briefcase,
  ArrowDown, Bot, UserCheck, PenLine, CheckCircle2, User, Send, ChevronRight,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn, sequenceIn } from '../useSceneTimeline';

type Props = { active: boolean };

const designSteps = [
  {
    icon: <MessageSquare size={16} strokeWidth={2.25} />,
    color: 'purple' as const,
    title: 'Design with AI',
    body: 'Chat to define steps, triggers, and outputs.',
  },
  {
    icon: <GitBranch size={16} strokeWidth={2.25} />,
    color: 'blue' as const,
    title: 'AI routes the call',
    body: 'Aura picks the pipeline after each meeting.',
  },
  {
    icon: <Sparkles size={16} strokeWidth={2.25} />,
    color: 'gold' as const,
    title: 'Artifact delivered',
    body: 'The right doc — grounded in what was shared.',
  },
];

type ChatMessage = {
  id: string;
  role: 'user' | 'ai';
  text: string;
  pipelinePreview?: string[];
};

const chatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    text: 'I need a pipeline that runs after our budget meetings.',
  },
  {
    id: '2',
    role: 'ai',
    text: 'Got it. What should the pipeline produce? I can suggest steps.',
  },
  {
    id: '3',
    role: 'user',
    text: 'Business case draft → VP review → publish to org memory.',
  },
  {
    id: '4',
    role: 'ai',
    text: 'Which inputs should I pull in when it runs?',
  },
  {
    id: '5',
    role: 'user',
    text: 'Meeting transcript, budget sheet, and any docs shared on the call.',
  },
  {
    id: '6',
    role: 'ai',
    text: 'When should this trigger automatically?',
  },
  {
    id: '7',
    role: 'user',
    text: 'When budget, scope, or headcount comes up in the conversation.',
  },
  {
    id: '8',
    role: 'ai',
    text: 'Pipeline saved — ready to run after your next meeting.',
    pipelinePreview: ['Meeting', 'Draft', 'VP review', 'Publish'],
  },
];

const flowNodes = [
  {
    id: 'meeting',
    icon: <Video size={16} strokeWidth={2.25} />,
    color: 'blue' as const,
    title: 'Meeting ends',
    sub: 'Budget & scope discussion · transcript captured',
  },
  {
    id: 'router',
    icon: <GitBranch size={16} strokeWidth={2.25} />,
    color: 'purple' as const,
    title: 'AI automation',
    sub: 'Matches trigger → Business Case pipeline',
  },
  {
    id: 'inputs',
    icon: <FileText size={16} strokeWidth={2.25} />,
    color: 'sky' as const,
    title: 'Inputs combined',
    sub: 'Transcript + budget sheet + prior brief',
  },
  {
    id: 'generate',
    icon: <PenLine size={16} strokeWidth={2.25} />,
    color: 'teal' as const,
    title: 'Generate draft',
    sub: 'Business case v1 with cited sources',
  },
  {
    id: 'review',
    icon: <UserCheck size={16} strokeWidth={2.25} />,
    color: 'green' as const,
    title: 'VP review',
    sub: 'One human approval — then published to memory',
  },
  {
    id: 'output',
    icon: <Briefcase size={16} strokeWidth={2.25} />,
    color: 'gold' as const,
    title: 'Business Case v1',
    sub: 'Draft ready · owners assigned',
    highlight: true,
  },
];

export function ArtifactPipelineScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.08, 0);
    sequenceIn(
      tl, root, '[data-animate="step"]', 0.18, 0.08,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', clearProps: 'transform' },
    );
    fadeInChatHeader(tl, root);
    sequenceIn(
      tl, root, '[data-animate="chat"]', 0.42, 0.09,
      { opacity: 0, y: 12, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: 'power3.out', clearProps: 'transform' },
    );
    fadeInChatCompose(tl, root);
    sequenceIn(
      tl, root, '[data-animate="flow-node"]', 1.05, 0.11,
      { opacity: 0, y: 14, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.3)', clearProps: 'transform' },
    );
    sequenceIn(
      tl, root, '[data-animate="flow-connector"]', 1.12, 0.08,
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 0.3, ease: 'power2.out', clearProps: 'transform' },
    );
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        className="pipeline-scene-shell"
        hideMeta
        eyebrow={<><Bot size={11} /> Artifact pipelines</>}
        headline="Design Pipelines with AI. Get the Right Artifact After Every Meeting."
        subline="Chat to create custom pipelines — Aura's automation picks which one to run from your meeting and the information you share."
      >
        <div className="pipeline-scene">
          <div className="pipeline-body">
            <aside className="pipeline-aside">
              <div className="pipeline-aside-stack">
                <GlassCard accent="purple" className="pipeline-how-panel">
                  <div className="pipeline-how-title" data-animate="step">
                    <MessageSquare size={13} /> How pipeline design works
                  </div>
                  <div className="pipeline-steps-row">
                    {designSteps.map((item) => (
                      <div key={item.title} data-animate="step" className="pipeline-step-pill">
                        <IconBadge color={item.color} size="sm">{item.icon}</IconBadge>
                        <div className="pipeline-step-pill-text">
                          <div className="pipeline-step-pill-title">{item.title}</div>
                          <div className="pipeline-step-pill-body">{item.body}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard accent="blue" className="pipeline-chat-panel">
                  <div className="pipeline-chat-header" data-animate="chat-header">
                    <div className="pipeline-chat-header-avatar" aria-hidden>
                      <Bot size={14} strokeWidth={2.25} />
                    </div>
                    <div className="pipeline-chat-header-text">
                      <div className="pipeline-chat-header-title">Pipeline Designer</div>
                      <div className="pipeline-chat-header-status">
                        <span className="pipeline-chat-status-dot" aria-hidden /> Aura · Online
                      </div>
                    </div>
                  </div>

                  <div className="pipeline-chat-thread">
                    {chatMessages.map((msg) => (
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
                            {msg.pipelinePreview && (
                              <div className="pipeline-chat-preview">
                                <div className="pipeline-chat-preview-label">Saved pipeline</div>
                                <div className="pipeline-chat-preview-steps">
                                  {msg.pipelinePreview.map((step, i) => (
                                    <span key={step} className="pipeline-chat-preview-wrap">
                                      {i > 0 && (
                                        <ChevronRight size={10} className="pipeline-chat-preview-chevron" aria-hidden />
                                      )}
                                      <span className="pipeline-chat-preview-step">{step}</span>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pipeline-chat-compose" data-animate="chat-compose">
                    <div className="pipeline-chat-input-mock">Describe your next pipeline…</div>
                    <button type="button" className="pipeline-chat-send" aria-label="Send" tabIndex={-1}>
                      <Send size={12} />
                    </button>
                  </div>
                </GlassCard>
              </div>
            </aside>

            <div className="pipeline-flowchart-wrap">
              <GlassCard accent="gold" className="pipeline-flowchart-panel">
                <div className="pipeline-flowchart-title" data-animate="flow-node">
                  <GitBranch size={13} /> Example: Business Case pipeline
                </div>
                <div className="pipeline-flowchart">
                  {flowNodes.map((node, i) => (
                    <div key={node.id} className="pipeline-flowchart-segment">
                      <div
                        data-animate="flow-node"
                        className={`pipeline-flow-node${node.highlight ? ' pipeline-flow-node--highlight' : ''}`}
                      >
                        <IconBadge color={node.color} size="md">{node.icon}</IconBadge>
                        <div className="pipeline-flow-node-text">
                          <div className="pipeline-flow-node-title">{node.title}</div>
                          <div className="pipeline-flow-node-sub">{node.sub}</div>
                        </div>
                        {node.highlight && (
                          <CheckCircle2 size={14} className="pipeline-flow-node-check" aria-hidden />
                        )}
                      </div>
                      {i < flowNodes.length - 1 && (
                        <div className="pipeline-flow-connector" data-animate="flow-connector" aria-hidden>
                          <ArrowDown size={14} />
                        </div>
                      )}
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

function fadeInChatHeader(tl: gsap.core.Timeline, root: HTMLElement) {
  const header = root.querySelector('[data-animate="chat-header"]');
  if (!header) return;
  tl.fromTo(
    header,
    { opacity: 0, y: -8 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', clearProps: 'transform' },
    0.32,
  );
}

function fadeInChatCompose(tl: gsap.core.Timeline, root: HTMLElement) {
  const compose = root.querySelector('[data-animate="chat-compose"]');
  if (!compose) return;
  tl.fromTo(
    compose,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', clearProps: 'transform' },
    1.0,
  );
}
