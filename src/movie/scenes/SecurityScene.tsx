import { useCallback } from 'react';
import { Shield } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const pillars = [
  'Segmented access — teams only reach what they should',
  'Encrypted end to end',
  'Your data never trains external AI models',
  'Full activity audit trail',
];

export function SecurityScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="shield"]', 0.2);
    staggerIn(tl, root, '[data-animate="pillar"]', 0.1);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><Shield size={12} /> Your IP, Protected</>}
        headline="Your Knowledge Is Your Advantage. We Guard It Like One."
        subline="Segmented, encrypted, and never used to train anyone else's AI."
      >
        <div className="grid-2 fill">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div data-animate="shield" style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#4f46e5,#2dd4bf)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 12px rgba(109,125,252,.08)' }}>
              <Shield size={32} color="#fff" />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
              {['Team A', 'Finance', 'People', 'Operations'].map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {pillars.map((p) => (
              <GlassCard key={p} animate="pillar" style={{ padding: '0.65rem 0.85rem', fontSize: '0.72rem', fontWeight: 600 }}>{p}</GlassCard>
            ))}
          </div>
        </div>
      </SceneShell>
    </div>
  );
}
