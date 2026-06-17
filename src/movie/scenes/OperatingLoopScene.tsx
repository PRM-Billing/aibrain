import { useCallback } from 'react';
import { Video, Lock, Database, Sparkles, Brain, Shield, UserCheck, Eye } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const steps = [
  { n: 1, icon: <Video size={16} />,     color: 'blue'   as const, label: 'Sits in your meeting',         sub: 'Listens and understands in real time' },
  { n: 2, icon: <Lock size={16} />,      color: 'purple' as const, label: 'Privately guides you',          sub: 'Whispers insights only you can see' },
  { n: 3, icon: <Database size={16} />,  color: 'teal'   as const, label: 'Saves to memory',               sub: 'Everything captured, searchable forever' },
  { n: 4, icon: <Sparkles size={16} />,  color: 'gold'   as const, label: 'Generates artifacts',           sub: 'Documents drafted and ready for review' },
  { n: 5, icon: <Brain size={16} />,     color: 'green'  as const, label: 'Learns from every decision',    sub: 'Improves with each human-approved edit' },
];

const govPillars = [
  { icon: <Shield size={12} />,    label: 'Secure',           color: '#34d399' },
  { icon: <UserCheck size={12} />, label: 'Human-Approved',   color: '#fbbf24' },
  { icon: <Eye size={12} />,       label: 'Access-Controlled', color: '#60a5fa' },
];

export function OperatingLoopScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="step"]', 0.12);
    staggerIn(tl, root, '[data-animate="gov"]', 0.15);

    const dot = root.querySelector<HTMLElement>('[data-animate="dot"]');
    const steps = root.querySelectorAll('[data-animate="step"]');
    if (dot && steps.length) {
      const positions = Array.from(steps).map(el => {
        const r = (el as HTMLElement).getBoundingClientRect();
        const pr = (el.parentElement as HTMLElement).getBoundingClientRect();
        return { x: r.left - pr.left + r.width / 2, y: r.top - pr.top + r.height / 2 };
      });
      tl.fromTo(dot, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3 }, 0.7);
      positions.forEach((pos, i) => {
        tl.to(dot, { x: pos.x - 6, y: pos.y - 6, duration: 0.5, ease: 'power2.inOut' }, 0.7 + i * 0.55);
      });
      tl.to(dot, { opacity: 0, duration: 0.3 }, 0.7 + positions.length * 0.55);
    }
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<>How Aura Works</>}
        headline="Listen. Guide. Remember. Act. Learn."
        subline="One continuous loop — on every meeting, every workflow, getting smarter each cycle."
      >
        <div className="fill" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', overflow: 'hidden' }}>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.5rem' }}>
            {steps.map((s) => (
              <GlassCard key={s.n} accent={s.color} animate="step" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', width: '100%' }}>
                  <IconBadge color={s.color}>{s.icon}</IconBadge>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted2)', letterSpacing: '0.06em' }}>{String(s.n).padStart(2,'0')}</span>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, marginBottom: '0.2rem', lineHeight: 1.2 }}>{s.label}</div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--muted)', lineHeight: 1.35 }}>{s.sub}</div>
                </div>
              </GlassCard>
            ))}
            <div
              data-animate="dot"
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: 12, height: 12,
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 16px rgba(99,102,241,.9)',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            />
          </div>

          <GlassCard animate="gov" style={{ padding: '0.6rem 0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.62rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Governed by</span>
            {govPillars.map((g) => (
              <span key={g.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', fontWeight: 700, color: g.color }}>
                {g.icon}{g.label}
              </span>
            ))}
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
