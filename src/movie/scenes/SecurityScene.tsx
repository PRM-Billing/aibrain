import { useCallback } from 'react';
import { Shield, Lock, EyeOff, Activity, ShieldCheck, Users } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, FeatCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const pillars = [
  { icon: <EyeOff size={14} />,     color: 'blue'   as const, label: 'Segmented access',          body: 'Teams see only the data within their scope — enforced at every layer.' },
  { icon: <Lock size={14} />,        color: 'purple' as const, label: 'End-to-end encryption',     body: 'All data encrypted at rest and in transit. No exceptions.' },
  { icon: <ShieldCheck size={14} />, color: 'green'  as const, label: 'Your IP never leaves',      body: 'Your data is never used to train external AI models — ever.' },
  { icon: <Activity size={14} />,    color: 'gold'   as const, label: 'Full audit trail',           body: 'Every action logged, timestamped, and attributable to a named user.' },
];

const departments = ['Finance', 'Operations', 'Claims', 'IT', 'HR', 'Legal'];

export function SecurityScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="pillar"]', 0.1);
    staggerIn(tl, root, '[data-animate="dept"]', 0.07);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><Shield size={11} /> Secure by Design</>}
        headline="Your IP Stays Yours. Full Stop."
        subline="Segmented by team, encrypted end-to-end, never used to train external AI models."
      >
        <div className="grid-2 fill">
          {/* Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {pillars.map((p) => (
              <FeatCard key={p.label} icon={p.icon} iconColor={p.color} title={p.label} body={p.body} accent={p.color} animate="pillar" />
            ))}
          </div>

          {/* Segmentation visual */}
          <GlassCard accent="blue" animate="pillar" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
              <IconBadge color="blue" size="lg"><Users size={16} /></IconBadge>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800 }}>Department Isolation</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>Each team operates in its own secure silo</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.4rem' }}>
              {departments.map((d) => (
                <div key={d} data-animate="dept" style={{
                  background: 'var(--s3)',
                  border: '1px solid var(--line2)',
                  borderRadius: '0.6rem',
                  padding: '0.5rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 5,
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,var(--s4),var(--s2))', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line2)' }}>
                    <Lock size={11} color="var(--muted)" />
                  </div>
                  <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>{d}</span>
                </div>
              ))}
            </div>
            <div className="chip" style={{ color: 'var(--green2)', borderColor: 'rgba(52,211,153,.25)', fontSize: '0.62rem', width: 'fit-content', marginTop: 4 }}>
              <ShieldCheck size={10} /> Cross-team sharing requires explicit approval
            </div>
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
