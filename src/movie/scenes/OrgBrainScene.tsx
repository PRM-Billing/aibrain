import { useCallback } from 'react';
import gsap from 'gsap';
import {
  Brain, PieChart, Cog, ClipboardList, Code2, Users, ShieldCheck,
  Network, Lock, ArrowUp, ArrowDown, UserCheck, Database,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn, sequenceIn } from '../useSceneTimeline';

type Props = { active: boolean };

const ORBIT_R = 152;
const ORBIT_PCT = (ORBIT_R / 400) * 100;

const departments = [
  { name: 'Finance', short: 'Finance', icon: <PieChart size={20} strokeWidth={2.25} />, color: 'gold' as const, angle: 225, stroke: '#fbbf24' },
  { name: 'Operations', short: 'Operations', icon: <Cog size={20} strokeWidth={2.25} />, color: 'teal' as const, angle: 315, stroke: '#2dd4bf' },
  { name: 'IT', short: 'IT', icon: <Code2 size={20} strokeWidth={2.25} />, color: 'sky' as const, angle: 0, stroke: '#60a5fa' },
  { name: 'Legal', short: 'Legal', icon: <ShieldCheck size={20} strokeWidth={2.25} />, color: 'purple' as const, angle: 45, stroke: '#c084fc' },
  { name: 'HR', short: 'HR', icon: <Users size={20} strokeWidth={2.25} />, color: 'green' as const, angle: 135, stroke: '#34d399' },
  { name: 'Claims', short: 'Claims', icon: <ClipboardList size={20} strokeWidth={2.25} />, color: 'rose' as const, angle: 180, stroke: '#fb7185' },
];

const howItWorks = [
  {
    icon: <Brain size={20} strokeWidth={2.25} />,
    color: 'gold' as const,
    title: 'Department brains',
    body: 'Each team keeps private memory — meetings, docs, and decisions stay in their own brain.',
  },
  {
    icon: <ArrowUp size={20} strokeWidth={2.25} />,
    color: 'teal' as const,
    title: 'Memory flows up',
    body: 'What a team approves to share rises to the organisation brain and compounds intelligence.',
  },
  {
    icon: <Network size={20} strokeWidth={2.25} />,
    color: 'blue' as const,
    title: 'Organisation brain',
    body: 'One shared layer at the centre — every decision, every metric, growing smarter over time.',
  },
  {
    icon: <ArrowDown size={20} strokeWidth={2.25} />,
    color: 'sky' as const,
    title: 'Knowledge flows down',
    body: 'Approved knowledge routes back to the teams that need it, with full source context.',
  },
  {
    icon: <Lock size={20} strokeWidth={2.25} />,
    color: 'purple' as const,
    title: 'Segmented by default',
    body: 'Departments cannot read each other\'s private memory. No silent cross-team access.',
  },
  {
    icon: <UserCheck size={20} strokeWidth={2.25} />,
    color: 'green' as const,
    title: 'Cross-dept sharing',
    body: 'Sharing across teams always requires explicit human approval from a named owner.',
  },
];

const POP_FROM = { opacity: 0, scale: 0.78 } as const;
const POP_TO = {
  opacity: 1, scale: 1, duration: 0.48, ease: 'back.out(1.4)', clearProps: 'transform,opacity',
} as const;

function polar(angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    left: `${50 + Math.cos(rad) * ORBIT_PCT}%`,
    top: `${50 + Math.sin(rad) * ORBIT_PCT}%`,
  };
}

function spokeEnd(angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: 200 + Math.cos(rad) * ORBIT_R,
    y: 200 + Math.sin(rad) * ORBIT_R,
  };
}

export function OrgBrainScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    root.querySelector('.orgbrain-hub')?.classList.remove('orgbrain-hub--flowing');

    gsap.set(root.querySelectorAll('[data-animate="dept"], [data-animate="center"]'), {
      y: 0, x: 0, scale: 0.78, opacity: 0,
    });
    gsap.set(root.querySelectorAll('[data-animate="info"]'), { y: 0, x: 0, opacity: 0 });

    staggerIn(tl, root, '[data-animate="header"]', 0.08, 0);
    sequenceIn(
      tl, root, '[data-animate="info"]', 0.18, 0.09,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out', clearProps: 'transform' },
    );

    tl.fromTo(
      root.querySelectorAll('[data-animate="center"]'),
      POP_FROM,
      { ...POP_TO, duration: 0.6, ease: 'back.out(1.5)' },
      0.55,
    );

    tl.fromTo(
      root.querySelectorAll('[data-animate="ring"]'),
      { opacity: 0, scale: 0.94, transformOrigin: '50% 50%' },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out', clearProps: 'transform' },
      0.65,
    );

    root.querySelectorAll('[data-animate="dept"]').forEach((el, i) => {
      tl.fromTo(el, POP_FROM, POP_TO, 0.78 + i * 0.09);
    });

    const spokes = root.querySelectorAll<SVGLineElement>('.orgbrain-spoke');
    spokes.forEach((line) => {
      const len = line.getTotalLength();
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.8 });
    });
    if (spokes.length) {
      tl.to(spokes, { strokeDashoffset: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, 1.2);
    }

    tl.add(() => {
      root.querySelector('.orgbrain-hub')?.classList.add('orgbrain-hub--flowing');
    }, 1.45);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        className="orgbrain-shell"
        hideMeta
        eyebrow={<><Database size={11} /> Org intelligence</>}
        headline="One Organisational Brain, Many Department Brains."
      >
        <div className="orgbrain-scene">
          <div className="orgbrain-body">
            <aside className="orgbrain-aside">
              <GlassCard accent="blue" className="orgbrain-how-panel">
                <div className="orgbrain-how-title" data-animate="info">
                  <Network size={13} /> How it works
                </div>
                <div className="orgbrain-how-list">
                  {howItWorks.map((item) => (
                    <div key={item.title} data-animate="info" className="orgbrain-how-item">
                      <IconBadge color={item.color} size="md">{item.icon}</IconBadge>
                      <div className="orgbrain-how-text">
                        <div className="orgbrain-how-label">{item.title}</div>
                        <div className="orgbrain-how-body">{item.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </aside>

            <div className="orgbrain-infographic">
              <div className="orgbrain-hub">
                <svg className="orgbrain-lines" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" aria-hidden>
                  <circle className="orgbrain-ring" data-animate="ring" cx="200" cy="200" r={ORBIT_R} fill="none" />
                  {departments.map((d) => {
                    const end = spokeEnd(d.angle);
                    return (
                      <line
                        key={d.name}
                        className="orgbrain-spoke"
                        style={{ stroke: d.stroke }}
                        x1="200" y1="200"
                        x2={end.x} y2={end.y}
                      />
                    );
                  })}
                </svg>

                {departments.map((d) => {
                  const pos = polar(d.angle);
                  return (
                    <div key={d.name} className="orgbrain-dept" style={{ left: pos.left, top: pos.top }}>
                      <div data-animate="dept" className="orgbrain-dept-inner">
                        <GlassCard accent={d.color} className="orgbrain-dept-card">
                          <IconBadge color={d.color} size="md">{d.icon}</IconBadge>
                          <div className="orgbrain-dept-name">{d.name} Brain</div>
                          <div className="orgbrain-dept-sub">Private memory for {d.short}</div>
                        </GlassCard>
                      </div>
                    </div>
                  );
                })}

                <div className="orgbrain-center">
                  <div data-animate="center" className="orgbrain-center-inner">
                    <GlassCard accent="blue" className="orgbrain-center-card">
                      <div className="orgbrain-center-glow" aria-hidden />
                      <IconBadge color="blue" size="xl"><Brain size={24} strokeWidth={2.25} /></IconBadge>
                      <div className="orgbrain-center-name">Organisation Brain</div>
                      <div className="orgbrain-center-sub">
                        One shared memory · Every decision · Compounding intelligence
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SceneShell>
    </div>
  );
}
