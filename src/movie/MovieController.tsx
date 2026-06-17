import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { ParticleField } from '../components/ParticleField';
import { NARRATION } from '../narration/narration';
import { SCENES } from './scenes';

export function MovieController() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scene = SCENES[index];
  const caption = NARRATION[scene.id] ?? '';

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const scheduleAdvance = useCallback(() => {
    clearTimer();
    if (!playing) return;

    const audioPath = `/audio/${scene.id}.mp3`;
    const audio = new Audio(audioPath);
    audioRef.current = audio;
    audio.muted = muted;

    const advance = () => {
      setIndex((i) => {
        if (i >= SCENES.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    };

    audio.addEventListener('error', () => {
      timerRef.current = setTimeout(advance, scene.durationMs);
    }, { once: true });

    audio.addEventListener('ended', advance, { once: true });

    audio.play().catch(() => {
      timerRef.current = setTimeout(advance, scene.durationMs);
    });
  }, [playing, muted, scene.id, scene.durationMs]);

  useEffect(() => {
    scheduleAdvance();
    return clearTimer;
  }, [index, playing, scheduleAdvance]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setIndex((i) => Math.min(i + 1, SCENES.length - 1));
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === ' ') {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <ParticleField />
      <div
        className="movie-root"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 10% -5%, rgba(109,125,252,.15), transparent 50%), var(--bg)',
        }}
      >
        <nav className="progress-dots" aria-label="Scene progress">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`progress-dot${i === index ? ' active' : ''}`}
              title={s.label}
              aria-label={`Go to ${s.label}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </nav>

        <main className="scene-stage">
          {SCENES.map((s, i) => {
            const Comp = s.component;
            return (
              <div key={s.id} className={`scene-layer${i === index ? ' active' : ''}`}>
                <Comp active={i === index} />
              </div>
            );
          })}
        </main>

        <div className="caption-bar" aria-live="polite">{caption}</div>

        <div className="controls-bar">
          <button type="button" className="ctrl-btn" onClick={() => setIndex((i) => Math.max(i - 1, 0))}>
            <ChevronLeft size={16} /> Prev
          </button>
          <button
            type="button"
            className={`ctrl-btn${playing ? ' playing' : ''}`}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
            {playing ? 'Pause' : 'Play'}
          </button>
          <button type="button" className="ctrl-btn" onClick={() => setMuted((m) => !m)} title="Mute voiceover">
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {muted ? 'Muted' : 'Sound'}
          </button>
          <span className="scene-counter">
            {index + 1} / {SCENES.length} · {scene.label}
          </span>
          <button type="button" className="ctrl-btn primary" onClick={() => setIndex((i) => Math.min(i + 1, SCENES.length - 1))}>
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
