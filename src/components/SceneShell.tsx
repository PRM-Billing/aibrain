import type { ReactNode } from 'react';

type Props = {
  eyebrow?: ReactNode;
  headline: string;
  subline?: string;
  children: ReactNode;
  className?: string;
};

export function SceneShell({ eyebrow, headline, subline, children, className = '' }: Props) {
  return (
    <div className={`scene-body ${className}`}>
      <header>
        {eyebrow && <div className="eyebrow" data-animate="header">{eyebrow}</div>}
        <h1 className="scene-h1" data-animate="header">{headline}</h1>
        {subline && <p className="scene-sub" data-animate="header">{subline}</p>}
      </header>
      {children}
    </div>
  );
}
