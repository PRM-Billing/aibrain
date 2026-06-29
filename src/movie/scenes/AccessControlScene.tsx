import { useCallback, Fragment } from 'react';
import { Building2, CheckCircle2, Crown, Eye, Share2, ShieldCheck, User, XCircle } from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const roles = [
  {
    icon: <Crown size={14} />,    color: 'gold'   as const,
    role: 'Org Admin',
    access: 'Full organisation-wide access',
    perms: ['All departments', 'All documents', 'User management', 'System config'],
  },
  {
    icon: <Building2 size={14} />, color: 'blue'  as const,
    role: 'Department Admin',
    access: 'Manage their own department',
    perms: ['Department docs', 'Member management', 'Process library', 'Approvals'],
  },
  {
    icon: <User size={14} />,      color: 'teal'  as const,
    role: 'Member',
    access: 'Read and write within scope',
    perms: ['View & create docs', 'Submit for review', 'Chat with Aura', 'Edit drafts'],
  },
  {
    icon: <Eye size={14} />,       color: 'purple' as const,
    role: 'Viewer',
    access: 'Read-only access',
    perms: ['View approved docs', 'Search knowledge', 'Export approved', 'Read-only chat'],
  },
];

const capabilities = ['Org memory', 'Dept docs', 'Create drafts', 'Approve', 'User admin'];

const matrix = [
  ['full', 'full', 'full', 'full', 'full'],
  ['blocked', 'full', 'full', 'full', 'partial'],
  ['blocked', 'full', 'full', 'partial', 'blocked'],
  ['blocked', 'read', 'blocked', 'blocked', 'blocked'],
];

export function AccessControlScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.1);
    staggerIn(tl, root, '[data-animate="role"]', 0.12);
    staggerIn(tl, root, '[data-animate="note"]', 0.2);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        className="access-modern-shell"
        hideMeta
        eyebrow={<><ShieldCheck size={11} /> Access Control</>}
        headline="Clear Roles. Enforced Everywhere."
        subline="Org-wide access control — department isolation by default, explicit approval to share across teams."
      >
        <div className="access-modern-scene">
          <div className="access-role-grid">
            {roles.map((r) => (
              <GlassCard key={r.role} accent={r.color} animate="role" className="access-role-card">
                <div className="access-role-head">
                  <IconBadge color={r.color} size="lg">{r.icon}</IconBadge>
                </div>
                <div>
                  <div className="access-role-title">{r.role}</div>
                  <div className="access-role-sub">{r.access}</div>
                </div>
                <div className="access-role-perms">
                  {r.perms.map((p) => (
                    <div key={p} className="access-role-perm">
                      <div />
                      {p}
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard accent="blue" animate="note" className="access-matrix-panel">
            <div className="modern-panel-title">
              <ShieldCheck size={13} /> Role enforcement matrix
            </div>
            <div className="access-matrix">
              <div className="access-matrix-cell access-matrix-head" />
              {capabilities.map((cap) => (
                <div key={cap} className="access-matrix-cell access-matrix-head">{cap}</div>
              ))}
              {roles.map((role, rowIndex) => (
                <Fragment key={role.role}>
                  <div className="access-matrix-cell access-matrix-role">{role.role}</div>
                  {matrix[rowIndex].map((state, colIndex) => (
                    <div key={`${role.role}-${capabilities[colIndex]}`} className={`access-matrix-cell access-matrix-state access-matrix-state--${state}`}>
                      {state === 'blocked' ? <XCircle size={12} /> : <CheckCircle2 size={12} />}
                      <span>{state === 'full' ? 'Full' : state === 'read' ? 'Read' : state === 'partial' ? 'Limited' : 'No'}</span>
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </GlassCard>

          <GlassCard accent="gold" animate="note" className="access-share-note">
            <IconBadge color="gold" size="md"><Share2 size={14} /></IconBadge>
            <span>Sharing across departments always requires explicit approval from an admin.</span>
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
