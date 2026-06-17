import { useCallback } from 'react';
import gsap from 'gsap';
import { Brain, Zap, MessageSquare, Database, Shield } from 'lucide-react';
import { BRAND } from '../../brand';
import { FeatCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn, countUp } from '../useSceneTimeline';

type Props = { active: boolean };

const features = [
  { icon: <MessageSquare size={14} />, color: 'blue' as const, title: 'Sits in your meetings', body: 'Listens, understands, and privately guides you in real time.' },
  { icon: <Database size={14} />, color: 'teal' as const, title: 'Builds living memory', body: 'Every decision and document captured and searchable forever.' },
  { icon: <Brain size={14} />, color: 'purple' as const, title: 'Gets smarter over time', body: 'Learns your standards and improves with every approved edit.' },
  { icon: <Shield size={14} />, color: 'green' as const, title: 'Secure by design', body: 'Segmented, encrypted — your IP never trains anyone else\'s AI.' },
];

const stats = [
  { n: 100, suffix: '%', label: 'Human-approved', color: 'var(--green2)' },
  { n: 0, suffix: ' silent changes', label: 'Nothing final without review', color: 'var(--accent2)' },
  { n: 1, suffix: ' shared brain', label: 'Across every workflow', color: 'var(--teal2)' },
];

export function HeroScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.15);
    staggerIn(tl, root, '[data-animate="stat"]', 0.1);
    staggerIn(tl, root, '[data-animate="feat"]', 0.08);
    const n0 = root.querySelector('[data-count="0"]');
    const n2 = root.querySelector('[data-count="2"]');
    countUp(tl, n0, 100, '%', 0.5);
    countUp(tl, n2, 1, '', 0.7);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref} className="fill" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1rem', position: 'relative', padding: '0 1rem' }}>
      <div style={{ position: 'absolute', width: 500, height: 500, border: '1px solid rgba(99,102,241,.06)', borderRadius: '50%', animation: 'spin 60s linear infinite', pointerEvents: 'none' }} aria-hidden />
      <div style={{ position: 'absolute', width: 320, height: 320, border: '1px solid rgba(99,102,241,.04)', borderRadius: '50%', animation: 'spin 40s linear infinite reverse', pointerEvents: 'none' }} aria-hidden />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div className="eyebrow" data-animate="header" style={{ margin: '0 auto' }}>
          <Zap size={11} /> Intelligence Platform · PRM
        </div>
        <h1
          data-animate="header"
          style={{
            fontSize: 'clamp(3rem, 9vw, 6rem)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            background: 'linear-gradient(135deg,#a5b4fc,#6366f1,#14b8a6,#a5b4fc)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite',
            lineHeight: 0.95,
          }}
        >
          {BRAND.name}
        </h1>
        <p data-animate="header" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.25rem' }}>{BRAND.by}</p>
        <p data-animate="header" style={{ fontSize: 'clamp(0.82rem, 1.4vw, 1rem)', maxWidth: 520, lineHeight: 1.55, fontWeight: 300 }}>
          The intelligent agent that <strong style={{ color: 'var(--accent2)', fontWeight: 700 }}>sits in your meetings</strong>, builds your organisation's memory, and turns every decision into a document.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {stats.map((s, i) => (
          <div key={s.label} data-animate="stat" className="card" style={{ padding: '0.65rem 1rem', minWidth: 120, textAlign: 'center', background: 'linear-gradient(160deg,var(--s2),var(--surface))' }}>
            <div style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', fontWeight: 900, color: s.color, lineHeight: 1 }}>
              {i === 1 ? '0' : <span data-count={i}>0</span>}{s.suffix}
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--muted)', fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.5rem', maxWidth: 720, width: '100%' }}>
        {features.map((f) => (
          <FeatCard key={f.title} icon={f.icon} iconColor={f.color} title={f.title} body={f.body} accent={f.color} animate="feat" />
        ))}
      </div>

      <style>{`
        @keyframes shimmer { from { background-position: 0% center; } to { background-position: 200% center; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
