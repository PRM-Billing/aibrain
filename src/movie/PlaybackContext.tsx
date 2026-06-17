import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import type gsap from 'gsap';

type PlaybackContextValue = {
  registerTimeline: (tl: gsap.core.Timeline) => () => void;
};

const PlaybackContext = createContext<PlaybackContextValue | null>(null);

export function PlaybackProvider({
  paused,
  sceneKey,
  children,
}: {
  paused: boolean;
  sceneKey: string;
  children: ReactNode;
}) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const syncTimeline = useCallback((tl: gsap.core.Timeline, restart = false) => {
    if (pausedRef.current) {
      tl.pause();
    } else if (restart || tl.progress() === 0) {
      tl.restart(true);
    } else {
      tl.play();
    }
  }, []);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    syncTimeline(tl, false);
  }, [paused, syncTimeline]);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    syncTimeline(tl, true);
  }, [sceneKey, syncTimeline]);

  const registerTimeline = useCallback((tl: gsap.core.Timeline) => {
    timelineRef.current = tl;
    requestAnimationFrame(() => {
      if (timelineRef.current === tl) syncTimeline(tl, true);
    });
    return () => {
      if (timelineRef.current === tl) timelineRef.current = null;
    };
  }, [syncTimeline]);

  return (
    <PlaybackContext.Provider value={{ registerTimeline }}>
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlaybackRegister() {
  return useContext(PlaybackContext)?.registerTimeline;
}
