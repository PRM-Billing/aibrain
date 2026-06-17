import { useCallback } from 'react';
import { Video, Database, FileText, Brain, Shield, UserCheck, Eye, Zap, ArrowRight } from 'lucide-react';
import { BRAND } from '../../brand';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const messages = [
  { icon: <Video size={14} />,     color: 'blue'   as const, label: 'In your meetings',      sub: 'Private guidance, live' },
  { icon: <Database size={14} />,  color: 'teal'   as const, label: 'Living memory',         sub: 'Searchable, compounding' },
  { icon: <FileText size={14} />,  color: 'gold'   as const, label: 'Your documents',        sub: 'Drafted from conversation' },
  { icon: <Brain size={14} />,     color: 'purple' as const, label: 'Always learning',       sub: 'Your rules, permanently' },
  { icon: <Shield size={14} />,    color: 'green'  as const, label: 'Enterprise secure',     sub: 'Your IP stays yours' },
  { icon: <UserCheck size={14} />, color: 'sky'    as const, label: 'Human approved',        sub: 'Zero silent writes' },
  { icon: <Eye size={14} />,       color: 'rose'   as const, label: 'You control access',    sub: 'Roles enforced everywhere' },
];

export function ClosingScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="brand"]', 0.12);
    staggerIn(tl, root, '[data-animate="card"]', 0.06);
    staggerIn(tl, root, '[data-animate="cta"]', 0.2);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref} className="hero-scene fill">
      <div className="hero-orb hero-orb-1" aria-hidden />
      <div className="hero-orb hero-orb-2" aria-hidden />

      <div className="hero-brand">
        <div className="eyebrow hero-eyebrow" data-animate="brand">
          <Zap size={11} /> Ready to deploy
        </div>
        <h1 className="hero-title" data-animate="brand" style={{ fontSize: 'clamp(2.8rem, 8vw, 5rem)' }}>
          {BRAND.name}
        </h1>
        <p className="hero-tagline" data-animate="brand" style={{ maxWidth: 480 }}>
          The AI platform your organisation <strong style={{ color: 'var(--accent2)', fontWeight: 700 }}>thinks with</strong> — secure, human-approved, and under your control.
        </p>
      </div>

      <div className="hero-features" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {messages.slice(0, 4).map((m) => (
          <GlassCard key={m.label} accent={m.color} animate="card" style={{ padding: '0.7rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'left' }}>
            <IconBadge color={m.color} size="sm">{m.icon}</IconBadge>
            <div style={{ fontSize: '0.68rem', fontWeight: 800 }}>{m.label}</div>
            <div style={{ fontSize: '0.58rem', color: 'var(--muted)' }}>{m.sub}</div>
          </GlassCard>
        ))}
      </div>
      <div className="hero-features" style={{ gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 580 }}>
        {messages.slice(4).map((m) => (
          <GlassCard key={m.label} accent={m.color} animate="card" style={{ padding: '0.7rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'left' }}>
            <IconBadge color={m.color} size="sm">{m.icon}</IconBadge>
            <div style={{ fontSize: '0.68rem', fontWeight: 800 }}>{m.label}</div>
            <div style={{ fontSize: '0.58rem', color: 'var(--muted)' }}>{m.sub}</div>
          </GlassCard>
        ))}
      </div>

      <div data-animate="cta" className="card" style={{ padding: '0.7rem 1.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.55rem', background: 'linear-gradient(135deg,rgba(99,102,241,.18),rgba(20,184,166,.12))', borderColor: 'rgba(99,102,241,.35)', boxShadow: '0 0 32px rgba(99,102,241,.12)' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{BRAND.name} by PRM</span>
        <ArrowRight size={14} color="var(--accent2)" />
      </div>
    </div>
  );
}
