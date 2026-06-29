import slideManifest from './slides.json';

type SlideEntry = { id: string; file: string };

export const NARRATION_AUDIO: Record<string, string> = Object.fromEntries(
  slideManifest.slides.map((slide: SlideEntry) => [slide.id, `/audio/${slide.file}`]),
);
