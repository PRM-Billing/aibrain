import { useCallback } from 'react';
import { ShieldCheck, Crown, Building2, User, Eye, Share2 } from 'lucide-react';
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
        eyebrow={<><ShieldCheck size={11} /> Access Control</>}
        headline="Clear Roles. Enforced Everywhere."
        subline="Org-wide access control — department isolation by default, explicit approval to share across teams."
      >
        <div className="fill" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="grid-4">
            {roles.map((r) => (
              <GlassCard key={r.role} accent={r.color} animate="role" style={{ padding: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <IconBadge color={r.color} size="lg">{r.icon}</IconBadge>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, marginBottom: 2 }}>{r.role}</div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--muted)', lineHeight: 1.3 }}>{r.access}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 2 }}>
                  {r.perms.map((p) => (
                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.6rem', color: 'var(--muted)' }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--line2)', flexShrink: 0 }} />
                      {p}
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard accent="gold" animate="note" style={{ padding: '0.6rem 0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconBadge color="gold" size="md"><Share2 size={14} /></IconBadge>
            <span style={{ fontSize: '0.68rem', color: 'var(--gold2)', fontWeight: 700 }}>Sharing across departments always requires explicit approval from an admin</span>
          </GlassCard>
        </div>
      </SceneShell>
    </div>
  );
}
