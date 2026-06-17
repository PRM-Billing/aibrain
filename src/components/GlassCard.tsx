import type { ReactNode, CSSProperties } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  animate?: string;
};

export function GlassCard({ children, className = '', style, animate }: Props) {
  return (
    <div className={`glass ${className}`} style={style} data-animate={animate}>
      {children}
    </div>
  );
}
