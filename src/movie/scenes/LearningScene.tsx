import { useCallback } from 'react';
import { Brain, TrendingUp, CheckCircle, Edit3, ArrowRight, Zap } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';
import gsap from 'gsap';

type Props = { active: boolean };

const steps = [
  { icon: <Brain size={13} />,      color: 'blue'   as const, label: 'Aura produces output',         sub: 'Draft, categorisation, or recommendation' },
  { icon: <Edit3 size={13} />,      color: 'gold'   as const, label: 'Human reviews and edits',      sub: 'Corrections, additions, or approvals' },
  { icon: <CheckCircle size={13} />,color: 'green'  as const, label: 'Edit becomes an approved rule',sub: 'Permanently stored as organisational standard' },
  { icon: <Zap size={13} />,        color: 'purple' as const, label: 'Applied to every future run',  sub: 'Aura improves across the whole organisation' },
];

const bars = [
  { label: 'Week 1',   pct: 82 },
  { label: 'Month 1',  pct: 70 },
  { label: 'Month 3',  pct: 55 },
  { label: 'Month 6',  pct: 28 },
];

export function LearningScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="step"]', 0.12);
    staggerIn(tl, root, '[data-animate="bar-row"]', 0.12);
    root.querySelectorAll('[data-bar-fill]').forEach((el, i) => {
      tl.to(el, { width: `${bars[i]?.pct ?? 50}%`, duration: 0.8, ease: 'power2.out' }, 0.8 + i * 0.15);
    });
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><TrendingUp size={11} /> Learns With Every Decision</>}
        headline="Every Human Edit Makes Aura Smarter — Permanently."
        subline="Corrections and approvals become permanent organisational rules. Aura improves for everyone, forever."
      >
        <div className="grid-2 fill">
          {/* Learning loop */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {steps.map((s, i) => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <GlassCard accent={s.color} animate="step" style={{ padding: '0.65rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <IconBadge color={s.color} size="sm">{s.icon}</IconBadge>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800 }}>{s.label}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--muted)', marginTop: 2 }}>{s.sub}</div>
                  </div>
                </GlassCard>
                {i < steps.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '1.35rem', gap: 4 }}>
                    <ArrowRight size={11} color="var(--muted2)" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Improvement metric */}
          <GlassCard accent="green" animate="bar-row" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <IconBadge color="green"><TrendingUp size={14} /></IconBadge>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Editing effort needed over time</span>
            </div>
            {bars.map((b) => (
              <div key={b.label} data-animate="bar-row" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ minWidth: 52, fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent2)' }}>{b.label}</span>
                <div style={{ flex: 1, height: 8, background: 'var(--s4)', borderRadius: 999, overflow: 'hidden' }}>
                  <div data-bar-fill style={{ height: '100%', width: 0, background: `linear-gradient(90deg,var(--green),var(--teal2))`, borderRadius: 999 }} />
                </div>
                <span style={{ fontSize: '0.62rem', color: 'var(--muted)', minWidth: 28, textAlign: 'right' }}>{b.pct}%</span>
              </div>
            ))}
            <div style={{ marginTop: 4, fontSize: '0.65rem', color: 'var(--green2)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
              <TrendingUp size={11} />
              The longer Aura runs, the less work each cycle takes
            </div>
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
