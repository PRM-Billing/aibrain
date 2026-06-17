import type { ReactNode } from 'react';
import { Activity, Sparkles, ShieldCheck } from 'lucide-react';

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
      <header className="scene-header">
        <div>
          {eyebrow && <div className="eyebrow" data-animate="header">{eyebrow}</div>}
          <h1 className="scene-h1" data-animate="header">{headline}</h1>
          {subline && <p className="scene-sub" data-animate="header">{subline}</p>}
        </div>
        <div className="scene-meta" data-animate="header" aria-hidden>
          <span><Sparkles size={11} /> Product demo</span>
          <span><Activity size={11} /> Live in meetings</span>
          <span><ShieldCheck size={11} /> Human approved</span>
        </div>
      </header>
      <section className="scene-content-frame">
        {children}
      </section>
    </div>
  );
}
