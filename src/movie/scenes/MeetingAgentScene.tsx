import { useCallback, useEffect, useState } from 'react';
import {
  Video, Lock, Mic, MicOff, Lightbulb, AlertCircle, TrendingUp,
  Brain, FileSearch, Clock, FileText, Link2,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn, sequenceIn, fadeIn } from '../useSceneTimeline';

type Props = { active: boolean };

const participants = [
  { name: 'Host', role: 'Facilitator', initials: 'HO', muted: false, speaking: true, color: '#6366f1' },
  { name: 'VP Ops', role: 'Decision owner', initials: 'VO', muted: false, speaking: false, color: '#14b8a6' },
  { name: 'Finance', role: 'Budget review', initials: 'FI', muted: true, speaking: false, color: '#f59e0b' },
  { name: 'Claims', role: 'Stakeholder', initials: 'CL', muted: false, speaking: false, color: '#a855f7' },
  { name: 'IT', role: 'Technical lead', initials: 'IT', muted: true, speaking: false, color: '#3b82f6' },
];

const guidance = 'Heads up — a similar scope decision last quarter slipped by 6 weeks. Want me to pull the original estimate and actuals before you commit?';

const sourceDocs = [
  {
    name: 'Q2 Infrastructure Review.pdf',
    cite: 'p. 4',
    excerpt: 'Original estimate: 8 weeks · Actual delivery: 14 weeks',
    color: 'blue' as const,
  },
  {
    name: 'Budget Actuals Q2.xlsx',
    cite: 'Row 14',
    excerpt: '$1.2M over estimate · Owner: VP Ops · Mar 2025',
    color: 'teal' as const,
  },
];

const insightCards = [
  {
    icon: <AlertCircle size={16} />,
    color: 'rose' as const,
    title: 'Risk flagged',
    body: 'Scope slip pattern detected from Q2 infrastructure review',
  },
  {
    icon: <FileSearch size={16} />,
    color: 'teal' as const,
    title: 'Data ready',
    body: 'Original estimate, actuals, and owner notes pulled from memory',
  },
  {
    icon: <Lightbulb size={16} />,
    color: 'gold' as const,
    title: 'Action captured',
    body: 'Follow-up task drafted — review data before team commits',
  },
];

const CARD_FROM = { opacity: 0, y: 20, x: 0, scale: 0.96 } as const;
const CARD_TO = {
  opacity: 1, y: 0, x: 0, scale: 1, duration: 0.48, ease: 'power3.out', clearProps: 'transform',
} as const;

export function MeetingAgentScene({ active }: Props) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!active) { setTyped(''); return; }
    let i = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const startDelay = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setTyped(guidance.slice(0, i));
        if (i >= guidance.length && intervalId) clearInterval(intervalId);
      }, 22);
    }, 1200);
    return () => {
      clearTimeout(startDelay);
      if (intervalId) clearInterval(intervalId);
    };
  }, [active]);

  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    fadeIn(tl, root, '[data-animate="meet-panel"]', 0.15);
    sequenceIn(tl, root, '[data-animate="participant"]', 0.35, 0.12, CARD_FROM, CARD_TO);
    fadeIn(tl, root, '[data-animate="aura-tile"]', 0.95);
    fadeIn(tl, root, '[data-animate="guide-panel"]', 1.1);
    fadeIn(tl, root, '[data-animate="guide-msg"]', 1.35);
    sequenceIn(tl, root, '[data-animate="doc-ref"]', 1.85, 0.22, CARD_FROM, CARD_TO);
    sequenceIn(tl, root, '[data-animate="insight"]', 2.35, 0.35, CARD_FROM, CARD_TO);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><Video size={11} /> Intelligent Meeting Agent</>}
        headline="Private Intelligence, Live in Every Meeting."
        subline="Aura understands the conversation as it happens — and guides only you, in real time."
      >
        <div className="meeting-scene">
          <GlassCard animate="meet-panel" accent="blue" className="meeting-panel meeting-panel--call">
            <div className="meeting-call-header">
              <div>
                <div className="meeting-call-title">Strategy Review</div>
                <div className="meeting-call-meta">
                  <Clock size={11} /> 32:14 elapsed · 6 participants
                </div>
              </div>
              <span className="meeting-live-badge">
                <span className="meeting-live-dot" />
                Live
              </span>
            </div>

            <div className="meeting-participant-grid">
              {participants.map((p) => (
                <div
                  key={p.name}
                  data-animate="participant"
                  className={`meeting-participant${p.speaking ? ' meeting-participant--speaking' : ''}`}
                >
                  <div
                    className="meeting-avatar"
                    style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}88)` }}
                  >
                    {p.initials}
                    {p.speaking && <span className="meeting-speaking-ring" aria-hidden />}
                  </div>
                  <div className="meeting-participant-name">{p.name}</div>
                  <div className="meeting-participant-role">{p.role}</div>
                  <div className="meeting-mic-status">
                    {p.muted
                      ? <><MicOff size={11} /> Muted</>
                      : <><Mic size={11} /> {p.speaking ? 'Speaking' : 'Active'}</>}
                  </div>
                </div>
              ))}

              <div data-animate="aura-tile" className="meeting-participant meeting-participant--aura">
                <div className="meeting-avatar meeting-avatar--aura">
                  <Brain size={16} />
                </div>
                <div className="meeting-participant-name">Aura</div>
                <div className="meeting-participant-role">Listening &amp; guiding</div>
                <div className="meeting-mic-status meeting-mic-status--aura">
                  <TrendingUp size={11} /> Active
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard accent="purple" animate="guide-panel" className="meeting-panel meeting-panel--guide">
            <div className="meeting-guide-header">
              <IconBadge color="purple" size="lg"><Lock size={16} /></IconBadge>
              <div>
                <div className="meeting-guide-kicker">Private guidance</div>
                <div className="meeting-guide-label">Only you can see this — never shared with the room</div>
              </div>
            </div>

            <div className="meeting-context-strip" data-animate="guide-msg">
              <span className="meeting-context-tag">Topic detected</span>
              <span className="meeting-context-text">Q3 infrastructure scope &amp; budget commitment</span>
            </div>

            <div className="meeting-guide-bubble" data-animate="guide-msg">
              <div className="meeting-guide-bubble-label">
                <Brain size={12} /> Aura whispers
              </div>
              <p className="meeting-guide-text">
                &ldquo;{typed}{typed.length < guidance.length && <span className="meeting-cursor">|</span>}&rdquo;
              </p>
            </div>

            <div className="meeting-doc-refs">
              <div className="meeting-doc-refs-label">
                <Link2 size={11} /> Sources pulled from memory
              </div>
              {sourceDocs.map((doc) => (
                <div key={doc.name} data-animate="doc-ref" className="meeting-doc-ref">
                  <IconBadge color={doc.color} size="md"><FileText size={14} /></IconBadge>
                  <div className="meeting-doc-ref-body">
                    <div className="meeting-doc-ref-name">{doc.name}</div>
                    <div className="meeting-doc-ref-cite">
                      <span className="meeting-doc-ref-page">{doc.cite}</span>
                      {doc.excerpt}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="meeting-insights">
              {insightCards.map((card) => (
                <div key={card.title} data-animate="insight" className="meeting-insight-card">
                  <IconBadge color={card.color} size="md">{card.icon}</IconBadge>
                  <div>
                    <div className="meeting-insight-title">{card.title}</div>
                    <div className="meeting-insight-body">{card.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
