import { useCallback } from 'react';
import { Brain, Zap, MessageSquare, Database, Shield, UserCheck, Ban } from 'lucide-react';
import { BRAND } from '../../brand';
import { FeatCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn, countUp } from '../useSceneTimeline';

type Props = { active: boolean };

const features = [
  { icon: <MessageSquare size={22} strokeWidth={2.25} />, color: 'blue' as const, title: 'In every meeting', body: 'Listens, guides you privately, and creates artifacts — not just notes.' },
  { icon: <Database size={22} strokeWidth={2.25} />, color: 'teal' as const, title: 'Living memory', body: 'Every conversation, doc, and decision — searchable forever.' },
  { icon: <Brain size={22} strokeWidth={2.25} />, color: 'purple' as const, title: 'Always learning', body: 'Your corrections become permanent organisational standards.' },
  { icon: <Shield size={22} strokeWidth={2.25} />, color: 'green' as const, title: 'Enterprise secure', body: 'Encrypted, segmented — your IP never trains external AI.' },
];

const stats = [
  { icon: <UserCheck size={16} />, color: 'green' as const, value: 100, suffix: '%', display: null as string | null, label: 'Human-approved', accent: 'var(--green2)' },
  { icon: <Ban size={16} />, color: 'blue' as const, value: 0, suffix: '', display: 'Zero', label: 'Silent writes', accent: 'var(--accent2)' },
  { icon: <Brain size={16} />, color: 'teal' as const, value: 1, suffix: '', display: 'One', label: 'Shared brain', accent: 'var(--teal2)' },
];

export function HeroScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.12);
    staggerIn(tl, root, '[data-animate="stat"]', 0.1);
    staggerIn(tl, root, '[data-animate="feat"]', 0.07);
    countUp(tl, root.querySelector('[data-count="0"]'), 100, '', 0.45);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref} className="hero-scene fill">
      <div className="hero-orb hero-orb-1" aria-hidden />
      <div className="hero-orb hero-orb-2" aria-hidden />
      <div className="hero-orb hero-orb-3" aria-hidden />

      <div className="hero-brand" data-animate="header">
        <div className="eyebrow hero-eyebrow">
          <Zap size={11} /> Intelligence Platform · PRM
        </div>
        <h1 className="hero-title">{BRAND.name}</h1>
        <p className="hero-byline">{BRAND.by}</p>
        <p className="hero-tagline">
          The intelligent agent in your meetings — listens, guides you privately, and{' '}
          <strong style={{ color: 'var(--accent2)', fontWeight: 700 }}>creates artifacts</strong>
          {' '}your team needs: business cases, requirements, tasks, and more.
        </p>
      </div>

      <div className="hero-stats">
        {stats.map((s, i) => (
          <div key={s.label} data-animate="stat" className="hero-stat card">
            <IconBadge color={s.color} size="lg">{s.icon}</IconBadge>
            <div className="hero-stat-value" style={{ color: s.accent }}>
              {s.display ?? <><span data-count={i}>0</span>{s.suffix}</>}
            </div>
            <div className="hero-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="hero-features">
        {features.map((f) => (
          <FeatCard key={f.title} variant="hero" icon={f.icon} iconColor={f.color} title={f.title} body={f.body} accent={f.color} animate="feat" />
        ))}
      </div>
    </div>
  );
}
