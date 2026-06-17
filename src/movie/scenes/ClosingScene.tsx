import { useCallback } from 'react';
import { Video, Database, FileText, Brain, Shield, UserCheck, Eye, Zap } from 'lucide-react';
import { BRAND } from '../../brand';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const messages = [
  { icon: <Video size={14} />,     color: 'blue'   as const, label: 'Sits in your meetings',     sub: 'Private real-time intelligence — only you see it' },
  { icon: <Database size={14} />,  color: 'teal'   as const, label: 'Builds living memory',      sub: 'Everything captured, searchable, compounding' },
  { icon: <FileText size={14} />,  color: 'gold'   as const, label: 'Generates your documents',  sub: 'One conversation → every artifact you need' },
  { icon: <Brain size={14} />,     color: 'purple' as const, label: 'Learns your standards',     sub: 'Human edits become permanent rules — forever' },
  { icon: <Shield size={14} />,    color: 'green'  as const, label: 'Secures your IP',           sub: 'Segmented, encrypted, never trains other AIs' },
  { icon: <UserCheck size={14} />, color: 'sky'    as const, label: 'Human in the loop',         sub: 'Nothing final without your approval' },
  { icon: <Eye size={14} />,       color: 'rose'   as const, label: 'You control who sees what', sub: 'Role-based, department-isolated, explicit sharing' },
];

export function ClosingScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="brand"]', 0.15);
    staggerIn(tl, root, '[data-animate="card"]', 0.07);
    staggerIn(tl, root, '[data-animate="cta"]', 0.2);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref} className="fill" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', padding: '0 1rem', textAlign: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(99,102,241,.06), transparent)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
        <div className="eyebrow" data-animate="brand" style={{ margin: '0 auto' }}>
          <Zap size={11} /> PRM Intelligence Platform
        </div>
        <h1
          data-animate="brand"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg,#a5b4fc,#6366f1,#14b8a6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.05em',
            lineHeight: 0.95,
          }}
        >
          {BRAND.name}
        </h1>
        <p data-animate="brand" style={{ fontSize: 'clamp(0.78rem, 1.3vw, 0.95rem)', maxWidth: 440, lineHeight: 1.55, fontWeight: 300, color: 'var(--muted)' }}>
          The first AI platform built for <strong style={{ color: 'var(--text)', fontWeight: 700 }}>how your organisation actually works</strong>.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.4rem', maxWidth: 760, width: '100%' }}>
        {messages.slice(0, 4).map((m) => (
          <GlassCard key={m.label} accent={m.color} animate="card" style={{ padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <IconBadge color={m.color} size="sm">{m.icon}</IconBadge>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, lineHeight: 1.2 }}>{m.label}</div>
            <div style={{ fontSize: '0.58rem', color: 'var(--muted)', lineHeight: 1.3 }}>{m.sub}</div>
          </GlassCard>
        ))}
        {messages.slice(4).map((m) => (
          <GlassCard key={m.label} accent={m.color} animate="card" style={{ padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <IconBadge color={m.color} size="sm">{m.icon}</IconBadge>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, lineHeight: 1.2 }}>{m.label}</div>
            <div style={{ fontSize: '0.58rem', color: 'var(--muted)', lineHeight: 1.3 }}>{m.sub}</div>
          </GlassCard>
        ))}
      </div>

      <div data-animate="cta" className="card" style={{ padding: '0.65rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg,rgba(99,102,241,.15),rgba(20,184,166,.1))', borderColor: 'rgba(99,102,241,.3)' }}>
        <Zap size={13} color="var(--accent2)" />
        <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Ready to deploy · <strong style={{ color: 'var(--accent2)' }}>Aura by PRM</strong></span>
      </div>
    </div>
  );
}
