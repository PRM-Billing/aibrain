import { useCallback } from 'react';
import { MessageSquare, Link2, FileText, BookOpen, CheckCircle } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const chatMessages = [
  {
    role: 'user' as const,
    text: 'What were the key risks identified in the last infrastructure review?',
  },
  {
    role: 'aura' as const,
    text: 'Three risks were flagged: (1) single-vendor dependency for cloud storage, (2) no documented failover process for the billing pipeline, and (3) a 6-week gap in patch compliance on two servers. All three have open action items assigned.',
    sources: [
      { label: 'Infrastructure Review Q4', icon: <FileText size={10} /> },
      { label: 'Risk Register Mar 2026', icon: <BookOpen size={10} /> },
      { label: 'IT Action Tracker', icon: <CheckCircle size={10} /> },
    ],
  },
];

const benefits = [
  { icon: <MessageSquare size={13} />, color: 'blue'   as const, label: 'Plain English questions', sub: 'Ask anything — no query language needed' },
  { icon: <Link2 size={13} />,         color: 'teal'   as const, label: 'Source-linked answers',   sub: 'Every claim traced back to its document' },
  { icon: <CheckCircle size={13} />,   color: 'green'  as const, label: 'Verifiable, not guessed', sub: 'Cites exactly what it knows, nothing more' },
];

export function CitationsScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="msg"]', 0.18);
    staggerIn(tl, root, '[data-animate="src"]', 0.08);
    staggerIn(tl, root, '[data-animate="benefit"]', 0.1);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><MessageSquare size={11} /> Chat with Citations</>}
        headline="Answers With Proof — Not Guesswork."
        subline="Ask in plain English. Every response cites the exact document it came from."
      >
        <div className="grid-2 fill">
          {/* Chat mock */}
          <GlassCard animate="msg" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
              <IconBadge color="blue" size="sm"><MessageSquare size={11} /></IconBadge>
              <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ask Aura</span>
            </div>

            {chatMessages.map((msg, i) => (
              <div key={i} data-animate="msg" style={{
                background: msg.role === 'user' ? 'rgba(99,102,241,.08)' : 'rgba(14,25,41,.7)',
                border: `1px solid ${msg.role === 'user' ? 'rgba(99,102,241,.2)' : 'var(--line)'}`,
                borderRadius: '0.75rem',
                padding: '0.6rem 0.75rem',
              }}>
                <div style={{ fontSize: '0.6rem', fontWeight: 800, color: msg.role === 'user' ? 'var(--accent2)' : 'var(--teal2)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {msg.role === 'user' ? 'You' : 'Aura'}
                </div>
                <div style={{ fontSize: '0.72rem', lineHeight: 1.45, color: 'var(--text)' }}>{msg.text}</div>
                {msg.sources && (
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 8 }}>
                    {msg.sources.map((s) => (
                      <span key={s.label} data-animate="src" className="chip" style={{ color: 'var(--sky2)', borderColor: 'rgba(96,165,250,.25)', fontSize: '0.6rem' }}>
                        {s.icon} {s.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </GlassCard>

          {/* Benefits */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {benefits.map((b) => (
              <GlassCard key={b.label} accent={b.color} animate="benefit" style={{ padding: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
                <IconBadge color={b.color}>{b.icon}</IconBadge>
                <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>{b.label}</div>
                <div style={{ fontSize: '0.63rem', color: 'var(--muted)', lineHeight: 1.4 }}>{b.sub}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </SceneShell>
    </div>
  );
}
