import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useSceneTimeline(
  active: boolean,
  build: (tl: gsap.core.Timeline, root: HTMLElement) => void,
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const root = ref.current;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll('[data-animate]'), { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    gsap.set(root.querySelectorAll('[data-animate]'), { opacity: 0, y: 24 });
    const tl = gsap.timeline();
    build(tl, root);

    return () => {
      tl.kill();
    };
  }, [active, build]);

  return ref;
}

export function staggerIn(tl: gsap.core.Timeline, root: HTMLElement, selector: string, stagger = 0.12) {
  const els = root.querySelectorAll(selector);
  if (!els.length) return;
  tl.to(els, { opacity: 1, y: 0, duration: 0.55, stagger, ease: 'power3.out' }, '-=0.1');
}

export function fadeIn(tl: gsap.core.Timeline, root: HTMLElement, selector: string, at = 0) {
  const els = root.querySelectorAll(selector);
  if (!els.length) return;
  tl.to(els, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, at);
}

export function countUp(tl: gsap.core.Timeline, el: Element | null, end: number, suffix = '', at = 0) {
  if (!el) return;
  const obj = { val: 0 };
  tl.to(obj, {
    val: end,
    duration: 1.2,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = `${Math.round(obj.val)}${suffix}`;
    },
  }, at);
}
