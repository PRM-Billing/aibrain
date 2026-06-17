import { useCallback } from 'react';
import { ShieldCheck } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const roles = [
  { role: 'Org Admin', access: 'Full organisation access' },
  { role: 'Department Admin', access: 'Manage their department' },
  { role: 'Member', access: 'Read and write in scope' },
  { role: 'Viewer', access: 'Read-only access' },
];

export function AccessControlScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="row"]', 0.1);
    staggerIn(tl, root, '[data-animate="note"]', 0.2);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><ShieldCheck size={12} /> Access Control</>}
        headline="Right People. Right Knowledge. Nothing More."
        subline="Role-based access across the whole organisation — set once, enforced everywhere."
      >
        <div className="fill" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {roles.map((r) => (
            <GlassCard key={r.role} animate="row" style={{ padding: '0.65rem 0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent2)' }}>{r.role}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{r.access}</span>
            </GlassCard>
          ))}
          <GlassCard animate="note" style={{ padding: '0.65rem', fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600, textAlign: 'center' }}>
            Sharing across teams always requires explicit approval
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
