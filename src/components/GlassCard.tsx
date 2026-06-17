import type { ReactNode, CSSProperties } from 'react';

type Accent = 'blue' | 'teal' | 'green' | 'gold' | 'rose' | 'purple' | 'sky' | 'orange' | 'pink';

const ACCENT_GRADIENTS: Record<Accent, string> = {
  blue:   'linear-gradient(90deg,#6366f1,#818cf8)',
  teal:   'linear-gradient(90deg,#14b8a6,#2dd4bf)',
  green:  'linear-gradient(90deg,#10b981,#34d399)',
  gold:   'linear-gradient(90deg,#d97706,#fbbf24)',
  rose:   'linear-gradient(90deg,#e11d48,#fb7185)',
  purple: 'linear-gradient(90deg,#9333ea,#c084fc)',
  sky:    'linear-gradient(90deg,#2563eb,#60a5fa)',
  orange: 'linear-gradient(90deg,#ea580c,#fb923c)',
  pink:   'linear-gradient(90deg,#db2777,#f472b6)',
};

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  animate?: string;
  accent?: Accent;
};

export function GlassCard({ children, className = '', style, animate, accent }: Props) {
  return (
    <div className={`card ${className}`.trim()} style={style} data-animate={animate}>
      {accent && (
        <div
          className="card-accent-top"
          style={{ background: ACCENT_GRADIENTS[accent] }}
        />
      )}
      {children}
    </div>
  );
}

/* ── Convenience sub-components ───────────────────────────── */

type IconBadgeProps = {
  children: ReactNode;
  color?: Accent;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

export function IconBadge({ children, color = 'blue', size = 'md' }: IconBadgeProps) {
  const sizeClass =
    size === 'xl' ? 'icon-badge-xl' :
    size === 'lg' ? 'icon-badge-lg' :
    size === 'sm' ? 'icon-badge-sm' : '';
  return (
    <div className={`icon-badge ib-${color} ${sizeClass}`}>
      {children}
    </div>
  );
}

type FeatCardProps = {
  icon: ReactNode;
  iconColor?: Accent;
  title: string;
  body?: string;
  accent?: Accent;
  animate?: string;
  style?: CSSProperties;
  children?: ReactNode;
  variant?: 'default' | 'hero';
};

export function FeatCard({ icon, iconColor = 'blue', title, body, accent, animate, style, children, variant = 'default' }: FeatCardProps) {
  const isHero = variant === 'hero';
  return (
    <GlassCard accent={accent} animate={animate} style={style} className={isHero ? 'feat-card-wrap--hero' : ''}>
      <div className={`feat-card${isHero ? ' feat-card--hero' : ''}`}>
        <IconBadge color={iconColor} size="xl">{icon}</IconBadge>
        <div className="feat-card-title">{title}</div>
        {body && <div className="feat-card-body">{body}</div>}
        {children}
      </div>
    </GlassCard>
  );
}

type RowCardProps = {
  icon: ReactNode;
  iconColor?: Accent;
  title: string;
  sub?: string;
  accent?: Accent;
  animate?: string;
  right?: ReactNode;
  style?: CSSProperties;
};

export function RowCard({ icon, iconColor = 'blue', title, sub, accent, animate, right, style }: RowCardProps) {
  return (
    <GlassCard accent={accent} animate={animate} style={style}>
      <div className="row-card">
        <IconBadge color={iconColor} size="md">{icon}</IconBadge>
        <div className="row-card-text">
          <div className="row-card-title">{title}</div>
          {sub && <div className="row-card-sub">{sub}</div>}
        </div>
        {right}
      </div>
    </GlassCard>
  );
}
