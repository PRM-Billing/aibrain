import { useCallback } from 'react';
import {
  ArrowDown, ArrowRight, BookOpen, Briefcase, Building2, ClipboardCheck,
  FileBarChart, FileSignature, GitMerge, GraduationCap, LayoutTemplate,
  Mail, Search, ShieldAlert, Sparkles, Star, Activity, AlertOctagon, Target, Users,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, sequenceIn, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

type AccentColor = 'blue' | 'teal' | 'green' | 'gold' | 'rose' | 'purple' | 'sky' | 'orange' | 'pink';

const templateSections = [
  {
    label: 'Purpose & scope',
    sub: 'What the document is for, who uses it, and when it gets produced',
    color: 'blue' as const,
    icon: <Target size={11} />,
  },
  {
    label: 'Required sections',
    sub: 'Headings, fields, and evidence Aura must always include',
    color: 'purple' as const,
    icon: <LayoutTemplate size={11} />,
  },
  {
    label: 'Approval gates',
    sub: 'Who reviews, scores, or signs off before publish',
    color: 'gold' as const,
    icon: <ClipboardCheck size={11} />,
  },
  {
    label: 'Output format',
    sub: 'Structure, tone, length, and export style for the final artifact',
    color: 'green' as const,
    icon: <FileSignature size={11} />,
  },
];

const types: { icon: React.ReactNode; color: AccentColor; label: string }[] = [
  { icon: <BookOpen size={13} />, color: 'teal', label: 'SOPs' },
  { icon: <Users size={13} />, color: 'blue', label: 'Onboarding Docs' },
  { icon: <Briefcase size={13} />, color: 'gold', label: 'Project Briefs' },
  { icon: <FileSignature size={13} />, color: 'purple', label: 'Proposals' },
  { icon: <FileSignature size={13} />, color: 'rose', label: 'Contracts' },
  { icon: <ClipboardCheck size={13} />, color: 'green', label: 'Audit Reports' },
  { icon: <ShieldAlert size={13} />, color: 'orange', label: 'Policy Documents' },
  { icon: <GitMerge size={13} />, color: 'sky', label: 'Decision Memos' },
  { icon: <Activity size={13} />, color: 'teal', label: 'Runbooks' },
  { icon: <FileBarChart size={13} />, color: 'blue', label: 'Status Reports' },
  { icon: <Mail size={13} />, color: 'purple', label: 'Executive Summaries' },
  { icon: <Star size={13} />, color: 'gold', label: 'Meeting Briefs' },
  { icon: <AlertOctagon size={13} />, color: 'rose', label: 'Risk Registers' },
  { icon: <GraduationCap size={13} />, color: 'green', label: 'Training Guides' },
  { icon: <Search size={13} />, color: 'sky', label: 'RFP Responses' },
  { icon: <Building2 size={13} />, color: 'orange', label: 'Vendor Comparisons' },
];

export function ManyMoreScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.08, 0);
    sequenceIn(tl, root, '[data-animate="template"]', 0.16, 0.08);
    staggerIn(tl, root, '[data-animate="card"]', 0.04, 0.55);
    sequenceIn(tl, root, '[data-animate="rule"]', 0.2, 0.08);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        className="many-more-shell"
        hideMeta
        eyebrow={<><Sparkles size={11} /> Extensible by Design</>}
        headline="Set the Template. Get Any Document."
        subline="SOPs, briefs, proposals, runbooks — anything your team produces repeatedly, on demand."
      >
        <div className="many-more-scene">
          <GlassCard accent="purple" className="many-more-template">
            <div className="modern-panel-title" data-animate="template">
              <LayoutTemplate size={13} /> Define your template
            </div>
            <div className="many-more-template-stack">
              {templateSections.map((section, i) => (
                <div key={section.label} className="many-more-template-step" data-animate="template">
                  <div className="many-more-template-rail">
                    <IconBadge color={section.color} size="sm">{section.icon}</IconBadge>
                    {i < templateSections.length - 1 && <span className="many-more-template-line" />}
                  </div>
                  <div className="many-more-template-card">
                    <span className="many-more-template-label">{section.label}</span>
                    <span className="many-more-template-sub">{section.sub}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="many-more-template-note" data-animate="template">
              <ArrowDown size={12} />
              <span>Chat to create or edit any document type</span>
            </div>
          </GlassCard>

          <div className="many-more-main">
            <div className="many-more-type-grid">
              {types.map((t) => (
                <GlassCard key={t.label} accent={t.color} animate="card" className="many-more-type-card">
                  <IconBadge color={t.color} size="md">{t.icon}</IconBadge>
                  <span className="many-more-type-label">{t.label}</span>
                </GlassCard>
              ))}
            </div>

            <GlassCard accent="blue" animate="rule" className="many-more-flow-strip">
              <span className="many-more-flow-item">Your template + rules</span>
              <ArrowRight size={14} />
              <span className="many-more-flow-item many-more-flow-item--accent">Meeting context</span>
              <ArrowRight size={14} />
              <span className="many-more-flow-item many-more-flow-item--accent">New document, automatically</span>
            </GlassCard>
          </div>
        </div>
      </SceneShell>
    </div>
  );
}
