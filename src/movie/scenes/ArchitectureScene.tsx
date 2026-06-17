import { useCallback } from 'react';
import { Network, Cpu, Wrench, Database, TrendingUp, ArrowRight } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const nodes = [
  { icon: <Cpu size={14} />,       color: 'blue'   as const, label: 'Specialist Node',    sub: 'Handles one well-defined task in the workflow' },
  { icon: <Wrench size={14} />,    color: 'teal'   as const, label: 'Tools',               sub: 'Search, draft, calculate, retrieve — pluggable' },
  { icon: <Database size={14} />,  color: 'purple' as const, label: 'Shared Memory',       sub: 'All nodes draw on the same organisational context' },
  { icon: <TrendingUp size={14} />,color: 'green'  as const, label: 'Continuous Learning', sub: 'Human approvals feed back into every future run' },
];

const principles = [
  { label: 'Graph-based orchestration',   sub: 'Workflows as chains of specialist nodes' },
  { label: 'Memory-grounded outputs',     sub: 'Every answer draws from organisational context' },
  { label: 'Approval-gated writes',       sub: 'Nothing changes without human sign-off' },
  { label: 'Improving with every cycle',  sub: 'Human decisions become part of the model' },
];

export function ArchitectureScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="node"]', 0.12);
    staggerIn(tl, root, '[data-animate="principle"]', 0.1);
    staggerIn(tl, root, '[data-animate="connector"]', 0.15);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><Network size={11} /> Under the Hood</>}
        headline="A Graph-Based AI Engine — Memory-Grounded, Always Learning."
        subline="Workflows are chains of specialist AI nodes, each using tools and drawing from a shared organisational memory that improves over time."
      >
        <div className="grid-2 fill">
          {/* Node graph */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {nodes.map((n, i) => (
              <div key={n.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <GlassCard accent={n.color} animate="node" style={{ padding: '0.65rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <IconBadge color={n.color}>{n.icon}</IconBadge>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800 }}>{n.label}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--muted)', marginTop: 2 }}>{n.sub}</div>
                  </div>
                </GlassCard>
                {i < nodes.length - 1 && (
                  <div data-animate="connector" style={{ display: 'flex', alignItems: 'center', paddingLeft: '1.5rem', gap: 4 }}>
                    <div style={{ width: 1, height: 10, background: 'var(--line2)', marginLeft: '0.55rem' }} />
                    <ArrowRight size={10} color="var(--muted2)" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Principles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Design principles</div>
            {principles.map((p) => (
              <GlassCard key={p.label} animate="principle" style={{ padding: '0.65rem 0.8rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', marginTop: 4, flexShrink: 0, boxShadow: '0 0 6px var(--accent)' }} />
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800 }}>{p.label}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--muted)', marginTop: 2 }}>{p.sub}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </SceneShell>
    </div>
  );
}
