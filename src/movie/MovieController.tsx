import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { DeckBackground } from '../components/DeckBackground';
import { NARRATION_AUDIO } from '../narration/audio';
import { NARRATION } from '../narration/narration';
import { PlaybackProvider } from './PlaybackContext';
import { SCENES } from './scenes';

export function MovieController() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scene = SCENES[index];
  const caption = NARRATION[scene.id] ?? '';
  const audioSrc = NARRATION_AUDIO[scene.id];

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
        setPaused((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    if (!audioSrc || paused) return;

    const playPromise = audio.play();
    playPromise?.catch(() => {
      // Browsers can block autoplay until the first user interaction.
      setPaused(true);
    });
  }, [audioSrc, index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    if (paused) {
      audio.pause();
      return;
    }

    const playPromise = audio.play();
    playPromise?.catch(() => {
      setPaused(true);
    });
  }, [audioSrc, paused]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  return (
    <>
      <DeckBackground />
      <PlaybackProvider paused={paused} sceneKey={scene.id}>
        <div className="movie-root">
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
                <div
                  key={s.id}
                  className={`scene-layer${i === index ? ' active' : ''}`}
                  aria-hidden={i !== index}
                  data-scene-id={s.id}
                >
                  <Comp active={i === index} />
                </div>
              );
            })}
          </main>

          <div className="caption-bar" aria-live="polite">{caption}</div>

          <audio
            key={audioSrc ?? 'no-audio'}
            ref={audioRef}
            src={audioSrc}
            muted={muted}
            preload="auto"
          />

          <div className="controls-bar">
            <button type="button" className="ctrl-btn" onClick={() => setIndex((i) => Math.max(i - 1, 0))}>
              <ChevronLeft size={16} /> Prev
            </button>
            <button
              type="button"
              className={`ctrl-btn${!paused ? ' playing' : ''}`}
              onClick={() => setPaused((p) => !p)}
              aria-pressed={!paused}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
              {paused ? 'Play' : 'Pause'}
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
      </PlaybackProvider>
    </>
  );
}
