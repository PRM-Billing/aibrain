import { useCallback, useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const answer = 'Based on your September vendor review, the claims processing timeline slipped after month two. Three alternatives were considered before the current vendor was selected.';
const sources = ['Vendor Review – Sept', 'Risk Assessment', 'Board Notes'];

export function CitationsScene({ active }: Props) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!active) { setTyped(''); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(answer.slice(0, i));
      if (i >= answer.length) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [active]);

  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="chat"]', 0.15);
    staggerIn(tl, root, '[data-animate="src"]', 0.1);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><MessageSquare size={12} /> Ask Anything</>}
        headline="Answers. With Proof. Not Just Links."
        subline="Ask in plain English and get a real answer — with the exact source cited and linked."
      >
        <GlassCard animate="chat" style={{ padding: '1rem', maxWidth: 640 }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: 10 }}>
            "What did we decide about the new vendor, and why?"
          </p>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.5, marginBottom: 12, minHeight: 60 }}>{typed}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {sources.map((s) => (
              <span key={s} data-animate="src" className="chip" style={{ borderColor: 'rgba(109,125,252,.35)', color: 'var(--accent2)' }}>{s}</span>
            ))}
          </div>
          <p style={{ fontSize: '0.62rem', color: 'var(--muted)', marginTop: 10 }}>Scoped to what you're allowed to see</p>
        </GlassCard>
      </SceneShell>
    </div>
  );
}
