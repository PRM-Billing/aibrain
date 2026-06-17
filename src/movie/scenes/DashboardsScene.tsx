import { useCallback } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const panels = [
  { title: 'Executive Overview', bars: [70, 45, 90, 60] },
  { title: 'Work in Progress', bars: [40, 80, 55, 70] },
  { title: 'Approval Queue', bars: [30, 30, 85, 40] },
  { title: 'Planning', bars: [60, 50, 65, 75] },
  { title: 'Insight Reports', bars: [85, 70, 50, 90] },
];

export function DashboardsScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="panel"]', 0.1);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><LayoutDashboard size={12} /> Everything in View</>}
        headline="Your Whole Operation, at a Glance."
        subline="Clear dashboards keep everyone aligned — from the executive view to the day-to-day."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }} className="fill">
          {panels.map((p) => (
            <GlassCard key={p.title} animate="panel" style={{ padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800 }}>{p.title}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, flex: 1, minHeight: 48 }}>
                {p.bars.map((h, i) => (
                  <div key={i} data-animate="panel" style={{ flex: 1, height: `${h}%`, background: 'linear-gradient(180deg,var(--accent),var(--teal))', borderRadius: 3, minHeight: 8 }} />
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </SceneShell>
    </div>
  );
}
