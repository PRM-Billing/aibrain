import { useCallback, useEffect, useState } from 'react';
import { Lock, Video } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const participants = ['Host', 'VP Ops', 'Finance', 'Claims', 'IT'];
const guidance = '"Heads up — a similar decision last quarter slipped on timeline. Want me to pull the numbers before you commit?"';

export function MeetingAgentScene({ active }: Props) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!active) {
      setTyped('');
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(guidance.slice(0, i));
      if (i >= guidance.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [active]);

  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="tile"]', 0.08);
    staggerIn(tl, root, '[data-animate="guide"]', 0.2);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><Video size={12} /> In Your Meetings</>}
        headline="It Sits in Your Meeting. And Quietly Makes You Look Brilliant."
        subline="Not a recorder. An intelligent teammate that thinks alongside you — and guides you privately, in real time."
      >
        <div className="grid-2 fill">
          <GlassCard animate="tile" style={{ padding: '0.75rem', background: '#0d1020' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>Strategy Review</span><span style={{ color: 'var(--green)' }}>● Live</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
              {participants.map((p) => (
                <div key={p} data-animate="tile" style={{ background: '#12162a', borderRadius: 8, padding: '0.5rem', textAlign: 'center', fontSize: '0.62rem', fontWeight: 700, border: '1px solid var(--line)' }}>{p}</div>
              ))}
              <div data-animate="tile" style={{ background: 'linear-gradient(135deg,#1a1040,#0f172a)', borderRadius: 8, padding: '0.5rem', textAlign: 'center', fontSize: '0.62rem', fontWeight: 700, border: '2px solid var(--accent)', boxShadow: '0 0 12px rgba(109,125,252,.25)' }}>Aura</div>
            </div>
          </GlassCard>
          <GlassCard animate="guide" style={{ padding: '0.85rem', borderColor: 'rgba(109,125,252,.35)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.62rem', fontWeight: 800, color: 'var(--accent2)', textTransform: 'uppercase', marginBottom: 8 }}>
              <Lock size={12} /> Only you can see this
            </div>
            <p style={{ fontSize: '0.78rem', lineHeight: 1.5, fontStyle: 'italic', minHeight: 80 }}>{typed}<span style={{ opacity: 0.6 }}>|</span></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
              {['Live understanding', 'Private nudges', 'Actions captured'].map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
