import { useCallback } from 'react';
import gsap from 'gsap';
import {
  Activity, ArrowRight, Database, EyeOff, KeyRound, Lock, Shield, ShieldCheck, Users,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, sequenceIn, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const pillars = [
  { icon: <EyeOff size={14} />, color: 'blue' as const, label: 'Segmented access', body: 'Teams see only data within their department scope by default.' },
  { icon: <Lock size={14} />, color: 'purple' as const, label: 'Encrypted end-to-end', body: 'AES-256 at rest, TLS in transit, keys managed per tenant.' },
  { icon: <ShieldCheck size={14} />, color: 'green' as const, label: 'Your IP never trains outside AI', body: 'Organisational knowledge stays yours — never used to train external models.' },
  { icon: <Activity size={14} />, color: 'gold' as const, label: 'Full audit trail', body: 'Every read, edit, approval, and export is logged and attributable.' },
];

const leftDepartments = [
  { name: 'Finance', sub: 'BCs & budgets' },
  { name: 'Operations', sub: 'SOPs & runbooks' },
  { name: 'Claims', sub: 'Case files' },
];

const rightDepartments = [
  { name: 'IT', sub: 'Policies & infra' },
  { name: 'HR', sub: 'Handbooks' },
  { name: 'Legal', sub: 'Contracts' },
];

const vaultStats = [
  { label: 'Encryption', value: 'AES-256' },
  { label: 'Isolation', value: 'Per team' },
  { label: 'Audit log', value: 'Always on' },
];

export function SecurityScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.08, 0);
    sequenceIn(tl, root, '[data-animate="vault"]', 0.2, 0.1, { opacity: 0, y: 12, scale: 0.96 });
    staggerIn(tl, root, '[data-animate="dept"]', 0.06, 0.55);
    staggerIn(tl, root, '[data-animate="link"]', 0.04, 0.62);
    staggerIn(tl, root, '[data-animate="pillar"]', 0.1, 0.45);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        className="security-modern-shell"
        hideMeta
        eyebrow={<><Shield size={11} /> Secure by Design</>}
        headline="Your IP Stays Yours. Full Stop."
        subline="Segmented by team, encrypted end-to-end, never used to train external AI models."
      >
        <div className="security-modern-scene">
          <GlassCard accent="blue" className="security-vault-panel">
            <div className="security-diagram-head" data-animate="vault">
              <span className="security-diagram-kicker">Isolation model</span>
              <span className="security-diagram-copy">Each department gets its own encrypted slice — data never mixes without explicit approval</span>
            </div>

            <div className="security-vault-layout" data-animate="vault">
              <div className="security-silo-col">
                <div className="security-silo-label" data-animate="dept">
                  <Lock size={11} /> Left silos
                </div>
                <div className="security-silo-stack">
                  {leftDepartments.map((department) => (
                    <div key={department.name} className="security-dept-row security-dept-row--left">
                      <div className="security-dept-card" data-animate="dept">
                        <span className="security-dept-name">{department.name}</span>
                        <span className="security-dept-sub">{department.sub}</span>
                      </div>
                      <div className="security-dept-link" data-animate="link">
                        <span className="security-dept-link-line" />
                        <Lock size={10} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="security-vault-hub">
                <div className="security-vault-ring" aria-hidden />
                <div className="security-vault-center">
                  <IconBadge color="blue" size="xl"><Database size={24} /></IconBadge>
                  <div className="security-vault-title">Encrypted Org Vault</div>
                  <div className="security-vault-sub">Approved knowledge, isolated by team</div>
                  <div className="security-vault-stats">
                    {vaultStats.map((stat) => (
                      <div key={stat.label} className="security-vault-stat" data-animate="vault">
                        <KeyRound size={10} />
                        <span>{stat.label}</span>
                        <strong>{stat.value}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="security-vault-policy" data-animate="vault">
                    Default: no cross-team access
                  </div>
                </div>
              </div>

              <div className="security-silo-col">
                <div className="security-silo-label" data-animate="dept">
                  <Lock size={11} /> Right silos
                </div>
                <div className="security-silo-stack">
                  {rightDepartments.map((department) => (
                    <div key={department.name} className="security-dept-row security-dept-row--right">
                      <div className="security-dept-link" data-animate="link">
                        <Lock size={10} />
                        <span className="security-dept-link-line" />
                      </div>
                      <div className="security-dept-card" data-animate="dept">
                        <span className="security-dept-name">{department.name}</span>
                        <span className="security-dept-sub">{department.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="security-share-note" data-animate="vault">
              <Users size={14} />
              <span>Cross-team sharing</span>
              <ArrowRight size={12} />
              <strong>explicit approval required</strong>
              <span className="security-share-note-sub">Every export logged · Admin sign-off enforced</span>
            </div>
          </GlassCard>

          <aside className="security-pillars">
            {pillars.map((pillar) => (
              <GlassCard key={pillar.label} accent={pillar.color} animate="pillar" className="security-pillar-card">
                <IconBadge color={pillar.color} size="lg">{pillar.icon}</IconBadge>
                <div>
                  <div className="security-pillar-title">{pillar.label}</div>
                  <div className="security-pillar-body">{pillar.body}</div>
                </div>
              </GlassCard>
            ))}
          </aside>
        </div>
      </SceneShell>
    </div>
  );
}
