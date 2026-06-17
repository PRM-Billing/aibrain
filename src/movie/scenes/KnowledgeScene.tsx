import { useCallback } from 'react';
import { BookMarked, GitBranch, Search, History, FolderOpen, RotateCcw, FileText, Workflow } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge, FeatCard } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const knowledgeFeatures = [
  { icon: <FileText size={13} />,  color: 'teal'   as const, label: 'Every document, versioned',   sub: 'Upload once — fully indexed and searchable' },
  { icon: <Search size={13} />,    color: 'blue'   as const, label: 'Smart search',                sub: 'Natural language queries across all content' },
  { icon: <History size={13} />,   color: 'purple' as const, label: 'Version history',             sub: 'Every edit tracked, one-click revert' },
];

const processFeatures = [
  { icon: <Workflow size={13} />,  color: 'gold'   as const, label: 'Documented processes',        sub: 'Your operating procedures, searchable and linked' },
  { icon: <GitBranch size={13} />, color: 'green'  as const, label: 'Living updates',              sub: 'Processes update as the organisation learns' },
  { icon: <RotateCcw size={13} />, color: 'sky'    as const, label: 'One-click revert',            sub: 'Roll back any process to any prior version' },
];

export function KnowledgeScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="lib"]', 0.12);
    staggerIn(tl, root, '[data-animate="feat"]', 0.08);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        eyebrow={<><BookMarked size={11} /> Knowledge Repository</>}
        headline="Two Libraries. One Source of Truth."
        subline="Every document versioned and searchable — plus your organisation's documented processes, with one-click revert."
      >
        <div className="grid-2 fill">
          {/* Knowledge Library */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <GlassCard accent="teal" animate="lib" style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: 2 }}>
              <IconBadge color="teal" size="lg"><BookMarked size={18} /></IconBadge>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 900 }}>Knowledge Library</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--muted)' }}>Every document your organisation produces</div>
              </div>
            </GlassCard>
            {knowledgeFeatures.map((f) => (
              <FeatCard key={f.label} icon={f.icon} iconColor={f.color} title={f.label} body={f.sub} animate="feat" />
            ))}
          </div>

          {/* Process Library */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <GlassCard accent="gold" animate="lib" style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: 2 }}>
              <IconBadge color="gold" size="lg"><FolderOpen size={18} /></IconBadge>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 900 }}>Process Library</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--muted)' }}>Your organisation's documented ways of working</div>
              </div>
            </GlassCard>
            {processFeatures.map((f) => (
              <FeatCard key={f.label} icon={f.icon} iconColor={f.color} title={f.label} body={f.sub} animate="feat" />
            ))}
          </div>
        </div>
      </SceneShell>
    </div>
  );
}
