import { useCallback } from 'react';
import { BookOpen } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

export function KnowledgeScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="lib"]', 0.15);
    staggerIn(tl, root, '[data-animate="ver"]', 0.1);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><BookOpen size={12} /> One Source of Truth</>}
        headline="Every Document. Every Version. Instantly Findable."
        subline="A knowledge library and a process library — searchable by meaning, with full version history."
      >
        <div className="grid-2 fill">
          <GlassCard animate="lib" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--sky)', marginBottom: 6 }}>Knowledge Library</div>
            <p style={{ fontSize: '0.72rem', color: 'var(--muted)', lineHeight: 1.45 }}>Every document Aura produces — versioned, searchable, always current.</p>
          </GlassCard>
          <GlassCard animate="lib" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--teal)', marginBottom: 6 }}>Process Library</div>
            <p style={{ fontSize: '0.72rem', color: 'var(--muted)', lineHeight: 1.45 }}>How your organisation actually works — documented and discoverable.</p>
          </GlassCard>
          <GlassCard animate="ver" style={{ padding: '0.75rem', gridColumn: '1 / -1' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>Version history</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.72rem' }}>
              {['v1', 'v2', 'v3'].map((v, i) => (
                <span key={v} data-animate="ver" className="chip" style={i === 2 ? { borderColor: 'var(--green)', color: 'var(--green)' } : undefined}>
                  {v}{i === 2 ? ' · Current' : ''}
                </span>
              ))}
              <span style={{ color: 'var(--accent2)', marginLeft: 'auto', fontWeight: 700 }}>Revert in one click</span>
            </div>
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
