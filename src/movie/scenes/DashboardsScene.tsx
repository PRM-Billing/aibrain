import { useCallback } from 'react';
import { LayoutDashboard, TrendingUp, Clock, CheckCircle, BarChart3, Bell } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn, countUp } from '../useSceneTimeline';

type Props = { active: boolean };

const metrics = [
  { icon: <TrendingUp size={14} />,  color: 'green'  as const, value: 94, suffix: '%', label: 'Tasks completed on time',    accent: 'var(--green2)' },
  { icon: <Clock size={14} />,       color: 'blue'   as const, value: 12, suffix: 'h', label: 'Saved per week per person',  accent: 'var(--accent2)' },
  { icon: <CheckCircle size={14} />, color: 'teal'   as const, value: 100, suffix: '%', label: 'Decisions traceable',        accent: 'var(--teal2)' },
  { icon: <Bell size={14} />,        color: 'gold'   as const, value: 3,  suffix: '',  label: 'Open approvals right now',   accent: 'var(--gold2)' },
];

const views = [
  { icon: <BarChart3 size={13} />,      color: 'blue'   as const, label: 'Executive Overview',    sub: 'High-level KPIs and progress at a glance' },
  { icon: <LayoutDashboard size={13} />,color: 'teal'   as const, label: 'Work in Progress',       sub: 'Live pipeline: drafting → review → published' },
  { icon: <CheckCircle size={13} />,    color: 'gold'   as const, label: 'Approval Queue',         sub: 'Every pending review, owner, and deadline' },
  { icon: <TrendingUp size={13} />,     color: 'purple' as const, label: 'Automated Insights',     sub: 'Trends and recommendations generated weekly' },
];

export function DashboardsScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="metric"]', 0.1);
    staggerIn(tl, root, '[data-animate="view"]', 0.1);
    root.querySelectorAll('[data-count]').forEach((el, i) => {
      const m = metrics[i];
      if (m) countUp(tl, el, m.value, '', 0.4 + i * 0.1);
    });
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><LayoutDashboard size={11} /> Dashboards</>}
        headline="See What Matters — Role by Role."
        subline="Executive KPIs, live pipelines, approval queues, and automated insights in clean, focused dashboards."
      >
        <div className="fill" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {/* Metric cards */}
          <div className="grid-4">
            {metrics.map((m, i) => (
              <GlassCard key={m.label} accent={m.color} animate="metric" style={{ padding: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <IconBadge color={m.color}>{m.icon}</IconBadge>
                </div>
                <div style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: m.accent, lineHeight: 1, letterSpacing: '-0.04em' }}>
                  <span data-count={i}>0</span>{m.suffix}
                </div>
                <div style={{ fontSize: '0.6rem', color: 'var(--muted)', fontWeight: 600, marginTop: 4, lineHeight: 1.3 }}>{m.label}</div>
              </GlassCard>
            ))}
          </div>

          {/* Dashboard view cards */}
          <div className="grid-4" style={{ flex: 1 }}>
            {views.map((v) => (
              <GlassCard key={v.label} accent={v.color} animate="view" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <IconBadge color={v.color}>{v.icon}</IconBadge>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, lineHeight: 1.2 }}>{v.label}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--muted)', lineHeight: 1.35, flex: 1 }}>{v.sub}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </SceneShell>
    </div>
  );
}
