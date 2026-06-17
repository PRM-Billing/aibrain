import { useCallback, useEffect, useState } from 'react';
import { Video, Lock, Mic, MicOff, Lightbulb, AlertCircle, TrendingUp } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const participants = [
  { name: 'Host', muted: false, speaking: true },
  { name: 'VP Ops', muted: false, speaking: false },
  { name: 'Finance', muted: true, speaking: false },
  { name: 'Claims', muted: false, speaking: false },
  { name: 'IT', muted: true, speaking: false },
];

const guidance = '"Heads up — a similar scope decision last quarter slipped by 6 weeks. Want me to pull the original estimate and actuals before you commit?"';

const nudges = [
  { icon: <AlertCircle size={11} />, label: 'Risk flagged', color: 'var(--rose2)' },
  { icon: <TrendingUp size={11} />, label: 'Data ready', color: 'var(--teal2)' },
  { icon: <Lightbulb size={11} />, label: 'Action captured', color: 'var(--gold2)' },
];

export function MeetingAgentScene({ active }: Props) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!active) { setTyped(''); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(guidance.slice(0, i));
      if (i >= guidance.length) clearInterval(id);
    }, 24);
    return () => clearInterval(id);
  }, [active]);

  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="tile"]', 0.08);
    staggerIn(tl, root, '[data-animate="guide"]', 0.2);
    staggerIn(tl, root, '[data-animate="nudge"]', 0.1);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><Video size={11} /> Intelligent Meeting Agent</>}
        headline="Private Intelligence, Live in Every Meeting."
        subline="Aura understands the conversation as it happens — and guides only you, in real time."
      >
        <div className="grid-2 fill">
          {/* Video call mock */}
          <GlassCard animate="tile" style={{ padding: '0.75rem', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--muted)' }}>Strategy Review</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.6rem', color: 'var(--green2)', fontWeight: 700 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green2)', boxShadow: '0 0 6px var(--green2)' }} />
                Live
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
              {participants.map((p) => (
                <div key={p.name} data-animate="tile" style={{
                  background: p.speaking ? 'linear-gradient(135deg,#1e1040,#0f172a)' : 'var(--s2)',
                  borderRadius: 8,
                  padding: '0.55rem 0.4rem',
                  textAlign: 'center',
                  border: p.speaking ? '1px solid rgba(99,102,241,.4)' : '1px solid var(--line)',
                  boxShadow: p.speaking ? '0 0 12px rgba(99,102,241,.2)' : 'none',
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: p.speaking ? 'linear-gradient(135deg,#6366f1,#4f46e5)' : 'var(--s3)', margin: '0 auto 5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.muted ? <MicOff size={12} color="var(--muted)" /> : <Mic size={12} color={p.speaking ? '#fff' : 'var(--muted)'} />}
                  </div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700 }}>{p.name}</div>
                </div>
              ))}
              {/* Aura tile */}
              <div data-animate="tile" style={{
                background: 'linear-gradient(135deg,#1a1040,#0a0e24)',
                borderRadius: 8,
                padding: '0.55rem 0.4rem',
                textAlign: 'center',
                border: '2px solid rgba(99,102,241,.5)',
                boxShadow: '0 0 16px rgba(99,102,241,.25)',
              }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#14b8a6)', margin: '0 auto 5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.55rem', fontWeight: 900, color: '#fff' }}>AI</span>
                </div>
                <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--accent2)' }}>Aura</div>
              </div>
            </div>
          </GlassCard>

          {/* Whisper panel */}
          <GlassCard accent="purple" animate="guide" style={{ padding: '0.85rem', borderColor: 'rgba(99,102,241,.3)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <IconBadge color="purple" size="sm"><Lock size={12} /></IconBadge>
              <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--accent2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Only you can see this</span>
            </div>
            <div style={{
              background: 'rgba(99,102,241,.06)',
              border: '1px solid rgba(99,102,241,.15)',
              borderRadius: '0.65rem',
              padding: '0.65rem',
              fontSize: '0.75rem',
              lineHeight: 1.5,
              fontStyle: 'italic',
              minHeight: 72,
              flex: 1,
            }}>
              {typed}<span style={{ opacity: 0.5 }}>|</span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {nudges.map((n) => (
                <span key={n.label} data-animate="nudge" className="chip" style={{ color: n.color, borderColor: `${n.color}30` }}>
                  {n.icon}{n.label}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
