import { useCallback } from 'react';
import { Sparkles, BookOpen, Users, Briefcase, FileSignature, ClipboardCheck, ShieldAlert, FileBarChart, GitMerge, Activity, Mail, Star, AlertOctagon, GraduationCap, Search, Building2, ArrowRight } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

type AccentColor = 'blue' | 'teal' | 'green' | 'gold' | 'rose' | 'purple' | 'sky' | 'orange' | 'pink';

const types: { icon: React.ReactNode; color: AccentColor; label: string }[] = [
  { icon: <BookOpen size={13} />,       color: 'teal',   label: 'SOPs' },
  { icon: <Users size={13} />,          color: 'blue',   label: 'Onboarding Docs' },
  { icon: <Briefcase size={13} />,      color: 'gold',   label: 'Project Briefs' },
  { icon: <FileSignature size={13} />,  color: 'purple', label: 'Proposals' },
  { icon: <FileSignature size={13} />,  color: 'rose',   label: 'Contracts' },
  { icon: <ClipboardCheck size={13} />, color: 'green',  label: 'Audit Reports' },
  { icon: <ShieldAlert size={13} />,    color: 'orange', label: 'Policy Documents' },
  { icon: <GitMerge size={13} />,       color: 'sky',    label: 'Decision Memos' },
  { icon: <Activity size={13} />,       color: 'teal',   label: 'Runbooks' },
  { icon: <FileBarChart size={13} />,   color: 'blue',   label: 'Status Reports' },
  { icon: <Mail size={13} />,           color: 'purple', label: 'Executive Summaries' },
  { icon: <Star size={13} />,           color: 'gold',   label: 'Meeting Briefs' },
  { icon: <AlertOctagon size={13} />,   color: 'rose',   label: 'Risk Registers' },
  { icon: <GraduationCap size={13} />,  color: 'green',  label: 'Training Guides' },
  { icon: <Search size={13} />,         color: 'sky',    label: 'RFP Responses' },
  { icon: <Building2 size={13} />,      color: 'orange', label: 'Vendor Comparisons' },
];

export function ManyMoreScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.08);
    staggerIn(tl, root, '[data-animate="card"]', 0.04);
    staggerIn(tl, root, '[data-animate="rule"]', 0.2);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><Sparkles size={11} /> Extensible by Design</>}
        headline="Define the Rules — Get Any Document."
        subline="Anything your organisation writes repeatedly, Aura can produce once you set the template and rules."
      >
        <div className="fill" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.4rem', flex: 1, overflowY: 'auto' }}>
            {types.map((t) => (
              <div key={t.label} data-animate="card" className="card" style={{ padding: '0.55rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <IconBadge color={t.color} size="sm">{t.icon}</IconBadge>
                <span style={{ fontSize: '0.67rem', fontWeight: 700, lineHeight: 1.2 }}>{t.label}</span>
              </div>
            ))}
          </div>

          <GlassCard accent="blue" animate="rule" style={{ padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>Your template + rules</span>
            <ArrowRight size={14} color="var(--muted2)" />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent2)' }}>New document type, produced automatically</span>
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
