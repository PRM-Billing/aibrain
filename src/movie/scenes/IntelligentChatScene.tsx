import { useCallback } from 'react';
import gsap from 'gsap';
import {
  ArrowDown, Bot, BrainCircuit, CheckCircle2, FileText, Link2, MessageSquare,
  Search, Send, ShieldCheck, Sparkles, User,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, sequenceIn, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const capabilities = [
  { icon: <MessageSquare size={14} />, color: 'blue' as const, label: 'Plain-English questions', sub: 'No query language or report builder required' },
  { icon: <BrainCircuit size={14} />, color: 'purple' as const, label: 'Cross-document reasoning', sub: 'Combines meetings, artifacts, and approvals' },
  { icon: <Link2 size={14} />, color: 'teal' as const, label: 'Source-linked answers', sub: 'Every claim traces to exact documents' },
];

const reasoningSteps = [
  { icon: <Search size={14} />, color: 'blue' as const, title: 'Parse intent', sub: 'Understands the question and scope' },
  { icon: <FileText size={14} />, color: 'teal' as const, title: 'Search memory', sub: 'Queries approved repository only' },
  { icon: <BrainCircuit size={14} />, color: 'purple' as const, title: 'Cross-reference', sub: 'Links risks, owners, and gate rules' },
  { icon: <Link2 size={14} />, color: 'gold' as const, title: 'Cite sources', sub: 'Attaches documents behind every claim' },
  { icon: <CheckCircle2 size={14} />, color: 'green' as const, title: 'Deliver answer', sub: 'Clear response with evidence attached' },
];

const questions = [
  'Which Q3 budget risks are still open?',
  'What did Legal approve for vendor renewals?',
  'Show BRDs waiting on CEO scoring.',
];

const sources = [
  'Q3 Budget BC.md',
  'BRD Approval Log',
  'Infrastructure Review Q2',
];

export function IntelligentChatScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.08, 0);
    staggerIn(tl, root, '[data-animate="capability"]', 0.08, 0.12);
    staggerIn(tl, root, '[data-animate="reason"]', 0.08, 0.55);
    sequenceIn(tl, root, '[data-animate="chat"]', 0.45, 0.12, { opacity: 0, y: 14, scale: 0.98 });
    staggerIn(tl, root, '[data-animate="source"]', 0.06, 1.2);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        className="intelligent-chat-shell"
        hideMeta
        eyebrow={<><MessageSquare size={11} /> Intelligent Chat</>}
        headline="Ask Anything. Get Intelligent, Cited Answers."
        subline="Aura reasons across your approved knowledge repository and shows exactly where every answer came from."
      >
        <div className="intelligent-chat-scene">
          <aside className="intelligent-chat-aside">
            <GlassCard accent="blue" className="intelligent-chat-capabilities">
              <div className="modern-panel-title" data-animate="capability">
                <Sparkles size={13} /> What users can ask
              </div>
              {capabilities.map((cap) => (
                <div key={cap.label} className="intelligent-chat-capability" data-animate="capability">
                  <IconBadge color={cap.color} size="md">{cap.icon}</IconBadge>
                  <div>
                    <div className="intelligent-chat-capability-label">{cap.label}</div>
                    <div className="intelligent-chat-capability-sub">{cap.sub}</div>
                  </div>
                </div>
              ))}
            </GlassCard>

            <GlassCard accent="teal" className="intelligent-chat-questions">
              <div className="modern-panel-title" data-animate="capability">
                <Search size={13} /> Try asking
              </div>
              <div className="intelligent-chat-question-pills">
                {questions.map((q) => (
                  <span key={q} className="intelligent-chat-question-pill" data-animate="capability">{q}</span>
                ))}
              </div>
            </GlassCard>
          </aside>

          <GlassCard accent="purple" className="pipeline-chat-panel intelligent-chat-panel">
            <div className="pipeline-chat-header" data-animate="chat">
              <div className="pipeline-chat-header-avatar" aria-hidden>
                <Bot size={14} strokeWidth={2.25} />
              </div>
              <div className="pipeline-chat-header-text">
                <div className="pipeline-chat-header-title">Ask Aura</div>
                <div className="pipeline-chat-header-status">
                  <span className="pipeline-chat-status-dot" aria-hidden /> Searching approved knowledge
                </div>
              </div>
            </div>

            <div className="intelligent-chat-thread">
              <div className="pipeline-chat-msg pipeline-chat-msg--user" data-animate="chat">
                <div className="pipeline-chat-msg-avatar pipeline-chat-msg-avatar--user" aria-hidden><User size={11} /></div>
                <div className="pipeline-chat-msg-content">
                  <div className="pipeline-chat-msg-name">You</div>
                  <div className="pipeline-chat-msg-bubble pipeline-chat-msg-bubble--user">
                    Which Q3 budget risks are still open, and who owns them?
                  </div>
                </div>
              </div>

              <div className="intelligent-chat-thinking" data-animate="chat">
                <Search size={12} /> Reviewing repository sources…
              </div>

              <div className="pipeline-chat-msg pipeline-chat-msg--ai" data-animate="chat">
                <div className="pipeline-chat-msg-avatar pipeline-chat-msg-avatar--ai" aria-hidden><Bot size={11} /></div>
                <div className="pipeline-chat-msg-content">
                  <div className="pipeline-chat-msg-name">Aura</div>
                  <div className="pipeline-chat-msg-bubble pipeline-chat-msg-bubble--ai">
                    Three Q3 risks remain open: scope slip on cloud migration, patch compliance delay, and vendor storage dependency. VP Ops owns the first two; IT Security owns vendor dependency.
                    <div className="intelligent-chat-source-row">
                      {sources.map((source) => (
                        <span key={source} className="intelligent-chat-source" data-animate="source">
                          <FileText size={10} /> {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pipeline-chat-msg pipeline-chat-msg--user" data-animate="chat">
                <div className="pipeline-chat-msg-avatar pipeline-chat-msg-avatar--user" aria-hidden><User size={11} /></div>
                <div className="pipeline-chat-msg-content">
                  <div className="pipeline-chat-msg-name">You</div>
                  <div className="pipeline-chat-msg-bubble pipeline-chat-msg-bubble--user">
                    Which one blocks BRD approval?
                  </div>
                </div>
              </div>

              <div className="pipeline-chat-msg pipeline-chat-msg--ai" data-animate="chat">
                <div className="pipeline-chat-msg-avatar pipeline-chat-msg-avatar--ai" aria-hidden><Bot size={11} /></div>
                <div className="pipeline-chat-msg-content">
                  <div className="pipeline-chat-msg-name">Aura</div>
                  <div className="pipeline-chat-msg-bubble pipeline-chat-msg-bubble--ai">
                    Vendor dependency blocks approval. The BRD rule requires either a secondary provider or an accepted exception from IT Security before publish.
                    <div className="intelligent-chat-source-row">
                      <span className="intelligent-chat-source" data-animate="source"><Link2 size={10} /> BRD Gate Rules</span>
                      <span className="intelligent-chat-source" data-animate="source"><FileText size={10} /> Vendor Risk Register</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pipeline-chat-compose" data-animate="chat">
              <div className="pipeline-chat-input-mock">Ask about any meeting, document, approval, or decision…</div>
              <button type="button" className="pipeline-chat-send" aria-label="Send" tabIndex={-1}>
                <Send size={12} />
              </button>
            </div>
          </GlassCard>

          <GlassCard accent="teal" className="intelligent-chat-reasoning">
            <div className="modern-panel-title" data-animate="reason">
              <BrainCircuit size={13} /> How Aura answers
            </div>
            <div className="intelligent-chat-reason-steps">
              {reasoningSteps.map((step, i) => (
                <div key={step.title} className="intelligent-chat-reason-step" data-animate="reason">
                  <div className="intelligent-chat-reason-rail">
                    <IconBadge color={step.color} size="md">{step.icon}</IconBadge>
                    {i < reasoningSteps.length - 1 && <span className="intelligent-chat-reason-line" />}
                  </div>
                  <div className="intelligent-chat-reason-card">
                    <div className="intelligent-chat-reason-title">{step.title}</div>
                    <div className="intelligent-chat-reason-sub">{step.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="intelligent-chat-trust" data-animate="reason">
              <ShieldCheck size={12} />
              <span>Approved memory only — never the open web</span>
            </div>
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
