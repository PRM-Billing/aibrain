import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePlaybackRegister } from './PlaybackContext';

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Final visible state after tweens complete. */
export function revealVisible(root: HTMLElement) {
  const animated = root.querySelectorAll('[data-animate]');
  gsap.set(animated, { opacity: 1, y: 0, x: 0, scale: 1, clearProps: 'transform' });
}

/** Hide animated elements before the timeline runs (useLayoutEffect = before paint). */
function hideAnimated(root: HTMLElement) {
  gsap.set(root.querySelectorAll('[data-animate]'), {
    opacity: 0,
    y: 18,
    x: 0,
    scale: 0.985,
  });
}

export function useSceneTimeline(
  active: boolean,
  build: (tl: gsap.core.Timeline, root: HTMLElement) => void,
) {
  const ref = useRef<HTMLDivElement>(null);
  const registerTimeline = usePlaybackRegister();

  useLayoutEffect(() => {
    if (!active || !ref.current) return;
    const root = ref.current;

    if (prefersReducedMotion()) {
      revealVisible(root);
      return;
    }

    hideAnimated(root);

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => revealVisible(root),
      onInterrupt: () => revealVisible(root),
    });

    tl.fromTo(
      root,
      { y: 10, scale: 0.995 },
      { y: 0, scale: 1, duration: 0.4, ease: 'power2.out', clearProps: 'transform' },
      0,
    );
    build(tl, root);

    const unregister = registerTimeline?.(tl);

    return () => {
      unregister?.();
      tl.progress(1).kill();
      revealVisible(root);
    };
  }, [active, build, registerTimeline]);

  return ref;
}

const REVEAL_FROM = {
  opacity: 0,
  y: 18,
  x: 0,
  scale: 0.985,
} as const;

const REVEAL_TO = {
  opacity: 1,
  y: 0,
  x: 0,
  scale: 1,
  duration: 0.55,
  ease: 'power3.out',
  clearProps: 'transform',
} as const;

export function staggerIn(
  tl: gsap.core.Timeline,
  root: HTMLElement,
  selector: string,
  stagger = 0.1,
  at: number | string = '>-0.08',
) {
  const els = root.querySelectorAll(selector);
  if (!els.length) return;
  tl.fromTo(els, REVEAL_FROM, { ...REVEAL_TO, stagger }, at);
}

/** Reveal elements one-by-one with a clear pause between each. */
export function sequenceIn(
  tl: gsap.core.Timeline,
  root: HTMLElement,
  selector: string,
  startAt: number | string = 0,
  stepGap = 0.38,
  from?: gsap.TweenVars,
  to?: gsap.TweenVars,
) {
  const fromVars = from ?? REVEAL_FROM;
  const toVars = { ...REVEAL_TO, ...(to ?? {}), duration: to?.duration ?? 0.5 };
  const els = root.querySelectorAll(selector);
  els.forEach((el, i) => {
    const at = typeof startAt === 'number' ? startAt + i * stepGap : startAt;
    tl.fromTo(el, fromVars, toVars, at);
  });
}

export function fadeIn(tl: gsap.core.Timeline, root: HTMLElement, selector: string, at: number | string = 0) {
  const els = root.querySelectorAll(selector);
  if (!els.length) return;
  tl.fromTo(els, REVEAL_FROM, { ...REVEAL_TO, duration: 0.48 }, at);
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
