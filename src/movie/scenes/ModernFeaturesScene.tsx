import { useCallback } from 'react';
import gsap from 'gsap';
import {
  Accessibility, Code2, Globe2, Languages, Mic2, PlugZap,
  Smartphone, Sparkles, UsersRound, Workflow,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, sequenceIn, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const languages = [
  { label: 'English', rtl: false },
  { label: 'Español', rtl: false },
  { label: '中文', rtl: false },
  { label: 'Français', rtl: false },
  { label: 'العربية', rtl: true },
  { label: 'Deutsch', rtl: false },
  { label: 'हिन्दी', rtl: false },
  { label: '日本語', rtl: false },
];

const features = [
  { icon: <Mic2 size={15} />, color: 'blue' as const, title: 'Voice & transcription', sub: 'Meeting intelligence starts from live conversation.', example: 'Live captions + speaker ID' },
  { icon: <PlugZap size={15} />, color: 'teal' as const, title: 'Integrations', sub: 'Connect document stores, calendars, CRMs, and ticketing.', example: 'Sync approved exports' },
  { icon: <UsersRound size={15} />, color: 'purple' as const, title: 'Real-time collaboration', sub: 'Teams review and approve outputs together.', example: 'Shared approval queues' },
  { icon: <Smartphone size={15} />, color: 'gold' as const, title: 'Mobile ready', sub: 'Review, approve, and ask Aura from anywhere.', example: 'Push approval alerts' },
  { icon: <Code2 size={15} />, color: 'green' as const, title: 'API & exports', sub: 'Move approved knowledge into existing systems.', example: 'REST + webhooks' },
  { icon: <Accessibility size={15} />, color: 'sky' as const, title: 'Accessible by design', sub: 'Keyboard-friendly flows, clear contrast, readable states.', example: 'WCAG-aligned UI' },
];

export function ModernFeaturesScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.08, 0);
    sequenceIn(tl, root, '[data-animate="language"]', 0.18, 0.06);
    sequenceIn(tl, root, '[data-animate="feature"]', 0.45, 0.08, { opacity: 0, y: 12, scale: 0.98 });
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        className="modern-features-shell"
        hideMeta
        eyebrow={<><Sparkles size={11} /> Modern Platform</>}
        headline="Built for How Modern Teams Work."
        subline="Multilingual, integrated, accessible, and ready for distributed teams from day one."
      >
        <div className="modern-features-scene">
          <GlassCard accent="purple" className="modern-language-hero">
            <div className="modern-language-copy" data-animate="language">
              <IconBadge color="purple" size="xl"><Languages size={24} /></IconBadge>
              <div>
                <div className="modern-language-title">Multi-language support</div>
                <div className="modern-language-sub">
                  Meetings, artifacts, and chat work across languages, locales, and right-to-left layouts.
                </div>
              </div>
            </div>
            <div className="modern-language-cloud">
              {languages.map((language) => (
                <span
                  key={language.label}
                  className={`modern-language-pill${language.rtl ? ' modern-language-pill--rtl' : ''}`}
                  data-animate="language"
                >
                  {language.rtl && <Globe2 size={10} />}
                  {language.label}
                </span>
              ))}
            </div>
          </GlassCard>

          <div className="modern-feature-grid">
            {features.map((feature) => (
              <GlassCard key={feature.title} accent={feature.color} animate="feature" className="modern-feature-card">
                <IconBadge color={feature.color} size="lg">{feature.icon}</IconBadge>
                <div className="modern-feature-title">{feature.title}</div>
                <div className="modern-feature-sub">{feature.sub}</div>
                <span className="modern-feature-example">{feature.example}</span>
              </GlassCard>
            ))}
          </div>

          <GlassCard accent="teal" animate="feature" className="modern-platform-strip">
            <IconBadge color="teal" size="md"><Workflow size={14} /></IconBadge>
            <span>One platform layer: meetings, repository, pipelines, checks, chat, approvals, and analytics.</span>
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
