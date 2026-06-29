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
    <div ref={ref} className="hero-scene closing-modern-scene fill">
      <div className="hero-orb hero-orb-1" aria-hidden />
      <div className="hero-orb hero-orb-2" aria-hidden />

      <div className="hero-brand">
        <div className="eyebrow hero-eyebrow" data-animate="brand">
          <Zap size={11} /> Ready to deploy
        </div>
        <h1 className="hero-title closing-modern-title" data-animate="brand">
          {BRAND.name}
        </h1>
        <p className="hero-tagline closing-modern-tagline" data-animate="brand">
          The AI platform your organisation <strong style={{ color: 'var(--accent2)', fontWeight: 700 }}>thinks with</strong> — secure, human-approved, and under your control.
        </p>
      </div>

      <div className="hero-features closing-modern-features closing-modern-features--top">
        {messages.slice(0, 4).map((m) => (
          <GlassCard key={m.label} accent={m.color} animate="card" className="closing-modern-card">
            <IconBadge color={m.color} size="md">{m.icon}</IconBadge>
            <div className="closing-modern-card-title">{m.label}</div>
            <div className="closing-modern-card-sub">{m.sub}</div>
          </GlassCard>
        ))}
      </div>
      <div className="hero-features closing-modern-features closing-modern-features--bottom">
        {messages.slice(4).map((m) => (
          <GlassCard key={m.label} accent={m.color} animate="card" className="closing-modern-card">
            <IconBadge color={m.color} size="md">{m.icon}</IconBadge>
            <div className="closing-modern-card-title">{m.label}</div>
            <div className="closing-modern-card-sub">{m.sub}</div>
          </GlassCard>
        ))}
      </div>

      <div data-animate="cta" className="card closing-modern-cta">
        <span>{BRAND.name} by PRM</span>
        <ArrowRight size={14} color="var(--accent2)" />
      </div>
    </div>
  );
}
