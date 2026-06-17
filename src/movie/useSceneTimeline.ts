import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function revealVisible(root: HTMLElement) {
  const animated = root.querySelectorAll('[data-animate]');
  gsap.set(animated, { opacity: 1, y: 0, x: 0, scale: 1, clearProps: 'transform,opacity' });
}

export function useSceneTimeline(
  active: boolean,
  build: (tl: gsap.core.Timeline, root: HTMLElement) => void,
) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!active || !ref.current) return;
    const root = ref.current;

    if (prefersReducedMotion()) {
      revealVisible(root);
      return;
    }

    revealVisible(root);
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => revealVisible(root),
      onInterrupt: () => revealVisible(root),
    });

    tl.fromTo(
      root,
      { opacity: 0.85, y: 12, scale: 0.992 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' },
      0,
    );
    build(tl, root);

    return () => {
      tl.progress(1).kill();
      revealVisible(root);
    };
  }, [active, build]);

  return ref;
}

const REVEAL_FROM = {
  opacity: 0,
  y: 18,
  scale: 0.985,
  duration: 0.55,
  ease: 'power3.out',
  immediateRender: false,
  clearProps: 'transform,opacity',
} as const;

export function staggerIn(tl: gsap.core.Timeline, root: HTMLElement, selector: string, stagger = 0.1) {
  const els = root.querySelectorAll(selector);
  if (!els.length) return;
  tl.from(els, { ...REVEAL_FROM, stagger }, '>-0.08');
}

export function fadeIn(tl: gsap.core.Timeline, root: HTMLElement, selector: string, at: number | string = 0) {
  const els = root.querySelectorAll(selector);
  if (!els.length) return;
  tl.from(els, { ...REVEAL_FROM, duration: 0.48 }, at);
}

export function countUp(tl: gsap.core.Timeline, el: Element | null, end: number, suffix = '', at: number | string = 0) {
  if (!el) return;
  const obj = { val: 0 };
  el.textContent = `0${suffix}`;
  tl.to(obj, {
    val: end,
    duration: 1,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = `${Math.round(obj.val)}${suffix}`;
    },
    onComplete: () => {
      el.textContent = `${end}${suffix}`;
    },
    onInterrupt: () => {
      el.textContent = `${end}${suffix}`;
    },
  }, at);
}
